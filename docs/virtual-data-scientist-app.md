# Virtual Data Scientist App

This is the public website surface for the data-science MCP and AgentCore
workflow implemented in `/Users/scottleduc/Projects/agentic-bi-report-platform`.

Routes:

- `/apps`: app catalog page.
- `/apps/virtual-data-scientist`: native LLM chat interface.
- `/api/apps/virtual-data-scientist/chat`: development fallback bridge for
  light analysis and local deep-analysis worker handoff.
- `/api/apps/virtual-data-scientist/sessions`: safe metadata bridge for recent
  backend analysis sessions, runs, datasets, and artifact counts.
- `/api/apps/virtual-data-scientist/sessions/[sessionId]`: safe session detail
  bridge for backend-stored timeline messages, runs, datasets, and artifact
  metadata.
- `/api/apps/virtual-data-scientist/artifacts/[artifactId]`: on-demand artifact
  preview bridge. It strips backend storage details and caps preview size before
  returning report/code/profile content to the browser.
- `/api/apps/virtual-data-scientist/upload`: CSV upload bridge into the BI
  backend. In deployed mode, the website signs the request to the Lambda
  Function URL and the backend persists the CSV as an S3-backed `s3_csv` data
  source.
- `/api/apps/virtual-data-scientist/ws-url`: server-side presigned AgentCore
  WebSocket URL generator.

Runtime configuration:

```bash
DATA_SCIENCE_MCP_BASE_URL=http://127.0.0.1:8765
# or:
DATA_SCIENCE_MCP_BASE_URL=https://fdzrbtz4sewn6nrnlnbgbykbpu0jcutl.lambda-url.us-east-1.on.aws
DATA_SCIENCE_MCP_AUTH_MODE=aws_iam
DATA_SCIENCE_MCP_AWS_SIGNING_SERVICE=lambda
DATA_SCIENTIST_AGENTCORE_RUNTIME_ARN=arn:aws:bedrock-agentcore:us-east-1:441383083571:runtime/vdsagentcore_VirtualDataScientistAgent-iSOiop5y80
DATA_SCIENTIST_AGENTCORE_ENDPOINT_NAME=DEFAULT
```

Current behavior:

- The page renders a native chat shell without needing AgentCore configured.
- In cloud mode, the chat connects to the deployed AgentCore runtime over a
  presigned WebSocket. AgentCore calls the authenticated Lambda backend, runs
  light analysis, runs deep analysis, and returns saved artifact metadata.
- In local development, the fallback chat bridge can create/continue analysis
  sessions, run light analysis, queue the local deep-analysis worker, and return
  saved artifact summaries.
- The browser persists the active analysis session id, active dataset, and the
  recent visible chat transcript in `localStorage` so refreshes can resume the
  working context.
- The Sessions panel can reload backend session metadata and attach future
  prompts to a prior app-owned analysis session without exposing artifact
  contents through the public chat response.
- Resuming a session fetches the backend-stored message timeline so browser
  refreshes or later visits can recover prior prompts and agent status messages.
- The Artifacts panel keeps metadata from the current or resumed session and
  opens individual artifacts only on demand through the artifact preview route.
- Deep-analysis report artifacts render a structured preview with the
  recommended method, ML usefulness decision, quality gates, and baseline
  diagnostics. Other artifact types fall back to a capped raw preview.
- CSV upload proxies through the website backend and returns the created
  persisted data source id plus table metadata as the active chat dataset. In
  cloud mode, the uploaded CSV is stored in the deployed backend state bucket
  and can be profiled by the AgentCore runtime using the returned
  `data_source_id` and `table_name`.
- If the runtime ARN is missing, the chat falls back to the local bridge.
- Once the runtime ARN is configured and AWS credentials are available to the
  website backend, the page connects to AgentCore over a presigned WebSocket.
  The WebSocket request sends the same `analysis_session_id`, `data_source_id`,
  `table_name`, and `run_deep` context used by the local bridge, and the
  runtime `done` event updates the browser's active session and dataset state.
- AgentCore runtime session ids must be at least 33 characters. The browser now
  persists a UUID-length AgentCore session id, and the `ws-url` route replaces
  any shorter incoming id with a UUID before signing the WebSocket URL.

Backend dependency:

- AgentCore runtime:
  `arn:aws:bedrock-agentcore:us-east-1:441383083571:runtime/vdsagentcore_VirtualDataScientistAgent-iSOiop5y80`
- Deployed backend Function URL:
  `https://fdzrbtz4sewn6nrnlnbgbykbpu0jcutl.lambda-url.us-east-1.on.aws/`
- The website backend signs deployed backend calls when
  `DATA_SCIENCE_MCP_AUTH_MODE=aws_iam`.
- Public hosting must provide an AWS identity that can call
  `bedrock-agentcore:InvokeAgentRuntime` and sign the Lambda Function URL
  (`lambda:InvokeFunctionUrl` with `lambda:FunctionUrlAuthType=AWS_IAM`).
- Live Amplify app:
  - app id: `d3jq7pom4n937u`
  - app name: `scott-leduc-consulting`
  - platform: `WEB_COMPUTE`
  - SSR compute role:
    `arn:aws:iam::441383083571:role/AmplifySSRComputeRole`
  - existing app-level and branch-level env vars to preserve:
    `AGENTCORE_REGION=us-east-1` and
    `AGENTCORE_RUNTIME_ARN=arn:aws:bedrock-agentcore:us-east-1:441383083571:runtime/scottleduc_consultant-vKDki47sNm`
  - SSR routes need the VDS env vars on the `main` branch as well as the app
    object. If branch env vars are missing, the public app can render while API
    routes still return `setup_required`.
- The local bridge remains enabled for localhost development. For non-IAM
  backends, set `DATA_SCIENCE_MCP_BRIDGE_ENABLED=true` only after that backend
  has authentication, tenant isolation, quotas, and artifact access controls.
- Local BI backend command:

```bash
cd /Users/scottleduc/Projects/agentic-bi-report-platform
python3 server.py
```

Safety:

- Do not expose user-entered credentials through the public chat.
- Do not stream raw artifact contents through the public chat. The app route
  returns metadata only; artifact previews are fetched on demand and capped by
  the website bridge. Full artifacts should stay behind authenticated backend
  APIs.
- Do not enable `DATA_SCIENCE_MCP_BRIDGE_ENABLED=true` for a public deployment
  unless the proxied backend is explicitly production-safe. Prefer
  `DATA_SCIENCE_MCP_AUTH_MODE=aws_iam` for the deployed Lambda backend.
- Keep production data connections behind authenticated backend APIs.
- Treat this public route as demo-safe until auth, tenant isolation, quotas, and
  artifact access controls are implemented.

Public launch steps:

These are AWS writes and require explicit approval before running.

Use the checked-in helper for read-only preflight:

```bash
scripts/configure-vds-amplify.sh --check
```

After explicit approval, the same helper can apply the IAM/env/deploy changes:

```bash
scripts/configure-vds-amplify.sh --apply
```

The manual commands below are the exact operations the helper performs.

1. Add least-privilege backend invoke permission to the Amplify SSR role:

```bash
aws iam put-role-policy \
  --role-name AmplifySSRComputeRole \
  --policy-name VirtualDataScientistBackendInvokeFunctionUrl \
  --policy-document '{"Version":"2012-10-17","Statement":[{"Sid":"InvokeVirtualDataScientistBackendFunctionUrl","Effect":"Allow","Action":"lambda:InvokeFunctionUrl","Resource":"arn:aws:lambda:us-east-1:441383083571:function:virtual-data-scientist-backend-dev","Condition":{"StringEquals":{"lambda:FunctionUrlAuthType":"AWS_IAM"}}}]}'
```

2. Add the Virtual Data Scientist env vars at both app and branch scope while
   preserving the existing chatbot env vars:

```bash
aws amplify update-app \
  --region us-east-1 \
  --app-id d3jq7pom4n937u \
  --environment-variables '{
    "AGENTCORE_REGION":"us-east-1",
    "AGENTCORE_RUNTIME_ARN":"arn:aws:bedrock-agentcore:us-east-1:441383083571:runtime/scottleduc_consultant-vKDki47sNm",
    "DATA_SCIENTIST_AGENTCORE_RUNTIME_ARN":"arn:aws:bedrock-agentcore:us-east-1:441383083571:runtime/vdsagentcore_VirtualDataScientistAgent-iSOiop5y80",
    "DATA_SCIENTIST_AGENTCORE_ENDPOINT_NAME":"DEFAULT",
    "DATA_SCIENCE_MCP_BASE_URL":"https://fdzrbtz4sewn6nrnlnbgbykbpu0jcutl.lambda-url.us-east-1.on.aws",
    "DATA_SCIENCE_MCP_AUTH_MODE":"aws_iam",
    "DATA_SCIENCE_MCP_AWS_SIGNING_SERVICE":"lambda"
  }'

aws amplify update-branch \
  --region us-east-1 \
  --app-id d3jq7pom4n937u \
  --branch-name main \
  --environment-variables '{
    "AGENTCORE_REGION":"us-east-1",
    "AGENTCORE_RUNTIME_ARN":"arn:aws:bedrock-agentcore:us-east-1:441383083571:runtime/scottleduc_consultant-vKDki47sNm",
    "DATA_SCIENTIST_AGENTCORE_RUNTIME_ARN":"arn:aws:bedrock-agentcore:us-east-1:441383083571:runtime/vdsagentcore_VirtualDataScientistAgent-iSOiop5y80",
    "DATA_SCIENTIST_AGENTCORE_ENDPOINT_NAME":"DEFAULT",
    "DATA_SCIENCE_MCP_BASE_URL":"https://fdzrbtz4sewn6nrnlnbgbykbpu0jcutl.lambda-url.us-east-1.on.aws",
    "DATA_SCIENCE_MCP_AUTH_MODE":"aws_iam",
    "DATA_SCIENCE_MCP_AWS_SIGNING_SERVICE":"lambda"
  }'
```

3. Trigger an Amplify deployment:

```bash
aws amplify start-job \
  --region us-east-1 \
  --app-id d3jq7pom4n937u \
  --branch-name main \
  --job-type RELEASE
```

4. Verify public routes after deploy:

```bash
curl -I https://www.decision-layer.com/apps/virtual-data-scientist
curl https://www.decision-layer.com/api/apps/virtual-data-scientist/sessions
```
