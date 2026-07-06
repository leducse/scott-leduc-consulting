#!/bin/bash
set -euo pipefail

APP_ID="d3jq7pom4n937u"
BRANCH_NAME="main"
REGION="us-east-1"
ROLE_NAME="AmplifySSRComputeRole"
POLICY_NAME="VirtualDataScientistBackendInvokeFunctionUrl"
BACKEND_FUNCTION_ARN="arn:aws:lambda:us-east-1:441383083571:function:virtual-data-scientist-backend-dev"
VDS_RUNTIME_ARN="arn:aws:bedrock-agentcore:us-east-1:441383083571:runtime/vdsagentcore_VirtualDataScientistAgent-iSOiop5y80"
CHATBOT_RUNTIME_ARN="arn:aws:bedrock-agentcore:us-east-1:441383083571:runtime/scottleduc_consultant-vKDki47sNm"
BACKEND_URL="https://fdzrbtz4sewn6nrnlnbgbykbpu0jcutl.lambda-url.us-east-1.on.aws"

MODE="${1:---check}"

if [[ "$MODE" != "--check" && "$MODE" != "--apply" ]]; then
  echo "Usage: $0 [--check|--apply]"
  echo ""
  echo "  --check  Read-only preflight. This is the default."
  echo "  --apply  Update IAM, Amplify env vars, and trigger an Amplify release."
  exit 2
fi

POLICY_JSON=$(cat <<JSON
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "InvokeVirtualDataScientistBackendFunctionUrl",
      "Effect": "Allow",
      "Action": "lambda:InvokeFunctionUrl",
      "Resource": "${BACKEND_FUNCTION_ARN}",
      "Condition": {
        "StringEquals": {
          "lambda:FunctionUrlAuthType": "AWS_IAM"
        }
      }
    }
  ]
}
JSON
)

ENV_JSON=$(cat <<JSON
{
  "AGENTCORE_REGION": "${REGION}",
  "AGENTCORE_RUNTIME_ARN": "${CHATBOT_RUNTIME_ARN}",
  "DATA_SCIENTIST_AGENTCORE_RUNTIME_ARN": "${VDS_RUNTIME_ARN}",
  "DATA_SCIENTIST_AGENTCORE_ENDPOINT_NAME": "DEFAULT",
  "DATA_SCIENCE_MCP_BASE_URL": "${BACKEND_URL}",
  "DATA_SCIENCE_MCP_AUTH_MODE": "aws_iam",
  "DATA_SCIENCE_MCP_AWS_SIGNING_SERVICE": "lambda"
}
JSON
)

echo "Virtual Data Scientist Amplify configuration"
echo "App: ${APP_ID}"
echo "Branch: ${BRANCH_NAME}"
echo "Role: ${ROLE_NAME}"
echo "Mode: ${MODE}"
echo ""

echo "Current Amplify app env vars:"
aws amplify get-app \
  --region "$REGION" \
  --app-id "$APP_ID" \
  --query 'app.environmentVariables' \
  --output json

echo ""
echo "Current Amplify branch env vars:"
aws amplify get-branch \
  --region "$REGION" \
  --app-id "$APP_ID" \
  --branch-name "$BRANCH_NAME" \
  --query 'branch.environmentVariables' \
  --output json

echo ""
echo "Current role inline policies:"
aws iam list-role-policies \
  --role-name "$ROLE_NAME" \
  --output json

echo ""
echo "IAM simulation for required actions:"
aws iam simulate-principal-policy \
  --policy-source-arn "arn:aws:iam::441383083571:role/${ROLE_NAME}" \
  --action-names lambda:InvokeFunctionUrl bedrock-agentcore:InvokeAgentRuntime \
  --resource-arns "$BACKEND_FUNCTION_ARN" "$VDS_RUNTIME_ARN" \
  --context-entries ContextKeyName=lambda:FunctionUrlAuthType,ContextKeyType=string,ContextKeyValues=AWS_IAM \
  --query 'EvaluationResults[].{action:EvalActionName,resource:EvalResourceName,decision:EvalDecision}' \
  --output table

if [[ "$MODE" == "--check" ]]; then
  echo ""
  echo "Dry run only. No AWS resources were changed."
  echo "Run with --apply only after explicit approval for the IAM/App configuration write."
  exit 0
fi

echo ""
echo "This will:"
echo "1. Put inline policy ${POLICY_NAME} on ${ROLE_NAME}."
echo "2. Update Amplify app-level and branch-level env vars for the existing chatbot and VDS app."
echo "3. Trigger a RELEASE job on ${BRANCH_NAME}."
echo ""
read -r -p "Type APPLY to continue: " CONFIRM
if [[ "$CONFIRM" != "APPLY" ]]; then
  echo "Cancelled."
  exit 1
fi

aws iam put-role-policy \
  --role-name "$ROLE_NAME" \
  --policy-name "$POLICY_NAME" \
  --policy-document "$POLICY_JSON"

aws amplify update-app \
  --region "$REGION" \
  --app-id "$APP_ID" \
  --environment-variables "$ENV_JSON" \
  --output json

aws amplify update-branch \
  --region "$REGION" \
  --app-id "$APP_ID" \
  --branch-name "$BRANCH_NAME" \
  --environment-variables "$ENV_JSON" \
  --output json

aws amplify start-job \
  --region "$REGION" \
  --app-id "$APP_ID" \
  --branch-name "$BRANCH_NAME" \
  --job-type RELEASE \
  --output json

echo ""
echo "Apply complete. Watch the deployment in Amplify, then verify:"
echo "curl -I https://www.decision-layer.com/apps/virtual-data-scientist"
echo "curl https://www.decision-layer.com/api/apps/virtual-data-scientist/sessions"
