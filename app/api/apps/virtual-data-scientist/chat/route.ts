import { NextRequest, NextResponse } from "next/server";
import { BackendError, getDataScienceBackend, postDataScienceBackend } from "../_backend";

export const runtime = "nodejs";

interface Artifact {
  id: string;
  artifact_type: string;
  title: string;
  summary?: string;
  content?: unknown;
}

interface AnalysisRun {
  id: string;
  status: string;
  selected_analysis_type?: string;
}

interface AnalysisSession {
  id: string;
}

interface AnalysisDataset {
  id?: string;
  data_source_id?: string;
  table_name?: string;
}

interface Profile {
  table_name?: string;
  candidate_methods?: Array<{ type: string; reason: string }>;
  warnings?: string[];
}

interface CreateSessionResponse {
  session: AnalysisSession;
}

interface LightAnalysisResponse {
  session: AnalysisSession;
  dataset?: AnalysisDataset;
  run: AnalysisRun;
  profile?: Profile;
  artifacts?: Artifact[];
}

interface DeepAnalysisResponse {
  run: AnalysisRun;
}

interface RunStatusResponse {
  run: AnalysisRun;
  artifacts?: Artifact[];
}

function wantsDeepAnalysis(prompt: string, explicit?: unknown) {
  if (typeof explicit === "boolean") return explicit;
  const normalized = prompt.toLowerCase();
  return ["deep", "model", "forecast", "predict", "cluster", "segment", "anomaly", "outlier", "driver", "why"].some(
    (token) => normalized.includes(token)
  );
}

function inferredTableName(prompt: string, tableName?: unknown) {
  if (typeof tableName === "string" && tableName.trim()) return tableName.trim();
  const normalized = prompt.toLowerCase();
  if (normalized.includes("order") || normalized.includes("sales") || normalized.includes("forecast")) {
    return "orders";
  }
  return undefined;
}

function artifactLine(artifact: Artifact) {
  return `- ${artifact.artifact_type}: ${artifact.title}${artifact.summary ? ` (${artifact.summary})` : ""}`;
}

function artifactSummary(artifact: Artifact) {
  return {
    id: artifact.id,
    artifact_type: artifact.artifact_type,
    title: artifact.title,
    summary: artifact.summary,
  };
}

function formatDeepSummary(status?: RunStatusResponse) {
  if (!status) return "Deep analysis was queued. Poll the run status for the final report.";
  const report = status.artifacts?.find((artifact) => artifact.artifact_type === "report");
  const content = report?.content;
  if (typeof content === "object" && content && "summary" in content) {
    return String(content.summary);
  }
  return `Deep analysis ${status.run.status}.`;
}

async function pollDeepRun(runId: string) {
  let status: RunStatusResponse | undefined;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    status = await getDataScienceBackend<RunStatusResponse>(`/api/analysis/runs/${encodeURIComponent(runId)}`);
    if (status.run.status !== "queued" && status.run.status !== "running") return status;
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  return status;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const dataSourceId = typeof body.data_source_id === "string" ? body.data_source_id : "demo_warehouse";
    const tableName = inferredTableName(prompt, body.table_name);
    let analysisSessionId = typeof body.analysis_session_id === "string" ? body.analysis_session_id : "";

    if (!analysisSessionId) {
      const created = await postDataScienceBackend<CreateSessionResponse>("/api/analysis/sessions", {
        user_goal: prompt,
        data_source_id: dataSourceId,
        table_name: tableName,
      });
      analysisSessionId = created.session.id;
    } else {
      await postDataScienceBackend("/api/analysis/continue", {
        session_id: analysisSessionId,
        message: prompt,
      });
    }

    const light = await postDataScienceBackend<LightAnalysisResponse>("/api/analysis/light", {
      session_id: analysisSessionId,
      user_question: prompt,
      data_source_id: dataSourceId,
      table_name: tableName,
    });

    const methods = light.profile?.candidate_methods ?? [];
    const warnings = light.profile?.warnings ?? [];
    const lines = [
      `Light analysis complete for ${light.profile?.table_name || tableName || dataSourceId}.`,
      "",
      "Candidate analysis paths:",
      ...(methods.length ? methods.slice(0, 4).map((method) => `- ${method.type}: ${method.reason}`) : ["- descriptive_analysis: Start by profiling the data shape."]),
    ];

    if (warnings.length) {
      lines.push("", "Data quality warnings:", ...warnings.slice(0, 4).map((warning) => `- ${warning}`));
    }

    let deepStatus: RunStatusResponse | undefined;
    let deepRun: AnalysisRun | undefined;
    if (wantsDeepAnalysis(prompt, body.run_deep)) {
      const deep = await postDataScienceBackend<DeepAnalysisResponse>("/api/analysis/deep", {
        session_id: analysisSessionId,
        user_question: prompt,
        constraints: {
          max_runtime_minutes: 15,
          privacy_mode: "registered_dataset_only",
        },
      });
      deepRun = deep.run;
      deepStatus = await pollDeepRun(deep.run.id);
      lines.push("", "Deep analysis:", formatDeepSummary(deepStatus));
    }

    const artifacts = [...(light.artifacts ?? []), ...(deepStatus?.artifacts ?? [])];
    if (artifacts.length) {
      lines.push("", "Artifacts saved:", ...artifacts.slice(0, 6).map(artifactLine));
    }

    return NextResponse.json({
      ok: true,
      message: lines.join("\n"),
      analysis_session_id: analysisSessionId,
      data_source_id: dataSourceId,
      table_name: tableName || light.dataset?.table_name || light.profile?.table_name,
      light_run_id: light.run.id,
      deep_run_id: deepRun?.id,
      deep_status: deepStatus?.run.status ?? deepRun?.status,
      artifacts: artifacts.map(artifactSummary),
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
    console.error("Virtual data scientist chat bridge failed:", error);
    return NextResponse.json({ error: "Virtual data scientist chat bridge failed." }, { status: 500 });
  }
}
