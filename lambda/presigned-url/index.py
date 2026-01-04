"""Lambda function to generate presigned WebSocket URLs for AgentCore.

Includes simple rate limiting to prevent abuse.
"""

import json
import os
import uuid
import base64
import secrets
import datetime
import time
from urllib.parse import quote, urlencode
from collections import defaultdict

import boto3
from botocore.auth import SigV4QueryAuth
from botocore.awsrequest import AWSRequest
from botocore.credentials import Credentials

# Configuration from environment variables
RUNTIME_ARN = os.environ.get(
    "AGENTCORE_RUNTIME_ARN",
    "arn:aws:bedrock-agentcore:us-east-1:441383083571:runtime/scottleduc_consultant-vKDki47sNm"
)
REGION = os.environ.get("AWS_REGION", "us-east-1")
ENDPOINT_NAME = os.environ.get("ENDPOINT_NAME", "DEFAULT")
PRESIGNED_URL_EXPIRY = int(os.environ.get("PRESIGNED_URL_EXPIRY", "300"))

# Rate limiting configuration
RATE_LIMIT_REQUESTS_PER_MINUTE = int(os.environ.get("RATE_LIMIT_PER_MINUTE", "10"))
RATE_LIMIT_WINDOW_SECONDS = 60

# In-memory rate limit tracking (resets on cold start, but that's fine for basic protection)
# For production-grade rate limiting, use DynamoDB or ElastiCache
_request_counts = defaultdict(list)

# CORS headers - restrict to known domains
ALLOWED_ORIGINS = [
    "https://main.d5x6v3bghz7jh.amplifyapp.com",
    "https://decision-layer.com",
    "https://www.decision-layer.com",
    "http://localhost:3000",
    "http://localhost:3001",
]

def get_cors_headers(origin: str = None) -> dict:
    """Get CORS headers with proper origin validation."""
    # Check if origin is allowed
    if origin and origin in ALLOWED_ORIGINS:
        allowed_origin = origin
    else:
        # Default to production domain
        allowed_origin = "https://decision-layer.com"
    
    return {
        "Access-Control-Allow-Origin": allowed_origin,
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Content-Type": "application/json"
    }

# Fallback for backwards compatibility
CORS_HEADERS = get_cors_headers()


def check_rate_limit(ip_address: str) -> bool:
    """Check if IP has exceeded rate limit. Returns True if allowed, False if blocked."""
    now = time.time()
    window_start = now - RATE_LIMIT_WINDOW_SECONDS
    
    # Clean up old requests
    _request_counts[ip_address] = [
        t for t in _request_counts[ip_address] if t > window_start
    ]
    
    # Check if under limit
    if len(_request_counts[ip_address]) >= RATE_LIMIT_REQUESTS_PER_MINUTE:
        return False
    
    # Record this request
    _request_counts[ip_address].append(now)
    return True


def get_client_ip(event: dict) -> str:
    """Extract client IP from the Lambda event."""
    # Try different sources for IP
    request_context = event.get("requestContext", {})
    
    # API Gateway v2 (HTTP API)
    if "http" in request_context:
        return request_context["http"].get("sourceIp", "unknown")
    
    # API Gateway v1 (REST API)
    identity = request_context.get("identity", {})
    return identity.get("sourceIp", "unknown")


def get_data_plane_endpoint(region: str) -> str:
    """Get the AgentCore data plane endpoint for the region."""
    return f"bedrock-agentcore.{region}.amazonaws.com"


def generate_presigned_url(runtime_arn: str, session_id: str, expires: int = 300) -> str:
    """Generate a presigned WebSocket URL for AgentCore Runtime."""
    
    # Parse ARN to get region
    arn_parts = runtime_arn.split(":")
    region = arn_parts[3]
    
    # Build WebSocket URL components
    host = get_data_plane_endpoint(region)
    encoded_arn = quote(runtime_arn, safe="")
    path = f"/runtimes/{encoded_arn}/ws"
    
    # Query parameters
    query_params = {
        "qualifier": ENDPOINT_NAME,
        "X-Amzn-Bedrock-AgentCore-Runtime-Session-Id": session_id,
    }
    
    # Build the HTTPS URL for signing
    query_string = urlencode(query_params)
    https_url = f"https://{host}{path}?{query_string}"
    
    # Get credentials from Lambda execution role
    session = boto3.Session()
    credentials = session.get_credentials()
    frozen_credentials = credentials.get_frozen_credentials()
    
    # Create the request to sign
    request = AWSRequest(
        method="GET",
        url=https_url,
        headers={"host": host}
    )
    
    # Sign with SigV4QueryAuth for presigned URL
    signer = SigV4QueryAuth(
        credentials=frozen_credentials,
        service_name="bedrock-agentcore",
        region_name=region,
        expires=expires
    )
    signer.add_auth(request)
    
    # Convert to WebSocket URL
    presigned_url = request.url.replace("https://", "wss://")
    
    return presigned_url


def lambda_handler(event, context):
    """Lambda handler for generating presigned URLs with rate limiting."""
    
    # Get origin for CORS
    headers = event.get("headers", {}) or {}
    origin = headers.get("origin") or headers.get("Origin")
    cors_headers = get_cors_headers(origin)
    
    # Handle CORS preflight
    http_method = event.get("httpMethod") or event.get("requestContext", {}).get("http", {}).get("method")
    if http_method == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": ""
        }
    
    # Rate limiting check
    client_ip = get_client_ip(event)
    if not check_rate_limit(client_ip):
        print(f"Rate limit exceeded for IP: {client_ip}")
        return {
            "statusCode": 429,
            "headers": cors_headers,
            "body": json.dumps({
                "error": "Too many requests",
                "message": "Rate limit exceeded. Please wait before trying again.",
                "retry_after": RATE_LIMIT_WINDOW_SECONDS
            })
        }
    
    try:
        # Get session_id from query parameters or generate one
        query_params = event.get("queryStringParameters") or {}
        session_id = query_params.get("session_id") or f"web-{uuid.uuid4()}"
        
        # Generate presigned URL
        presigned_url = generate_presigned_url(
            RUNTIME_ARN,
            session_id,
            PRESIGNED_URL_EXPIRY
        )
        
        response_body = {
            "websocket_url": presigned_url,
            "session_id": session_id,
            "expires_in": PRESIGNED_URL_EXPIRY,
            "runtime_arn": RUNTIME_ARN
        }
        
        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps(response_body)
        }
        
    except Exception as e:
        print(f"Error generating presigned URL: {e}")
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({
                "error": "Failed to generate WebSocket URL",
                "message": str(e)
            })
        }
