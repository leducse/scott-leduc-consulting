import { NextRequest, NextResponse } from "next/server";
import { BackendError, getDataScienceBackend } from "../../_backend";

export const runtime = "nodejs";

const MAX_ARTIFACT_CONTENT_CHARS = 60_000;

interface BackendArtifact {
  id?: unknown;
  run_id?: unknown;
  artifact_type?: unknown;
  title?: unknown;
  summary?: unknown;
  content_type?: unknown;
  created_at?: unknown;
  content?: unknown;
}

interface BackendArtifactResponse {
  artifact?: BackendArtifact;
}

function stringField(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function limitString(value: string) {
  if (value.length <= MAX_ARTIFACT_CONTENT_CHARS) {
    return { content: value, truncated: false };
  }

  return {
    content: `${value.slice(0, MAX_ARTIFACT_CONTENT_CHARS)}\n\n[Preview truncated at ${MAX_ARTIFACT_CONTENT_CHARS} characters.]`,
    truncated: true,
  };
}

function limitContent(content: unknown) {
  if (typeof content === "string") return limitString(content);
  if (content === null || typeof content === "undefined") {
    return { content: null, truncated: false };
  }

  try {
    const serialized = JSON.stringify(content, null, 2);
    if (serialized.length <= MAX_ARTIFACT_CONTENT_CHARS) {
      return { content, truncated: false };
    }
    return limitString(serialized);
  } catch {
    return { content: "[Artifact content could not be serialized for preview.]", truncated: true };
  }
}

function publicArtifact(artifact: BackendArtifact) {
  const limited = limitContent(artifact.content);

  return {
    id: stringField(artifact.id),
    run_id: stringField(artifact.run_id),
    artifact_type: stringField(artifact.artifact_type) || "artifact",
    title: stringField(artifact.title) || "Analysis artifact",
    summary: stringField(artifact.summary),
    content_type: stringField(artifact.content_type),
    created_at: stringField(artifact.created_at),
    content: limited.content,
    content_truncated: limited.truncated,
  };
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ artifactId: string }> }
) {
  try {
    const { artifactId } = await context.params;
    if (!artifactId) {
      return NextResponse.json({ error: "Artifact id is required." }, { status: 400 });
    }

    const payload = await getDataScienceBackend<BackendArtifactResponse>(
      `/api/analysis/artifacts/${encodeURIComponent(artifactId)}`
    );
    if (!payload.artifact) {
      return NextResponse.json({ error: "Artifact not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, artifact: publicArtifact(payload.artifact) });
  } catch (error) {
    if (error instanceof BackendError) {
      return NextResponse.json(
        {
          error: error.message,
          setup_required: error.setupRequired,
        },
        { status: error.status }
      );
    }
    console.error("Virtual data scientist artifact bridge failed:", error);
    return NextResponse.json({ error: "Virtual data scientist artifact bridge failed." }, { status: 500 });
  }
}
