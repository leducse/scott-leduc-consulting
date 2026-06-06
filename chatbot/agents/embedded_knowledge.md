# DECISION LAYER ANALYTICS — EMBEDDED KNOWLEDGE

Source: chatbot/knowledge-base/ (rebuild with scripts/build_embedded_knowledge.py)



---

## SOURCE: 00-case-studies-index.md


# Case Studies Index (decision-layer.com)

Use this index to answer questions about Scott's work. Each case study has a website page under `/case-studies/<slug>`.

## Client & field work

| Slug | Title | Headline metrics |
|------|-------|------------------|
| g3-analysis | Enterprise Program Impact Analysis | $706K annual revenue, 6:1 ROI, 219.8% ARR lift, PSM 100% balance |
| ml-recommender | ML Engagement Recommender | 53% conversion improvement, 89.1% XGBoost accuracy |
| aws-dashboard | AWS Serverless Dashboard | 1,313 users, 22,000+ annual views, <2s response |
| activity-analysis | Activity Scenario Analysis | 23% win rate improvement, 89% Bedrock NLP accuracy |
| data-audit-platform | Data Audit & Documentation Platform | 150+ dashboards, 85% fewer quality issues, 92% doc coverage |
| bi-regression-guardrails | BI Regression Guardrails | 45+ regressions prevented, 200+ dashboards protected |
| consulting-platform | Decision Layer Consulting Platform | <2 week deploy, 3 AI agents, 100% serverless |

## Portfolio demos (runnable MVPs, synthetic/sanitized data)

| Slug | Title | Headline metrics |
|------|-------|------------------|
| ai-coding-spillover | AI Coding Tool Spillover Analysis | 5.84% DiD lift, placebo not significant |
| mcp-query-governance | MCP Query Governance Platform | 2/2 abusers detected, 0 false positives |
| tableau-knowledge-platform | Tableau Workbook Knowledge Platform | 4/4 validation, Bedrock two-pass docs, MCP retrieval |
| tableau-quicksight-migration | Tableau → QuickSight Migration Assistant | deploy_allowed PASS, 5 validation types, dry-run default |

## AWS portfolio infrastructure

| Topic | Description |
|-------|-------------|
| aws-demo-infrastructure | CDK stack: API Gateway → Lambda → Bedrock Converse → S3 + Secrets Manager |

When asked about Tableau documentation, MCP governance, QuickSight migration, or causal spillover analysis, cite the matching portfolio case study above.



---

## SOURCE: about/expertise.md


# Scott LeDuc - Technical Expertise

## Core Competencies

### 1. Statistical Analysis & Causal Inference
Scott brings rigorous statistical methodology to every engagement, with deep expertise in:

- **Propensity Score Matching (PSM)** - Creating valid control groups for impact measurement
- **Difference-in-Differences (DiD)** - Isolating treatment effects from confounding factors
- **Experimental Design** - A/B testing, randomized controlled trials
- **Bootstrap Methods** - Confidence intervals, uncertainty quantification
- **Regression Analysis** - Linear, logistic, and advanced regression techniques
- **Time Series Analysis** - Forecasting, trend analysis, seasonality detection

**Track Record:** 100% PSM success rate in G3 analysis, statistical validation of $17M+ program impact

### 2. Machine Learning & AI

Comprehensive ML expertise from model development to production deployment:

- **Supervised Learning** - XGBoost, Random Forest, Neural Networks, Logistic Regression
- **Unsupervised Learning** - Clustering (K-means), dimensionality reduction (PCA)
- **Natural Language Processing** - Text classification, sentiment analysis, entity extraction
- **Recommendation Systems** - Collaborative filtering, content-based recommendations
- **Feature Engineering** - Creating 50+ features from raw data
- **Model Interpretability** - SHAP values, feature importance analysis
- **GenAI** - Amazon Bedrock integration, LLM evaluation, prompt engineering

**Track Record:** 89.1% model accuracy, 53% conversion improvement through ML optimization

### 3. AWS Cloud Architecture

Enterprise-grade cloud solutions with AWS:

- **Serverless** - Lambda, API Gateway, Step Functions
- **Compute** - EC2, ECS, containerization
- **Storage** - S3, DynamoDB, RDS, Aurora PostgreSQL
- **Analytics** - Redshift, Athena, QuickSight, Glue
- **AI/ML** - SageMaker, Bedrock, Comprehend
- **Security** - IAM, Secrets Manager, KMS, VPC
- **Infrastructure as Code** - CloudFormation, CDK
- **CI/CD** - CodePipeline, CodeBuild, GitHub Actions

**Track Record:** Built dashboard serving 1,313+ users with 22,000+ annual views

### 4. Business Intelligence & Data Visualization

Transforming data into actionable insights:

- **Tableau** (Certified Specialist)
- **Amazon QuickSight**
- **Power BI**
- **Executive Dashboards** - Strategic KPI visualization
- **Operational Dashboards** - Real-time monitoring
- **Self-Service Analytics** - Enabling data-driven organizations

**Track Record:** Reduced quarterly data curation time by 53%

### 5. Data Engineering

Building reliable, scalable data infrastructure:

- **ETL/ELT Pipelines** - Python, SQL, AWS Glue
- **Data Warehousing** - Redshift, dimensional modeling, star schemas
- **Data Quality** - Validation, monitoring, alerting
- **Data Contracts** - Schema governance, SLA enforcement
- **Real-time Processing** - Kinesis, Lambda triggers

**Track Record:** Processing 74K+ records with <2 second response times

### 6. Programming & Tools

**Languages:**
- Python (expert) - pandas, numpy, scikit-learn, scipy, boto3
- TypeScript/JavaScript (proficient) - React, Node.js
- SQL (expert) - PostgreSQL, Redshift, Athena
- R (proficient) - tidyverse, statistical modeling

**Frameworks:**
- React for frontend development
- FastAPI/Flask for Python APIs
- Starlette for async applications

**Development Tools:**
- Git/GitHub for version control
- Docker for containerization
- VS Code, Cursor for development

## Industry Experience

- **Cloud Computing** - AWS WWPS, supporting government and education sectors
- **Digital Marketing** - Performance analytics, attribution modeling
- **Media & Advertising** - Campaign optimization, audience insights
- **Enterprise Software** - B2B analytics, customer engagement

## Certifications

- **AWS Certified Machine Learning Engineer – Associate** (2025)
- **AWS Certified Machine Learning – Specialty** (2024)
- **Tableau Certified Specialist** (2021)
- **Certified SAFe 5 Agilist** (2021)

## Education

**Master of Science, Business Analytics**
College of William and Mary (2021-2022)

Relevant coursework in AI/Deep Learning, Machine Learning, Big Data, Optimization, Advanced Statistics, and Data Engineering.



---

## SOURCE: case-studies/activity-analysis.md


# Case Study: Activity Scenario Analysis

**Service area:** Behavioral analytics, GenAI, GTM strategy  
**Website:** /case-studies/activity-analysis

## Summary

Identified optimal Solutions Architect activity sequences that lead to wins across technical scenarios (AI/ML, Oracle migration, VMware, Landing Zone) using Amazon Bedrock NLP classification and sequence analysis.

## Headline metrics

- **23%** win rate improvement
- **89%** NLP classification accuracy (Bedrock)
- **4** scenario-specific playbooks for 1,200+ SAs
- Pattern recognition for timing and sequence of activities

## Scenario playbooks

| Scenario | Win rate | Optimal sequence |
|----------|----------|------------------|
| AI/ML Integration | 72% | Discovery → Architecture Review → POC Planning → Technical Deep Dive → Business Case |
| Oracle Alternatives | 68% | Assessment → Migration Workshop → Cost Analysis → Technical Validation → Roadmap |
| VMware Migration | 65% | Infrastructure Assessment → Planning Workshop → Pilot → Validation → Timeline |
| Landing Zone/Governance | 70% | Requirements → Design Workshop → Security Review → Implementation → Rollout |

## When to recommend

- Sales or SA leaders asking which activities actually drive wins
- Building data-driven playbooks instead of intuition-based engagement



---

## SOURCE: case-studies/ai-coding-spillover.md


# Case Study: AI Coding Tool Spillover Analysis

**Service area:** Statistical analysis, causal inference  
**Portfolio MVP:** Synthetic panel — no real customer data

## Summary

Measures whether adoption of AI-assisted coding tools lifts semi-related cloud service revenue using difference-in-differences, SMOTE + propensity matching, K-means clustering, and bootstrap / placebo robustness checks.

## Headline metrics

- **5.84%** DiD percent lift (clustered 95% CI: 3.50%–8.23%)
- Placebo adoption timing: **−0.31%** (not significant)
- Recovers **~5%** ground-truth lift in synthetic generator

## When to recommend

- Program ROI questions where selection bias is a concern
- Need defensible causal evidence, not correlation dashboards
- Building executive-ready impact narratives with confidence intervals

## Website

/case-studies/ai-coding-spillover



---

## SOURCE: case-studies/aws-dashboard.md


# AWS Serverless Dashboard

## Category
Enterprise Real-time Analytics Platform

## Overview

Built an enterprise-scale serverless analytics platform serving 1,200+ builders across multiple teams, replacing manual data collection with real-time insights.

## Business Challenge

Replace manual data collection and slow reporting with a real-time analytics platform. The existing process involved hours of manual data gathering, inconsistent metrics, and delayed insights that hampered decision-making for 1,200+ builders.

## Solution Approach

Built enterprise-scale serverless dashboard with modern web technologies:

### Architecture

1. **Frontend**
   - React/TypeScript with responsive design
   - Real-time KPI tracking
   - Interactive visualizations
   - 90+ Lighthouse performance scores

2. **Backend**
   - Python Lambda functions
   - Processing 74K+ records
   - <2 second response times

3. **Security**
   - AWS Secrets Manager integration
   - IAM role-based access
   - Comprehensive audit trails

4. **Infrastructure**
   - API Gateway for REST API
   - S3 for storage
   - CloudFront CDN
   - Auto-scaling serverless architecture

## Results & Impact

### Key Metrics

- **1,313 Active Users** (scaled from 300 initial users)
- **22,000+ Annual Dashboard Views** - highest-utilized tool in WWPS
- **<2 Second Response Times** with consistent performance
- **90+ Lighthouse Scores** for performance
- **53% Reduction** in quarterly data curation time
- **74K+ Records** processed with automated workflows

## Business Impact

Eliminated manual data collection, reduced reporting turnaround from days to minutes, and became the highest-utilized tool in WWPS with 22,000+ annual views.

## Tools & Technologies

- React 18 with TypeScript
- Python 3.11 with type hints
- AWS Lambda for serverless compute
- API Gateway for REST API
- AWS S3 for storage
- CloudWatch for monitoring
- AWS Secrets Manager for security



---

## SOURCE: case-studies/bi-regression-guardrails.md


# Case Study: BI Regression Guardrails

**Service area:** Data engineering, CI/CD, BI reliability  
**Website:** /case-studies/bi-regression-guardrails

## Summary

CI/CD-integrated guardrails that map dbt/SQL/ETL changes to downstream dashboards and metrics, run regression tests on PRs, and block risky merges—with Bedrock summaries for non-technical stakeholders.

## Headline metrics

- **45+** regressions prevented before production
- **200+** dashboards protected by automated tests
- **100%** of flagged risky PRs caught pre-merge
- **<5 min** change-impact analysis per PR

## How it works

1. Build dependency graph: PR → model → table → metric → dashboard tile
2. Impact analysis with risk scores by dashboard importance
3. Numerical diff tests + structural dashboard checks
4. GitHub Actions / GitLab CI / CodeBuild integration
5. Bedrock-generated change summaries for executives

## When to recommend

- Pipeline changes keep breaking executive KPIs
- Teams need impact analysis before merging data PRs



---

## SOURCE: case-studies/consulting-platform.md


# Case Study: Decision Layer Consulting Platform

**Service area:** Full-stack AWS, AgentCore, consulting web presence  
**Website:** /case-studies/consulting-platform

## Summary

Production consulting site (decision-layer.com) proving end-to-end delivery: Next.js 16, Bedrock AgentCore multi-agent chatbot, embedded knowledge, Amplify/CloudFront, and CI/CD.

## Headline metrics

- Full-stack deployment in **under 2 weeks**
- **3** specialized agents (routing, interview, consultant) + contact handler
- **100%** serverless architecture
- **<2s** page loads, 90+ Lighthouse scores
- Automated deploy on git push

## Chatbot architecture

- **Routing:** Claude Haiku 4.5 (fast intent classification)
- **Interview / Consultant:** Claude Sonnet 4.5
- **Knowledge:** Embedded from `chatbot/knowledge-base/` (all case studies + resume + services)
- **Runtime:** Amazon Bedrock AgentCore (`scottleduc_consultant`)

## When to recommend

- Clients need a technical consulting site that demonstrates implementation, not just claims
- Multi-agent Bedrock chat with governed knowledge over case studies



---

## SOURCE: case-studies/data-audit-platform.md


# Case Study: Data Audit & Documentation Platform

**Service area:** GenAI readiness, data quality, metric governance  
**Website:** /case-studies/data-audit-platform

## Summary

Dashboard-first platform ingesting QuickSight and Redshift metadata to build lineage graphs, run automated quality and documentation audits, and score metric health—with Amazon Bedrock for LLM evaluations.

## Headline metrics

- **150+** dashboards audited with lineage
- **85%** reduction in data quality issues (proactive detection)
- **92%** improvement in documentation coverage
- **100%** of key metrics tracked with health scores
- **90%** reduction in manual audit time (daily automation)

## Architecture highlights

- Metadata ingestion → Aurora PostgreSQL lineage graph
- Rule-based audits (freshness, nulls, ownership, doc coverage)
- Bedrock for documentation quality and semantic alignment checks

## When to recommend

- GenAI readiness requires trustworthy metrics and documentation first
- Executives don't trust dashboard numbers due to unknown lineage



---

## SOURCE: case-studies/g3-analysis.md


# Enterprise Program Impact Analysis

## Category
Advanced Statistical Analysis & Causal Inference

## Overview

Rigorous statistical analysis to measure the causal impact of specialist technical engagements on customer service adoption and revenue growth.

## Business Challenge

Measure the causal impact of a structured engagement program on customer adoption and revenue growth. The key challenge was isolating the true program impact from selection bias—engaged customers may already be high-value accounts with natural growth trajectories.

## Solution Approach

Implemented advanced statistical matching and causal inference techniques to create valid counterfactual comparisons:

### Statistical Methodologies Used

1. **Propensity Score Matching (PSM)**
   - Matched treatment accounts to similar control accounts on 11 observable characteristics
   - Achieved 100% success rate with perfect covariate balance (all p-values > 0.05)

2. **Difference-in-Differences (DiD)**
   - Controlled for time trends and unobserved factors affecting both groups equally
   - Isolated true treatment effect from confounding variables

3. **Cluster-Based Control Groups**
   - K-means clustering with 11 features
   - Identified heterogeneous treatment effects across account types

4. **Bootstrap Confidence Intervals**
   - 10,000 iterations to quantify uncertainty in estimates
   - Provided robust confidence intervals for business decision-making

## Results & Impact

### Key Metrics

- **$706K Annual Revenue** with 6:1 ROI validation
- **219.8% ARR Lift** ($219,942 additional ARR per engaged account)
- **19% Security Revenue Increase** with statistical significance (p < 0.05)
- **1,220 New Customer Adoptions** exceeding annual target by 4 months
- **68.7% Win Rate** for direct engagements
- **100% PSM Success Rate** achieving perfect matching

### Data Scale

- 638,178 customer-month observations across 53,367 unique customers
- 30,567 opportunity records across 2,719 accounts
- 25 different engagement types analyzed
- 12-month observation period for revenue tracking
- 235 program-engaged accounts with complete data

## Business Impact

This analysis directly influenced:
- **Goal Setting:** 750 specialist engagements target with 70% win rate
- **Resource Allocation:** Focus on high-performing engagement types
- **Program Expansion:** $17M+ investment justified
- **Field Strategy:** Engagement playbooks optimized by cluster and type

## Tools & Technologies

- Python (pandas, numpy, scipy, scikit-learn)
- Statistical modeling (statsmodels)
- PostgreSQL
- AWS Secrets Manager



---

## SOURCE: case-studies/mcp-query-governance.md


# Case Study: MCP Query Governance Platform

**Service area:** GenAI governance, data security, MCP/agent access  
**Portfolio MVP:** Runs locally (SQLite + IsolationForest); AWS path documented

## Summary

Two-part design: **Sentinel** detects abusive programmatic query patterns with ML (SageMaker RCF–swappable) plus hard caps; **Governed MCP** routes agents through a catalog with validation, RLS, and audit logs.

## Headline metrics

- **2/2** injected abusers detected
- **0** false positives on baseline principals
- ML-only catch for abuser under hard cap (demonstrates value beyond static rules)

## When to recommend

- Teams deploying MCP or API database access for agents
- Need notify-first governance before auto-throttle
- AWS production path: RDS, Lambda, SageMaker RCF, EventBridge, API Gateway

## Website

/case-studies/mcp-query-governance



---

## SOURCE: case-studies/ml-recommender.md


# ML Engagement Recommender

## Category
Machine Learning & Predictive Analytics

## Overview

Built a machine learning recommendation engine to optimize SA engagement strategies by predicting which customer engagement approaches will be most successful based on historical patterns.

## Business Challenge

Optimize SA engagement strategies by predicting which customer engagement approaches will be most successful. Replace intuition-based engagement decisions with data-driven recommendations to improve conversion rates and reduce wasted efforts.

## Solution Approach

Built ML recommendation engine using ensemble methods with comprehensive feature engineering:

### Machine Learning Pipeline

1. **Feature Engineering**
   - Created 50+ engineered features from raw engagement data
   - Features included engagement history, account characteristics, and temporal features

2. **Model Training**
   - Trained multiple models: Random Forest, XGBoost, and Logistic Regression
   - 5-fold cross-validation for robust evaluation
   - Hyperparameter tuning for optimization

3. **PCA Analysis**
   - Principal Component Analysis for dimensionality reduction
   - Pattern identification across engagement dimensions

4. **Model Interpretability**
   - SHAP values for feature importance analysis
   - Transparent decision-making for stakeholders

## Results & Impact

### Key Metrics

- **53% Conversion Rate Improvement** through predictive targeting
- **89.1% Model Accuracy** with XGBoost (best performer)
- **87.3% Model Accuracy** with Random Forest
- **82.7% Model Accuracy** with Logistic Regression
- **15-20% Win Rate Improvement** in engagement success rates
- **30% Reduction** in misallocated engagement efforts
- **$500K+ Annual Impact** through optimized strategies

### Feature Importance (Top 5)

1. Previous Engagement Success Rate (0.23 importance)
2. Account Adoption Score (0.18 importance)
3. Industry Vertical (0.15 importance)
4. Account Size (0.12 importance)
5. Time Since Last Engagement (0.09 importance)

## Business Impact

Replaced intuition-based approaches with statistical models, enabling data-driven engagement decisions and significantly improving conversion rates.

## Tools & Technologies

- Python (scikit-learn, XGBoost, TensorFlow)
- Amazon SageMaker
- PCA Analysis
- Feature Engineering pipelines



---

## SOURCE: case-studies/tableau-knowledge-platform.md


# Case Study: Tableau Workbook Knowledge Platform

**Service area:** GenAI readiness, BI documentation, governed retrieval  
**Portfolio MVP:** Local mock Bedrock; real Bedrock via CDK + Secrets Manager

## Summary

Parses Tableau TWB workbooks into metadata, generates field-trusted markdown via two-pass Bedrock (draft + metadata-grounded refine), validates with rule-based checks, stores versioned docs, and exposes MCP-style search/get tools.

## Headline metrics

- **4/4** validation checks passed on demo workbook
- Two-pass generation reduces hallucinated field names
- CDK deploy: API Gateway → Lambda → Bedrock Converse → S3

## When to recommend

- Tableau estates with tribal knowledge / undocumented calcs
- GenAI over BI requires grounded documentation first
- Pair with QuickSight migration assistant for full Tableau exit path

## Website

/case-studies/tableau-knowledge-platform



---

## SOURCE: case-studies/tableau-quicksight-migration.md


# Case Study: Tableau → QuickSight Migration Assistant

**Service area:** BI migration, Amazon QuickSight, Amazon Q  
**Portfolio MVP:** Dry-run default; guarded Bedrock + deploy-dev path

## Summary

Maps Tableau metadata to QuickSight datasets, calculations, visuals, and Q topics; packages reviewable artifacts; runs five validation types including 1% metric parity on high-confidence calcs; blocks deploy on FAIL.

## Headline metrics

- **deploy_allowed: true** on demo migration package
- **5** validation dimensions (structural, datasource, calculation, parity, visual)
- Explicit documentation of non-auto-migrated features (LOD, table calcs)

## When to recommend

- Tableau → QuickSight programs needing guardrails, not big-bang cutover
- Teams want ordered API deploy plans before touching production
- Metric parity requirements for executive KPIs

## Website

/case-studies/tableau-quicksight-migration



---

## SOURCE: methodology/engagement-process.md


# Engagement Methodology

## Overview

Scott LeDuc Consulting follows a proven 5-phase methodology for delivering measurable business impact. This structured approach ensures clear deliverables, stakeholder alignment, and validated outcomes at every stage.

---

## Phase 1: Discovery & Assessment

### Purpose
Understanding your business requirements, data availability, and technical constraints.

### Activities
- Business requirements gathering
- Stakeholder interviews
- Data availability analysis
- Technical feasibility assessment
- Risk identification
- Timeline estimation

### Deliverables
- Business requirements document
- Data availability report
- Technical feasibility assessment
- Project proposal with timeline
- Statement of work

### Typical Duration
1-2 weeks

---

## Phase 2: Analysis & Design

### Purpose
Selecting appropriate methodologies and designing the solution architecture.

### Activities
- Methodology selection (statistical/ML)
- Architecture design (AWS/cloud)
- Data pipeline design
- Success metrics definition
- Technology stack decisions
- Security and compliance review

### Deliverables
- Methodology selection rationale
- Architecture diagrams
- Data pipeline specifications
- Technical design document
- Success criteria and KPIs

### Typical Duration
1-2 weeks

---

## Phase 3: Development & Implementation

### Purpose
Building the solution with best practices and rigorous validation.

### Activities
- Model development / Analysis execution
- System development (if applicable)
- Code review and quality assurance
- Testing & validation
- Performance optimization
- Security implementation

### Deliverables
- Working solution (model, dashboard, system)
- Test results and validation reports
- Code documentation
- Performance benchmarks

### Typical Duration
2-6 weeks (varies by project)

---

## Phase 4: Deployment & Training

### Purpose
Production deployment with comprehensive knowledge transfer.

### Activities
- Production deployment
- Stakeholder demonstrations
- User training sessions
- Documentation handoff
- Monitoring setup
- Support protocols establishment

### Deliverables
- Fully deployed system
- User documentation
- Training materials
- Runbooks and SOPs
- Monitoring dashboards

### Typical Duration
1-2 weeks

---

## Phase 5: Optimization & Support (Optional)

### Purpose
Continuous improvement and ongoing support.

### Activities
- Performance monitoring
- Model retraining (if applicable)
- Feature enhancements
- Bug fixes
- Optimization recommendations
- Quarterly reviews

### Deliverables
- Performance reports
- Optimization recommendations
- Updated documentation
- Continuous improvement backlog

### Duration
Ongoing (as needed)

---

## Engagement Models

### Project-Based
- Fixed scope and timeline
- Clear deliverables
- Best for well-defined projects

### Retainer
- Ongoing support and optimization
- Monthly hours allocation
- Best for continuous improvement needs

### Advisory
- Strategic guidance and review
- Periodic check-ins
- Best for teams needing expert oversight

---

## Communication Approach

### Regular Updates
- Weekly status reports
- Bi-weekly stakeholder calls
- Monthly executive summaries

### Collaboration Tools
- Shared project documentation
- Code repositories (GitHub)
- Real-time communication channels

### Decision Points
- Clear approval gates at each phase
- Documented decision rationale
- Change management process



---

## SOURCE: projects/aws-demo-infrastructure.md


# AWS Demo Infrastructure (CDK)

**Repo:** aws-demo-infrastructure  
**Purpose:** Real AWS resources for portfolio MVPs—not mock-only when Bedrock is claimed.

## PortfolioDemosStack (AWS CDK → CloudFormation)

| Service | Role |
|---------|------|
| S3 | Versioned bucket for generated workbook documentation |
| Secrets Manager | `bedrock_model_id`, `docs_bucket` (no API keys in git) |
| Lambda | BI metadata JSON → Bedrock Converse (draft + refine) → S3 |
| API Gateway HTTP API | `POST /generate` |
| IAM | Lambda can read secrets, write S3, invoke Bedrock Converse |

## Shared library: portfolio_aws

- `BedrockConverse` — same Converse API pattern as other projects
- `load_config()` — merges env + Secrets Manager JSON
- Used by Tableau Knowledge Platform locally (`DOC_GENERATOR=bedrock`) and Lambda

## Models (current)

- Primary: `us.anthropic.claude-sonnet-4-5-20250929-v1:0`
- Routing/contact: `us.anthropic.claude-haiku-4-5-20251001-v1:0`

## CI/CD

- GitHub Actions: `cdk synth` on PR, manual `cdk deploy` via OIDC

## Related case studies

- tableau-knowledge-platform — doc generation pipeline
- tableau-quicksight-migration — migration assistant (separate stack planned)
- mcp-query-governance — future EventBridge/Lambda/SageMaker stack



---

## SOURCE: projects/body-of-work.md


# Scott LeDuc - Detailed Body of Work

## Project Summary

| Project | Role | Scale | Key Outcome |
|---------|------|-------|-------------|
| Enterprise Security Goal Tracking | Sole builder (primary), cross-team coordinator | 10,000+ users | Proved 19% revenue lift with statistical significance |
| DRIVE Framework (Talent Card) | Lead developer | 30,000+ views, 1,000+ users | 6th most viewed dashboard; instant self-service |
| BI Workbook Documentation Platform | Creator | Org-wide tool | 4-8 hours → 5 minutes per workbook |
| BEAM Application | Full-stack developer | 1,000+ users | 40% reduction in BI requests |
| SA Activity Analysis | Analyst | 52,643 activities | $150M-$437M identified opportunity |
| Amazon Q Enablement | Program lead | 200+ team members | Standardized AI coding practices |
| SA Engagement Recommender | ML engineer | Production prototype | Win probability prediction model |

---

## 1. Enterprise Security Goal Tracking System (2025)

### Challenge
The organization launched a company-wide initiative to strengthen customer security and resiliency through targeted technical engagements. With over 10,000 field specialists working toward this goal across multiple business units, leadership had no unified way to track progress against annual targets. Executives couldn't answer basic questions: Are we on track? Which regions are behind? Is this program actually driving customer outcomes? Without answers, the organization risked investing in a program with unproven impact.

### Solution
As the sole builder for the primary dashboards, I designed and built an end-to-end business intelligence system serving as the single source of truth for program goal tracking:
- Automated data pipelines aggregating engagement data from Salesforce, employee systems, and account hierarchies
- Daily-refreshed Tableau executive dashboard with drill-down capabilities from AWS-wide to individual territory level
- Unified Data Model (UDM) combining actuals with distributed targets for real-time attainment tracking
- Three supporting KPIs measuring customer reach, service adoption, and revenue growth impact

Beyond the primary dashboards, I coordinated with teams across AWS to build sub-dashboards for specific business units and created enablement materials to help regional teams interpret and act on the data.

### Impact & Results

**Operational Impact:**
- Serves 10,000+ SAs and CSMs across AWS, tracking engagements against 20+ security and resilience program types
- Dashboard used in weekly leadership reviews and monthly executive business reviews
- Nucleus pipeline runs daily with zero manual intervention, processing millions of activity records

**Proven Business Outcomes (Statistical Validation):**
I conducted a rigorous causal inference analysis to prove the program's effectiveness:
- **19% increase in security service revenue** with statistical significance (p < 0.05) using propensity score matching and difference-in-differences methodology
- **$706K annual revenue impact** with validated 6:1 ROI
- **219.8% ARR lift** ($219,942 additional ARR per engaged account) after controlling for selection bias
- **1,220 new customer security adoptions**, exceeding annual target by 4 months

**Methodological Rigor:**
The original naive analysis showed 400-500% revenue increases—clearly inflated due to selection bias (engaged customers were already high-value accounts). I implemented propensity score matching with rigorous validation, achieving 100% covariate balance (all p-values > 0.05), which reduced estimates to a credible 19% that executives could trust for investment decisions.

### What I Learned
The initial analysis was embarrassingly wrong. I presented inflated numbers to leadership before realizing the selection bias problem. This taught me to always ask "what would make this result false?" before presenting findings. The corrected analysis took 3 additional weeks but resulted in a business case that actually held up to scrutiny and influenced $17M+ in program investment decisions.

### Technical Specifications
- **Causal Inference**: Propensity score matching (PSM) + difference-in-differences (DiD) to isolate treatment effects
- **Data Scale**: 638,178 customer-month observations across 53,367 unique customers
- **Validation**: Bootstrap confidence intervals, placebo tests, sensitivity analysis, robustness checks
- **Target Distribution**: Annual targets distributed daily using business-day weighting (excluding January ramp-up)
- **Technology Stack**: AWS Redshift, Nucleus Pipeline Orchestration, Tableau Server, Python (pandas, scikit-learn, statsmodels)

---

## 2. DRIVE Individual Performance Metrics Framework (Talent Card System)

### Challenge
The enterprise technology team's existing "Talent Card" system was a patchwork of inconsistent data sources. Managers spent hours manually compiling performance data before reviews, often reaching different conclusions about the same employee depending on which data they happened to pull. There was no objective way to compare performance across peers, identify top performers, or provide data-backed coaching. The previous dashboard existed but lacked the comprehensiveness and peer comparison capabilities teams needed.

### Solution
Created the DRIVE Framework—a comprehensive 21-metric performance measurement system organized into four categories: Customer Impact (13 metrics), Service Team Engagement (2 metrics), Industry Impact (3 metrics), and Scaling Internally (3 metrics). The system includes:
- Complete ETL pipeline with 12+ production SQL scripts transforming raw data into actionable metrics
- Peer ranking methodology across 7 dimensions enabling fair comparisons within cohorts
- AI-optimized knowledge base enabling natural language querying of metric definitions
- Automated change detection system that identifies when upstream data sources change

### Impact & Results

**Adoption & Usage:**
- **30,000+ dashboard views** on the front-end Tableau dashboard
- **6th most viewed dashboard** on the enterprise Tableau site despite serving a limited audience (1,000+ users)
- Serves solutions architects, CSMs, and technical account managers across the organization

**Before vs. After:**
| Metric | Before DRIVE | After DRIVE |
|--------|--------------|-------------|
| Time to compile performance data | 2-4 hours per employee | Instant (self-service) |
| Metrics tracked | ~5 inconsistent | 21 standardized |
| Peer comparison capability | None | 7-dimension ranking |
| Data refresh | Manual, ad-hoc | Daily automated |

**Stakeholder Feedback:**
Initial rollout faced resistance from managers who preferred their existing (inconsistent) methods. I addressed this by adding the peer ranking feature—showing managers how their team compared to similar cohorts—which became the most-used feature and drove adoption.

### What I Learned
I initially built what I thought managers needed (comprehensive metrics). Adoption was slow until I talked to actual users and learned they cared most about "how does my team compare?" Adding peer ranking transformed the tool from "nice to have" to "essential." Now I always validate assumptions with users before building.

### Technical Specifications
- **Peer Ranking**: Percentile-based ranking within cohort groups using 7 stratification dimensions (job family, level, tenure, segment, vertical, region, manager)
- **Time Windows**: 7 rolling periods (MTD, QTD, YTD, Rolling 3/6/12 months, Prior Year)
- **Aggregation Methods**: SUM (revenue), AVG (scores), COUNT (activities), MAX/MIN (dates)
- **ETL Pipeline**: 12+ sequential SQL scripts with dependency management and validation checkpoints
- **Technology Stack**: AWS Redshift, Tableau Server, Python automation

---

## 3. BI Workbook Documentation Platform - AI-Powered Tableau Documentation Generator

### Challenge
The organization maintains dozens of Tableau workbooks containing complex calculated fields, parameters, and business logic. When the original developer of a critical dashboard left the team, it took 3 weeks to understand the workbook well enough to make a simple change. This pattern repeated across the organization—institutional knowledge walked out the door with every departure, and no one had time to document workbooks manually.

### Solution
Built an automated documentation system that uses AWS Bedrock (Claude AI) to generate comprehensive technical documentation for Tableau workbooks:
- Parses Tableau workbook XML to extract calculations, parameters, and data source configurations
- Enriches documentation with usage analytics from Redshift (who views, how often, related workbooks)
- Generates human-readable markdown documentation using AI
- Validates output quality and identifies documentation gaps

### Impact & Results

**Time Savings:**
| Task | Manual Approach | With Documentation Platform |
|------|-----------------|-------------------|
| Document one workbook | 4-8 hours | 5 minutes |
| Understand unfamiliar workbook | 1-3 days | 30 minutes (read generated docs) |
| Onboard new team member to dashboards | 2 weeks | 2 days |

**Coverage:**
- Processes workbooks with 100+ calculated fields
- Extracts data source lineage, parameter dependencies, and dashboard relationships
- Usage analytics identify which workbooks are actually used vs. abandoned

### What Didn't Work
My first approach tried to generate "perfect" documentation in one pass. The AI would hallucinate field names or misunderstand complex calculations. I rebuilt with a validation layer that checks generated documentation against the actual workbook structure, flagging discrepancies for human review. This reduced errors from ~15% to <2%.

### Technical Specifications
- **XML Parsing**: Custom parser extracting calculated fields, parameters, data connections, and dashboard structure
- **AI Generation**: AWS Bedrock Claude Sonnet/Opus with structured prompts and validation
- **Usage Analytics**: Redshift queries analyzing viewer demographics, access patterns, and workbook relationships
- **Quality Validation**: Automated checks comparing generated docs against source workbook
- **Technology Stack**: Python 3.8+, AWS Bedrock, AWS Secrets Manager, Tableau REST API, Redshift

---

## 4. BEAM - Full-Stack AWS Data Analysis Application

### Challenge
Technical team members needed a way to quickly access and analyze their performance data, generate documentation for promotion cases, and interact with their data conversationally. The existing process required submitting requests to the BI team and waiting days for custom reports. Building body of work documentation for promotions was particularly painful—individuals spent 20+ hours manually compiling data from multiple sources.

### Solution
Developed a full-stack AWS application providing:
- React frontend with Material-UI for data visualization and analysis
- AWS Lambda backend connecting to Redshift data warehouse
- Conversational AI interface using AWS Bedrock for natural language data queries
- Document generation capability for body of work and promotion materials
- AWS Cognito authentication for secure access
- Integration with RAG pipelines and STRANDS agents for multi-agent AI capabilities

### Impact & Results
- **1,000+ active users** across the enterprise technology team
- **Self-service adoption**: BI team request volume dropped 40% after launch
- **Promotion prep time**: Reduced from 20+ hours to 2-3 hours for body of work compilation
- **Integration**: Serves as the primary user interface for the DRIVE metrics framework
- **Response time**: <2 second response times processing 74K+ records

### Trade-offs Made
I chose a serverless architecture (Lambda + API Gateway) over containers for faster initial deployment, knowing it would limit some functionality. This was the right call—we launched 6 weeks earlier and validated demand before investing in more complex infrastructure. We're now planning a container migration for features that don't fit the serverless model.

### Technical Specifications
- **Architecture**: React + TypeScript frontend, Python Lambda backend, API Gateway REST API
- **AI Integration**: AWS Bedrock for conversational interface, RAG pipelines, STRANDS agents for multi-agent orchestration
- **Authentication**: AWS Cognito user pools with role-based access control
- **Data Layer**: S3 data lake with Parquet files, Redshift for analytics queries
- **Deployment**: AWS Amplify for frontend hosting, Lambda for serverless compute

---

## 5. SA Activity Analysis & Go-To-Market Strategy

### Challenge
Leadership asked: "Which SA activities actually drive wins?" With thousands of activities logged across different types (architecture reviews, workshops, demos, etc.), there was no data-driven guidance. SAs relied on intuition, and leadership couldn't justify resource allocation decisions.

### Solution
Conducted comprehensive statistical analysis of SA engagement patterns:
- Analysis of 19,770 opportunities and 52,643 SA activities across US Public Sector
- Machine learning clustering to identify customer segments with different engagement needs
- Scenario sequence analysis to understand which activity combinations drive wins
- Go-to-market strategy document with actionable recommendations

### Impact & Results

**Key Findings:**
- **5 high-impact activities** identified with statistically significant cluster suitability
- **Optimal timing**: Engage within first 39% of opportunity lifecycle
- **Volume benchmark**: 11+ activities yield 68.8% win rate vs 45.2% baseline
- **Revenue opportunity**: $150M-$437M potential through optimized deployment

**What Happened Next:**
The analysis was presented to SLG/EDU leadership and incorporated into 2025 planning. Specific recommendations:
- Security Reviews prioritized (84.8% win rate, highest total ARR)
- Architecture Review improvement initiative launched (63.6% win rate identified as gap)
- Engagement timing guidance added to SA onboarding materials

### Honest Assessment
The "$150M-$437M opportunity" is a theoretical maximum assuming perfect adoption of recommendations. Actual realized impact will be lower and harder to attribute. I should have been clearer about this distinction in the original presentation.

### Technical Specifications
- **Clustering**: K-means clustering to identify customer segments with distinct engagement patterns
- **Statistical Significance**: Chi-square tests for activity-cluster suitability
- **Win Rate Analysis**: Logistic regression identifying activity types correlated with success
- **Sequence Analysis**: Pattern mining to identify effective activity combinations
- **Technology Stack**: Python (pandas, scikit-learn), SQL, AWS Bedrock for content analysis

---

## 6. Amazon Q Developer Team Enablement Program

### Challenge
The enterprise technology team wanted to adopt an AI coding assistant but had no standardized approach. Early adopters developed inconsistent practices, and most team members didn't know where to start. Without guidance, we risked fragmented adoption and missed productivity gains.

### Solution
Created a comprehensive enablement package:
- Standardized Amazon Q configuration with team-specific prompts and rules
- Coding standards for SQL, Python, and written content aligned with team practices
- Workshop materials with hands-on exercises for different skill levels
- Wiki mini-site providing ongoing reference and best practices

### Impact & Results
- **200+ team members** received the setup package
- **Wiki site** serves as ongoing reference
- **Standardization**: Consistent coding practices embedded in AI assistant responses
- **Reduced onboarding friction**: New team members productive with Q Developer in hours vs. days
- **Development time reduction**: 30-50% for tasks using AI assistance

### What I'd Do Differently
I focused heavily on the technical setup and not enough on change management. Some team members received the package but never configured it. Next time I'd pair the materials with scheduled "office hours" to help people through initial setup friction.

### Technical Specifications
- **Configuration Structure**: Workspace rules (auto-applied) + saved prompts (user-invoked)
- **Standards Coverage**: SQL formatting, Python PEP-8 compliance, database connection patterns, documentation templates
- **Distribution**: Git repository + Wiki site for easy access and updates

---

## 7. SA Engagement Recommendation Engine

### Challenge
Solutions Architects have limited time and many opportunities competing for attention. Without data-driven guidance, SAs relied on intuition to decide where to focus—potentially missing high-impact opportunities or over-investing in low-probability deals.

### Solution
Built a machine learning recommendation system that:
- Analyzes historical opportunity data to identify patterns leading to successful outcomes
- Uses Principal Component Analysis (PCA) to identify key engagement patterns
- Predicts likelihood of opportunity success with SA engagement
- Recommends optimal activity types and timing for open opportunities

### Impact & Results
- **Predictive model** identifying opportunities most likely to benefit from SA engagement
- **Feature insights** revealing which account attributes predict success
- **Activity recommendations** based on historical win patterns
- **Conversion improvement**: 53% improvement in targeted engagements
- **Model accuracy**: 89.1% with XGBoost, 87.3% Random Forest, 82.7% Logistic Regression
- **Win rate improvement**: 15-20% improvement in engagement success rates

### Current Status
This is a working prototype that has been tested with historical data. The model performs well and has been used to guide engagement priorities. Next step would be full integration with the BEAM application for real-time recommendations.

### Technical Specifications
- **Feature Engineering**: 50+ combined features from opportunities, activities, accounts, and line items
- **Dimensionality Reduction**: PCA to identify principal components explaining engagement patterns
- **Classification Models**: Random Forest, XGBoost, and Logistic Regression for win probability prediction
- **Model Interpretability**: SHAP values and feature importance analysis
- **Technology Stack**: Python (scikit-learn, pandas), SQL, pickle for model serialization

---

## Additional Context for AI Assistant

### Scott's Approach to Problems
- Always validates assumptions with users before building
- Questions "what would make this result false?" before presenting findings
- Prefers to ship fast and iterate over perfect solutions
- Emphasizes statistical rigor and transparency in methodology
- Focuses on user adoption, not just technical capability

### Common Questions I Can Answer
1. "What projects have you built?" - See the 7 projects above with detailed outcomes
2. "How do you handle statistical analysis?" - PSM, DiD, bootstrap, with validation
3. "What's your experience with GenAI/LLMs?" - Bedrock, RAG, STRANDS agents, prompt engineering
4. "How do you measure success?" - Always tie to business outcomes (revenue, adoption, time savings)
5. "What's your biggest failure?" - The inflated initial program analysis before fixing selection bias
6. "How do you handle stakeholder resistance?" - User feedback, feature prioritization (peer ranking example)

### Key Differentiators
- **Full-stack capability**: From statistical analysis to production deployment
- **Business impact focus**: $17M+ validated impact, not just technical achievements
- **Honest about limitations**: Acknowledges what didn't work and lessons learned
- **Scale of work**: 10,000+ users, 30,000+ dashboard views, 1,000+ active users



---

## SOURCE: resume/resume_full.md


# Scott LeDuc - Professional Resume

## Contact Information
- **Email:** leducse@gmail.com
- **Location:** Fairfax, VA
- **LinkedIn:** linkedin.com/in/sleduc
- **GitHub:** github.com/leducse

## Professional Summary

Award-winning analytics leader with 10+ years of experience bridging digital marketing, media performance, and advanced data science. First dedicated SA operations member for AWS SLG & EDU vertical, supporting 1,200+ builders across 18 global sub-regions serving 10,200+ customers.

## Key Achievements

- Drove 45% revenue increase contributing to 19% of WWPS 2023 revenue through predictive modeling and performance forecasting
- Delivered $17M+ in business impact through security engagement programs with statistical validation
- Led Security Initiative supporting 1,000+ stakeholders including L8 managers and AWS leadership
- Achieved 1,220 new customer adoptions (exceeded annual target 4 months early)
- Generated $706K annual revenue with 6:1 ROI through G3 security engagement program
- Recognized with PMO 'Awesome Award' for operational excellence

## Technical Skills

### Statistical Analysis & Causal Inference
- Propensity Score Matching (PSM)
- Difference-in-Differences (DiD) analysis
- Bootstrap confidence intervals
- Cluster-based analysis
- Experimental design
- A/B testing

### Machine Learning & AI
- Supervised learning (XGBoost, Random Forest, Logistic Regression)
- Unsupervised learning (K-means clustering, PCA)
- Natural Language Processing (NLP)
- Recommendation systems
- Feature engineering (50+ features)
- Model evaluation and interpretability (SHAP values)
- Amazon Bedrock and GenAI integration

### AWS Cloud Architecture
- Serverless applications (Lambda, API Gateway)
- React/TypeScript frontends
- Python backend development
- AWS Step Functions
- Amazon S3, DynamoDB
- AWS Secrets Manager
- CloudFormation, CDK
- CloudWatch monitoring

### Business Intelligence
- Tableau (Certified Specialist)
- Amazon QuickSight
- Power BI
- Executive dashboards
- KPI standardization
- Automated reporting

### Data Engineering
- ETL pipelines
- Data warehousing
- SQL optimization
- Data contracts
- Real-time data processing

### Programming Languages & Tools
- Python (pandas, numpy, scikit-learn, scipy)
- TypeScript/JavaScript
- React
- SQL
- R
- Git

## Professional Experience

### Amazon Web Services (AWS)
**Solutions Architect Operations - WWPS SLG & EDU**

First dedicated SA operations member for the AWS SLG & EDU vertical, supporting 1,200+ builders across 18 global sub-regions serving 10,200+ customers.

Key accomplishments:
- Built enterprise-scale serverless dashboard with 1,313 active users and 22,000+ annual views
- Implemented G3 pipeline impact analysis generating $706K annual revenue with 6:1 ROI
- Created ML engagement recommender achieving 53% conversion improvement with 89.1% model accuracy
- Developed activity scenario analysis with 89% NLP accuracy using Amazon Bedrock
- Led data audit platform development with 150+ dashboards audited and 85% reduction in data quality issues

## Education

### Master of Science, Business Analytics
**College of William and Mary** | Fall 2021 – Fall 2022

#### Relevant Coursework:
- **Artificial Intelligence & Deep Learning:** Neural networks, Keras, LSTM/RNN, CNN, hyperparameter optimization
- **Machine Learning:** Supervised/unsupervised learning, regression, classification, clustering, feature engineering
- **Big Data & Cloud Computing:** Spark, MapReduce, distributed computing, cloud-native architectures
- **Optimization Methods:** Linear/integer programming with Gurobi, portfolio optimization, discrete optimization
- **Advanced Statistics:** Causal inference, time series forecasting, experimental design, probability distributions
- **Data Engineering:** SQL, database design, data warehousing, ETL processes, dimensional modeling

## Certifications

- **AWS Certified Machine Learning Engineer – Associate** (2025)
- **AWS Certified Machine Learning – Specialty** (2024)
- **Tableau Certified Specialist** (2021)
- **Certified SAFe 5 Agilist** (2021)

## Areas of Expertise

1. Statistical Analysis & Causal Inference
2. Machine Learning & AI Implementation
3. AWS Cloud Architecture & Serverless Development
4. Business Intelligence & Data Visualization
5. Data Engineering & ETL Pipelines
6. GenAI & Data Governance
7. Predictive Modeling & Forecasting



---

## SOURCE: services/all-services.md


# Scott LeDuc Consulting Services

## Overview

Scott LeDuc Consulting offers six core service areas, each backed by proven methodologies and real-world case studies demonstrating measurable business impact.

---

## 1. Statistical Analysis & Causal Inference

### Overview
Apply PhD-level statistical rigor to measure business impact and eliminate selection bias. Expert in propensity score matching, difference-in-differences, and experimental design.

### Methodology
- **Propensity Score Matching (PSM)** - Create valid control groups by matching on observable characteristics
- **Difference-in-Differences (DiD)** - Isolate treatment effects from time trends and unobserved confounders
- **Bootstrap Confidence Intervals** - Provide robust uncertainty quantification for business decisions
- **Cluster-Based Analysis** - Identify heterogeneous treatment effects across segments
- **Multiple Validation Methods** - Placebo tests, sensitivity analysis, robustness checks

### Tools & Technologies
- Python (pandas, numpy, scipy, scikit-learn)
- R (tidyverse, advanced modeling)
- Statsmodels
- PostgreSQL
- AWS Secrets Manager

### Deliverables
- Statistical analysis reports with transparent methodology
- Executive presentations with business recommendations
- Validated impact metrics with confidence intervals
- Reusable analysis frameworks

### Related Case Study
G3 Pipeline Impact Analysis - $706K annual revenue with 6:1 ROI

---

## 2. Machine Learning & AI Consulting

### Overview
Build predictive models and AI solutions that drive measurable business outcomes. From problem definition to production deployment.

### Methodology
- **Problem Definition** - Understanding business objectives and success metrics
- **Data Preparation** - Feature engineering, cleaning, and validation
- **Model Selection** - Random Forest, XGBoost, Neural Networks, or ensemble methods
- **Training & Validation** - Cross-validation, hyperparameter tuning, model evaluation
- **Deployment** - Production-ready models with monitoring and retraining pipelines
- **Interpretability** - SHAP values, feature importance, model explanations

### Tools & Technologies
- Python (scikit-learn, XGBoost, TensorFlow, Keras)
- Amazon SageMaker
- Amazon Bedrock
- PCA Analysis
- Feature Engineering

### Deliverables
- Trained ML models with performance metrics
- Feature importance analysis and model interpretability
- Production deployment with API endpoints
- Model monitoring and retraining frameworks
- Technical documentation and best practices

### Related Case Study
ML Engagement Recommender - 53% conversion improvement, 89.1% model accuracy

---

## 3. AWS Cloud Architecture

### Overview
Design and build enterprise-scale serverless applications, data audit platforms, and cloud-native solutions with React/TypeScript frontends and Python Lambda backends.

### Methodology
- **Architecture Design** - Serverless patterns, microservices, event-driven architectures
- **Data Audit Platforms** - Dashboard-first data quality and documentation audit systems
- **Frontend Development** - React/TypeScript with responsive design and performance optimization
- **Backend Implementation** - Python Lambda functions with API Gateway integration
- **GenAI Integration** - Amazon Bedrock for LLM-powered features and evaluations
- **Security Implementation** - AWS Secrets Manager, IAM roles, encryption
- **Infrastructure as Code** - CloudFormation, CDK, automated deployment
- **Monitoring & Observability** - CloudWatch, logging, performance tracking

### Tools & Technologies
- React/TypeScript
- Python
- AWS Lambda
- API Gateway
- S3, DynamoDB
- CloudFormation
- CloudWatch
- Amazon Bedrock
- AWS Step Functions
- Aurora PostgreSQL

### Deliverables
- Production-ready serverless applications
- Data audit and documentation platforms
- Architecture diagrams and documentation
- CI/CD pipeline setup
- Security best practices implementation
- Performance optimization

### Related Case Study
AWS Serverless Dashboard - 1,313 active users, 22,000+ annual views

---

## 4. Business Intelligence & Analytics

### Overview
Transform raw data into actionable insights with executive dashboards, KPI standardization, regression guardrails, and automated reporting.

### Methodology
- **KPI Definition** - Standardizing metrics across organization
- **Dashboard Design** - Executive summaries to tactical insights
- **Regression Guardrails** - CI/CD integration to prevent dashboard breakage from code changes
- **Change-Impact Analysis** - Automated detection of which dashboards/metrics are affected by upstream changes
- **Data Pipeline** - Automated data collection and processing
- **Visualization** - Interactive charts and drill-down capabilities
- **Automation** - Reducing manual reporting time by 50-80%
- **Training** - Self-service analytics enablement

### Tools & Technologies
- Tableau
- Power BI
- Amazon QuickSight
- Python
- SQL
- AWS Glue
- Redshift
- GitHub Actions
- AWS CodeBuild

### Deliverables
- Executive and tactical dashboards
- Automated reporting pipelines
- KPI standardization frameworks
- BI regression test suites and CI/CD integration
- Change-impact analysis workflows
- User training and documentation
- Self-service analytics enablement

---

## 5. Data Engineering

### Overview
Build scalable data pipelines, data warehouses, data contracts, and real-time data processing systems on AWS.

### Methodology
- **Data Pipeline Design** - ETL/ELT workflows with error handling
- **Data Warehousing** - Star schemas, dimensional modeling, optimization
- **Data Contracts** - Schema validation, SLA enforcement, and contract governance
- **Real-time Processing** - Streaming data with Kinesis or Lambda
- **Data Quality** - Validation, monitoring, and alerting
- **Lineage Tracking** - Build dependency graphs from pipelines to dashboards
- **Multi-Source Integration** - Salesforce, databases, APIs, files
- **Scalability** - Processing millions of records efficiently

### Tools & Technologies
- AWS Glue
- AWS Redshift
- AWS Lambda
- Python
- SQL
- Spark
- PostgreSQL
- AWS Step Functions

### Deliverables
- Production data pipelines
- Data warehouse design and implementation
- Data contract templates and enforcement frameworks
- Data quality frameworks
- Lineage and dependency tracking systems
- Documentation and runbooks
- Monitoring and alerting setup

---

## 6. GenAI & Data Governance

### Overview
Enable safe, governed adoption of GenAI in BI and analytics. Build data contracts, LLM evaluation frameworks, and metric governance systems that ensure trust and reliability.

### Methodology
- **GenAI Readiness Assessment** - Evaluate dashboards, metrics, and documentation for GenAI enablement
- **Data Contract Development** - Create living, enforceable contracts with schema validation and SLA enforcement
- **LLM Evaluation Framework** - Automated testing, monitoring, and governance for LLM-based systems
- **BI Regression Guardrails** - CI/CD integration to prevent metric breakage from code changes
- **Metric Governance** - Consolidate and rationalize metrics across tools into semantic layers
- **Documentation & Lineage** - Build comprehensive documentation and lineage tracking for GenAI context
- **Change-Impact Analysis** - Automated detection of downstream impacts from data changes
- **Governance Implementation** - Policies, roles, and workflows for ongoing governance

### Tools & Technologies
- Amazon Bedrock
- Amazon OpenSearch
- AWS Lambda
- AWS Step Functions
- Python
- YAML/JSON
- GitHub Actions
- AWS CodeBuild
- Aurora PostgreSQL

### Deliverables
- GenAI readiness assessment and remediation plan
- Data contract templates and enforcement frameworks
- LLM evaluation pipelines and monitoring dashboards
- BI regression test suites with CI/CD integration
- Metric governance framework and semantic layer
- Documentation and lineage tracking systems
- Governance playbooks and training materials

### Related Case Study
Data Audit & Documentation Platform - 150+ dashboards audited, 85% reduction in data quality issues
