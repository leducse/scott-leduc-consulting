import { NextRequest, NextResponse } from "next/server";
import { SignatureV4 } from "@smithy/signature-v4";
import { HttpRequest } from "@smithy/protocol-http";
import { Sha256 } from "@aws-crypto/sha256-js";
import { fromEnv, fromIni } from "@aws-sdk/credential-providers";

// AgentCore configuration
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const RUNTIME_ARN = process.env.AGENTCORE_RUNTIME_ARN || 
  "arn:aws:bedrock-agentcore:us-east-1:441383083571:runtime/scottleduc_consultant-vKDki47sNm";

// Helper to get the data plane endpoint
function getDataPlaneEndpoint(region: string): string {
  return `agentruntime.bedrock-agentcore.${region}.amazonaws.com`;
}

// Generate a presigned WebSocket URL for AgentCore
async function generatePresignedUrl(
  runtimeArn: string,
  sessionId: string,
  endpointName: string = "DEFAULT",
  expiresIn: number = 300
): Promise<string> {
  // Parse runtime ARN
  const arnParts = runtimeArn.split(":");
  const region = arnParts[3];
  
  // Build the WebSocket URL
  const host = getDataPlaneEndpoint(region);
  const encodedArn = encodeURIComponent(runtimeArn);
  const path = `/runtimes/${encodedArn}/ws`;
  
  // Query parameters
  const queryParams = new URLSearchParams({
    qualifier: endpointName,
    "X-Amzn-Bedrock-AgentCore-Runtime-Session-Id": sessionId,
  });

  // Get AWS credentials
  let credentials;
  try {
    // Try environment variables first, then fall back to shared credentials file
    credentials = await fromEnv()();
  } catch {
    try {
      credentials = await fromIni()();
    } catch (error) {
      console.error("Failed to get AWS credentials:", error);
      throw new Error("AWS credentials not available");
    }
  }

  // Create the HTTP request for signing
  const request = new HttpRequest({
    method: "GET",
    protocol: "https:",
    hostname: host,
    path: path,
    query: Object.fromEntries(queryParams),
    headers: {
      host: host,
    },
  });

  // Create the SigV4 signer
  const signer = new SignatureV4({
    credentials: credentials,
    region: region,
    service: "bedrock-agentcore",
    sha256: Sha256,
  });

  // Sign the request with query string auth
  const signedRequest = await signer.presign(request, {
    expiresIn: expiresIn,
  });

  // Build the presigned URL
  const signedQuery = new URLSearchParams(signedRequest.query as Record<string, string>);
  const presignedUrl = `wss://${host}${path}?${signedQuery.toString()}`;

  return presignedUrl;
}

// POST handler for chat messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, session_id } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "No prompt provided" },
        { status: 400 }
      );
    }

    const sessionId = session_id || `web-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // For now, return a helpful message since WebSocket connections need client-side handling
    // The frontend will use the presigned URL endpoint for WebSocket connections
    return NextResponse.json({
      response: "Please use the WebSocket connection for real-time chat. Get a presigned URL from /api/chat/ws-url first.",
      session_id: sessionId,
      websocket_endpoint: "/api/chat/ws-url",
    });

  } catch (error) {
    console.error("Chat API error:", error);
    
    return NextResponse.json({
      response: "The AI assistant is currently being set up. In the meantime, please use the contact form or email leducse@gmail.com to get in touch with Scott directly.",
      session_id: "fallback",
    });
  }
}

// GET handler to generate presigned WebSocket URL
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id") || 
      `web-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const presignedUrl = await generatePresignedUrl(
      RUNTIME_ARN,
      sessionId,
      "DEFAULT",
      300 // 5 minutes
    );

    return NextResponse.json({
      websocket_url: presignedUrl,
      session_id: sessionId,
      expires_in: 300,
    });

  } catch (error) {
    console.error("Failed to generate presigned URL:", error);
    
    return NextResponse.json(
      { error: "Failed to generate WebSocket URL. Please try again later." },
      { status: 500 }
    );
  }
}
