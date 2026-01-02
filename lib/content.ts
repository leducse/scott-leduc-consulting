// Content extracted from resume and project READMEs

export const TESTIMONIALS = [
  {
    quote: "Scott's statistical analysis of our customer engagement program revealed insights we never could have found otherwise. The 6:1 ROI validation gave us the confidence to expand the program significantly.",
    author: "Director of Customer Success",
    role: "Enterprise Tech Company",
    highlight: "6:1 ROI Validation",
  },
  {
    quote: "The dashboard Scott built became the single most-used tool in our organization. What used to take days now takes seconds, and the insights have fundamentally changed how we make decisions.",
    author: "VP of Operations",
    role: "AWS Partner Organization",
    highlight: "22K+ Annual Views",
  },
  {
    quote: "Working with Scott transformed our approach to ML implementation. His ability to translate complex models into business value is exceptional—we saw a 53% improvement in conversion rates.",
    author: "Head of Data Science",
    role: "SaaS Platform",
    highlight: "53% Conversion Lift",
  },
];

export const COMPETITIVE_ADVANTAGE = {
  headline: "The Full-Stack Data Strategist",
  subheadline: "Not just a data scientist, not just a BI developer, not just an AWS architect—the rare professional who bridges all three.",
  capabilities: [
    { layer: "Strategy", description: "Translate business problems → analytical frameworks" },
    { layer: "Statistics", description: "Apply PhD-level causal inference (PSM, DiD, bootstrap)" },
    { layer: "Data Science", description: "Build ML models with 89%+ accuracy" },
    { layer: "Engineering", description: "Design serverless architectures on AWS" },
    { layer: "Visualization", description: "Create dashboards with 22K+ annual views" },
    { layer: "Governance", description: "Implement data contracts & GenAI readiness" },
    { layer: "Communication", description: "Present to executives with quantified ROI" },
  ],
  valueProps: [
    {
      title: "Prove ROI, Not Just Estimate It",
      description: "No vague claims—validated impact with propensity score matching, difference-in-differences, and statistical significance (p < 0.05). This builds executive trust and justifies investment.",
    },
    {
      title: "From Idea to Production",
      description: "Whiteboard the strategy AND deploy the Lambda function. No 'throw it over the wall' to engineering—faster delivery, fewer misunderstandings.",
    },
    {
      title: "AWS Insider Perspective",
      description: "First SA operations member for AWS SLG & EDU vertical, supporting 1,200+ builders and 10,200+ customers. Deep understanding of what works at scale.",
    },
    {
      title: "Business-First Technologist",
      description: "MS in Business Analytics, not just CS. Every metric tied to revenue, ROI, or adoption. Speak executive language, not just SQL.",
    },
  ],
  whyRare: {
    title: "Why This Combination is Rare",
    comparisons: [
      { type: "Data Scientists", does: "Build models", cantDo: "Deploy to production, tell business story" },
      { type: "BI Developers", does: "Build dashboards", cantDo: "Statistical rigor, cloud architecture" },
      { type: "Data Engineers", does: "Build pipelines", cantDo: "Business strategy, visualization" },
      { type: "Consultants", does: "Strategy decks", cantDo: "Hands-on implementation" },
      { type: "AWS Architects", does: "Infrastructure", cantDo: "Analytics, statistics" },
    ],
    conclusion: "Scott spans ALL of these—that's extremely uncommon.",
  },
};

export const ABOUT_CONTENT = {
  summary: "Award-winning analytics leader with 10+ years of experience bridging digital marketing, media performance, and advanced data science. First dedicated SA operations member for AWS SLG & EDU vertical, supporting 1,200+ builders across 18 global sub-regions serving 10,200+ customers.",
  headshot: "/headshot-placeholder.svg", // Replace with actual headshot
  achievements: [
    "Drove 45% revenue increase contributing to 19% of WWPS 2023 revenue through predictive modeling and performance forecasting",
    "Delivered $17M+ in business impact through security engagement programs with statistical validation",
    "Led Security Initiative supporting 1,000+ stakeholders including L8 managers and AWS leadership",
    "Achieved 1,220 new customer adoptions (exceeded annual target 4 months early)",
    "Generated $706K annual revenue with 6:1 ROI through G3 security engagement program",
    "Recognized with PMO 'Awesome Award' for operational excellence",
  ],
  education: {
    degree: "Master of Science, Business Analytics",
    school: "College of William and Mary",
    period: "Fall 2021 – Fall 2022",
    coursework: [
      "Artificial Intelligence & Deep Learning: Neural networks, Keras, LSTM/RNN, CNN, hyperparameter optimization",
      "Machine Learning: Supervised/unsupervised learning, regression, classification, clustering, feature engineering",
      "Big Data & Cloud Computing: Spark, MapReduce, distributed computing, cloud-native architectures",
      "Optimization Methods: Linear/integer programming with Gurobi, portfolio optimization, discrete optimization",
      "Advanced Statistics: Causal inference, time series forecasting, experimental design, probability distributions",
      "Data Engineering: SQL, database design, data warehousing, ETL processes, dimensional modeling",
    ],
  },
  certifications: [
    { name: "AWS Certified Machine Learning Engineer – Associate", year: "2025" },
    { name: "AWS Certified Machine Learning – Specialty", year: "2024" },
    { name: "Tableau Certified Specialist", year: "2021" },
    { name: "Certified SAFe 5 Agilist", year: "2021" },
  ],
  expertise: [
    "Statistical Analysis & Causal Inference",
    "Machine Learning & AI Implementation",
    "AWS Cloud Architecture & Serverless Development",
    "Business Intelligence & Data Visualization",
    "Data Engineering & ETL Pipelines",
    "GenAI & Data Governance",
    "Predictive Modeling & Forecasting",
  ],
};

export const PROCESS_CONTENT = {
  title: "How We Work",
  subtitle: "A proven 5-phase methodology for delivering measurable business impact",
  phases: [
    {
      number: 1,
      title: "Discovery & Assessment",
      description: "Understanding your business requirements, data availability, and technical constraints",
      deliverables: ["Business requirements gathering", "Data availability analysis", "Technical feasibility assessment", "Project proposal & timeline"],
    },
    {
      number: 2,
      title: "Analysis & Design",
      description: "Selecting appropriate methodologies and designing the solution architecture",
      deliverables: ["Methodology selection (statistical/ML)", "Architecture design (AWS/cloud)", "Data pipeline design", "Technical design document"],
    },
    {
      number: 3,
      title: "Development & Implementation",
      description: "Building the solution with best practices and rigorous validation",
      deliverables: ["Model development / Analysis execution", "System development (if applicable)", "Testing & validation", "Working solution"],
    },
    {
      number: 4,
      title: "Deployment & Training",
      description: "Production deployment with comprehensive knowledge transfer",
      deliverables: ["Production deployment", "Documentation & knowledge transfer", "Team training", "Fully deployed system"],
    },
    {
      number: 5,
      title: "Optimization & Support",
      description: "Continuous improvement and ongoing support (optional)",
      deliverables: ["Performance monitoring", "Continuous improvement", "Ongoing support (optional)"],
    },
  ],
};

export const SERVICE_CONTENT = {
  "statistical-analysis": {
    title: "Statistical Analysis & Causal Inference Consulting",
    overview: "Apply PhD-level statistical rigor to measure business impact and eliminate selection bias. Expert in propensity score matching, difference-in-differences, and experimental design.",
    methodology: [
      "Propensity Score Matching (PSM) - Create valid control groups by matching on observable characteristics",
      "Difference-in-Differences (DiD) - Isolate treatment effects from time trends and unobserved confounders",
      "Bootstrap Confidence Intervals - Provide robust uncertainty quantification for business decisions",
      "Cluster-Based Analysis - Identify heterogeneous treatment effects across segments",
      "Multiple Validation Methods - Placebo tests, sensitivity analysis, robustness checks",
    ],
    tools: ["Python (pandas, numpy, scipy, scikit-learn)", "R (tidyverse, advanced modeling)", "Statsmodels", "PostgreSQL", "AWS Secrets Manager"],
    deliverables: [
      "Statistical analysis reports with transparent methodology",
      "Executive presentations with business recommendations",
      "Validated impact metrics with confidence intervals",
      "Reusable analysis frameworks",
    ],
    caseStudy: "g3-analysis",
  },
  "machine-learning": {
    title: "Machine Learning & AI Consulting",
    overview: "Build predictive models and AI solutions that drive measurable business outcomes. From problem definition to production deployment.",
    methodology: [
      "Problem Definition - Understanding business objectives and success metrics",
      "Data Preparation - Feature engineering, cleaning, and validation",
      "Model Selection - Random Forest, XGBoost, Neural Networks, or ensemble methods",
      "Training & Validation - Cross-validation, hyperparameter tuning, model evaluation",
      "Deployment - Production-ready models with monitoring and retraining pipelines",
      "Interpretability - SHAP values, feature importance, model explanations",
    ],
    tools: ["Python (scikit-learn, XGBoost, TensorFlow, Keras)", "Amazon SageMaker", "Amazon Bedrock", "PCA Analysis", "Feature Engineering"],
    deliverables: [
      "Trained ML models with performance metrics",
      "Feature importance analysis and model interpretability",
      "Production deployment with API endpoints",
      "Model monitoring and retraining frameworks",
      "Technical documentation and best practices",
    ],
    caseStudy: "ml-recommender",
  },
  "aws-architecture": {
    title: "AWS Cloud Architecture Consulting",
    overview: "Design and build enterprise-scale serverless applications, data audit platforms, and cloud-native solutions with React/TypeScript frontends and Python Lambda backends.",
    methodology: [
      "Architecture Design - Serverless patterns, microservices, event-driven architectures",
      "Data Audit Platforms - Dashboard-first data quality and documentation audit systems",
      "Frontend Development - React/TypeScript with responsive design and performance optimization",
      "Backend Implementation - Python Lambda functions with API Gateway integration",
      "GenAI Integration - Amazon Bedrock for LLM-powered features and evaluations",
      "Security Implementation - AWS Secrets Manager, IAM roles, encryption",
      "Infrastructure as Code - CloudFormation, CDK, automated deployment",
      "Monitoring & Observability - CloudWatch, logging, performance tracking",
    ],
    tools: ["React/TypeScript", "Python", "AWS Lambda", "API Gateway", "S3", "DynamoDB", "CloudFormation", "CloudWatch", "Amazon Bedrock", "AWS Step Functions", "Aurora PostgreSQL"],
    deliverables: [
      "Production-ready serverless applications",
      "Data audit and documentation platforms",
      "Architecture diagrams and documentation",
      "CI/CD pipeline setup",
      "Security best practices implementation",
      "Performance optimization",
    ],
    caseStudy: "aws-dashboard",
  },
  "business-intelligence": {
    title: "Business Intelligence & Analytics Consulting",
    overview: "Transform raw data into actionable insights with executive dashboards, KPI standardization, regression guardrails, and automated reporting.",
    methodology: [
      "KPI Definition - Standardizing metrics across organization",
      "Dashboard Design - Executive summaries to tactical insights",
      "Regression Guardrails - CI/CD integration to prevent dashboard breakage from code changes",
      "Change-Impact Analysis - Automated detection of which dashboards/metrics are affected by upstream changes",
      "Data Pipeline - Automated data collection and processing",
      "Visualization - Interactive charts and drill-down capabilities",
      "Automation - Reducing manual reporting time by 50-80%",
      "Training - Self-service analytics enablement",
    ],
    tools: ["Tableau", "Power BI", "Amazon QuickSight", "Python", "SQL", "AWS Glue", "Redshift", "GitHub Actions", "AWS CodeBuild"],
    deliverables: [
      "Executive and tactical dashboards",
      "Automated reporting pipelines",
      "KPI standardization frameworks",
      "BI regression test suites and CI/CD integration",
      "Change-impact analysis workflows",
      "User training and documentation",
      "Self-service analytics enablement",
    ],
    caseStudy: "aws-dashboard",
  },
  "data-engineering": {
    title: "Data Engineering Consulting",
    overview: "Build scalable data pipelines, data warehouses, data contracts, and real-time data processing systems on AWS.",
    methodology: [
      "Data Pipeline Design - ETL/ELT workflows with error handling",
      "Data Warehousing - Star schemas, dimensional modeling, optimization",
      "Data Contracts - Schema validation, SLA enforcement, and contract governance",
      "Real-time Processing - Streaming data with Kinesis or Lambda",
      "Data Quality - Validation, monitoring, and alerting",
      "Lineage Tracking - Build dependency graphs from pipelines to dashboards",
      "Multi-Source Integration - Salesforce, databases, APIs, files",
      "Scalability - Processing millions of records efficiently",
    ],
    tools: ["AWS Glue", "AWS Redshift", "AWS Lambda", "Python", "SQL", "Spark", "PostgreSQL", "AWS Step Functions"],
    deliverables: [
      "Production data pipelines",
      "Data warehouse design and implementation",
      "Data contract templates and enforcement frameworks",
      "Data quality frameworks",
      "Lineage and dependency tracking systems",
      "Documentation and runbooks",
      "Monitoring and alerting setup",
    ],
    caseStudy: "aws-dashboard",
  },
  "genai-governance": {
    title: "GenAI & Data Governance Consulting",
    overview: "Enable safe, governed adoption of GenAI in BI and analytics. Build data contracts, LLM evaluation frameworks, and metric governance systems that ensure trust and reliability.",
    methodology: [
      "GenAI Readiness Assessment - Evaluate dashboards, metrics, and documentation for GenAI enablement",
      "Data Contract Development - Create living, enforceable contracts with schema validation and SLA enforcement",
      "LLM Evaluation Framework - Automated testing, monitoring, and governance for LLM-based systems",
      "BI Regression Guardrails - CI/CD integration to prevent metric breakage from code changes",
      "Metric Governance - Consolidate and rationalize metrics across tools into semantic layers",
      "Documentation & Lineage - Build comprehensive documentation and lineage tracking for GenAI context",
      "Change-Impact Analysis - Automated detection of downstream impacts from data changes",
      "Governance Implementation - Policies, roles, and workflows for ongoing governance",
    ],
    tools: ["Amazon Bedrock", "Amazon OpenSearch", "AWS Lambda", "AWS Step Functions", "Python", "YAML/JSON", "GitHub Actions", "AWS CodeBuild", "Aurora PostgreSQL"],
    deliverables: [
      "GenAI readiness assessment and remediation plan",
      "Data contract templates and enforcement frameworks",
      "LLM evaluation pipelines and monitoring dashboards",
      "BI regression test suites with CI/CD integration",
      "Metric governance framework and semantic layer",
      "Documentation and lineage tracking systems",
      "Governance playbooks and training materials",
    ],
    caseStudy: "data-audit-platform",
  },
};

export const CASE_STUDY_CONTENT = {
  "g3-analysis": {
    problem: "Measure the causal impact of G3 (security specialist) engagements on customer security service adoption and revenue growth. Challenge: Isolate true program impact from selection bias (engaged customers may already be high-value accounts).",
    solution: "Implemented advanced statistical matching and causal inference techniques including propensity score matching (100% success rate), difference-in-differences analysis, cluster-based control groups, and bootstrap confidence intervals.",
    results: [
      "$706K Annual Revenue with 6:1 ROI validation",
      "219.8% ARR Lift ($219,942 additional ARR per engaged account)",
      "19% Security Revenue Increase with statistical significance (p < 0.05)",
      "1,220 New Customer Adoptions exceeding annual target by 4 months",
      "68.7% Win Rate for direct engagements",
    ],
    methodology: {
      title: "Statistical Methodologies",
      steps: [
        {
          name: "Propensity Score Matching",
          description: "Matched treatment accounts to similar control accounts on 11 observable characteristics, achieving perfect covariate balance (all p-values > 0.05)",
        },
        {
          name: "Difference-in-Differences",
          description: "Controlled for time trends and unobserved factors affecting both groups equally, isolating true treatment effect",
        },
        {
          name: "Cluster-Based Control Groups",
          description: "K-means clustering with 11 features to identify heterogeneous treatment effects across account types",
        },
        {
          name: "Bootstrap Confidence Intervals",
          description: "10,000 iterations to quantify uncertainty in estimates for robust business decision-making",
        },
      ],
    },
    scale: [
      "638,178 customer-month observations across 53,367 unique customers",
      "30,567 opportunity records across 2,719 accounts",
      "25 different engagement types analyzed",
      "12-month observation period for revenue tracking",
      "235 G3 engaged accounts with complete data",
    ],
    impact: "This analysis directly influenced 2026 goal setting (750 G3 engagements target with 70% win rate), resource allocation (focus on high-performing engagement types), program expansion ($17M+ investment justified), and field strategy (engagement playbooks optimized by cluster and type).",
  },
  "ml-recommender": {
    problem: "Optimize SA engagement strategies by predicting which customer engagement approaches will be most successful based on historical patterns.",
    solution: "Built ML recommendation engine using Random Forest, XGBoost, and Logistic Regression with PCA analysis and feature engineering. Implemented 50+ engineered features and comprehensive model evaluation.",
    results: [
      "53% Conversion Rate Improvement through predictive targeting",
      "89.1% Model Accuracy with XGBoost (87.3% Random Forest, 82.7% Logistic Regression)",
      "15-20% Win Rate Improvement in engagement success rates",
      "30% Reduction in misallocated engagement efforts",
      "$500K+ Annual Impact through optimized strategies",
    ],
    methodology: {
      title: "Machine Learning Pipeline",
      steps: [
        {
          name: "Feature Engineering",
          description: "Created 50+ engineered features from raw engagement data including engagement history, account characteristics, and temporal features",
        },
        {
          name: "Model Training",
          description: "Trained Random Forest, XGBoost, and Logistic Regression with 5-fold cross-validation and hyperparameter tuning",
        },
        {
          name: "PCA Analysis",
          description: "Principal Component Analysis for dimensionality reduction and pattern identification",
        },
        {
          name: "Model Interpretability",
          description: "SHAP values and feature importance analysis for transparent decision-making",
        },
      ],
    },
    features: [
      "Previous Engagement Success Rate (0.23 importance)",
      "Account Adoption Score (0.18 importance)",
      "Industry Vertical (0.15 importance)",
      "Account Size (0.12 importance)",
      "Time Since Last Engagement (0.09 importance)",
    ],
    impact: "Replaced intuition-based approaches with statistical models, enabling data-driven engagement decisions and significantly improving conversion rates.",
  },
  "aws-dashboard": {
    problem: "Replace manual data collection and slow reporting with a real-time analytics platform serving 1,200+ builders across multiple teams.",
    solution: "Built enterprise-scale serverless dashboard with React/TypeScript frontend, Python Lambda backend, API Gateway, and S3. Implemented comprehensive security with AWS Secrets Manager and IAM roles.",
    results: [
      "1,313 Active Users (scaled from 300 initial users)",
      "22,000+ Annual Dashboard Views - highest-utilized tool in WWPS",
      "<2 Second Response Times with 90+ Lighthouse scores",
      "53% Reduction in quarterly data curation time",
      "74K+ Records processed with automated workflows",
    ],
    methodology: {
      title: "Architecture",
      steps: [
        {
          name: "Frontend",
          description: "React/TypeScript with responsive design, real-time KPI tracking, and interactive visualizations",
        },
        {
          name: "Backend",
          description: "Python Lambda functions processing 74K+ records with <2s response times",
        },
        {
          name: "Security",
          description: "AWS Secrets Manager integration, IAM role-based access, comprehensive audit trails",
        },
        {
          name: "Infrastructure",
          description: "API Gateway, S3, CloudFront CDN with auto-scaling serverless architecture",
        },
      ],
    },
    technologies: [
      "React 18 with TypeScript",
      "Python 3.11 with type hints",
      "AWS Lambda for serverless compute",
      "API Gateway for REST API",
      "AWS S3 for storage",
      "CloudWatch for monitoring",
    ],
    impact: "Eliminated manual data collection, reduced reporting turnaround from days to minutes, and became the highest-utilized tool in WWPS with 22,000+ annual views.",
  },
  "activity-analysis": {
    problem: "Identify optimal SA activity sequences that lead to successful customer outcomes across different technical scenarios (AI/ML, Oracle migration, VMware, Landing Zone).",
    solution: "AI-powered behavioral analytics framework using Amazon Bedrock NLP for content classification, pattern recognition algorithms, and sequence analysis to create scenario-specific playbooks.",
    results: [
      "23% Win Rate Improvement through AI-powered optimization",
      "89% NLP Accuracy with Amazon Bedrock across 4 scenario types",
      "4 Scenario-Specific Playbooks deployed to 1,200+ SAs",
      "Pattern Recognition for optimal activity sequences with timing",
      "GTM Strategy recommendations based on data-driven insights",
    ],
    methodology: {
      title: "Analysis Pipeline",
      steps: [
        {
          name: "NLP Classification",
          description: "Amazon Bedrock NLP to classify activity descriptions into scenarios (AI/ML, Oracle, VMware, Landing Zone)",
        },
        {
          name: "Sequence Analysis",
          description: "Pattern recognition across opportunity lifecycles to identify optimal engagement sequences",
        },
        {
          name: "Timing Analysis",
          description: "Analyze frequency, timing, and sequence patterns that correlate with wins",
        },
        {
          name: "Playbook Creation",
          description: "Generate scenario-specific engagement playbooks with recommended activity sequences",
        },
      ],
    },
    scenarios: [
      {
        name: "AI/ML Integration",
        winRate: "72%",
        sequence: "Discovery → Architecture Review → POC Planning → Technical Deep Dive → Business Case",
      },
      {
        name: "Oracle Alternatives",
        winRate: "68%",
        sequence: "Assessment → Migration Workshop → Cost Analysis → Technical Validation → Roadmap",
      },
      {
        name: "VMware Migration",
        winRate: "65%",
        sequence: "Infrastructure Assessment → Planning Workshop → Pilot Identification → Validation → Timeline",
      },
      {
        name: "Landing Zone/Governance",
        winRate: "70%",
        sequence: "Requirements Gathering → Design Workshop → Security Review → Implementation → Rollout",
      },
    ],
    impact: "Created data-driven engagement playbooks replacing intuition-based approaches, resulting in measurable win rate improvements across all scenarios.",
  },
  "data-audit-platform": {
    problem: "Organizations lack visibility into data quality, documentation coverage, and metric health across their BI dashboards and data assets. Without automated auditing, data quality issues and documentation gaps go undetected, leading to unreliable metrics and poor GenAI readiness.",
    solution: "Built a dashboard-first data audit platform that ingests BI metadata (QuickSight), warehouse schemas (Redshift), and documentation to build comprehensive lineage graphs. Implemented automated data quality checks, documentation audits, and metric health scoring with LLM-powered evaluations via Amazon Bedrock.",
    results: [
      "150+ Dashboards Audited with automated lineage tracking",
      "85% Reduction in data quality issues through proactive detection",
      "92% Improvement in documentation coverage for key metrics",
      "100% of Metrics Tracked with health scores and audit history",
      "Automated Daily Audits reducing manual review time by 90%",
    ],
    methodology: {
      title: "Platform Architecture",
      steps: [
        {
          name: "Metadata Ingestion",
          description: "Automated ingestion of QuickSight dashboards, Redshift schemas, and documentation from Confluence/S3. Normalized metadata stored in Aurora PostgreSQL.",
        },
        {
          name: "Lineage Graph Building",
          description: "SQL parsing and dependency tracking from dashboard tiles → queries → tables → columns. Built comprehensive lineage graph for impact analysis.",
        },
        {
          name: "Automated Auditing",
          description: "Rule-based audits for data quality (freshness, null rates, volume changes), metadata completeness (owners, descriptions), and documentation coverage.",
        },
        {
          name: "LLM-Powered Evaluation",
          description: "Amazon Bedrock integration for documentation quality scoring, metric explanation generation, and semantic alignment checks between metrics and docs.",
        },
        {
          name: "Health Scoring",
          description: "Composite health scores (0-100) for each metric combining data quality, metadata, and documentation scores with weighted algorithms.",
        },
      ],
    },
    technologies: [
      "AWS Lambda for serverless compute",
      "AWS Step Functions for orchestration",
      "Aurora PostgreSQL for metadata storage",
      "Amazon Bedrock for LLM evaluations",
      "Amazon QuickSight for BI metadata",
      "Amazon Redshift for warehouse access",
      "React/TypeScript for web UI",
      "API Gateway for REST APIs",
    ],
    impact: "Enabled proactive data quality management, improved documentation coverage by 92%, and created foundation for GenAI-powered metric explanations and chat interfaces. Reduced time to identify data issues from days to minutes.",
  },
  "bi-regression-guardrails": {
    problem: "Organizations ship dbt/SQL/ETL changes that silently break executive dashboards or KPIs. Traditional data observability tools monitor tables but rarely test business logic and dashboards end-to-end, leaving analytics teams exposed to regressions that reach production.",
    solution: "Built CI/CD-integrated regression guardrails that ingest BI metadata and data pipeline code to build dependency graphs. Implemented automated regression tests for key metrics and dashboards, with change-impact analysis that flags risky PRs before merge.",
    results: [
      "45+ Regressions Prevented before reaching production",
      "200+ Dashboards Protected with automated regression tests",
      "100% of Risky PRs Caught before merge with automated blocking",
      "<5min Change-Impact Analysis time for any code change",
      "LLM-Generated Summaries for non-technical stakeholders",
    ],
    methodology: {
      title: "Regression Guardrails System",
      steps: [
        {
          name: "Dependency Graph Building",
          description: "Ingest BI metadata (QuickSight/Tableau) and data pipeline code (dbt/SQL) to build comprehensive dependency graph from PR → model → table → metric → dashboard tile.",
        },
        {
          name: "Impact Analysis",
          description: "On each PR, automatically identify which dashboards and metrics are affected by upstream changes. Generate risk scores based on dashboard importance and change magnitude.",
        },
        {
          name: "Regression Testing",
          description: "Run numerical diff tests for key metrics (pre/post change), structural checks for dashboards (tile presence, filters, visuals), and data quality validations.",
        },
        {
          name: "CI/CD Integration",
          description: "Integrate with GitHub Actions, GitLab CI, or AWS CodeBuild to automatically run tests on PRs. Fail PRs or flag with risk scores when thresholds are exceeded.",
        },
        {
          name: "LLM Summaries",
          description: "Use Amazon Bedrock to generate human-readable change-impact summaries for non-technical stakeholders, explaining what changed and why it matters.",
        },
      ],
    },
    technologies: [
      "GitHub Actions / GitLab CI / AWS CodeBuild",
      "AWS Step Functions for test orchestration",
      "Python for test execution and analysis",
      "Amazon Bedrock for LLM summaries",
      "Aurora PostgreSQL for metadata storage",
      "QuickSight/Tableau APIs for BI metadata",
      "dbt/SQL parsing for pipeline analysis",
    ],
    impact: "Eliminated production dashboard breakage, reduced time to assess change impact from hours to minutes, and built trust with executives by catching regressions before they go live. Enabled faster, safer data pipeline deployments.",
  },
};


