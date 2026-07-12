export type SourceKey = "cpsc" | "openfda_food" | "openfda_device" | "nhtsa";
export type RiskCategory = "fire" | "allergen" | "medical_device" | "vehicle";
export type Severity = "critical" | "high" | "medium" | "low";
export type GateStatus = "pass" | "watch" | "fail";

export interface EvidenceItem {
  id: string;
  source: SourceKey;
  sourceLabel: string;
  title: string;
  date: string;
  score: number;
  matchedTerms: string[];
  text: string;
  url: string;
}

export interface TraceStep {
  agent: string;
  status: GateStatus;
  decision: string;
  evidenceIds: string[];
}

export interface EvalGate {
  name: string;
  status: GateStatus;
  metric: string;
  detail: string;
}

export interface RiskCase {
  id: string;
  source: SourceKey;
  sourceLabel: string;
  title: string;
  organization: string;
  product: string;
  category: string;
  riskCategory: RiskCategory;
  severity: Severity;
  confidence: number;
  eventDate: string;
  status: "Review ready" | "Monitor" | "Needs follow-up";
  hazards: string[];
  summary: string;
  remedy: string;
  distribution: string;
  recommendedActions: string[];
  evidence: EvidenceItem[];
  trace: TraceStep[];
  gates: EvalGate[];
}

export const SOURCE_OPTIONS: Array<{ value: SourceKey | "all"; label: string }> = [
  { value: "all", label: "All sources" },
  { value: "cpsc", label: "CPSC" },
  { value: "openfda_food", label: "openFDA food" },
  { value: "openfda_device", label: "openFDA device" },
  { value: "nhtsa", label: "NHTSA" },
];

export const RISK_OPTIONS: Array<{ value: RiskCategory | "all"; label: string }> = [
  { value: "all", label: "All risks" },
  { value: "fire", label: "Fire / burn" },
  { value: "allergen", label: "Allergen" },
  { value: "medical_device", label: "Medical device" },
  { value: "vehicle", label: "Vehicle safety" },
];

export const SEVERITY_OPTIONS: Array<{ value: Severity | "all"; label: string }> = [
  { value: "all", label: "Any severity" },
  { value: "critical", label: "Critical only" },
  { value: "high", label: "High or above" },
  { value: "medium", label: "Medium or above" },
  { value: "low", label: "Low or above" },
];

export const RISK_CASES: RiskCase[] = [
  {
    id: "cpsc-demo-power-bank",
    source: "cpsc",
    sourceLabel: "CPSC",
    title: "DemoPower Portable Power Banks Recalled Due to Fire and Burn Hazards",
    organization: "DemoPower Electronics",
    product: "DemoPower 10000 Portable Power Bank",
    category: "Consumer electronics",
    riskCategory: "fire",
    severity: "high",
    confidence: 0.74,
    eventDate: "2025-10-08",
    status: "Review ready",
    hazards: ["fire", "burn", "overheat", "minor injury"],
    summary:
      "The strongest matched risk is a portable power bank recall with overheating, smoke, melting, and burn-injury language. The evidence supports a high-severity fire and burn brief with a stop-use remedy.",
    remedy:
      "Consumers should stop using the product, unplug it from charging equipment, and contact the firm for a refund or replacement.",
    distribution: "Sold online and through national retailers in the United States.",
    recommendedActions: [
      "Route to retail safety operations for stop-sale confirmation.",
      "Ask supplier management for affected lot identifiers.",
      "Keep this case in weekly fire-risk monitoring until remedy completion is confirmed.",
    ],
    evidence: [
      {
        id: "cpsc-demo-power-bank-summary",
        source: "cpsc",
        sourceLabel: "CPSC",
        title: "DemoPower portable power bank recall summary",
        date: "2025-10-08",
        score: 0.93,
        matchedTerms: ["fire", "burn", "overheat", "smoke"],
        text:
          "The lithium-ion battery in the portable power bank can overheat, posing fire and burn hazards to consumers. Incident reports mention smoke, melting, and minor burn injuries.",
        url: "https://example.local/cpsc/demo-power",
      },
      {
        id: "cpsc-demo-power-bank-remedy",
        source: "cpsc",
        sourceLabel: "CPSC",
        title: "DemoPower remedy and distribution",
        date: "2025-10-08",
        score: 0.81,
        matchedTerms: ["stop using", "refund", "national retailers"],
        text:
          "Consumers should stop using the product, unplug it from charging equipment, and contact the firm for a refund or replacement. The product was sold online and through national retailers.",
        url: "https://example.local/cpsc/demo-power",
      },
    ],
    trace: [
      {
        agent: "planner",
        status: "pass",
        decision: "Identified fire, burn, overheating, and injury dimensions for retrieval.",
        evidenceIds: [],
      },
      {
        agent: "retrieval_agent",
        status: "pass",
        decision: "Selected two CPSC chunks with direct hazard and remedy evidence.",
        evidenceIds: ["cpsc-demo-power-bank-summary", "cpsc-demo-power-bank-remedy"],
      },
      {
        agent: "evidence_verifier",
        status: "pass",
        decision: "Kept only cited claims supported by recall text.",
        evidenceIds: ["cpsc-demo-power-bank-summary"],
      },
      {
        agent: "risk_scorer",
        status: "watch",
        decision: "Scored high severity because fire, burn, and injury language are present.",
        evidenceIds: ["cpsc-demo-power-bank-summary"],
      },
      {
        agent: "report_writer",
        status: "pass",
        decision: "Generated a concise brief with source-linked citations and next actions.",
        evidenceIds: ["cpsc-demo-power-bank-summary", "cpsc-demo-power-bank-remedy"],
      },
    ],
    gates: [
      {
        name: "Retrieval quality",
        status: "pass",
        metric: "recall@k 1.0",
        detail: "Expected CPSC record appears in the top retrieved evidence set.",
      },
      {
        name: "Citation faithfulness",
        status: "pass",
        metric: "0 unsupported terms",
        detail: "Fire, burn, smoke, and remedy claims are grounded in cited chunks.",
      },
      {
        name: "Human review",
        status: "watch",
        metric: "legal review advised",
        detail: "The public demo can recommend review, but cannot issue external safety instructions.",
      },
    ],
  },
  {
    id: "openfda-granola-allergen",
    source: "openfda_food",
    sourceLabel: "openFDA food",
    title: "Granola Recalled Because of Undeclared Peanuts",
    organization: "North Valley Foods",
    product: "Crunchy Trails Maple Granola",
    category: "Food allergen",
    riskCategory: "allergen",
    severity: "critical",
    confidence: 0.82,
    eventDate: "2025-09-12",
    status: "Review ready",
    hazards: ["undeclared peanuts", "allergen", "Class I", "life-threatening reaction"],
    summary:
      "The record carries a Class I allergen signal because undeclared peanuts create serious or life-threatening risk for sensitive consumers. The strongest action is immediate retail removal and consumer-return guidance.",
    remedy:
      "Retailers should remove affected lots from sale and consumers should return the product for a refund.",
    distribution: "Distributed to grocery retailers in multiple states.",
    recommendedActions: [
      "Prioritize retailer notification and lot removal.",
      "Cross-check private-label relationships for shared manufacturing exposure.",
      "Prepare a consumer-facing FAQ if the product appears in loyalty or ecommerce data.",
    ],
    evidence: [
      {
        id: "openfda-granola-hazard",
        source: "openfda_food",
        sourceLabel: "openFDA food",
        title: "North Valley Foods allergen recall",
        date: "2025-09-12",
        score: 0.95,
        matchedTerms: ["undeclared peanuts", "allergy", "life-threatening"],
        text:
          "The product contains undeclared peanuts. People with a peanut allergy or severe sensitivity risk serious or life-threatening allergic reaction if they consume the product.",
        url: "https://example.local/openfda/granola",
      },
      {
        id: "openfda-granola-remedy",
        source: "openfda_food",
        sourceLabel: "openFDA food",
        title: "Granola recall remedy",
        date: "2025-09-12",
        score: 0.84,
        matchedTerms: ["retailers", "remove", "refund"],
        text:
          "Retailers should remove affected lots from sale and consumers should return the product for a refund. The product was distributed to grocery retailers in multiple states.",
        url: "https://example.local/openfda/granola",
      },
    ],
    trace: [
      {
        agent: "planner",
        status: "pass",
        decision: "Mapped allergen, Class I, and consumer sensitivity terms into the query plan.",
        evidenceIds: [],
      },
      {
        agent: "retrieval_agent",
        status: "pass",
        decision: "Retrieved hazard and remedy chunks from the openFDA-shaped food fixture.",
        evidenceIds: ["openfda-granola-hazard", "openfda-granola-remedy"],
      },
      {
        agent: "evidence_verifier",
        status: "pass",
        decision: "Confirmed all critical-risk terms are present in cited source text.",
        evidenceIds: ["openfda-granola-hazard"],
      },
      {
        agent: "risk_scorer",
        status: "pass",
        decision: "Assigned critical severity for undeclared peanut and life-threatening reaction language.",
        evidenceIds: ["openfda-granola-hazard"],
      },
      {
        agent: "report_writer",
        status: "pass",
        decision: "Generated a Class I risk brief with removal and return guidance.",
        evidenceIds: ["openfda-granola-hazard", "openfda-granola-remedy"],
      },
    ],
    gates: [
      {
        name: "Retrieval quality",
        status: "pass",
        metric: "MRR 1.0",
        detail: "The expected food enforcement record is ranked first for allergen queries.",
      },
      {
        name: "Citation faithfulness",
        status: "pass",
        metric: "0 unlinked source mentions",
        detail: "The Class I and peanut-allergy claims are directly cited.",
      },
      {
        name: "Source freshness",
        status: "watch",
        metric: "fixture mode",
        detail: "The hosted demo uses cached public-source-shaped fixtures, not live FDA polling.",
      },
    ],
  },
  {
    id: "openfda-infusion-pump",
    source: "openfda_device",
    sourceLabel: "openFDA device",
    title: "Infusion Pump Battery Failure Field Correction",
    organization: "CardioFlow Medical",
    product: "CardioFlow Home Infusion Pump",
    category: "Medical device",
    riskCategory: "medical_device",
    severity: "high",
    confidence: 0.68,
    eventDate: "2025-08-22",
    status: "Needs follow-up",
    hazards: ["battery failure", "therapy interruption", "Class II"],
    summary:
      "The device recall describes early battery failure that can interrupt home therapy. The system recommends provider follow-up because the risk depends on patient dependency and backup therapy readiness.",
    remedy:
      "Inspect battery age, replace affected battery packs, and confirm patients have backup therapy guidance.",
    distribution: "Distributed to home-care providers and specialty pharmacies.",
    recommendedActions: [
      "Send to clinical operations for patient-dependency triage.",
      "Confirm battery replacement inventory and notification completion.",
      "Escalate if complaints mention therapy interruption or hospitalization.",
    ],
    evidence: [
      {
        id: "openfda-device-battery",
        source: "openfda_device",
        sourceLabel: "openFDA device",
        title: "CardioFlow battery correction",
        date: "2025-08-22",
        score: 0.88,
        matchedTerms: ["battery failure", "therapy interruption", "patient notification"],
        text:
          "The rechargeable battery can fail earlier than expected, causing therapy interruption. The firm issued a field correction and patient notification.",
        url: "https://example.local/openfda/infusion-pump",
      },
      {
        id: "openfda-device-remedy",
        source: "openfda_device",
        sourceLabel: "openFDA device",
        title: "CardioFlow provider remedy",
        date: "2025-08-22",
        score: 0.76,
        matchedTerms: ["replace", "backup therapy", "home-care providers"],
        text:
          "Inspect battery age, replace affected battery packs, and confirm patients have backup therapy guidance. The product was distributed to home-care providers and specialty pharmacies.",
        url: "https://example.local/openfda/infusion-pump",
      },
    ],
    trace: [
      {
        agent: "planner",
        status: "pass",
        decision: "Focused retrieval on battery failure, therapy interruption, and provider notification.",
        evidenceIds: [],
      },
      {
        agent: "retrieval_agent",
        status: "pass",
        decision: "Retrieved device hazard and provider remedy chunks.",
        evidenceIds: ["openfda-device-battery", "openfda-device-remedy"],
      },
      {
        agent: "evidence_verifier",
        status: "pass",
        decision: "Verified that the therapy-interruption claim is source-supported.",
        evidenceIds: ["openfda-device-battery"],
      },
      {
        agent: "risk_scorer",
        status: "watch",
        decision: "Marked high severity with follow-up because patient impact depends on therapy context.",
        evidenceIds: ["openfda-device-battery"],
      },
      {
        agent: "report_writer",
        status: "pass",
        decision: "Generated a brief emphasizing replacement and backup therapy checks.",
        evidenceIds: ["openfda-device-battery", "openfda-device-remedy"],
      },
    ],
    gates: [
      {
        name: "Retrieval quality",
        status: "pass",
        metric: "top-k hit",
        detail: "Device correction evidence is returned for battery and therapy-interruption queries.",
      },
      {
        name: "Citation faithfulness",
        status: "pass",
        metric: "supported",
        detail: "The interruption and replacement claims are cited to source-shaped device records.",
      },
      {
        name: "Operational readiness",
        status: "watch",
        metric: "human triage",
        detail: "Production deployment would need patient-impact enrichment before automated priority routing.",
      },
    ],
  },
  {
    id: "nhtsa-rearview-camera",
    source: "nhtsa",
    sourceLabel: "NHTSA",
    title: "Rearview Camera Display May Fail",
    organization: "Example Motors",
    product: "2025 Example Motors Atlas",
    category: "Vehicle safety",
    riskCategory: "vehicle",
    severity: "medium",
    confidence: 0.61,
    eventDate: "2025-07-18",
    status: "Monitor",
    hazards: ["display failure", "reduced visibility", "crash risk"],
    summary:
      "The vehicle safety record describes intermittent rearview camera display failure while reversing. The evidence supports a medium-severity crash-risk brief and dealer software remedy.",
    remedy: "Dealers will update the camera control software at no charge.",
    distribution: "Affected vehicles sold through franchised dealers.",
    recommendedActions: [
      "Monitor complaint trend for post-remedy recurrence.",
      "Ask fleet operations to identify affected vehicle inventory.",
      "Pair this case with future NHTSA complaint backfills.",
    ],
    evidence: [
      {
        id: "nhtsa-camera-failure",
        source: "nhtsa",
        sourceLabel: "NHTSA",
        title: "Rearview camera failure recall",
        date: "2025-07-18",
        score: 0.86,
        matchedTerms: ["camera display", "reverse", "crash risk"],
        text:
          "The rearview camera display can intermittently fail when the vehicle is shifted into reverse, reducing driver visibility and increasing crash risk.",
        url: "https://example.local/nhtsa/rearview-camera",
      },
      {
        id: "nhtsa-camera-remedy",
        source: "nhtsa",
        sourceLabel: "NHTSA",
        title: "Rearview camera software remedy",
        date: "2025-07-18",
        score: 0.74,
        matchedTerms: ["dealer", "software", "no charge"],
        text:
          "Dealers will update the camera control software at no charge. Affected vehicles were sold through franchised dealers.",
        url: "https://example.local/nhtsa/rearview-camera",
      },
    ],
    trace: [
      {
        agent: "planner",
        status: "pass",
        decision: "Mapped display failure, visibility, and crash risk to the query plan.",
        evidenceIds: [],
      },
      {
        agent: "retrieval_agent",
        status: "pass",
        decision: "Retrieved vehicle hazard and remedy chunks from the NHTSA fixture.",
        evidenceIds: ["nhtsa-camera-failure", "nhtsa-camera-remedy"],
      },
      {
        agent: "evidence_verifier",
        status: "pass",
        decision: "Confirmed crash-risk language is directly cited.",
        evidenceIds: ["nhtsa-camera-failure"],
      },
      {
        agent: "risk_scorer",
        status: "watch",
        decision: "Scored medium severity because no injury or fire language appears in the record.",
        evidenceIds: ["nhtsa-camera-failure"],
      },
      {
        agent: "report_writer",
        status: "pass",
        decision: "Generated a monitoring brief with dealer software remedy.",
        evidenceIds: ["nhtsa-camera-failure", "nhtsa-camera-remedy"],
      },
    ],
    gates: [
      {
        name: "Retrieval quality",
        status: "pass",
        metric: "top-k hit",
        detail: "Vehicle recall evidence is retrieved for camera and crash-risk queries.",
      },
      {
        name: "Citation faithfulness",
        status: "pass",
        metric: "0 unsupported terms",
        detail: "Crash-risk and software-remedy statements are source-supported.",
      },
      {
        name: "Trend readiness",
        status: "watch",
        metric: "future signal",
        detail: "Complaint trend forecasting is documented as a later production slice.",
      },
    ],
  },
];
