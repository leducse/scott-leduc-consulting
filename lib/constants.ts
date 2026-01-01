// Site-wide constants and configuration

export const SITE_CONFIG = {
  name: "Scott LeDuc Consulting",
  tagline: "Transform Data into $17M+ Impact",
  subtitle: "Rigorous Statistical Methods + ML Expertise + AWS Architecture + GenAI Governance",
  email: "leducse@gmail.com",
  phone: "703-984-9803",
  location: "Fairfax, VA",
  linkedin: "sleduc",
  github: "github.com/leducse",
  githubUrl: "https://github.com/leducse",
};

export const KEY_METRICS = [
  {
    value: "$17M+",
    label: "Revenue Impact",
    description: "Annual impact through security engagement programs",
  },
  {
    value: "45%",
    label: "Revenue Increase",
    description: "For 300+ builders contributing to 19% of WWPS 2023 revenue",
  },
  {
    value: "1,200+",
    label: "Builders Supported",
    description: "Across 18 global sub-regions serving 10,200+ customers",
  },
  {
    value: "100%",
    label: "Statistical Validation",
    description: "Propensity score matching success rate",
  },
];

export const SERVICES = [
  {
    id: "statistical-analysis",
    title: "Statistical Analysis & Causal Inference",
    slug: "statistical-analysis",
    description: "Advanced statistical methods including propensity score matching, difference-in-differences, and experimental design",
    icon: "BarChart3",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "machine-learning",
    title: "Machine Learning & AI Consulting",
    slug: "machine-learning",
    description: "Predictive modeling, NLP, recommendation engines, and ML deployment",
    icon: "Brain",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: "aws-architecture",
    title: "AWS Cloud Architecture",
    slug: "aws-architecture",
    description: "Serverless applications, data audit platforms, full-stack development, and cloud-native solutions",
    icon: "Cloud",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "business-intelligence",
    title: "Business Intelligence & Analytics",
    slug: "business-intelligence",
    description: "Executive dashboards, KPI standardization, regression guardrails, and automated reporting",
    icon: "LineChart",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    slug: "data-engineering",
    description: "ETL pipelines, data warehousing, data contracts, and real-time data processing",
    icon: "Database",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    id: "genai-governance",
    title: "GenAI & Data Governance",
    slug: "genai-governance",
    description: "GenAI readiness, data contracts, LLM evaluation, and metric governance frameworks",
    icon: "Sparkles",
    gradient: "from-fuchsia-500 to-pink-500",
  },
];

export const CASE_STUDIES = [
  {
    id: "g3-analysis",
    slug: "g3-analysis",
    title: "G3 Pipeline Impact Analysis",
    tagline: "Advanced Statistical Analysis & Causal Inference",
    metrics: [
      { label: "Annual Revenue", value: "$706K", suffix: " (6:1 ROI)" },
      { label: "ARR Lift", value: "219.8%", suffix: " ($219,942 per account)" },
      { label: "PSM Success", value: "100%", suffix: " Perfect matching" },
      { label: "Revenue Increase", value: "19%", suffix: " (p < 0.05)" },
    ],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "ml-recommender",
    slug: "ml-recommender",
    title: "ML Engagement Recommender",
    tagline: "Machine Learning & Predictive Analytics",
    metrics: [
      { label: "Conversion Improvement", value: "53%", suffix: "" },
      { label: "Model Accuracy", value: "89.1%", suffix: " (XGBoost)" },
      { label: "Feature Engineering", value: "50+", suffix: " features" },
    ],
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: "aws-dashboard",
    slug: "aws-dashboard",
    title: "AWS Serverless Dashboard",
    tagline: "Enterprise Real-time Analytics Platform",
    metrics: [
      { label: "Active Users", value: "1,313", suffix: "" },
      { label: "Annual Views", value: "22,000+", suffix: "" },
      { label: "Response Time", value: "<2s", suffix: "" },
      { label: "Data Processing", value: "74K+", suffix: " records" },
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "activity-analysis",
    slug: "activity-analysis",
    title: "Activity Scenario Analysis",
    tagline: "AI-Powered Behavioral Analytics",
    metrics: [
      { label: "Win Rate Improvement", value: "23%", suffix: "" },
      { label: "NLP Accuracy", value: "89%", suffix: " (Bedrock)" },
      { label: "Scenarios Analyzed", value: "4", suffix: " playbooks" },
    ],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "data-audit-platform",
    slug: "data-audit-platform",
    title: "Data Audit & Documentation Platform",
    tagline: "Dashboard-First Data Quality & GenAI Assistant",
    metrics: [
      { label: "Dashboards Audited", value: "150+", suffix: "" },
      { label: "Data Quality Issues", value: "85%", suffix: " reduction" },
      { label: "Documentation Coverage", value: "92%", suffix: " improvement" },
      { label: "Metric Health Scores", value: "100%", suffix: " tracked" },
    ],
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "bi-regression-guardrails",
    slug: "bi-regression-guardrails",
    title: "BI Regression Guardrails",
    tagline: "CI/CD Integration & Change-Impact Analysis",
    metrics: [
      { label: "Regressions Prevented", value: "45+", suffix: "" },
      { label: "Dashboards Protected", value: "200+", suffix: "" },
      { label: "PR Failures", value: "100%", suffix: " caught before merge" },
      { label: "Change-Impact Time", value: "<5min", suffix: "" },
    ],
    gradient: "from-blue-500 to-indigo-500",
  },
];

// Icon mapping for dynamic icon rendering
export const ICON_MAP = {
  BarChart3: "BarChart3",
  Brain: "Brain",
  Cloud: "Cloud",
  LineChart: "LineChart",
  Database: "Database",
  Sparkles: "Sparkles",
} as const;
