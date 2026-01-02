"""Lambda function to generate presigned WebSocket URLs for AgentCore."""

import json
import os
import uuid
import base64
import secrets
import datetime
from urllib.parse import quote, urlencode

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

# CORS headers
CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Content-Type": "application/json"
}


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
    """Lambda handler for generating presigned URLs."""
    
    # Handle CORS preflight
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": ""
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
            "headers": CORS_HEADERS,
            "body": json.dumps(response_body)
        }
        
    except Exception as e:
        print(f"Error generating presigned URL: {e}")
        return {
            "statusCode": 500,
            "headers": CORS_HEADERS,
            "body": json.dumps({
                "error": "Failed to generate WebSocket URL",
                "message": str(e)
            })
        }
