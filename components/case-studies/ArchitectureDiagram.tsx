/** Inline architecture diagrams — avoids img/SVG contrast issues on dark pages. */

export type ArchitectureDiagramKey =
  | "ai-coding-spillover"
  | "mcp-query-governance"
  | "tableau-knowledge-platform"
  | "tableau-quicksight-migration";

interface ArchitectureDiagramProps {
  diagram: ArchitectureDiagramKey;
  title: string;
}

const panel = "#1e3a5f";
const box = "#0f2744";
const stroke = "#22d3ee";
const text = "#e2e8f0";
const muted = "#94a3b8";

export default function ArchitectureDiagram({ diagram, title }: ArchitectureDiagramProps) {
  return (
    <figure
      className="w-full min-h-[280px] rounded-xl border border-cyan-500/25 bg-slate-900/90 p-4 md:p-6 shadow-inner shadow-cyan-500/5"
      aria-label={`${title} architecture diagram`}
    >
      <svg
        viewBox="0 0 720 280"
        width={720}
        height={280}
        className="w-full h-auto max-h-[420px] mx-auto block"
        role="img"
      >
        <title>{title} architecture</title>
        {diagram === "ai-coding-spillover" && <AiCodingSpilloverDiagram />}
        {diagram === "mcp-query-governance" && <McpGovernanceDiagram />}
        {diagram === "tableau-knowledge-platform" && <TableauKnowledgeDiagram />}
        {diagram === "tableau-quicksight-migration" && <TableauMigrationDiagram />}
      </svg>
    </figure>
  );
}

function AiCodingSpilloverDiagram() {
  const boxes = ["Panel Data", "K-Means", "SMOTE Match", "DiD + CI"];
  const xs = [84, 228, 372, 516];
  return (
    <>
      <text x={360} y={28} textAnchor="middle" fill="#a78bfa" fontSize={14} fontWeight={600}>
        Causal Analytics Pipeline (Synthetic Demo)
      </text>
      {boxes.map((label, i) => (
        <g key={label}>
          {i > 0 && (
            <path
              d={`M${xs[i - 1] + 60} 72 H${xs[i] - 60}`}
              stroke={muted}
              strokeWidth={2}
              fill="none"
            />
          )}
          <rect
            x={xs[i] - 60}
            y={48}
            width={120}
            height={48}
            rx={8}
            fill={i === 3 ? "#5b21b6" : box}
            stroke={i === 3 ? "#a78bfa" : stroke}
            strokeWidth={1.5}
          />
          <text x={xs[i]} y={78} textAnchor="middle" fill={i === 3 ? "#fff" : text} fontSize={11}>
            {label}
          </text>
        </g>
      ))}
      <path d="M576 72 H600" stroke={muted} strokeWidth={2} />
      <rect x={600} y={48} width={96} height={48} rx={8} fill="#064e3b" stroke="#34d399" strokeWidth={1.5} />
      <text x={648} y={70} textAnchor="middle" fill="#6ee7b7" fontSize={11} fontWeight={600}>
        5.84%
      </text>
      <text x={648} y={86} textAnchor="middle" fill={muted} fontSize={9}>
        Lift
      </text>
      <rect x={120} y={128} width={480} height={88} rx={10} fill={panel} stroke="#475569" />
      <text x={360} y={152} textAnchor="middle" fill={muted} fontSize={11}>
        Robustness: Event Study • Bootstrap 10k • Placebo Date
      </text>
      <text x={360} y={248} textAnchor="middle" fill={muted} fontSize={10}>
        Python • pandas • statsmodels • scikit-learn
      </text>
    </>
  );
}

function McpGovernanceDiagram() {
  return (
    <>
      <text x={360} y={28} textAnchor="middle" fill="#fbbf24" fontSize={14} fontWeight={600}>
        MCP Query Governance (MVP → AWS)
      </text>
      <text x={200} y={52} textAnchor="middle" fill={stroke} fontSize={11}>
        Part 2 — Governed Path
      </text>
      <text x={540} y={52} textAnchor="middle" fill="#fb923c" fontSize={11}>
        Part 1 — Sentinel
      </text>
      {[
        { x: 90, label: "MCP / API" },
        { x: 220, label: "Catalog" },
        { x: 350, label: "RLS + Audit", accent: true },
      ].map(({ x, label, accent }) => (
        <g key={label}>
          <rect
            x={x - 50}
            y={64}
            width={100}
            height={44}
            rx={8}
            fill={box}
            stroke={accent ? "#34d399" : stroke}
          />
          <text x={x} y={92} textAnchor="middle" fill={accent ? "#6ee7b7" : text} fontSize={10}>
            {label}
          </text>
        </g>
      ))}
      <rect x={420} y={64} width={100} height={44} rx={8} fill={box} stroke="#fb923c" />
      <text x={470} y={92} textAnchor="middle" fill={text} fontSize={10}>
        Query Logs
      </text>
      <rect x={550} y={64} width={130} height={44} rx={8} fill="#431407" stroke="#f97316" />
      <text x={615} y={92} textAnchor="middle" fill="#fdba74" fontSize={10}>
        Feature Agg
      </text>
      <path d="M615 108 V128" stroke={muted} strokeWidth={2} />
      <rect x={550} y={128} width={130} height={44} rx={8} fill="#431407" stroke="#f97316" />
      <text x={615} y={156} textAnchor="middle" fill="#fff" fontSize={10} fontWeight={600}>
        IsolationForest
      </text>
      <path d="M615 172 V192" stroke={muted} strokeWidth={2} />
      <rect x={550} y={192} width={130} height={44} rx={8} fill={box} stroke="#fbbf24" />
      <text x={615} y={220} textAnchor="middle" fill="#fde68a" fontSize={10}>
        Notify Only
      </text>
      <rect x={40} y={128} width={280} height={100} rx={10} fill={panel} stroke="#475569" />
      <text x={180} y={156} textAnchor="middle" fill={muted} fontSize={11}>
        Production: RDS • Lambda • API GW • EventBridge
      </text>
      <text x={180} y={200} textAnchor="middle" fill={text} fontSize={10}>
        Local MVP: SQLite + stdout alerts
      </text>
      <text x={360} y={268} textAnchor="middle" fill={muted} fontSize={10}>
        2/2 abusers detected • 0 false positives
      </text>
    </>
  );
}

function TableauKnowledgeDiagram() {
  const steps = ["TWB Parse", "metadata.json", "Bedrock", "Validator", "S3 Docs", "MCP"];
  const xs = [72, 192, 324, 456, 568, 664];
  return (
    <>
      <text x={360} y={28} textAnchor="middle" fill="#34d399" fontSize={14} fontWeight={600}>
        Tableau Workbook Knowledge Platform
      </text>
      {steps.map((label, i) => (
        <g key={label}>
          {i > 0 && (
            <path d={`M${xs[i - 1] + 48} 76 H${xs[i] - 48}`} stroke={muted} strokeWidth={2} />
          )}
          <rect
            x={xs[i] - 48}
            y={52}
            width={96}
            height={48}
            rx={8}
            fill={i === 2 ? "#064e3b" : box}
            stroke={i === 2 ? "#34d399" : stroke}
          />
          <text x={xs[i]} y={82} textAnchor="middle" fill={i === 2 ? "#6ee7b7" : text} fontSize={9}>
            {label}
          </text>
        </g>
      ))}
      <rect x={120} y={128} width={480} height={72} rx={10} fill={panel} stroke="#475569" />
      <text x={360} y={152} textAnchor="middle" fill={stroke} fontSize={11}>
        AWS CDK: API Gateway → Lambda → Bedrock → Secrets Manager
      </text>
      <text x={360} y={248} textAnchor="middle" fill={muted} fontSize={10}>
        Local mock: no AWS credentials • 4/4 validation passed
      </text>
    </>
  );
}

function TableauMigrationDiagram() {
  const steps = ["Metadata", "Mappers", "GenAI", "Package", "Validator", "PASS"];
  const xs = [82, 206, 330, 454, 578, 680];
  return (
    <>
      <text x={360} y={28} textAnchor="middle" fill="#38bdf8" fontSize={14} fontWeight={600}>
        Tableau → QuickSight Migration Assistant
      </text>
      {steps.map((label, i) => (
        <g key={label}>
          {i > 0 && (
            <path d={`M${xs[i - 1] + 50} 76 H${xs[i] - 50}`} stroke={muted} strokeWidth={2} />
          )}
          <rect
            x={xs[i] - 50}
            y={52}
            width={100}
            height={48}
            rx={8}
            fill={i === 5 ? "#14532d" : i === 2 ? panel : box}
            stroke={i === 5 ? "#4ade80" : stroke}
          />
          <text
            x={xs[i]}
            y={82}
            textAnchor="middle"
            fill={i === 5 ? "#86efac" : text}
            fontSize={10}
          >
            {label}
          </text>
        </g>
      ))}
      <rect x={80} y={120} width={560} height={56} rx={10} fill={panel} stroke="#475569" />
      <text x={360} y={152} textAnchor="middle" fill={muted} fontSize={11}>
        5 checks: Structural • Datasource • Calculation • Parity 1% • Visual
      </text>
      <rect x={200} y={196} width={320} height={40} rx={8} fill={box} stroke="#38bdf8" />
      <text x={360} y={222} textAnchor="middle" fill="#bae6fd" fontSize={11}>
        deploy.py — dry-run API plan (default)
      </text>
    </>
  );
}
