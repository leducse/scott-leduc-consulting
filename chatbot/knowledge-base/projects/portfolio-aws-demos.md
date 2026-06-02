# Portfolio AWS Demos (CDK)

**Repo:** portfolio-aws-demos (under portfolio monorepo)  
**Purpose:** Real AWS resources for portfolio MVPs—not mock-only when Bedrock is claimed.

## PortfolioDemosStack (AWS CDK → CloudFormation)

| Service | Role |
|---------|------|
| S3 | Versioned bucket for generated workbook documentation |
| Secrets Manager | `bedrock_model_id`, `docs_bucket` (no API keys in git) |
| Lambda | Tableau metadata JSON → Bedrock Converse (draft + refine) → S3 |
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
