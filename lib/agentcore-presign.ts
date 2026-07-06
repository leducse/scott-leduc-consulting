import { Sha256 } from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { HttpRequest } from "@smithy/protocol-http";
import { SignatureV4 } from "@smithy/signature-v4";

function getDataPlaneEndpoint(region: string): string {
  return `bedrock-agentcore.${region}.amazonaws.com`;
}

const getAwsCredentials = defaultProvider();

export async function generateAgentCoreWebSocketUrl({
  runtimeArn,
  sessionId,
  endpointName = "DEFAULT",
  expiresIn = 300,
}: {
  runtimeArn: string;
  sessionId: string;
  endpointName?: string;
  expiresIn?: number;
}): Promise<string> {
  const arnParts = runtimeArn.split(":");
  const region = arnParts[3];
  if (!region) {
    throw new Error("Invalid AgentCore runtime ARN.");
  }

  const host = getDataPlaneEndpoint(region);
  const encodedArn = encodeURIComponent(runtimeArn);
  const path = `/runtimes/${encodedArn}/ws`;
  const queryParams = new URLSearchParams({
    qualifier: endpointName,
    "X-Amzn-Bedrock-AgentCore-Runtime-Session-Id": sessionId,
  });

  const request = new HttpRequest({
    method: "GET",
    protocol: "https:",
    hostname: host,
    path,
    query: Object.fromEntries(queryParams),
    headers: { host },
  });

  const signer = new SignatureV4({
    credentials: await getAwsCredentials(),
    region,
    service: "bedrock-agentcore",
    sha256: Sha256,
  });

  const signedRequest = await signer.presign(request, { expiresIn });
  const signedQuery = new URLSearchParams(signedRequest.query as Record<string, string>);
  return `wss://${host}${path}?${signedQuery.toString()}`;
}
