# Scott LeDuc Consulting Website

A modern, professional consulting website built with Next.js, featuring an AI-powered chatbot using Amazon Bedrock AgentCore. The site showcases expertise in statistical analysis, machine learning, AWS architecture, and data engineering.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Frontend (Next.js)                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │   Pages      │  │  Components  │  │  API Routes  │  │   ChatWidget     │ │
│  │  (App Router)│  │   (React)    │  │  (/api/*)    │  │   (WebSocket)    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────────┘ │
│                                          │                      │           │
└──────────────────────────────────────────┼──────────────────────┼───────────┘
                                           │                      │
                    ┌──────────────────────┼──────────────────────┼───────────┐
                    │                AWS Cloud                     │           │
                    │  ┌───────────────────┴───────────────────────┴─────────┐ │
                    │  │              AWS Amplify (Hosting)                  │ │
                    │  └─────────────────────────────────────────────────────┘ │
                    │                         │                                │
                    │  ┌──────────────────────┼──────────────────────────────┐ │
                    │  │           ┌──────────┴──────────┐                   │ │
                    │  │           │  /api/chat Route    │                   │ │
                    │  │           │ (Presigned URL Gen) │                   │ │
                    │  │           └──────────┬──────────┘                   │ │
                    │  │                      │                              │ │
                    │  │  ┌───────────────────┴────────────────────────────┐ │ │
                    │  │  │         Amazon Bedrock AgentCore               │ │ │
                    │  │  │  ┌─────────────────────────────────────────┐   │ │ │
                    │  │  │  │           Runtime Endpoint               │   │ │ │
                    │  │  │  │   scottleduc_consultant-vKDki47sNm      │   │ │ │
                    │  │  │  │                                         │   │ │ │
                    │  │  │  │  ┌─────────────────────────────────────┐│   │ │ │
                    │  │  │  │  │        Multi-Agent System           ││   │ │ │
                    │  │  │  │  │  ┌────────────────────────────────┐ ││   │ │ │
                    │  │  │  │  │  │     Routing Agent (Haiku)      │ ││   │ │ │
                    │  │  │  │  │  │   Routes to specialized agents │ ││   │ │ │
                    │  │  │  │  │  └────────────────────────────────┘ ││   │ │ │
                    │  │  │  │  │           ┌───────┴───────┐         ││   │ │ │
                    │  │  │  │  │  ┌────────┴────┐  ┌───────┴───────┐ ││   │ │ │
                    │  │  │  │  │  │  Interview  │  │   Consultant  │ ││   │ │ │
                    │  │  │  │  │  │   Agent     │  │    Agent      │ ││   │ │ │
                    │  │  │  │  │  │  (Sonnet)   │  │   (Sonnet)    │ ││   │ │ │
                    │  │  │  │  │  └─────────────┘  └───────────────┘ ││   │ │ │
                    │  │  │  │  └─────────────────────────────────────┘│   │ │ │
                    │  │  │  └─────────────────────────────────────────┘   │ │ │
                    │  │  └────────────────────────────────────────────────┘ │ │
                    │  │                      │                              │ │
                    │  │  ┌───────────────────┴────────────────────────────┐ │ │
                    │  │  │         Amazon Bedrock Knowledge Base          │ │ │
                    │  │  │              (QFNR1QV59Y)                       │ │ │
                    │  │  │  ┌──────────────────────────────────────────┐  │ │ │
                    │  │  │  │  - Resume & Experience                   │  │ │ │
                    │  │  │  │  - Case Studies (G3, ML, AWS Dashboard)  │  │ │ │
                    │  │  │  │  - Services & Methodology                │  │ │ │
                    │  │  │  │  - Expertise & About                     │  │ │ │
                    │  │  │  └──────────────────────────────────────────┘  │ │ │
                    │  │  └───────────────────┬────────────────────────────┘ │ │
                    │  │                      │                              │ │
                    │  │  ┌───────────────────┴────────────────────────────┐ │ │
                    │  │  │              S3 Bucket                         │ │ │
                    │  │  │    scottleduc-consulting-kb                    │ │ │
                    │  │  │  (Knowledge Base Source Documents)             │ │ │
                    │  │  └────────────────────────────────────────────────┘ │ │
                    │  │                                                     │ │
                    │  │  ┌──────────────────┐  ┌─────────────────────────┐ │ │
                    │  │  │   AWS SES        │  │   OpenSearch Serverless │ │ │
                    │  │  │ (Contact Form)   │  │   (Vector Store)        │ │ │
                    │  │  └──────────────────┘  └─────────────────────────┘ │ │
                    │  │                                                     │ │
                    │  │  ┌──────────────────────────────────────────────┐   │ │
                    │  │  │            CloudWatch Observability           │   │ │
                    │  │  │  - Logs: /aws/bedrock-agentcore/runtimes/*   │   │ │
                    │  │  │  - GenAI Dashboard                           │   │ │
                    │  │  │  - X-Ray Traces                              │   │ │
                    │  │  └──────────────────────────────────────────────┘   │ │
                    │  └─────────────────────────────────────────────────────┘ │
                    └──────────────────────────────────────────────────────────┘
```

## 🚀 Features

### Website
- **Modern Tech Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
- **Responsive Design**: Mobile-first design with smooth animations using Framer Motion
- **SEO Optimized**: Metadata and structured content for all pages
- **Contact Form**: AWS SES integrated contact form with validation
- **Case Studies**: Detailed case studies showcasing real-world impact
- **Service Pages**: Comprehensive service offerings with methodology and deliverables

### AI Chatbot
- **Multi-Agent Architecture**: Routing agent + specialized agents (Interview, Consultant)
- **Amazon Bedrock AgentCore**: Serverless deployment with WebSocket support
- **RAG Integration**: Knowledge Base with resume, case studies, and services
- **Real-time Streaming**: WebSocket-based response streaming
- **Session Memory**: Short-term memory for conversation context (30-day retention)
- **Observability**: CloudWatch logs, X-Ray traces, GenAI dashboard

---

## 📦 AWS Resources

### Active Resources

| Service | Resource Name/ID | Purpose |
|---------|------------------|---------|
| **AgentCore Runtime** | `scottleduc_consultant-vKDki47sNm` | Hosts the multi-agent chatbot |
| **AgentCore Memory** | `scottleduc_consultant_mem-er6lzH3Wp1` | Session memory (STM only) |
| **Bedrock Knowledge Base** | `QFNR1QV59Y` | RAG for resume, case studies, services |
| **S3 Bucket** | `scottleduc-consulting-kb` | Knowledge base documents + deployment packages |
| **OpenSearch Serverless** | `scottleduc-kb` (Collection) | Vector store for knowledge base |
| **SES** | `leducse@gmail.com` (verified) | Contact form email notifications |
| **Amplify** | `scott-leduc-consulting` | Website hosting with CI/CD |
| **CloudWatch Log Group** | `/aws/bedrock-agentcore/runtimes/scottleduc_consultant-vKDki47sNm-DEFAULT` | Chatbot logs |
| **AWS Budget** | `scottleduc-consulting-monthly` | $50/month budget with alerts |

### IAM Roles & Policies

| Role/Policy | Purpose |
|-------------|---------|
| `BedrockAgentCoreRuntimeRole` | AgentCore runtime execution role |
| `AmazonBedrockAgentCoreSDKRuntime-us-east-1-*` | Auto-created by AgentCore SDK |
| `BedrockAgentCoreFullAccess` (managed) | User permissions for AgentCore |

---

## 🤖 Multi-Agent System Design

### Agent Architecture

```
User Message
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│                    ROUTING AGENT                             │
│                  (Claude 3 Haiku)                           │
│                                                             │
│  Analyzes user intent and routes to appropriate agent:      │
│  - Interview questions → INTERVIEW_AGENT                    │
│  - Consulting/advice → CONSULTANT_AGENT                     │
│  - Contact requests → CONTACT_HANDLER                       │
│                                                             │
│  Returns: { route, confidence, reason }                     │
└─────────────────────────┬───────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
┌─────────────────┐ ┌─────────────┐ ┌──────────────────┐
│ INTERVIEW_AGENT │ │ CONSULTANT  │ │ CONTACT_HANDLER  │
│ (Claude 3.5     │ │   AGENT     │ │                  │
│  Sonnet)        │ │ (Claude 3.5 │ │ Collects user    │
│                 │ │  Sonnet)    │ │ info, sends      │
│ Speaks as Scott │ │             │ │ via SES          │
│ 1st person,     │ │ Consultative│ │                  │
│ uses KB for     │ │ approach,   │ │                  │
│ experience data │ │ asks        │ │                  │
│                 │ │ questions   │ │                  │
└─────────────────┘ └─────────────┘ └──────────────────┘
          │               │
          └───────┬───────┘
                  ▼
    ┌─────────────────────────┐
    │   KNOWLEDGE BASE        │
    │   (RAG Retrieval)       │
    │                         │
    │  - Resume/Experience    │
    │  - Case Studies         │
    │  - Services             │
    │  - Methodology          │
    └─────────────────────────┘
```

### Agent Prompts Location

All agent system prompts are defined in:
```
chatbot/agents/config.py
```

- `ROUTING_AGENT_PROMPT` - Intent classification
- `INTERVIEW_AGENT_PROMPT` - First-person Scott persona
- `CONSULTANT_AGENT_PROMPT` - Consultative advisor
- `CONTACT_HANDLER_PROMPT` - Contact collection flow

### Guardrails

- Never share confidential employer information
- Never discuss salary expectations
- Never hallucinate (cite Knowledge Base only)
- Escalate complex questions to contact flow

---

## 🔧 Local Development

### Prerequisites

- Node.js 18+
- Python 3.10+
- AWS CLI configured with credentials
- AWS account with Bedrock access enabled

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/leducse/scott-leduc-consulting.git
cd consulting-website

# Install Node.js dependencies
npm install

# Set up Python environment for chatbot
cd chatbot
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
pip install bedrock-agentcore bedrock-agentcore-starter-toolkit
```

### 2. Configure AWS Credentials

Ensure your AWS credentials are configured:

```bash
# Option 1: Environment variables
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_REGION=us-east-1

# Option 2: AWS credentials file (~/.aws/credentials)
[default]
aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
region = us-east-1
```

### 3. Run Local Development

```bash
# Terminal 1: Start Next.js frontend
npm run dev

# Terminal 2: Start local chatbot (optional, for testing agent code)
cd chatbot
source venv/bin/activate
agentcore dev --port 8080
```

### 4. Test Deployed AgentCore

```bash
cd chatbot
source venv/bin/activate

# Test the deployed agent
agentcore invoke '{"prompt": "Tell me about your AWS experience"}'

# Check agent status
agentcore status
```

---

## 🚀 Deployment

### Website Deployment (Amplify)

The website auto-deploys on push to `main` branch via GitHub integration.

```bash
# Manual trigger if needed
git push origin main
```

**Amplify Console**: Check build status at AWS Amplify Console

### Chatbot Deployment (AgentCore)

```bash
cd chatbot
source venv/bin/activate

# Configure agent (if not already configured)
agentcore configure \
  -e app.py \
  -n scottleduc_consultant \
  -r us-east-1 \
  -dt direct_code_deploy \
  -rt PYTHON_3_12 \
  -s3 scottleduc-consulting-kb \
  -rf requirements.txt \
  -ni

# Deploy to AgentCore Runtime
agentcore deploy

# Verify deployment
agentcore status
```

### Update Knowledge Base

```bash
# Upload new/updated documents to S3
aws s3 sync chatbot/knowledge-base/ s3://scottleduc-consulting-kb/knowledge-base/

# Trigger knowledge base sync
aws bedrock-agent start-ingestion-job \
  --knowledge-base-id QFNR1QV59Y \
  --data-source-id <data-source-id> \
  --region us-east-1
```

---

## 📊 Observability

### CloudWatch Logs

```bash
# Tail runtime logs
aws logs tail /aws/bedrock-agentcore/runtimes/scottleduc_consultant-vKDki47sNm-DEFAULT \
  --log-stream-name-prefix "$(date +%Y/%m/%d)/[runtime-logs" \
  --follow

# View last hour of logs
aws logs tail /aws/bedrock-agentcore/runtimes/scottleduc_consultant-vKDki47sNm-DEFAULT \
  --log-stream-name-prefix "$(date +%Y/%m/%d)/[runtime-logs" \
  --since 1h
```

### GenAI Dashboard

Access the AgentCore observability dashboard:
```
https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#gen-ai-observability/agent-core
```

### Cost Monitoring

AWS Budget: `scottleduc-consulting-monthly`
- **Limit**: $50/month
- **Alerts**: 50%, 80%, 100% thresholds → leducse@gmail.com

```bash
# Check current spend
aws ce get-cost-and-usage \
  --time-period Start=$(date -d "first day of this month" +%Y-%m-%d),End=$(date +%Y-%m-%d) \
  --granularity MONTHLY \
  --metrics BlendedCost \
  --region us-east-1
```

---

## 🔍 Troubleshooting

### Common Issues

#### 1. ChatWidget shows "Connecting..." but never connects

**Cause**: WebSocket presigned URL generation failed

**Debug**:
```bash
# Check if API route is working
curl http://localhost:3000/api/chat?session_id=test

# Check AWS credentials
aws sts get-caller-identity
```

**Fix**: Ensure AWS credentials are configured and have `BedrockAgentCoreFullAccess` policy.

#### 2. Agent invocation returns error

**Cause**: Agent runtime not ready or crashed

**Debug**:
```bash
cd chatbot && source venv/bin/activate
agentcore status

# Check logs for errors
aws logs tail /aws/bedrock-agentcore/runtimes/scottleduc_consultant-vKDki47sNm-DEFAULT --since 10m
```

**Fix**: Redeploy the agent:
```bash
agentcore deploy
```

#### 3. Knowledge Base returns no results

**Cause**: Documents not synced or embedding issue

**Debug**:
```bash
# Check Knowledge Base status
aws bedrock-agent get-knowledge-base --knowledge-base-id QFNR1QV59Y --region us-east-1

# List data sources
aws bedrock-agent list-data-sources --knowledge-base-id QFNR1QV59Y --region us-east-1
```

**Fix**: Re-sync the knowledge base:
```bash
aws bedrock-agent start-ingestion-job \
  --knowledge-base-id QFNR1QV59Y \
  --data-source-id <data-source-id> \
  --region us-east-1
```

#### 4. Contact form emails not sending

**Cause**: SES not verified or permissions missing

**Debug**:
```bash
# Check SES verification status
aws ses get-identity-verification-attributes --identities leducse@gmail.com --region us-east-1
```

**Fix**: Verify email identity:
```bash
aws ses verify-email-identity --email-address leducse@gmail.com --region us-east-1
```

#### 5. Permission denied errors

**Cause**: IAM policy not attached or propagated

**Debug**:
```bash
# Check attached policies
aws iam list-attached-user-policies --user-name <your-username>
aws iam list-user-policies --user-name <your-username>
```

**Fix**: Attach required managed policy:
```bash
aws iam attach-user-policy \
  --user-name <your-username> \
  --policy-arn arn:aws:iam::aws:policy/BedrockAgentCoreFullAccess
```

Note: IAM policy changes can take 5-15 minutes to propagate.

#### 6. OpenSearch Serverless access denied

**Cause**: Data access policy not configured

**Fix**: Ensure data access policy allows your IAM principal:
```bash
aws aoss create-access-policy \
  --name scottleduc-kb-access \
  --type data \
  --policy '[{"Rules":[{"Resource":["collection/scottleduc-kb"],"Permission":["aoss:*"],"ResourceType":"collection"},{"Resource":["index/scottleduc-kb/*"],"Permission":["aoss:*"],"ResourceType":"index"}],"Principal":["arn:aws:iam::441383083571:user/<your-user>"]}]'
```

---

## 📁 Project Structure

```
consulting-website/
├── app/                          # Next.js App Router
│   ├── api/
│   │   ├── chat/                # Chatbot API (presigned URL generation)
│   │   │   └── route.ts
│   │   └── contact/             # Contact form API (SES integration)
│   │       └── route.ts
│   ├── about/                   # About page
│   ├── case-studies/            # Case study pages
│   ├── contact/                 # Contact page
│   ├── process/                 # Process page
│   ├── services/                # Service pages
│   ├── globals.css              # Global styles (CSS variables, themes)
│   ├── layout.tsx               # Root layout (ChatWidget included)
│   └── page.tsx                 # Homepage
│
├── chatbot/                     # AgentCore chatbot
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── config.py            # Agent prompts & configuration
│   │   └── multi_agent.py       # Multi-agent system logic
│   ├── knowledge-base/          # Knowledge base source documents
│   │   ├── about/
│   │   ├── case-studies/
│   │   ├── methodology/
│   │   ├── resume/
│   │   └── services/
│   ├── app.py                   # AgentCore application entry point
│   ├── requirements.txt         # Python dependencies
│   ├── test_agent.py            # Local testing script
│   └── .bedrock_agentcore.yaml  # AgentCore configuration
│
├── components/                  # React components
│   ├── chat/
│   │   └── ChatWidget.tsx       # AI chatbot widget
│   ├── layout/
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── Navbar.tsx
│   ├── case-studies/
│   ├── services/
│   └── shared/
│       ├── ContactForm.tsx
│       ├── GradientButton.tsx
│       ├── GradientCard.tsx
│       ├── MetricCounter.tsx
│       └── Testimonials.tsx
│
├── lib/                         # Utilities and content
│   ├── constants.ts             # Site config, services, case studies
│   └── content.ts               # Page content, testimonials
│
├── public/                      # Static assets
│   ├── favicon.svg
│   └── headshot-placeholder.svg
│
├── agentcore-sdk/               # Cloned AgentCore SDK (reference)
├── amplify.yml                  # AWS Amplify build config
├── package.json                 # Node.js dependencies
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

---

## 🔑 Environment Variables

### Required for Production

| Variable | Description | Example |
|----------|-------------|---------|
| `AWS_REGION` | AWS region | `us-east-1` |
| `AGENTCORE_RUNTIME_ARN` | AgentCore runtime ARN | `arn:aws:bedrock-agentcore:us-east-1:441383083571:runtime/scottleduc_consultant-vKDki47sNm` |

### Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `KNOWLEDGE_BASE_ID` | Bedrock Knowledge Base ID | `QFNR1QV59Y` |
| `CHATBOT_URL` | Local chatbot URL (dev) | `http://localhost:8080` |

### Setting in Amplify

1. Go to AWS Amplify Console
2. Select your app → Environment variables
3. Add variables for the build environment

---

## 📧 Contact Form Configuration

The contact form uses AWS SES for email delivery.

### Email Flow

1. User submits form → `/api/contact` API route
2. Server validates input (email format, rate limiting)
3. SES sends email to `leducse@gmail.com`
4. User receives confirmation message

### SES Setup

```bash
# Verify email identity
aws ses verify-email-identity --email-address leducse@gmail.com --region us-east-1

# Check verification status
aws ses get-identity-verification-attributes --identities leducse@gmail.com --region us-east-1
```

---

## 🧪 Testing

### Test Chatbot Locally

```bash
cd chatbot
source venv/bin/activate

# Run test scenarios
python test_agent.py
```

### Test Deployed Agent

```bash
# Interview-style question
agentcore invoke '{"prompt": "Tell me about yourself"}'

# Consulting-style question
agentcore invoke '{"prompt": "How would you approach measuring ROI of a marketing program?"}'

# Contact request
agentcore invoke '{"prompt": "I want to get in touch with Scott"}'
```

### Test Frontend Integration

1. Start dev server: `npm run dev`
2. Open http://localhost:3000
3. Click chat widget (bottom-right)
4. Test various questions

---

## 📝 Maintenance

### Updating Agent Code

1. Modify files in `chatbot/agents/`
2. Test locally: `agentcore dev`
3. Deploy: `agentcore deploy`

### Updating Knowledge Base

1. Add/modify markdown files in `chatbot/knowledge-base/`
2. Upload to S3:
   ```bash
   aws s3 sync chatbot/knowledge-base/ s3://scottleduc-consulting-kb/knowledge-base/
   ```
3. Trigger sync via AWS Console or CLI

### Updating Website Content

1. Modify `lib/constants.ts` (services, case studies, metrics)
2. Modify `lib/content.ts` (page content, testimonials)
3. Commit and push to trigger Amplify deployment

---

## 📊 Cost Optimization

### Current Cost Estimates

| Service | Estimated Monthly Cost |
|---------|----------------------|
| AgentCore Runtime | ~$5-10 (usage-based) |
| Bedrock Model Invocations | ~$5-15 (usage-based) |
| OpenSearch Serverless | ~$10-20 |
| S3 | <$1 |
| Amplify Hosting | ~$5 |
| SES | <$1 |
| **Total** | **~$25-50/month** |

### Cost Reduction Tips

1. **Use Haiku for routing**: Already implemented, much cheaper than Sonnet
2. **Set idle timeout**: Configure in `.bedrock_agentcore.yaml`
3. **Monitor Knowledge Base**: Only sync when content changes
4. **Review CloudWatch retention**: Set to 30 days (already configured)

---

## 🔗 Useful Links

- [AgentCore Documentation](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html)
- [AgentCore Samples](https://github.com/awslabs/amazon-bedrock-agentcore-samples)
- [AgentCore Python SDK](https://github.com/aws/bedrock-agentcore-sdk-python)
- [Bedrock Knowledge Bases](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html)
- [GenAI Observability Dashboard](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#gen-ai-observability/agent-core)

---

## 📄 License

Private project - All rights reserved.

## 📞 Contact

- **Email**: leducse@gmail.com
- **LinkedIn**: [linkedin.com/in/sleduc](https://linkedin.com/in/sleduc)
- **GitHub**: [github.com/leducse](https://github.com/leducse)
- **Location**: Fairfax, VA

---

Built with ❤️ using Next.js, Amazon Bedrock AgentCore, and TypeScript
