# Scott LeDuc - Detailed Body of Work

## Project Summary

| Project | Role | Scale | Key Outcome |
|---------|------|-------|-------------|
| G3 SSR Goal Tracking | Sole builder (primary), cross-team coordinator | 10,000+ users | Proved 19% revenue lift with statistical significance |
| DRIVE Framework (Talent Card) | Lead developer | 30,000+ views, 1,000+ users | 6th most viewed dashboard; instant self-service |
| Project Prism | Creator | Org-wide tool | 4-8 hours → 5 minutes per workbook |
| BEAM Application | Full-stack developer | 1,000+ users | 40% reduction in BI requests |
| SA Activity Analysis | Analyst | 52,643 activities | $150M-$437M identified opportunity |
| Amazon Q Enablement | Program lead | 200+ team members | Standardized AI coding practices |
| SA Engagement Recommender | ML engineer | Production prototype | Win probability prediction model |

---

## 1. G3 2025: Strengthen Security & Resiliency (SSR) Goal Tracking System

### Challenge
AWS launched a company-wide initiative (Global Goal 3) to strengthen customer security and resiliency through targeted technical engagements. With over 10,000 Solutions Architects and Customer Solutions Managers working toward this goal across multiple business units, leadership had no unified way to track progress against annual targets. Executives couldn't answer basic questions: Are we on track? Which regions are behind? Is this program actually driving customer outcomes? Without answers, the organization risked investing in a program with unproven impact.

### Solution
As the sole builder for the primary dashboards, I designed and built an end-to-end business intelligence system serving as the single source of truth for G3 goal tracking:
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
The WWPS Tech Team's existing "Talent Card" system was a patchwork of inconsistent data sources. Managers spent hours manually compiling performance data before reviews, often reaching different conclusions about the same employee depending on which data they happened to pull. There was no objective way to compare performance across peers, identify top performers, or provide data-backed coaching. The previous dashboard existed but lacked the comprehensiveness and peer comparison capabilities teams needed.

### Solution
Created the DRIVE Framework—a comprehensive 21-metric performance measurement system organized into four categories: Customer Impact (13 metrics), Service Team Engagement (2 metrics), Industry Impact (3 metrics), and Scaling Internally (3 metrics). The system includes:
- Complete ETL pipeline with 12+ production SQL scripts transforming raw data into actionable metrics
- Peer ranking methodology across 7 dimensions enabling fair comparisons within cohorts
- AI-optimized knowledge base enabling natural language querying of metric definitions
- Automated change detection system that identifies when upstream data sources change

### Impact & Results

**Adoption & Usage:**
- **30,000+ dashboard views** on the front-end Tableau dashboard
- **6th most viewed dashboard** on the WWPS Tableau site despite serving a limited audience (1,000+ users)
- Serves Solutions Architects, CSMs, and Technical Account Managers across WWPS

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

## 3. Project Prism - AI-Powered Tableau Documentation Generator

### Challenge
The WWPS organization maintains dozens of Tableau workbooks containing complex calculated fields, parameters, and business logic. When the original developer of a critical dashboard left the team, it took 3 weeks to understand the workbook well enough to make a simple change. This pattern repeated across the organization—institutional knowledge walked out the door with every departure, and no one had time to document workbooks manually.

### Solution
Built an automated documentation system that uses AWS Bedrock (Claude AI) to generate comprehensive technical documentation for Tableau workbooks:
- Parses Tableau workbook XML to extract calculations, parameters, and data source configurations
- Enriches documentation with usage analytics from Redshift (who views, how often, related workbooks)
- Generates human-readable markdown documentation using AI
- Validates output quality and identifies documentation gaps

### Impact & Results

**Time Savings:**
| Task | Manual Approach | With Project Prism |
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
- **1,000+ active users** across the WWPS Tech Team
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
The WWPS Tech Team wanted to adopt Amazon Q Developer (AI coding assistant) but had no standardized approach. Early adopters developed inconsistent practices, and most team members didn't know where to start. Without guidance, we risked fragmented adoption and missed productivity gains.

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
5. "What's your biggest failure?" - The inflated G3 analysis before fixing selection bias
6. "How do you handle stakeholder resistance?" - User feedback, feature prioritization (peer ranking example)

### Key Differentiators
- **Full-stack capability**: From statistical analysis to production deployment
- **Business impact focus**: $17M+ validated impact, not just technical achievements
- **Honest about limitations**: Acknowledges what didn't work and lessons learned
- **Scale of work**: 10,000+ users, 30,000+ dashboard views, 1,000+ active users
