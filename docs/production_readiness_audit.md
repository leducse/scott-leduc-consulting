# Production Readiness Audit

This site is public-facing and AWS-backed, so treat it as productionization work
even when making portfolio or copy changes.

## Current System

- Next.js app hosted on AWS Amplify.
- Public domain through Route53 and Amplify-managed TLS.
- Contact flow through API routes and SES.
- Chatbot flow through API Gateway, Lambda presigned URL generation, and Amazon
  Bedrock AgentCore WebSocket runtime.
- Runtime observability through CloudWatch logs, X-Ray, GenAI dashboard, and AWS
  budget alerts.

## Highest-Value Hardening Work

1. Browser regression path
   - Homepage loads.
   - Case-study and service routes load.
   - `/futurewealth` remains responsive on mobile and desktop.
   - Contact form validates empty, invalid, and valid-looking submissions.
   - Chat widget shows a clear degraded state when AgentCore or the presigned URL
     endpoint fails.

2. Secret and config boundaries
   - No AWS credentials or private keys in repo files.
   - Contact/chat runtime configuration comes from environment or AWS-managed
     services.
   - Public client bundle does not expose internal AWS resource identifiers beyond
     what is intentionally public.

3. Observability and cost
   - Confirm the documented budget amount matches the actual AWS budget.
   - Add a short runbook for checking Amplify deploy logs, Lambda logs, and
     AgentCore runtime logs.
   - Record expected monthly idle cost and expected demo-use cost.

4. Failure modes
   - Contact form should return user-safe errors and log actionable server errors.
   - Chatbot should fail closed: no broken spinner, no raw exception text, no
     repeated reconnection loop without user control.
   - Agent answers should not overclaim availability, services, or portfolio
     outcomes beyond source content.

5. Public copy accuracy
   - Keep live project claims tied to working demos or clearly label planned work.
   - Remove stale architecture IDs from public-facing pages if they are only useful
     internally.
   - Maintain a private operator runbook for resource names, logs, and deploy
     troubleshooting.

## Safe Local Validation

```bash
npm run lint
npm run build
```

When browser tooling is available, verify:

```text
/
/about
/case-studies
/services
/futurewealth
contact form states
chat widget connected and degraded states
```

## Do Not Do Without Confirmation

- Do not run Amplify deploys.
- Do not mutate Route53, ACM, Lambda, API Gateway, AgentCore, SES, or budgets.
- Do not print or inspect credential-bearing files.
- Do not change public positioning copy in ways that affect resume/client claims
  without explicit review.
