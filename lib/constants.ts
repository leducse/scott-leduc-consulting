// Site-wide constants and configuration

export const SITE_CONFIG = {
  name: "Scott LeDuc Consulting",
  tagline: "Transform Data into $17M+ Impact",
  subtitle: "Rigorous Statistical Methods + ML Expertise + AWS Architecture + GenAI Governance",
  domain: "decision-layer.com",
  url: "https://decision-layer.com",
  email: "leducse@gmail.com",
  location: "Fairfax, VA",
  linkedin: "sleduc",
  linkedinUrl: "https://linkedin.com/in/sleduc",
  github: "leducse",
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
    gradient: "from-cyan-500 to-sky-500",
  },
  {
    id: "machine-learning",
    title: "Machine Learning & AI Consulting",
    slug: "machine-learning",
    description: "Predictive modeling, NLP, recommendation engines, and ML deployment",
    icon: "Brain",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: "aws-architecture",
    title: "AWS Cloud Architecture",
    slug: "aws-architecture",
    description: "Serverless applications, data audit platforms, full-stack development, and cloud-native solutions",
    icon: "Cloud",
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    id: "business-intelligence",
    title: "Business Intelligence & Analytics",
    slug: "business-intelligence",
    description: "Executive dashboards, KPI standardization, regression guardrails, and automated reporting",
    icon: "LineChart",
    gradient: "from-teal-500 to-emerald-500",
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    slug: "data-engineering",
    description: "ETL pipelines, data warehousing, data contracts, and real-time data processing",
    icon: "Database",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    id: "genai-governance",
    title: "GenAI & Data Governance",
    slug: "genai-governance",
    description: "GenAI readiness, data contracts, LLM evaluation, and metric governance frameworks",
    icon: "Sparkles",
    gradient: "from-indigo-500 to-blue-500",
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
    gradient: "from-cyan-500 to-sky-500",
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
    gradient: "from-blue-500 to-indigo-500",
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
    gradient: "from-sky-500 to-cyan-500",
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
    gradient: "from-teal-500 to-emerald-500",
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
    gradient: "from-emerald-500 to-teal-500",
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
  {
    id: "consulting-platform",
    slug: "consulting-platform",
    title: "Decision Layer Consulting Platform",
    tagline: "Full-Stack Serverless Application with AI Integration",
    metrics: [
      { label: "Deployment Time", value: "<2", suffix: " weeks" },
      { label: "Architecture", value: "100%", suffix: " serverless" },
      { label: "AI Agents", value: "3", suffix: " specialized" },
      { label: "Page Load", value: "<2s", suffix: "" },
    ],
    gradient: "from-cyan-500 to-violet-500",
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

// Organizations worked with
export const ORGANIZATIONS = [
  {
    name: "Amazon",
    shortName: "Amazon",
    role: "Solutions Architect Operations",
    description: "Analytics & ML for 1,200+ builders across 18 global regions",
  },
  {
    name: "T-Mobile",
    shortName: "T-Mobile",
    role: "Analytics & BI",
    description: "Enterprise analytics and business intelligence",
  },
  {
    name: "Charter Communications",
    shortName: "Charter",
    role: "Data Analytics",
    description: "Customer analytics and reporting solutions",
  },
  {
    name: "National Geographic Society",
    shortName: "Nat Geo",
    role: "Analytics",
    description: "Data-driven insights for global initiatives",
  },
  {
    name: "Virginia DMAS",
    shortName: "VA DMAS",
    role: "Healthcare Analytics",
    description: "Virginia Department of Medical Assistance Services",
  },
  {
    name: "Feeding America",
    shortName: "Feeding America",
    role: "Nonprofit Analytics",
    description: "Impact measurement and program analytics",
  },
  {
    name: "American Diabetes Association",
    shortName: "ADA",
    role: "Healthcare Analytics",
    description: "Data strategy and analytics solutions",
  },
];

// Career timeline for About page
export const CAREER_TIMELINE = [
  {
    period: "2022 – Present",
    title: "Solutions Architect Operations",
    company: "Amazon Web Services",
    highlights: [
      "First dedicated SA operations member for AWS SLG & EDU vertical",
      "Supporting 1,200+ builders across 18 global sub-regions serving 10,200+ customers",
      "Built enterprise dashboard with 22,000+ annual views (highest-utilized tool in WWPS)",
      "Delivered $17M+ in business impact through statistical validation programs",
    ],
  },
  {
    period: "2021 – 2022",
    title: "MS Business Analytics",
    company: "College of William & Mary",
    highlights: [
      "Advanced coursework in ML, causal inference, and optimization",
      "Capstone projects in neural networks and time series forecasting",
      "Focus on bridging technical analytics with business strategy",
    ],
  },
  {
    period: "2018 – 2021",
    title: "Analytics & Business Intelligence",
    company: "Various Organizations",
    highlights: [
      "Built and scaled BI platforms serving hundreds of stakeholders",
      "Developed predictive models for customer behavior and revenue forecasting",
      "Led cross-functional analytics initiatives with measurable ROI",
    ],
  },
];
