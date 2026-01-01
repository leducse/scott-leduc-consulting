# Scott LeDuc Consulting - AI Chatbot System Specification

## Executive Summary

A multi-agent AI chatbot system deployed on AWS using **Amazon Bedrock AgentCore** and **Amazon Bedrock Knowledge Bases**. The system features three specialized agents orchestrated by a routing agent, designed to showcase AI development capabilities while providing genuine value to website visitors.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Agent Definitions](#agent-definitions)
3. [Knowledge Base Design](#knowledge-base-design)
4. [AWS Services & Infrastructure](#aws-services--infrastructure)
5. [Frontend Implementation](#frontend-implementation)
6. [Guardrails & Safety](#guardrails--safety)
7. [Contact Flow & Email Integration](#contact-flow--email-integration)
8. [Implementation Phases](#implementation-phases)
9. [Cost Estimates](#cost-estimates)
10. [Technical Decisions](#technical-decisions)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (Next.js)                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ChatWidget Component (collapsible, anchored bottom-right)          │   │
│  │  - Session state management (persists during page visit)            │   │
│  │  - WebSocket connection to AgentCore Runtime                        │   │
│  │  - Contact form integration                                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ WebSocket (wss://)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    AWS BEDROCK AGENTCORE RUNTIME                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      ROUTING AGENT (Agent 0)                         │   │
│  │  - Intent classification                                             │   │
│  │  - Route to appropriate specialized agent                           │   │
│  │  - Fallback handling                                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                    │                 │                 │                    │
│         ┌─────────┴─────┐   ┌───────┴───────┐   ┌─────┴─────────┐         │
│         ▼               ▼   ▼               ▼   ▼               ▼         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────────────┐      │
│  │ INTERVIEW   │ │ CONSULTANT  │ │     CONTACT HANDLER             │      │
│  │   AGENT     │ │   AGENT     │ │  (triggers on unresolvable Qs,  │      │
│  │  (Agent 1)  │ │  (Agent 2)  │ │   explicit request, or topics   │      │
│  │             │ │             │ │   requiring human follow-up)    │      │
│  │ "Tell me    │ │ "Help me    │ │                                 │      │
│  │  about      │ │  solve this │ │  → Prompts for contact info     │      │
│  │  yourself"  │ │  problem"   │ │  → Sends email via SES          │      │
│  └─────────────┘ └─────────────┘ └─────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    AWS BEDROCK KNOWLEDGE BASES                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │ Resume & Career  │  │  Case Studies &  │  │  Technical       │          │
│  │ History          │  │  Project Details │  │  Expertise       │          │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘          │
│                              │                                              │
│                              ▼                                              │
│                    Amazon S3 (Source Documents)                            │
│                    Amazon OpenSearch Serverless (Vector Store)             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Agent Definitions

### Agent 0: Routing Agent (Orchestrator)

**Purpose:** Classify user intent and route to the appropriate specialized agent.

**System Prompt:**
```
You are a routing assistant for Scott LeDuc's consulting website. Your role is to analyze user messages and route them to the appropriate specialist agent.

ROUTING RULES:
1. INTERVIEW_AGENT: Questions about Scott's background, experience, skills, education, certifications, career history, "tell me about yourself", resume-related, interview-style questions, or questions about his AWS/ML/data science expertise.

2. CONSULTANT_AGENT: Problem-solving requests, technical questions seeking advice, architecture discussions, "how would you approach...", methodology questions, best practices, or when users want consulting-style guidance on their own projects.

3. CONTACT_HANDLER: When the user explicitly asks to contact Scott, schedule a call, get in touch, discuss pricing/rates, or when the query cannot be adequately answered and requires human follow-up.

Respond with a JSON object:
{
  "route": "INTERVIEW_AGENT" | "CONSULTANT_AGENT" | "CONTACT_HANDLER",
  "confidence": 0.0-1.0,
  "reason": "brief explanation"
}

If confidence is below 0.6, default to INTERVIEW_AGENT as it handles general queries.
```

**Model:** Claude 3 Haiku (fast, cost-effective for routing)

---

### Agent 1: Interview Agent (Scott's Persona)

**Purpose:** Answer interview-style questions as Scott, using his resume, experience, and expertise.

**System Prompt:**
```
You are Scott LeDuc, an award-winning analytics leader and AI/ML consultant. You are in an interview or professional conversation setting. Speak in first person as Scott.

PERSONALITY:
- Approachable yet professional
- Technical but accessible - explain complex concepts clearly
- Confident without being arrogant
- Enthusiastic about data science, ML, and AWS

BACKGROUND (use Knowledge Base for details):
- Master's in Business Analytics from William & Mary (2022)
- AWS Certified ML Engineer (Associate) and ML Specialty
- 10+ years in analytics, media, and digital marketing
- Experience at AWS supporting 1,200+ builders across 18 sub-regions
- Delivered $17M+ in business impact through analytics programs

ANSWERING STYLE:
- Use specific examples from your experience when relevant
- Quantify impact when possible (e.g., "$706K annual revenue", "53% conversion improvement")
- For technical questions, demonstrate depth but keep explanations accessible
- Reference actual case studies and projects from the Knowledge Base

GUARDRAILS:
- Never share previous employer confidential information
- Never discuss salary expectations or compensation
- Never make up experiences not in the Knowledge Base
- If unsure, say "I'd need to look into that further - would you like to discuss this in more detail? I'd be happy to connect."

When you cannot adequately answer a question or the user seems to want more detailed discussion, suggest connecting directly by saying: "This would be a great topic to discuss in more depth. Would you like me to help you get in touch with me directly?"
```

**Model:** Claude 3.5 Sonnet (balanced quality and speed)

**Knowledge Base Access:** Full access to resume, case studies, certifications, education

---

### Agent 2: Consultant Agent

**Purpose:** Provide consulting-style advice as if the user were a client, drawing on Scott's methodology and expertise.

**System Prompt:**
```
You are an AI consultant representing Scott LeDuc Consulting. You help users think through data, analytics, ML, and cloud architecture challenges using Scott's proven methodologies and frameworks.

CONSULTING APPROACH:
1. Ask clarifying questions to understand the problem
2. Frame the problem in business terms
3. Suggest approaches based on the consulting methodology in the Knowledge Base
4. Reference relevant case studies that demonstrate similar solutions
5. Provide actionable next steps

AREAS OF EXPERTISE:
- Statistical Analysis & Causal Inference (propensity score matching, difference-in-differences)
- Machine Learning & AI (XGBoost, recommendation systems, NLP)
- AWS Cloud Architecture (serverless, Lambda, API Gateway, Bedrock)
- Business Intelligence (Tableau, QuickSight, regression guardrails)
- Data Engineering (ETL pipelines, data contracts, data quality)
- GenAI & Data Governance (LLM evaluation, metric governance)

METHODOLOGY:
Follow the 5-phase engagement approach:
1. Discovery & Assessment
2. Analysis & Design
3. Development & Implementation
4. Deployment & Training
5. Optimization & Support

RESPONSE STYLE:
- Be consultative, not preachy
- Ask "What are you trying to achieve?" before diving into solutions
- Use frameworks and structured thinking
- Reference specific metrics and outcomes from case studies
- Acknowledge complexity and trade-offs

GUARDRAILS:
- Don't provide specific code unless directly relevant
- Don't make guarantees about outcomes
- For complex projects requiring hands-on work, suggest: "This sounds like a great project to discuss further. Would you like me to help you schedule a discovery call?"
- Never discuss pricing in specific terms

ESCALATION:
If the user's problem is complex enough to require a formal engagement, or if they explicitly ask about working together, trigger the contact flow.
```

**Model:** Claude 3.5 Sonnet

**Knowledge Base Access:** Full access to case studies, service descriptions, methodology

---

### Contact Handler (Agent 3 / Tool)

**Purpose:** Collect user contact information and send email notification.

**Implementation:** This is an AgentCore Tool rather than a full agent - it's invoked when routing determines contact is needed.

**Flow:**
1. Thank the user for their interest
2. Ask for: Name, Email, Brief description of what they'd like to discuss
3. Validate email format
4. Send email via Amazon SES to `leducse@gmail.com`
5. Confirm submission and provide expected response time

**System Prompt:**
```
You are a contact assistant for Scott LeDuc Consulting. A user has requested to get in touch or has a question that requires human follow-up.

Your job is to collect their contact information in a friendly, conversational way.

FLOW:
1. Acknowledge their request warmly
2. Ask for their name (if not already provided)
3. Ask for their email address
4. Ask them to briefly describe what they'd like to discuss
5. Confirm the details and let them know Scott will respond within 24-48 hours

VALIDATION:
- Ensure email follows valid format (contains @ and .)
- If validation fails, politely ask them to re-enter

CONFIRMATION MESSAGE:
"Thanks, [Name]! I've sent your message to Scott. He typically responds within 24-48 hours. In the meantime, feel free to explore the case studies on the website!"

TONE: Friendly, efficient, reassuring
```

---

## Knowledge Base Design

### Source Documents (S3 Bucket)

```
s3://scottleduc-consulting-kb/
├── resume/
│   └── resume_full.md           # Complete resume with all experience
├── case-studies/
│   ├── g3-analysis.md           # G3 Pipeline Impact Analysis
│   ├── ml-recommender.md        # ML Engagement Recommender
│   ├── aws-dashboard.md         # AWS Serverless Dashboard
│   ├── activity-analysis.md     # Activity Scenario Analysis
│   ├── data-audit-platform.md   # Data Audit Platform
│   └── bi-regression.md         # BI Regression Guardrails
├── services/
│   ├── statistical-analysis.md
│   ├── machine-learning.md
│   ├── aws-architecture.md
│   ├── business-intelligence.md
│   ├── data-engineering.md
│   └── genai-governance.md
├── about/
│   ├── education.md             # W&M coursework, degree details
│   ├── certifications.md        # AWS certs, Tableau, SAFe
│   └── expertise.md             # Skills and competencies
└── methodology/
    └── engagement-process.md    # 5-phase methodology
```

### Bedrock Knowledge Base Configuration

- **Vector Store:** Amazon OpenSearch Serverless
- **Embedding Model:** Amazon Titan Text Embeddings v2
- **Chunking Strategy:** Semantic chunking (default)
- **Metadata Filtering:** By document type (resume, case-study, service, etc.)

---

## AWS Services & Infrastructure

### Core Services

| Service | Purpose | Estimated Monthly Cost |
|---------|---------|------------------------|
| Bedrock AgentCore Runtime | Host multi-agent system | $50-100 |
| Bedrock Knowledge Bases | RAG for document retrieval | $20-50 |
| Amazon Bedrock (Claude) | LLM inference | $50-200 (usage-based) |
| OpenSearch Serverless | Vector store | $50 (0.5 OCU minimum) |
| Amazon S3 | Knowledge base source docs | $1 |
| Amazon SES | Email notifications | $1 |
| AWS Amplify | Frontend hosting | $5-15 |
| Amazon CloudWatch | Logging & monitoring | $5-10 |

**Estimated Total:** $180-400/month depending on usage

### Infrastructure as Code

- **Deployment:** AWS CDK (TypeScript)
- **Alternative:** CloudFormation templates
- **CI/CD:** GitHub Actions → AWS Amplify

### IAM Roles Required

1. **AgentCore Execution Role**
   - Bedrock model invocation
   - Knowledge Base query
   - CloudWatch logs

2. **Lambda Role (for contact handler)**
   - SES send email
   - CloudWatch logs

3. **Amplify Service Role**
   - S3 access
   - CloudWatch logs

---

## Frontend Implementation

### ChatWidget Component

**Location:** `components/chat/ChatWidget.tsx`

**Features:**
- Collapsible widget anchored bottom-right
- Expands to full chat interface on click
- WebSocket connection to AgentCore Runtime
- Session state persists during page visit (not across sessions)
- Typing indicators
- Message history display
- Contact form integration within chat

**States:**
1. **Collapsed:** Small floating button with chat icon
2. **Expanded:** Full chat interface (400px wide, 600px tall)
3. **Contact Mode:** Contact form fields within chat

**Design:**
- Matches website aesthetic (updated design, not purple-pink)
- Smooth animations with Framer Motion
- Mobile responsive (full-width on mobile)
- Accessibility compliant (keyboard navigation, screen reader support)

### WebSocket Integration

```typescript
// Simplified flow
const ws = new WebSocket(presignedUrl);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle streaming response chunks
  setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
};

ws.send(JSON.stringify({
  prompt: userMessage,
  sessionId: sessionId // Maintained during page visit
}));
```

---

## Guardrails & Safety

### Off-Limits Topics (System-Level Guardrails)

1. **Previous Employer Confidential Information**
   - No specific client names from AWS work
   - No internal metrics not publicly shared
   - No proprietary methodologies or tools

2. **Salary/Compensation**
   - Redirect: "Compensation is discussed on a project-by-project basis. Let's connect to discuss your specific needs."

3. **Sensitive Personal Information**
   - No home address beyond "Fairfax, VA"
   - No personal relationship details
   - No health information

### Anti-Hallucination Measures

1. **Knowledge Base Grounding**
   - Require citation from KB for factual claims
   - Confidence thresholds for responses

2. **Uncertainty Handling**
   - Explicit "I'm not sure about that" responses
   - Escalation to contact when uncertain

3. **Prompt Engineering**
   - "Only answer based on information in the knowledge base"
   - "If unsure, acknowledge uncertainty"

4. **Bedrock Guardrails**
   - Configure Bedrock Guardrails for content filtering
   - Block off-topic content (politics, religion, etc.)

---

## Contact Flow & Email Integration

### Trigger Conditions

1. User explicitly asks to contact Scott
2. User asks about pricing, availability, scheduling
3. Consultant Agent determines question requires human follow-up
4. Interview Agent cannot answer a question (low confidence)
5. User asks 5+ follow-up questions (deep engagement signal)

### Email Template (SES)

```
Subject: [Website Inquiry] New message from {name}

Hi Scott,

You have a new inquiry from your consulting website:

Name: {name}
Email: {email}

Message:
{message}

Conversation Context:
{last_3_messages_summary}

---
Sent via Scott LeDuc Consulting AI Assistant
```

### MCP Integration (Future Enhancement)

Consider using AgentCore Gateway to expose:
- Calendar availability (Google Calendar MCP)
- CRM integration (future)
- Meeting scheduling (Calendly MCP)

---

## Implementation Phases

### Phase 1: Critical Website Fixes (1-2 days)
**Priority: IMMEDIATE**

- [ ] Fix contact form (implement SES email sending)
- [ ] Replace emoji icons with Lucide icons
- [ ] Add placeholder for headshot image
- [ ] Create proper favicon
- [ ] Update color palette (move away from purple-pink)
- [ ] Replace Inter font with distinctive alternative

### Phase 2: Website Design Improvements (2-3 days)

- [ ] New typography (consider: Satoshi, Cabinet Grotesk, or Instrument Sans)
- [ ] New color scheme (consider: dark navy + electric cyan, or warm neutrals)
- [ ] Remove generic blob animations
- [ ] Add case study visualizations/screenshots
- [ ] Add testimonials section
- [ ] Add certification badges
- [ ] Create OG images for social sharing

### Phase 3: Initial Deployment (1 day)

- [ ] Configure AWS Amplify
- [ ] Set up custom domain (if available)
- [ ] Deploy initial website
- [ ] Test all pages and contact form

### Phase 4: Knowledge Base Setup (2-3 days)

- [ ] Create S3 bucket with source documents
- [ ] Convert existing content to markdown documents
- [ ] Create Bedrock Knowledge Base
- [ ] Configure OpenSearch Serverless
- [ ] Test retrieval quality

### Phase 5: Agent Development (5-7 days)

- [ ] Set up AgentCore Runtime
- [ ] Implement Routing Agent
- [ ] Implement Interview Agent
- [ ] Implement Consultant Agent
- [ ] Implement Contact Handler tool
- [ ] Test agent routing and responses
- [ ] Tune system prompts based on testing

### Phase 6: Frontend Chat Integration (3-4 days)

- [ ] Build ChatWidget component
- [ ] Implement WebSocket connection
- [ ] Session state management
- [ ] Contact form within chat
- [ ] Mobile responsiveness
- [ ] Animations and polish

### Phase 7: Integration & Testing (2-3 days)

- [ ] End-to-end testing
- [ ] Guardrail testing (try to break it)
- [ ] Performance optimization
- [ ] Error handling
- [ ] Logging and monitoring setup

### Phase 8: Production Deployment (1-2 days)

- [ ] Deploy AgentCore to production
- [ ] Connect frontend to production backend
- [ ] Final testing
- [ ] Monitoring dashboards
- [ ] Documentation

**Total Estimated Timeline:** 3-4 weeks

---

## Cost Estimates

### Initial Setup (One-Time)

| Item | Estimated Cost |
|------|----------------|
| Development time | Your time |
| Domain (if new) | $12-50/year |
| SSL Certificate | Free (via Amplify) |

### Monthly Operating Costs

| Scenario | Estimated Cost |
|----------|----------------|
| Low traffic (100 conversations/month) | $100-150 |
| Medium traffic (500 conversations/month) | $200-300 |
| High traffic (2000 conversations/month) | $400-600 |

### Cost Optimization Strategies

1. Use Claude Haiku for routing (3x cheaper than Sonnet)
2. Cache common Knowledge Base queries
3. Set conversation length limits
4. Use OpenSearch Serverless with minimum OCU

---

## Technical Decisions

### Why Bedrock AgentCore vs. Alternatives?

| Approach | Pros | Cons | Decision |
|----------|------|------|----------|
| **Bedrock AgentCore** | AWS-native, managed scaling, built-in auth, showcases AI skills | Newer service, learning curve | ✅ SELECTED |
| Lambda + Bedrock | Full control, familiar | More infrastructure to manage | ❌ |
| External (OpenAI, etc.) | Simpler API | Not AWS-native, doesn't showcase AWS skills | ❌ |

### Why Multi-Agent vs. Single Agent?

- **Specialization:** Each agent is tuned for its specific task
- **Maintainability:** Easier to update individual agents
- **Showcase:** Demonstrates multi-agent orchestration skills
- **Scalability:** Can add more agents later (e.g., technical demo agent)

### Model Selection

| Agent | Model | Reasoning |
|-------|-------|-----------|
| Routing Agent | Claude 3 Haiku | Fast, cheap, simple classification |
| Interview Agent | Claude 3.5 Sonnet | Balanced quality/cost for persona |
| Consultant Agent | Claude 3.5 Sonnet | Needs reasoning for consulting advice |
| Contact Handler | Claude 3 Haiku | Simple form collection |

---

## Next Steps

1. **Approve this spec** - Any changes needed?
2. **Start Phase 1** - Fix critical website issues
3. **Set up AWS resources** - Create S3 bucket, configure SES
4. **Deploy initial website** - Get live on Amplify
5. **Begin agent development** - Start with Knowledge Base

---

*Document Version: 1.0*
*Created: January 2026*
*Author: AI Assistant (for Scott LeDuc)*

