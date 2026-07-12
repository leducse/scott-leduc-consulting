"use client";

import {
  Activity,
  AlertTriangle,
  ArrowDownUp,
  Bot,
  CheckCheck,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileText,
  Filter,
  Flag,
  Gauge,
  Layers3,
  MessageSquare,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import {
  RISK_CASES,
  RISK_OPTIONS,
  SEVERITY_OPTIONS,
  SOURCE_OPTIONS,
  type GateStatus,
  type RiskCase,
  type RiskCategory,
  type Severity,
  type SourceKey,
} from "@/lib/recallgraph-workbench-data";

type SourceFilter = SourceKey | "all";
type RiskFilter = RiskCategory | "all";
type SeverityFilter = Severity | "all";
type DetailTab = "brief" | "evidence" | "trace" | "eval";

interface Filters {
  source: SourceFilter;
  risk: RiskFilter;
  severity: SeverityFilter;
  search: string;
}

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  actions?: string[];
}

const severityRank: Record<Severity, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

const severityStyles: Record<Severity, string> = {
  critical: "border-rose-400/50 bg-rose-500/15 text-rose-100",
  high: "border-amber-400/50 bg-amber-500/15 text-amber-100",
  medium: "border-sky-400/50 bg-sky-500/15 text-sky-100",
  low: "border-emerald-400/50 bg-emerald-500/15 text-emerald-100",
};

const gateStyles: Record<GateStatus, string> = {
  pass: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
  watch: "border-amber-400/40 bg-amber-500/10 text-amber-100",
  fail: "border-rose-400/40 bg-rose-500/10 text-rose-100",
};

const tabs: Array<{ id: DetailTab; label: string; icon: LucideIcon }> = [
  { id: "brief", label: "Brief", icon: FileText },
  { id: "evidence", label: "Evidence", icon: Database },
  { id: "trace", label: "Trace", icon: Layers3 },
  { id: "eval", label: "Eval", icon: ClipboardCheck },
];

const suggestedPrompts = [
  "Show high severity fire risks",
  "Why is this case high risk?",
  "Show allergen cases from openFDA",
  "Which eval gates need review?",
];

function filterCases(cases: RiskCase[], filters: Filters) {
  const query = filters.search.trim().toLowerCase();
  return cases.filter((item) => {
    const matchesSource = filters.source === "all" || item.source === filters.source;
    const matchesRisk = filters.risk === "all" || item.riskCategory === filters.risk;
    const matchesSeverity =
      filters.severity === "all" || severityRank[item.severity] >= severityRank[filters.severity];
    const searchable = [
      item.title,
      item.organization,
      item.product,
      item.category,
      item.summary,
      item.hazards.join(" "),
      item.sourceLabel,
    ]
      .join(" ")
      .toLowerCase();

    return matchesSource && matchesRisk && matchesSeverity && (!query || searchable.includes(query));
  });
}

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

function statusIcon(status: GateStatus) {
  if (status === "pass") return <CheckCircle2 className="h-4 w-4" />;
  if (status === "watch") return <AlertTriangle className="h-4 w-4" />;
  return <Flag className="h-4 w-4" />;
}

function buildBrief(caseItem: RiskCase) {
  return `${caseItem.product}: ${caseItem.summary} Recommended next step: ${caseItem.recommendedActions[0]}`;
}

function nextId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export default function RecallGraphWorkbench() {
  const [filters, setFilters] = useState<Filters>({
    source: "all",
    risk: "all",
    severity: "all",
    search: "",
  });
  const [selectedCaseId, setSelectedCaseId] = useState(RISK_CASES[0].id);
  const [activeTab, setActiveTab] = useState<DetailTab>("brief");
  const [chatInput, setChatInput] = useState("");
  const [reviewNote, setReviewNote] = useState("Awaiting analyst action");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Risk queue loaded. I can filter records, explain a selected case, switch evidence views, and draft cited review language from the fixture corpus.",
      actions: ["loaded 4 source-shaped records", "ready for review"],
    },
  ]);

  const filteredCases = useMemo(() => filterCases(RISK_CASES, filters), [filters]);
  const selectedCase = filteredCases.find((item) => item.id === selectedCaseId) ?? filteredCases[0] ?? null;

  const metrics = useMemo(() => {
    const highPriority = RISK_CASES.filter((item) => severityRank[item.severity] >= severityRank.high).length;
    const avgConfidence =
      RISK_CASES.reduce((total, item) => total + item.confidence, 0) / Math.max(RISK_CASES.length, 1);
    const passCount = RISK_CASES.filter((item) => item.gates.every((gate) => gate.status !== "fail")).length;
    return {
      highPriority,
      avgConfidence,
      passCount,
      sourceCount: new Set(RISK_CASES.map((item) => item.source)).size,
    };
  }, []);

  function updateFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function resetFilters() {
    setFilters({ source: "all", risk: "all", severity: "all", search: "" });
    setSelectedCaseId(RISK_CASES[0].id);
    setActiveTab("brief");
  }

  function applyChatPrompt(prompt: string) {
    const lower = prompt.toLowerCase();
    const currentCase = selectedCase ?? RISK_CASES[0];
    const nextFilters: Filters = { ...filters };
    const actions: string[] = [];
    let response = "";
    let nextTab: DetailTab | null = null;
    let forceSelectedId: string | null = null;

    if (lower.includes("reset") || lower.includes("clear")) {
      nextFilters.source = "all";
      nextFilters.risk = "all";
      nextFilters.severity = "all";
      nextFilters.search = "";
      forceSelectedId = RISK_CASES[0].id;
      nextTab = "brief";
      actions.push("cleared filters", "selected first risk case");
      response = "Filters cleared. The queue is back to the full fixture corpus.";
    } else {
      if (lower.includes("fire") || lower.includes("burn") || lower.includes("battery")) {
        nextFilters.risk = "fire";
        nextFilters.severity = "high";
        actions.push("risk = fire / burn", "minimum severity = high");
      }
      if (lower.includes("allergen") || lower.includes("peanut") || lower.includes("food")) {
        nextFilters.risk = "allergen";
        nextFilters.source = "openfda_food";
        nextFilters.severity = "critical";
        actions.push("risk = allergen", "source = openFDA food", "minimum severity = critical");
      }
      if (lower.includes("device") || lower.includes("infusion") || lower.includes("therapy")) {
        nextFilters.risk = "medical_device";
        nextFilters.source = "openfda_device";
        nextFilters.severity = "high";
        actions.push("risk = medical device", "source = openFDA device", "minimum severity = high");
      }
      if (lower.includes("vehicle") || lower.includes("nhtsa") || lower.includes("camera") || lower.includes("crash")) {
        nextFilters.risk = "vehicle";
        nextFilters.source = "nhtsa";
        nextFilters.severity = "medium";
        actions.push("risk = vehicle safety", "source = NHTSA", "minimum severity = medium");
      }
      if (lower.includes("cpsc")) {
        nextFilters.source = "cpsc";
        actions.push("source = CPSC");
      }
      if (lower.includes("high severity") || lower.includes("high-risk") || lower.includes("priority")) {
        nextFilters.severity = "high";
        actions.push("minimum severity = high");
      }
      if (lower.includes("evidence") || lower.includes("citation") || lower.includes("why")) {
        nextTab = "evidence";
        actions.push("opened evidence");
        response = `${currentCase.product} is supported by ${currentCase.evidence.length} cited evidence chunks. Highest match: ${currentCase.evidence[0].text}`;
      }
      if (lower.includes("trace") || lower.includes("agent")) {
        nextTab = "trace";
        actions.push("opened agent trace");
        response = `${currentCase.trace.length} workflow steps are visible: planner, retrieval, verifier, risk scorer, and report writer.`;
      }
      if (lower.includes("eval") || lower.includes("faithfulness") || lower.includes("gate")) {
        nextTab = "eval";
        actions.push("opened eval gates");
        const watchCount = currentCase.gates.filter((gate) => gate.status === "watch").length;
        response = `${currentCase.product} has ${watchCount} watch gate${watchCount === 1 ? "" : "s"} and no failed gates in the public fixture demo.`;
      }
      if (lower.includes("brief") || lower.includes("export") || lower.includes("legal")) {
        nextTab = "brief";
        actions.push("drafted review brief");
        response = buildBrief(currentCase);
      }

      const filtered = filterCases(RISK_CASES, nextFilters);
      if (actions.length === 0) {
        nextFilters.search = prompt;
        actions.push("keyword search applied");
        const searched = filterCases(RISK_CASES, nextFilters);
        response = `${searched.length} case${searched.length === 1 ? "" : "s"} matched the search phrase.`;
        if (searched[0]) {
          forceSelectedId = searched[0].id;
        }
      } else if (filtered[0] && !nextTab) {
        forceSelectedId = filtered[0].id;
        response = `${filtered.length} case${filtered.length === 1 ? "" : "s"} matched. I selected ${filtered[0].product}.`;
      } else if (!response) {
        response = `${filtered.length} case${filtered.length === 1 ? "" : "s"} matched the requested filters.`;
      }
    }

    setFilters(nextFilters);
    if (forceSelectedId) {
      setSelectedCaseId(forceSelectedId);
    } else {
      const nextCases = filterCases(RISK_CASES, nextFilters);
      if (nextCases[0] && !nextCases.some((item) => item.id === selectedCaseId)) {
        setSelectedCaseId(nextCases[0].id);
      }
    }
    if (nextTab) {
      setActiveTab(nextTab);
    }

    const uniqueActions = Array.from(new Set(actions));

    setMessages((current) => [
      ...current,
      { id: nextId(), role: "user", content: prompt },
      { id: nextId(), role: "assistant", content: response, actions: uniqueActions },
    ]);
  }

  function submitChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = chatInput.trim();
    if (!prompt) return;
    setChatInput("");
    applyChatPrompt(prompt);
  }

  function handleReviewAction(action: "approve" | "flag" | "export") {
    if (!selectedCase) return;
    const nextNote =
      action === "approve"
        ? `Approved for monitored review: ${selectedCase.product}`
        : action === "flag"
          ? `Flagged for evidence review: ${selectedCase.product}`
          : `Draft export prepared: ${selectedCase.product}`;
    setReviewNote(nextNote);
    setMessages((current) => [
      ...current,
      {
        id: nextId(),
        role: "assistant",
        content: nextNote,
        actions: [action === "export" ? "brief export simulated" : "review state updated"],
      },
    ]);
  }

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <section className="border-b border-white/10 bg-[#07111f] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              RecallGraph Analyst Workbench
            </p>
            <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Product-safety risk review
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
              Fixture-backed public demo for the RecallGraph AI system: source contracts, RAG,
              agent traces, eval gates, and analyst review actions in one surface.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:min-w-[560px]">
            <MetricTile icon={AlertTriangle} label="Priority" value={String(metrics.highPriority)} detail="high+" />
            <MetricTile icon={ShieldCheck} label="Sources" value={`${metrics.sourceCount}/4`} detail="covered" />
            <MetricTile icon={Gauge} label="Confidence" value={formatPercent(metrics.avgConfidence)} detail="mean" />
            <MetricTile icon={ClipboardCheck} label="Gates" value={`${metrics.passCount}/4`} detail="no fails" />
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[360px_minmax(0,1fr)_380px] lg:px-8">
        <aside className="space-y-4">
          <section className="rounded-lg border border-white/10 bg-[#0c1726] p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                <Filter className="h-4 w-4 text-cyan-300" />
                Filters
              </h2>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-semibold text-slate-200 transition-colors hover:border-cyan-400/50 hover:text-cyan-100"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <SelectControl
                label="Source"
                value={filters.source}
                onChange={(value) => updateFilter("source", value as SourceFilter)}
                options={SOURCE_OPTIONS}
              />
              <SelectControl
                label="Risk"
                value={filters.risk}
                onChange={(value) => updateFilter("risk", value as RiskFilter)}
                options={RISK_OPTIONS}
              />
              <SelectControl
                label="Minimum severity"
                value={filters.severity}
                onChange={(value) => updateFilter("severity", value as SeverityFilter)}
                options={SEVERITY_OPTIONS}
              />
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Search
                </span>
                <div className="flex items-center rounded-lg border border-white/10 bg-[#08111d] px-3 focus-within:border-cyan-400/50">
                  <Search className="h-4 w-4 text-slate-500" />
                  <input
                    value={filters.search}
                    onChange={(event) => updateFilter("search", event.target.value)}
                    className="min-h-10 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-slate-500"
                    placeholder="supplier, hazard, product"
                  />
                </div>
              </label>
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-[#0c1726] p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-white">Risk Queue</h2>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-100">
                {filteredCases.length} shown
              </span>
            </div>
            <div className="mt-3 space-y-2">
              {filteredCases.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedCaseId(item.id);
                    setActiveTab("brief");
                  }}
                  className={`block w-full rounded-lg border p-3 text-left transition-colors ${
                    selectedCase?.id === item.id
                      ? "border-cyan-400/60 bg-cyan-500/15"
                      : "border-white/10 bg-[#08111d] hover:border-cyan-400/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{item.product}</p>
                      <p className="mt-1 truncate text-xs text-slate-400">{item.organization}</p>
                    </div>
                    <SeverityBadge severity={item.severity} />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <SmallPill>{item.sourceLabel}</SmallPill>
                    <SmallPill>{item.status}</SmallPill>
                    <SmallPill>{formatPercent(item.confidence)}</SmallPill>
                  </div>
                </button>
              ))}
              {filteredCases.length === 0 && (
                <div className="rounded-lg border border-dashed border-white/15 bg-[#08111d] p-5 text-sm text-slate-400">
                  No cases match the current filters.
                </div>
              )}
            </div>
          </section>
        </aside>

        <section className="min-w-0 rounded-lg border border-white/10 bg-[#0c1726]">
          {selectedCase ? (
            <>
              <div className="border-b border-white/10 p-5">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <SeverityBadge severity={selectedCase.severity} />
                      <SmallPill>{selectedCase.sourceLabel}</SmallPill>
                      <SmallPill>{selectedCase.eventDate}</SmallPill>
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold leading-tight text-white">
                      {selectedCase.product}
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">{selectedCase.title}</p>
                  </div>
                  <div className="grid min-w-[220px] grid-cols-2 gap-2 text-sm">
                    <Kpi label="Confidence" value={formatPercent(selectedCase.confidence)} />
                    <Kpi label="Evidence" value={String(selectedCase.evidence.length)} />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedCase.hazards.map((hazard) => (
                    <span
                      key={hazard}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-200"
                    >
                      {hazard}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-b border-white/10 px-3 pt-3">
                <div className="flex gap-1 overflow-x-auto">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`inline-flex min-h-10 items-center gap-2 rounded-t-lg border px-3 text-sm font-semibold transition-colors ${
                          activeTab === tab.id
                            ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-100"
                            : "border-transparent text-slate-400 hover:text-slate-100"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-5">
                {activeTab === "brief" && <BriefPanel caseItem={selectedCase} />}
                {activeTab === "evidence" && <EvidencePanel caseItem={selectedCase} />}
                {activeTab === "trace" && <TracePanel caseItem={selectedCase} />}
                {activeTab === "eval" && <EvalPanel caseItem={selectedCase} />}

                <div className="mt-5 rounded-lg border border-white/10 bg-[#08111d] p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Review state</h3>
                      <p className="mt-1 text-sm text-slate-400">{reviewNote}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <ActionButton onClick={() => handleReviewAction("approve")} icon={CheckCheck}>
                        Approve
                      </ActionButton>
                      <ActionButton onClick={() => handleReviewAction("flag")} icon={Flag}>
                        Flag
                      </ActionButton>
                      <ActionButton onClick={() => handleReviewAction("export")} icon={FileText}>
                        Export
                      </ActionButton>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-slate-400">Select a matching case to inspect evidence.</div>
          )}
        </section>

        <aside className="rounded-lg border border-white/10 bg-[#0c1726] lg:sticky lg:top-20 lg:self-start">
          <div className="border-b border-white/10 p-4">
            <h2 className="flex items-center gap-2 text-base font-semibold text-white">
              <Bot className="h-4 w-4 text-cyan-300" />
              Dashboard Copilot
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Controlled natural-language actions over the visible fixture corpus.
            </p>
          </div>
          <div className="max-h-[520px] space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-lg border p-3 ${
                  message.role === "user"
                    ? "border-cyan-400/30 bg-cyan-500/10"
                    : "border-white/10 bg-[#08111d]"
                }`}
              >
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {message.role === "user" ? <MessageSquare className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  {message.role}
                </div>
                <p className="text-sm leading-relaxed text-slate-100">{message.content}</p>
                {message.actions && message.actions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {message.actions.map((action) => (
                      <SmallPill key={action}>{action}</SmallPill>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 p-4">
            <div className="mb-3 grid gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => applyChatPrompt(prompt)}
                  className="inline-flex min-h-9 items-center justify-between gap-2 rounded-lg border border-white/10 bg-[#08111d] px-3 text-left text-xs font-semibold text-slate-200 transition-colors hover:border-cyan-400/40 hover:text-cyan-100"
                >
                  {prompt}
                  <ArrowDownUp className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
                </button>
              ))}
            </div>
            <form onSubmit={submitChat} className="flex gap-2">
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                className="min-h-11 min-w-0 flex-1 rounded-lg border border-white/10 bg-[#08111d] px-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50"
                placeholder="Ask about risks, evidence, evals"
              />
              <button
                type="submit"
                className="inline-flex min-h-11 w-11 items-center justify-center rounded-lg bg-cyan-400 text-[#07111f] transition-colors hover:bg-cyan-300"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </aside>
      </main>
    </div>
  );
}

function MetricTile({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#0c1726] p-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        <Icon className="h-4 w-4 text-cyan-300" />
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-xl font-bold text-white">{value}</span>
        <span className="text-xs text-slate-400">{detail}</span>
      </div>
    </div>
  );
}

function SelectControl({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-10 w-full rounded-lg border border-white/10 bg-[#08111d] px-3 text-sm text-white outline-none focus:border-cyan-400/50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${severityStyles[severity]}`}>
      {severity}
    </span>
  );
}

function SmallPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-slate-300">
      {children}
    </span>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#08111d] p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-white">{value}</p>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  children,
  onClick,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-400/50 hover:text-cyan-100"
    >
      <Icon className="h-4 w-4 text-cyan-300" />
      {children}
    </button>
  );
}

function BriefPanel({ caseItem }: { caseItem: RiskCase }) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-cyan-400/20 bg-cyan-500/10 p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-cyan-100">
          <FileText className="h-4 w-4" />
          Cited Risk Brief
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-100">{caseItem.summary}</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-[#08111d] p-4">
          <h3 className="text-sm font-semibold text-white">Remedy</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{caseItem.remedy}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#08111d] p-4">
          <h3 className="text-sm font-semibold text-white">Distribution</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{caseItem.distribution}</p>
        </div>
      </div>
      <div className="rounded-lg border border-white/10 bg-[#08111d] p-4">
        <h3 className="text-sm font-semibold text-white">Recommended Actions</h3>
        <ul className="mt-3 space-y-2">
          {caseItem.recommendedActions.map((action) => (
            <li key={action} className="flex gap-2 text-sm leading-relaxed text-slate-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              <span>{action}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EvidencePanel({ caseItem }: { caseItem: RiskCase }) {
  return (
    <div className="space-y-3">
      {caseItem.evidence.map((evidence) => (
        <article key={evidence.id} className="rounded-lg border border-white/10 bg-[#08111d] p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <SmallPill>{evidence.sourceLabel}</SmallPill>
                <SmallPill>{evidence.date}</SmallPill>
              </div>
              <h3 className="mt-3 text-base font-semibold text-white">{evidence.title}</h3>
            </div>
            <div className="min-w-[150px]">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Score</span>
                <span>{formatPercent(evidence.score)}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-cyan-300" style={{ width: `${evidence.score * 100}%` }} />
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{evidence.text}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {evidence.matchedTerms.map((term) => (
              <SmallPill key={term}>{term}</SmallPill>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function TracePanel({ caseItem }: { caseItem: RiskCase }) {
  return (
    <div className="space-y-3">
      {caseItem.trace.map((step, index) => (
        <article key={`${step.agent}-${index}`} className="rounded-lg border border-white/10 bg-[#08111d] p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
              <Activity className="h-4 w-4 text-cyan-300" />
              {index + 1}. {step.agent}
            </h3>
            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${gateStyles[step.status]}`}>
              {statusIcon(step.status)}
              {step.status}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{step.decision}</p>
          {step.evidenceIds.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {step.evidenceIds.map((evidenceId) => (
                <SmallPill key={evidenceId}>{evidenceId}</SmallPill>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function EvalPanel({ caseItem }: { caseItem: RiskCase }) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Retrieval" value="1.0" />
        <Kpi label="Unsupported Terms" value="0" />
        <Kpi label="Latency Budget" value="<1ms" />
      </div>
      {caseItem.gates.map((gate) => (
        <article key={gate.name} className="rounded-lg border border-white/10 bg-[#08111d] p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-sm font-semibold text-white">{gate.name}</h3>
            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${gateStyles[gate.status]}`}>
              {statusIcon(gate.status)}
              {gate.metric}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{gate.detail}</p>
        </article>
      ))}
    </div>
  );
}
