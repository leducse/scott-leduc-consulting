"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Bot,
  Brain,
  CheckCircle2,
  Database,
  Eye,
  FileCode2,
  FileText,
  History,
  Loader2,
  Plus,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  Table2,
  Upload,
  User,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

interface ActiveDataset {
  dataSourceId: string;
  tableName?: string;
  label: string;
  rowCount?: number;
  columns?: string[];
}

interface ArtifactMetadata {
  id: string;
  run_id?: string;
  artifact_type: string;
  title: string;
  summary?: string;
  content_type?: string;
  created_at?: string;
}

interface ArtifactDetail extends ArtifactMetadata {
  content?: unknown;
  content_truncated?: boolean;
}

interface ChatBridgeResponse {
  message: string;
  analysis_session_id?: string;
  data_source_id?: string;
  table_name?: string;
  row_count?: number;
  columns?: string[];
  artifacts?: ArtifactMetadata[];
}

interface UploadBridgeResponse {
  data_source_id: string;
  table_name: string;
  row_count: number;
  columns: string[];
}

interface SessionHistoryItem {
  id: string;
  title: string;
  data_source_id: string;
  table_name?: string;
  dataset_label?: string;
  row_count?: number;
  column_count?: number;
  updated_at?: string;
  run_count: number;
  artifact_count: number;
  recent_artifacts?: ArtifactMetadata[];
  latest_run?: {
    run_type?: string;
    status?: string;
    selected_analysis_type?: string;
  };
}

interface SessionDetailMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  related_run_id?: string | null;
  created_at?: string;
}

interface SessionDetailResponse {
  session?: {
    id: string;
    title?: string;
    data_source_id?: string;
    table_name?: string;
  };
  dataset?: {
    display_name?: string;
    data_source_id?: string;
    table_name?: string;
    row_count?: number;
    column_count?: number;
  } | null;
  artifacts?: ArtifactMetadata[];
  messages?: SessionDetailMessage[];
}

interface StoredChatState {
  agentCoreSessionId: string;
  analysisSessionId: string | null;
  activeDataset: ActiveDataset;
  messages: Message[];
  artifacts: ArtifactMetadata[];
}

const STORAGE_KEY = "decision-layer-vds-chat-state-v1";
const MIN_AGENTCORE_SESSION_ID_LENGTH = 33;

function createAgentCoreSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `vds-${Date.now()}-${Math.random().toString(36).slice(2, 14)}-${Math.random()
    .toString(36)
    .slice(2, 14)}`;
}

const deepAnalysisTokens = [
  "deep",
  "model",
  "forecast",
  "predict",
  "cluster",
  "segment",
  "anomaly",
  "outlier",
  "driver",
  "why",
];

const starterPrompts = [
  "I uploaded customer churn data. What analysis should I run first?",
  "Look at my sales table and tell me if forecasting is appropriate.",
  "Can you run light analysis, then queue a deeper model-selection pass?",
];

const featureCards: Array<{ title: string; copy: string; icon: LucideIcon }> = [
  {
    title: "MCP facade",
    copy: "Tool contract for sessions, light runs, deep runs, artifacts",
    icon: Database,
  },
  {
    title: "AgentCore lane",
    copy: "Async runtime for heavier code execution and memory",
    icon: Brain,
  },
  {
    title: "Reproducibility",
    copy: "Generated code and context bundle stay attached",
    icon: FileCode2,
  },
  {
    title: "Guardrails",
    copy: "Registered datasets only; no arbitrary credentials",
    icon: ShieldCheck,
  },
];

function formatContent(content: string) {
  return content.split(/\n+/).map((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("- ")) {
      return (
        <div key={index} className="flex gap-2 text-sm text-slate-300">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
          <span>{trimmed.slice(2)}</span>
        </div>
      );
    }
    return (
      <p key={index} className="text-sm leading-relaxed text-slate-200">
        {trimmed}
      </p>
    );
  });
}

function shouldRunDeep(text: string) {
  const normalized = text.toLowerCase();
  return deepAnalysisTokens.some((token) => normalized.includes(token));
}

function artifactPreviewText(artifact: ArtifactDetail) {
  if (typeof artifact.content === "string") return artifact.content;
  if (artifact.content === null || typeof artifact.content === "undefined") {
    return artifact.summary || "No artifact preview is available.";
  }
  try {
    return JSON.stringify(artifact.content, null, 2);
  } catch {
    return "Artifact content could not be displayed.";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function formatLabel(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function scalarText(value: unknown) {
  if (value === null || typeof value === "undefined") return "None";
  if (typeof value === "number") return Number.isInteger(value) ? String(value) : value.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function listText(value: unknown) {
  if (!Array.isArray(value)) return scalarText(value);
  if (!value.length) return "None";
  if (value.every((item) => !isRecord(item) && !Array.isArray(item))) {
    return value.map(scalarText).join(", ");
  }
  return `${value.length} records`;
}

function isDeepReportContent(value: unknown): value is Record<string, unknown> {
  return (
    isRecord(value) &&
    ("primary_method" in value || "quality_gates" in value || "baseline_diagnostics" in value)
  );
}

function ReportField({ label, value }: { label: string; value: unknown }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-200">{listText(value)}</p>
    </div>
  );
}

function QualityGateList({ gates }: { gates: unknown }) {
  if (!Array.isArray(gates) || !gates.length) return null;

  return (
    <div className="border-t border-white/10 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Quality Gates</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {gates.filter(isRecord).map((gate, index) => (
          <div key={`${gate.name || "gate"}-${index}`} className="border-l border-white/10 pl-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-100">{formatLabel(String(gate.name || "Gate"))}</p>
              <span className="rounded-md border border-white/10 px-2 py-0.5 text-[11px] font-semibold uppercase text-slate-300">
                {scalarText(gate.status)}
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{scalarText(gate.detail)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiagnosticRows({ rows }: { rows: unknown[] }) {
  return (
    <div className="mt-2 space-y-2">
      {rows.slice(0, 6).map((row, index) => {
        if (!isRecord(row)) {
          return (
            <p key={index} className="text-xs text-slate-300">
              {scalarText(row)}
            </p>
          );
        }
        return (
          <div key={index} className="border-l border-white/10 pl-3 text-xs leading-relaxed text-slate-300">
            {Object.entries(row)
              .filter(([, value]) => !isRecord(value) && !Array.isArray(value))
              .slice(0, 6)
              .map(([key, value]) => (
                <span key={key} className="mr-3 inline-block">
                  <span className="text-slate-500">{formatLabel(key)}:</span> {scalarText(value)}
                </span>
              ))}
          </div>
        );
      })}
    </div>
  );
}

function DiagnosticValue({ value }: { value: unknown }) {
  if (Array.isArray(value)) {
    return value.length ? <DiagnosticRows rows={value} /> : <p className="mt-1 text-xs text-slate-500">None</p>;
  }

  if (isRecord(value)) {
    return (
      <div className="mt-2 space-y-2">
        {Object.entries(value)
          .filter(([, child]) => typeof child !== "undefined" && child !== null)
          .map(([key, child]) => (
            <div key={key} className="border-l border-white/10 pl-3">
              <p className="text-xs font-semibold text-slate-200">{formatLabel(key)}</p>
              {isRecord(child) || Array.isArray(child) ? (
                <DiagnosticValue value={child} />
              ) : (
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{scalarText(child)}</p>
              )}
            </div>
          ))}
      </div>
    );
  }

  return <p className="mt-1 text-xs leading-relaxed text-slate-400">{scalarText(value)}</p>;
}

function BaselineDiagnostics({ diagnostics }: { diagnostics: unknown }) {
  if (!isRecord(diagnostics)) return null;
  const entries = Object.entries(diagnostics).filter(([key]) => !["method_type", "table_name"].includes(key));
  if (!entries.length) return null;

  return (
    <div className="border-t border-white/10 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Baseline Diagnostics</p>
      <div className="mt-3 space-y-3">
        {entries.map(([key, value]) => (
          <section key={key}>
            <p className="text-sm font-semibold text-slate-100">{formatLabel(key)}</p>
            <DiagnosticValue value={value} />
          </section>
        ))}
      </div>
    </div>
  );
}

function DeepReportPreview({ report }: { report: Record<string, unknown> }) {
  const primary = isRecord(report.primary_method) ? report.primary_method : {};
  const usefulness = isRecord(report.ml_usefulness) ? report.ml_usefulness : {};
  const summary = report.summary;
  const usefulnessReason = usefulness.reason;

  return (
    <div>
      <div className="grid gap-4 px-4 py-3 sm:grid-cols-2">
        <ReportField label="Status" value={report.status} />
        <ReportField label="Generated" value={report.generated_at} />
        <ReportField label="Recommended Method" value={primary.label || primary.type} />
        <ReportField label="ML Usefulness" value={usefulness.decision} />
      </div>
      {summary !== null && typeof summary !== "undefined" && (
        <p className="border-t border-white/10 px-4 py-3 text-sm leading-relaxed text-slate-200">
          {scalarText(summary)}
        </p>
      )}
      <div className="border-t border-white/10 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Method Rationale</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <ReportField label="Why This Fits" value={primary.reason || primary.when_to_use} />
          <ReportField label="Baseline" value={primary.baseline} />
          <ReportField label="Validation" value={primary.validation} />
          <ReportField label="Pitfalls" value={primary.pitfalls} />
        </div>
        {usefulnessReason !== null && typeof usefulnessReason !== "undefined" && (
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{scalarText(usefulnessReason)}</p>
        )}
      </div>
      <QualityGateList gates={report.quality_gates} />
      <BaselineDiagnostics diagnostics={report.baseline_diagnostics} />
    </div>
  );
}

export default function VirtualDataScientistChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "I can profile a dataset, choose the right analysis technique, preserve the code used, and hand deeper work to AgentCore. Use the demo warehouse or upload a CSV for a persisted analysis session.",
    },
  ]);
  const [input, setInput] = useState(starterPrompts[0]);
  const [connectionState, setConnectionState] = useState<"idle" | "connecting" | "online" | "local" | "setup">(
    "idle"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isRestored, setIsRestored] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingSessionDetail, setIsLoadingSessionDetail] = useState(false);
  const [analysisSessionId, setAnalysisSessionId] = useState<string | null>(null);
  const [sessionHistory, setSessionHistory] = useState<SessionHistoryItem[]>([]);
  const [artifacts, setArtifacts] = useState<ArtifactMetadata[]>([]);
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactDetail | null>(null);
  const [isLoadingArtifact, setIsLoadingArtifact] = useState(false);
  const [artifactError, setArtifactError] = useState<string | null>(null);
  const [activeDataset, setActiveDataset] = useState<ActiveDataset>({
    dataSourceId: "demo_warehouse",
    tableName: "orders",
    label: "Demo warehouse / orders",
  });
  const [agentCoreSessionId, setAgentCoreSessionId] = useState("");
  const sessionId = agentCoreSessionId || "Starting session...";
  const wsRef = useRef<WebSocket | null>(null);
  const currentResponseRef = useRef("");
  const messageScrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let nextAgentCoreSessionId = createAgentCoreSessionId();
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as Partial<StoredChatState>;
        if (
          typeof stored.agentCoreSessionId === "string" &&
          stored.agentCoreSessionId.length >= MIN_AGENTCORE_SESSION_ID_LENGTH
        ) {
          nextAgentCoreSessionId = stored.agentCoreSessionId;
        }
        if (stored.analysisSessionId) setAnalysisSessionId(stored.analysisSessionId);
        if (stored.activeDataset?.dataSourceId && stored.activeDataset.label) {
          setActiveDataset(stored.activeDataset);
        }
        if (Array.isArray(stored.messages) && stored.messages.length) {
          setMessages(stored.messages.slice(-40));
        }
        if (Array.isArray(stored.artifacts) && stored.artifacts.length) {
          setArtifacts(stored.artifacts.slice(0, 18));
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setAgentCoreSessionId(nextAgentCoreSessionId);
      setIsRestored(true);
    }
  }, []);

  useEffect(() => {
    if (!isRestored || !agentCoreSessionId) return;
    const payload: StoredChatState = {
      agentCoreSessionId,
      analysisSessionId,
      activeDataset,
      messages: messages.slice(-40),
      artifacts: artifacts.slice(0, 18),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [activeDataset, agentCoreSessionId, analysisSessionId, artifacts, isRestored, messages]);

  useEffect(() => {
    const container = messageScrollRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const loadSessionHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const response = await fetch("/api/apps/virtual-data-scientist/sessions", {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Session history is not available.");
      }
      setSessionHistory(Array.isArray(payload.sessions) ? payload.sessions : []);
      if (payload.sessions?.length) {
        setConnectionState((current) => (current === "online" ? current : "local"));
      }
    } catch {
      setSessionHistory([]);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    loadSessionHistory();
  }, [loadSessionHistory]);

  const mergeArtifacts = useCallback((items?: ArtifactMetadata[]) => {
    if (!Array.isArray(items) || !items.length) return;

    setArtifacts((current) => {
      const seen = new Set<string>();
      const merged: ArtifactMetadata[] = [];
      for (const artifact of [...items, ...current]) {
        if (!artifact?.id || seen.has(artifact.id)) continue;
        seen.add(artifact.id);
        merged.push(artifact);
      }
      return merged.slice(0, 18);
    });
  }, []);

  const applyAnalysisState = useCallback(
    (
      result: {
        analysis_session_id?: string;
        data_source_id?: string;
        table_name?: string;
        row_count?: number;
        columns?: string[];
        artifacts?: ArtifactMetadata[];
      },
      state: "online" | "local"
    ) => {
      setConnectionState(state);
      if (result.analysis_session_id) setAnalysisSessionId(result.analysis_session_id);
      mergeArtifacts(result.artifacts);
      if (result.data_source_id || result.table_name) {
        setActiveDataset((current) => ({
          ...current,
          dataSourceId: result.data_source_id || current.dataSourceId,
          tableName: result.table_name || current.tableName,
          rowCount: typeof result.row_count === "number" ? result.row_count : current.rowCount,
          columns: result.columns || current.columns,
          label: `${result.data_source_id || current.dataSourceId} / ${result.table_name || current.tableName || "schema"}`,
        }));
      }
    },
    [mergeArtifacts]
  );

  const connect = useCallback(async (runtimeSessionId: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN || connectionState === "connecting") return true;
    setConnectionState("connecting");
    try {
      const response = await fetch(
        `/api/apps/virtual-data-scientist/ws-url?session_id=${encodeURIComponent(runtimeSessionId)}`
      );
      const payload = await response.json();
      if (!response.ok || !payload.websocket_url) {
        setConnectionState("setup");
        return false;
      }

      const ws = new WebSocket(payload.websocket_url);
      wsRef.current = ws;
      let hasOpened = false;
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "chunk") {
            currentResponseRef.current += data.content ?? data.text ?? "";
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.id === "streaming") {
                return [...prev.slice(0, -1), { ...last, content: currentResponseRef.current }];
              }
              return prev;
            });
          } else if (data.type === "done" || data.type === "end") {
            setIsLoading(false);
            applyAnalysisState(data, "online");
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.id === "streaming") {
                return [...prev.slice(0, -1), { ...last, id: `assistant-${Date.now()}` }];
              }
              return prev;
            });
            currentResponseRef.current = "";
            loadSessionHistory();
          } else if (data.type === "error") {
            setIsLoading(false);
            currentResponseRef.current = "";
            setMessages((prev) => [
              ...prev.filter((message) => message.id !== "streaming"),
              {
                id: `error-${Date.now()}`,
                role: "assistant",
                content: data.content || data.message || "The data scientist agent returned an error.",
              },
            ]);
          }
        } catch {
          currentResponseRef.current += String(event.data || "");
        }
      };
      ws.onclose = () => {
        setConnectionState(hasOpened ? "idle" : "setup");
        setIsLoading(false);
      };
      return await new Promise<boolean>((resolve) => {
        let settled = false;
        const settle = (connected: boolean) => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timeout);
          resolve(connected);
        };
        const timeout = window.setTimeout(() => {
          if (ws.readyState !== WebSocket.OPEN) {
            ws.close();
            setConnectionState("setup");
            settle(false);
          }
        }, 10_000);
        ws.onopen = () => {
          hasOpened = true;
          setConnectionState("online");
          settle(true);
        };
        ws.onerror = () => {
          setConnectionState("setup");
          settle(false);
        };
      });
    } catch {
      setConnectionState("setup");
      return false;
    }
  }, [applyAnalysisState, connectionState, loadSessionHistory]);

  const setupResponse = (prompt: string, detail?: string) =>
    [
      detail || "The native chat shell is ready, but the AgentCore runtime or data-science backend is not reachable yet.",
      "",
      "Cloud setup:",
      "- set DATA_SCIENTIST_AGENTCORE_RUNTIME_ARN to the deployed Virtual Data Scientist runtime",
      "- set DATA_SCIENCE_MCP_BASE_URL to the deployed Lambda Function URL for session and artifact panels",
      "- set DATA_SCIENCE_MCP_AUTH_MODE=aws_iam so the website backend signs those calls",
      "",
      "Local dev fallback:",
      "- start the BI app with python3 server.py",
      "- use DATA_SCIENCE_MCP_BASE_URL=http://127.0.0.1:8765",
      "",
      `Your prompt was preserved locally in this browser session: ${prompt}`,
    ].join("\n");

  const sendLocalMessage = async (text: string) => {
    const response = await fetch("/api/apps/virtual-data-scientist/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        prompt: text,
        analysis_session_id: analysisSessionId,
        data_source_id: activeDataset.dataSourceId,
        table_name: activeDataset.tableName,
      }),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "The local data-science bridge returned an error.");
    }

    const result = payload as ChatBridgeResponse;
    applyAnalysisState(result, "local");
    loadSessionHistory();
    return result.message;
  };

  const sendMessage = async (override?: string) => {
    const text = (override ?? input).trim();
    if (!text || isLoading) return;
    const runtimeSessionId = agentCoreSessionId || createAgentCoreSessionId();
    if (!agentCoreSessionId) setAgentCoreSessionId(runtimeSessionId);
    setMessages((prev) => [...prev, { id: `user-${Date.now()}`, role: "user", content: text }]);
    setInput("");
    setIsLoading(true);

    const connected = await connect(runtimeSessionId);
    if (connected && wsRef.current?.readyState === WebSocket.OPEN) {
      currentResponseRef.current = "";
      setMessages((prev) => [...prev, { id: "streaming", role: "assistant", content: "" }]);
      wsRef.current.send(
        JSON.stringify({
          prompt: text,
          session_id: runtimeSessionId,
          analysis_session_id: analysisSessionId,
          data_source_id: activeDataset.dataSourceId,
          table_name: activeDataset.tableName,
          run_deep: shouldRunDeep(text),
          app_id: "virtual-data-scientist",
          desired_tools: ["run_light_analysis", "request_deep_analysis", "get_analysis_status"],
        })
      );
      return;
    }

    try {
      const message = await sendLocalMessage(text);
      setMessages((prev) => [...prev, { id: `assistant-${Date.now()}`, role: "assistant", content: message }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: setupResponse(text, error instanceof Error ? error.message : undefined),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const openArtifact = async (artifact: ArtifactMetadata) => {
    setIsLoadingArtifact(true);
    setArtifactError(null);
    try {
      const response = await fetch(
        `/api/apps/virtual-data-scientist/artifacts/${encodeURIComponent(artifact.id)}`,
        {
          headers: { Accept: "application/json" },
          cache: "no-store",
        }
      );
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Artifact is not available.");
      }
      const detail = payload.artifact as ArtifactDetail;
      setSelectedArtifact(detail);
      mergeArtifacts([detail]);
      setConnectionState("local");
    } catch (error) {
      setArtifactError(error instanceof Error ? error.message : "Artifact is not available.");
    } finally {
      setIsLoadingArtifact(false);
    }
  };

  const applySessionSummary = useCallback((session: SessionHistoryItem) => {
    setAnalysisSessionId(session.id);
    setActiveDataset({
      dataSourceId: session.data_source_id || "demo_warehouse",
      tableName: session.table_name,
      label: session.dataset_label || `${session.data_source_id || "demo_warehouse"} / ${session.table_name || "schema"}`,
      rowCount: session.row_count,
    });
    setConnectionState("local");
  }, []);

  const sessionDetailMessages = (session: SessionHistoryItem, messages?: SessionDetailMessage[]) => {
    const restored = (messages ?? [])
      .filter((message) => message.content?.trim())
      .map<Message>((message, index) => ({
        id: message.id || `session-${session.id}-${index}`,
        role: message.role,
        content: message.content,
      }));

    if (restored.length) return restored;

    return [
      {
        id: `resume-${Date.now()}`,
        role: "assistant" as const,
        content: [
          `Resumed analysis session ${session.id}.`,
          "",
          `- dataset: ${session.dataset_label || session.table_name || session.data_source_id}`,
          `- runs: ${session.run_count}`,
          `- artifacts: ${session.artifact_count}`,
        ].join("\n"),
      },
    ];
  };

  const handleCsvUpload = async (file?: File) => {
    if (!file || isUploading) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/apps/virtual-data-scientist/upload", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "CSV upload failed.");
      }
      const result = payload as UploadBridgeResponse;
      setActiveDataset({
        dataSourceId: result.data_source_id,
        tableName: result.table_name,
        rowCount: result.row_count,
        columns: result.columns,
        label: `${file.name} / ${result.table_name}`,
      });
      setConnectionState("local");
      setAnalysisSessionId(null);
      setArtifacts([]);
      setSelectedArtifact(null);
      setArtifactError(null);
      setMessages((prev) => [
        ...prev,
        {
          id: `upload-${Date.now()}`,
          role: "assistant",
          content: [
            `Dataset loaded: ${file.name}`,
            "",
            `- data source: ${result.data_source_id}`,
            `- table: ${result.table_name}`,
            `- rows: ${result.row_count}`,
            `- columns: ${result.columns.slice(0, 8).join(", ")}`,
          ].join("\n"),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `upload-error-${Date.now()}`,
          role: "assistant",
          content: error instanceof Error ? error.message : "CSV upload failed.",
        },
      ]);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const startNewSession = () => {
    setAnalysisSessionId(null);
    setArtifacts([]);
    setSelectedArtifact(null);
    setArtifactError(null);
    setActiveDataset({
      dataSourceId: "demo_warehouse",
      tableName: "orders",
      label: "Demo warehouse / orders",
    });
    setMessages([
      {
        id: `new-${Date.now()}`,
        role: "assistant",
        content:
          "Started a new chat context. The next message will create a fresh backend analysis session.",
      },
    ]);
  };

  const resumeSession = async (session: SessionHistoryItem) => {
    applySessionSummary(session);
    setSelectedArtifact(null);
    setArtifactError(null);
    mergeArtifacts(session.recent_artifacts);
    setIsLoadingSessionDetail(true);

    try {
      const response = await fetch(`/api/apps/virtual-data-scientist/sessions/${encodeURIComponent(session.id)}`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Session detail is not available.");
      }

      const detail = payload as SessionDetailResponse;
      if (detail.session?.id) {
        setAnalysisSessionId(detail.session.id);
      }
      if (detail.dataset || detail.session) {
        const dataset = detail.dataset;
        setActiveDataset({
          dataSourceId: dataset?.data_source_id || detail.session?.data_source_id || session.data_source_id || "demo_warehouse",
          tableName: dataset?.table_name || detail.session?.table_name || session.table_name,
          rowCount: dataset?.row_count ?? session.row_count,
          label:
            dataset?.display_name ||
            `${dataset?.data_source_id || detail.session?.data_source_id || session.data_source_id || "demo_warehouse"} / ${
              dataset?.table_name || detail.session?.table_name || session.table_name || "schema"
            }`,
        });
      }
      setArtifacts([]);
      mergeArtifacts(detail.artifacts);
      setMessages(sessionDetailMessages(session, detail.messages));
      setConnectionState("local");
    } catch (error) {
      setMessages(sessionDetailMessages(session));
      setArtifactError(error instanceof Error ? error.message : "Session detail is not available.");
    } finally {
      setIsLoadingSessionDetail(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 bg-[#07111f] lg:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="border-b border-white/10 bg-[#0a1628] p-5 lg:border-b-0 lg:border-r">
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">Decision Layer Apps</p>
            <h1 className="mt-3 text-2xl font-bold text-white">Virtual Data Scientist</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              A native LLM chat interface for the data-science MCP. Start with fast profiling,
              then hand off deeper analysis to AgentCore.
            </p>
          </div>

          <div className="grid gap-3">
            {featureCards.map(({ title, copy, icon: Icon }) => (
              <div key={title} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 text-cyan-400" />
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{copy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 p-3 text-xs leading-relaxed text-cyan-100">
            Public status:{" "}
            <span className="font-semibold">
              {connectionState === "online"
                ? "Connected"
                : connectionState === "local"
                  ? "Backend connected"
                : connectionState === "connecting"
                  ? "Connecting"
                  : connectionState === "setup"
                    ? "Runtime setup required"
                    : "Ready"}
            </span>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-start gap-3">
              <Table2 className="mt-0.5 h-4 w-4 text-cyan-400" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-100">Dataset</p>
                <p className="mt-1 truncate text-xs text-slate-400">{activeDataset.label}</p>
                {typeof activeDataset.rowCount === "number" && (
                  <p className="mt-1 text-xs text-slate-500">
                    {activeDataset.rowCount} rows
                    {activeDataset.columns?.length ? `, ${activeDataset.columns.length} columns` : ""}
                  </p>
                )}
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(event) => handleCsvUpload(event.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-cyan-400/50 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
              Upload CSV
            </button>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-cyan-400" />
                <p className="text-sm font-semibold text-slate-100">Sessions</p>
              </div>
              <button
                type="button"
                onClick={loadSessionHistory}
                disabled={isLoadingHistory || isLoadingSessionDetail}
                className="grid h-7 w-7 place-items-center rounded-md border border-white/10 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Refresh sessions"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isLoadingHistory ? "animate-spin" : ""}`} />
              </button>
            </div>
            <button
              type="button"
              onClick={startNewSession}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-cyan-400/50 hover:text-cyan-200"
            >
              <Plus className="h-3.5 w-3.5" />
              New Session
            </button>
            <div className="mt-3 max-h-52 space-y-2 overflow-y-auto pr-1">
              {sessionHistory.length ? (
                sessionHistory.map((session) => (
                  <button
                    key={session.id}
                    type="button"
                    onClick={() => resumeSession(session)}
                    disabled={isLoadingSessionDetail}
                    className={`w-full rounded-lg border px-3 py-2 text-left transition-colors ${
                      session.id === analysisSessionId
                        ? "border-cyan-400/50 bg-cyan-500/10"
                        : "border-white/10 bg-[#07111f] hover:border-cyan-400/40"
                    } disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    <p className="truncate text-xs font-semibold text-slate-100">{session.title}</p>
                    <p className="mt-1 truncate text-[11px] text-slate-400">
                      {session.table_name || session.data_source_id} · {session.run_count} runs ·{" "}
                      {session.artifact_count} artifacts
                    </p>
                    {session.latest_run?.selected_analysis_type && (
                      <p className="mt-1 truncate text-[11px] text-cyan-300">
                        {session.latest_run.selected_analysis_type}
                      </p>
                    )}
                  </button>
                ))
              ) : (
                <p className="rounded-lg border border-white/10 bg-[#07111f] px-3 py-2 text-xs leading-relaxed text-slate-500">
                  {isLoadingHistory ? "Loading sessions..." : "No backend sessions loaded yet."}
                </p>
              )}
            </div>
            {isLoadingSessionDetail && (
              <p className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Loading session memory
              </p>
            )}
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-cyan-400" />
              <p className="text-sm font-semibold text-slate-100">Artifacts</p>
              <span className="ml-auto text-[11px] text-slate-500">{artifacts.length}</span>
            </div>
            {artifactError && (
              <p className="mt-3 rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs leading-relaxed text-amber-100">
                {artifactError}
              </p>
            )}
            <div className="mt-3 max-h-52 space-y-2 overflow-y-auto pr-1">
              {artifacts.length ? (
                artifacts.map((artifact) => (
                  <button
                    key={artifact.id}
                    type="button"
                    onClick={() => openArtifact(artifact)}
                    className={`w-full rounded-lg border px-3 py-2 text-left transition-colors ${
                      selectedArtifact?.id === artifact.id
                        ? "border-cyan-400/50 bg-cyan-500/10"
                        : "border-white/10 bg-[#07111f] hover:border-cyan-400/40"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <Eye className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-slate-100">{artifact.title}</p>
                        <p className="mt-1 truncate text-[11px] text-slate-400">{artifact.artifact_type}</p>
                        {artifact.summary && (
                          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-500">
                            {artifact.summary}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <p className="rounded-lg border border-white/10 bg-[#07111f] px-3 py-2 text-xs leading-relaxed text-slate-500">
                  Run an analysis or resume a session to load saved reports and code.
                </p>
              )}
            </div>
            {isLoadingArtifact && (
              <p className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Loading artifact
              </p>
            )}
          </div>
        </div>
      </aside>

      <section className="flex min-h-0 flex-col">
        <div className="border-b border-white/10 bg-[#0a1628]/70 px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-500 text-[#07111f]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Native MCP Chat</p>
                <p className="text-xs text-slate-400">
                  {analysisSessionId ? `Analysis ${analysisSessionId}` : `Browser ${sessionId}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300">
              {connectionState === "online" ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              ) : connectionState === "local" ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              ) : connectionState === "connecting" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400" />
              ) : (
                <Activity className="h-3.5 w-3.5 text-amber-400" />
              )}
              {connectionState === "online"
                ? "AgentCore online"
                : connectionState === "local"
                  ? "Backend connected"
                  : "Local shell"}
            </div>
          </div>
        </div>

        {selectedArtifact && (
          <div className="border-b border-white/10 bg-[#081a2e] px-4 py-4 sm:px-6">
            <div className="mx-auto max-w-4xl rounded-lg border border-white/10 bg-[#07111f]">
              <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{selectedArtifact.title}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {selectedArtifact.artifact_type}
                    {selectedArtifact.content_type ? ` · ${selectedArtifact.content_type}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedArtifact(null)}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-white/10 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-200"
                  aria-label="Close artifact preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {selectedArtifact.summary && (
                <p className="border-b border-white/10 px-4 py-3 text-sm leading-relaxed text-slate-300">
                  {selectedArtifact.summary}
                </p>
              )}
              {isDeepReportContent(selectedArtifact.content) ? (
                <DeepReportPreview report={selectedArtifact.content} />
              ) : (
                <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words px-4 py-3 text-xs leading-relaxed text-slate-200">
                  {artifactPreviewText(selectedArtifact)}
                </pre>
              )}
              {selectedArtifact.content_truncated && (
                <p className="border-t border-white/10 px-4 py-2 text-xs text-amber-200">
                  Preview truncated by the website bridge.
                </p>
              )}
            </div>
          </div>
        )}

        <div ref={messageScrollRef} className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          <div className="mx-auto flex max-w-4xl flex-col gap-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role !== "user" && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan-500 text-[#07111f]">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[820px] rounded-xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-cyan-500 text-[#07111f]"
                      : "border border-white/10 bg-[#0f2744] text-slate-100"
                  }`}
                >
                  {message.content ? (
                    message.role === "user" ? (
                      <p className="text-sm font-medium leading-relaxed text-[#07111f]">{message.content}</p>
                    ) : (
                      <div className="space-y-2">{formatContent(message.content)}</div>
                    )
                  ) : (
                    <span className="flex items-center gap-2 text-sm text-slate-300">
                      <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
                    </span>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan-500/20 text-cyan-300">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#0a1628] p-4">
          <div className="mx-auto max-w-4xl space-y-3">
            <div className="flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                rows={3}
                className="min-h-[76px] flex-1 resize-none rounded-lg border border-white/10 bg-[#07111f] px-4 py-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400/50"
                placeholder="Ask what analysis technique fits your dataset..."
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="grid h-[76px] w-14 place-items-center rounded-lg bg-cyan-500 text-[#07111f] transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
