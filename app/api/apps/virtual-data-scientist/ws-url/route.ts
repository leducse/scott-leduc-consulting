import { NextRequest, NextResponse } from "next/server";
import { generateAgentCoreWebSocketUrl } from "@/lib/agentcore-presign";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

const MIN_AGENTCORE_SESSION_ID_LENGTH = 33;

function getRuntimeSessionId(candidate: string | null) {
  const value = candidate?.trim();
  if (value && value.length >= MIN_AGENTCORE_SESSION_ID_LENGTH) {
    return value;
  }
  return randomUUID();
}

export async function GET(request: NextRequest) {
  try {
    const runtimeArn = process.env.DATA_SCIENTIST_AGENTCORE_RUNTIME_ARN;
    if (!runtimeArn) {
      return NextResponse.json({
        error: "DATA_SCIENTIST_AGENTCORE_RUNTIME_ARN is not configured.",
        setup_required: true,
      });
    }

    const { searchParams } = new URL(request.url);
    const sessionId = getRuntimeSessionId(searchParams.get("session_id"));
    const endpointName = process.env.DATA_SCIENTIST_AGENTCORE_ENDPOINT_NAME || "DEFAULT";

    const websocketUrl = await generateAgentCoreWebSocketUrl({
      runtimeArn,
      sessionId,
      endpointName,
      expiresIn: 300,
    });

    return NextResponse.json({
      websocket_url: websocketUrl,
      session_id: sessionId,
      endpoint_name: endpointName,
      expires_in: 300,
    });
  } catch (error) {
    console.error("Failed to generate data scientist AgentCore URL:", error);
    return NextResponse.json(
      { error: "Failed to generate Data Scientist AgentCore WebSocket URL." },
      { status: 500 }
    );
  }
}
