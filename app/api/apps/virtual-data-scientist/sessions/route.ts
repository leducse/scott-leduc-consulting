import { NextResponse } from "next/server";
import { BackendError, getDataScienceBackend } from "../_backend";

export const runtime = "nodejs";

interface BackendSession {
  id: string;
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
  id: string;
  display_name?: string;
  data_source_id?: string;
  table_name?: string;
  row_count?: number;
  column_count?: number;
}

interface BackendRun {
  id: string;
  session_id: string;
  run_type?: string;
  status?: string;
  selected_analysis_type?: string;
  finished_at?: string;
  queued_at?: string;
  started_at?: string;
}

interface BackendArtifact {
  id: string;
  run_id: string;
  artifact_type?: string;
  title?: string;
  summary?: string;
  content_type?: string;
  created_at?: string;
}

interface BackendSessionsResponse {
  sessions?: BackendSession[];
  datasets?: BackendDataset[];
  runs?: BackendRun[];
  artifacts?: BackendArtifact[];
}

function latestRun(runs: BackendRun[]) {
  return runs
    .map((run, index) => ({ run, index }))
    .sort((left, right) => {
      const leftTime = left.run.finished_at || left.run.started_at || left.run.queued_at || "";
      const rightTime = right.run.finished_at || right.run.started_at || right.run.queued_at || "";
      const timeCompare = rightTime.localeCompare(leftTime);
      return timeCompare || right.index - left.index;
    })[0]?.run;
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

export async function GET() {
  try {
    const payload = await getDataScienceBackend<BackendSessionsResponse>("/api/analysis/sessions");
    const datasets = new Map((payload.datasets ?? []).map((dataset) => [dataset.id, dataset]));
    const runs = payload.runs ?? [];
    const artifacts = payload.artifacts ?? [];

    const sessions = (payload.sessions ?? [])
      .map((session) => {
        const sessionRuns = runs.filter((run) => run.session_id === session.id);
        const runIds = new Set(sessionRuns.map((run) => run.id));
        const sessionArtifacts = artifacts.filter((artifact) => runIds.has(artifact.run_id));
        const dataset = session.current_dataset_id ? datasets.get(session.current_dataset_id) : undefined;
        const latest = latestRun(sessionRuns);
        return {
          id: session.id,
          title: session.title || session.user_goal || "Analysis Session",
          user_goal: session.user_goal,
          data_source_id: dataset?.data_source_id || session.data_source_id || "demo_warehouse",
          table_name: dataset?.table_name || session.table_name,
          dataset_label: dataset?.display_name,
          row_count: dataset?.row_count,
          column_count: dataset?.column_count,
          status: session.status,
          created_at: session.created_at,
          updated_at: session.updated_at,
          run_count: sessionRuns.length,
          artifact_count: sessionArtifacts.length,
          recent_artifacts: sessionArtifacts
            .slice()
            .sort((left, right) => String(right.created_at || "").localeCompare(String(left.created_at || "")))
            .slice(0, 8)
            .map(artifactMetadata),
          latest_run: latest
            ? {
                id: latest.id,
                run_type: latest.run_type,
                status: latest.status,
                selected_analysis_type: latest.selected_analysis_type,
              }
            : undefined,
        };
      })
      .sort((left, right) => String(right.updated_at || "").localeCompare(String(left.updated_at || "")))
      .slice(0, 12);

    return NextResponse.json({ ok: true, sessions });
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
    console.error("Virtual data scientist sessions bridge failed:", error);
    return NextResponse.json({ error: "Virtual data scientist sessions bridge failed." }, { status: 500 });
  }
}
