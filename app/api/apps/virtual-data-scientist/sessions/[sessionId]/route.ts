import { NextRequest, NextResponse } from "next/server";
import { BackendError, getDataScienceBackend } from "../../_backend";

export const runtime = "nodejs";

const MAX_SESSION_MESSAGES = 40;

interface BackendSession {
  id?: string;
  title?: string;
  user_goal?: string;
  data_source_id?: string;
  table_name?: string;
  current_dataset_id?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

interface BackendDataset {
  id?: string;
  display_name?: string;
  data_source_id?: string;
  table_name?: string;
  row_count?: number;
  column_count?: number;
}

interface BackendRun {
  id?: string;
  session_id?: string;
  run_type?: string;
  status?: string;
  selected_analysis_type?: string;
  finished_at?: string;
  queued_at?: string;
  started_at?: string;
}

interface BackendArtifact {
  id?: string;
  run_id?: string;
  artifact_type?: string;
  title?: string;
  summary?: string;
  content_type?: string;
  created_at?: string;
}

interface BackendMessage {
  id?: string;
  session_id?: string;
  actor?: string;
  message_text?: string;
  related_run_id?: string | null;
  created_at?: string;
}

interface BackendSessionDetailResponse {
  session?: BackendSession;
  dataset?: BackendDataset | null;
  runs?: BackendRun[];
  artifacts?: BackendArtifact[];
  messages?: BackendMessage[];
}

function artifactMetadata(artifact: BackendArtifact) {
  return {
    id: artifact.id,
    run_id: artifact.run_id,
    artifact_type: artifact.artifact_type || "artifact",
    title: artifact.title || "Analysis artifact",
    summary: artifact.summary,
    content_type: artifact.content_type,
    created_at: artifact.created_at,
  };
}

function messageMetadata(message: BackendMessage) {
  return {
    id: message.id,
    role: message.actor === "user" ? "user" : "assistant",
    content: message.message_text || "",
    related_run_id: message.related_run_id,
    created_at: message.created_at,
  };
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await context.params;
    if (!sessionId) {
      return NextResponse.json({ error: "Session id is required." }, { status: 400 });
    }

    const payload = await getDataScienceBackend<BackendSessionDetailResponse>(
      `/api/analysis/sessions/${encodeURIComponent(sessionId)}`
    );
    if (!payload.session) {
      return NextResponse.json({ error: "Analysis session not found." }, { status: 404 });
    }

    const messages = (payload.messages ?? []).slice(-MAX_SESSION_MESSAGES).map(messageMetadata);
    const artifacts = (payload.artifacts ?? []).map(artifactMetadata);

    return NextResponse.json({
      ok: true,
      session: payload.session,
      dataset: payload.dataset,
      runs: payload.runs ?? [],
      artifacts,
      messages,
    });
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
    console.error("Virtual data scientist session detail bridge failed:", error);
    return NextResponse.json({ error: "Virtual data scientist session detail bridge failed." }, { status: 500 });
  }
}
