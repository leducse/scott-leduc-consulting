import { Sha256 } from "@aws-crypto/sha256-js";
import { fromEnv, fromIni } from "@aws-sdk/credential-providers";
import { HttpRequest } from "@smithy/protocol-http";
import { SignatureV4 } from "@smithy/signature-v4";

type BackendRequest = Record<string, unknown>;

export class BackendError extends Error {
  status: number;
  setupRequired: boolean;

  constructor(message: string, status = 500, setupRequired = false) {
    super(message);
    this.name = "BackendError";
    this.status = status;
    this.setupRequired = setupRequired;
  }
}

export function getDataScienceBackendUrl() {
  return (process.env.DATA_SCIENCE_MCP_BASE_URL || "http://127.0.0.1:8765").replace(/\/+$/, "");
}

function getBackendAuthMode() {
  return (process.env.DATA_SCIENCE_MCP_AUTH_MODE || "none").trim().toLowerCase();
}

function getSigningService() {
  return (process.env.DATA_SCIENCE_MCP_AWS_SIGNING_SERVICE || "lambda").trim();
}

function getBackendRegion(url: string) {
  const configured = process.env.DATA_SCIENCE_MCP_AWS_REGION || process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION;
  if (configured) return configured;

  const parsed = new URL(url);
  const lambdaUrlMatch = parsed.hostname.match(/\.lambda-url\.([a-z0-9-]+)\.on\.aws$/);
  if (lambdaUrlMatch?.[1]) return lambdaUrlMatch[1];
  return "us-east-1";
}

async function getAwsCredentials() {
  try {
    return await fromEnv()();
  } catch {
    return await fromIni()();
  }
}

function isLocalBackend(url: string) {
  try {
    const parsed = new URL(url);
    return ["127.0.0.1", "localhost", "::1"].includes(parsed.hostname);
  } catch {
    return false;
  }
}

function isAwsIamBackend() {
  return ["aws_iam", "sigv4"].includes(getBackendAuthMode());
}

function assertBridgeAllowed() {
  const backendUrl = getDataScienceBackendUrl();
  const explicitlyEnabled = process.env.DATA_SCIENCE_MCP_BRIDGE_ENABLED === "true";
  const localDevelopment = process.env.NODE_ENV !== "production" && isLocalBackend(backendUrl);

  if (explicitlyEnabled || localDevelopment || isAwsIamBackend()) return;

  throw new BackendError(
    "The data-science bridge is disabled for this environment. Set DATA_SCIENCE_MCP_AUTH_MODE=aws_iam for the deployed backend, or set DATA_SCIENCE_MCP_BRIDGE_ENABLED=true only after the backend endpoint is authenticated and safe to expose.",
    403,
    true
  );
}

async function requestHeaders(method: string, url: string, body?: string) {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const authMode = getBackendAuthMode();
  if (authMode === "none" || authMode === "") return headers;
  if (!isAwsIamBackend()) {
    throw new BackendError(`Unsupported DATA_SCIENCE_MCP_AUTH_MODE: ${authMode}`, 500, true);
  }

  const parsed = new URL(url);
  const request = new HttpRequest({
    method,
    protocol: parsed.protocol,
    hostname: parsed.hostname,
    path: parsed.pathname,
    query: Object.fromEntries(parsed.searchParams),
    headers: {
      ...headers,
      host: parsed.host,
    },
    body,
  });
  const signer = new SignatureV4({
    credentials: await getAwsCredentials(),
    region: getBackendRegion(url),
    service: getSigningService(),
    sha256: Sha256,
  });
  const signed = await signer.sign(request);
  const signedHeaders = { ...(signed.headers as Record<string, string>) };
  delete signedHeaders.host;
  return signedHeaders;
}

async function parseBackendResponse(response: Response) {
  const text = await response.text();
  let payload: unknown = {};
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { error: text };
    }
  }

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload && "error" in payload
        ? String(payload.error)
        : `Data science backend returned HTTP ${response.status}.`;
    throw new BackendError(message, response.status);
  }

  return payload;
}

export async function postDataScienceBackend<T>(path: string, payload: BackendRequest): Promise<T> {
  assertBridgeAllowed();
  const url = `${getDataScienceBackendUrl()}${path}`;
  const body = JSON.stringify(payload);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: await requestHeaders("POST", url, body),
      body,
      cache: "no-store",
      signal: controller.signal,
    });
    return (await parseBackendResponse(response)) as T;
  } catch (error) {
    if (error instanceof BackendError) throw error;
    throw new BackendError(
      `Could not reach the data science backend at ${getDataScienceBackendUrl()}. Start python3 server.py in /Users/scottleduc/Projects/agentic-bi-report-platform or set DATA_SCIENCE_MCP_BASE_URL.`,
      503,
      true
    );
  } finally {
    clearTimeout(timeout);
  }
}

export async function getDataScienceBackend<T>(path: string): Promise<T> {
  assertBridgeAllowed();
  const url = `${getDataScienceBackendUrl()}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: await requestHeaders("GET", url),
      cache: "no-store",
      signal: controller.signal,
    });
    return (await parseBackendResponse(response)) as T;
  } catch (error) {
    if (error instanceof BackendError) throw error;
    throw new BackendError(
      `Could not reach the data science backend at ${getDataScienceBackendUrl()}.`,
      503,
      true
    );
  } finally {
    clearTimeout(timeout);
  }
}
