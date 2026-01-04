#!/bin/bash
# =============================================================================
# Decision Layer Analytics - Infrastructure Management Script
# =============================================================================
# This script manages the AWS infrastructure for decision-layer.com
#
# Usage:
#   ./infrastructure.sh status    - Show current infrastructure status
#   ./infrastructure.sh deploy    - Deploy/redeploy the site
#   ./infrastructure.sh teardown  - Remove all AWS resources
#   ./infrastructure.sh costs     - Show estimated costs
#
# =============================================================================

set -e

# Configuration
APP_ID="d3jq7pom4n937u"
APP_NAME="consulting-website"
DOMAIN="decision-layer.com"
HOSTED_ZONE_ID="Z07640571EKT6R93UIXXB"
S3_KB_BUCKET="scottleduc-consulting-kb"
REGION="us-east-1"
GITHUB_REPO="https://github.com/leducse/consulting-website"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

print_header() {
    echo ""
    echo -e "${CYAN}============================================${NC}"
    echo -e "${CYAN}  $1${NC}"
    echo -e "${CYAN}============================================${NC}"
    echo ""
}

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# =============================================================================
# STATUS COMMAND
# =============================================================================
cmd_status() {
    print_header "Infrastructure Status"
    
    echo "Checking AWS resources..."
    echo ""
    
    # Amplify App
    echo -e "${CYAN}Amplify App:${NC}"
    APP_STATUS=$(aws amplify get-app --app-id $APP_ID --query 'app.{name:name,defaultDomain:defaultDomain,productionBranch:productionBranch.branchName}' --output yaml 2>&1) || APP_STATUS="Not found"
    echo "$APP_STATUS"
    echo ""
    
    # Domain Association
    echo -e "${CYAN}Domain Association:${NC}"
    DOMAIN_STATUS=$(aws amplify list-domain-associations --app-id $APP_ID --query 'domainAssociations[*].{domain:domainName,status:domainStatus}' --output yaml 2>&1) || DOMAIN_STATUS="None"
    echo "$DOMAIN_STATUS"
    echo ""
    
    # Route53 Hosted Zone
    echo -e "${CYAN}Route53 Hosted Zone:${NC}"
    R53_STATUS=$(aws route53 get-hosted-zone --id $HOSTED_ZONE_ID --query 'HostedZone.{Name:Name,RecordCount:ResourceRecordSetCount}' --output yaml 2>&1) || R53_STATUS="Not found"
    echo "$R53_STATUS"
    echo ""
    
    # S3 Bucket
    echo -e "${CYAN}S3 Knowledge Base Bucket:${NC}"
    S3_STATUS=$(aws s3 ls s3://$S3_KB_BUCKET 2>&1 | head -5) || S3_STATUS="Not found or empty"
    if [ -z "$S3_STATUS" ]; then
        echo "Bucket exists but is empty"
    else
        echo "$S3_STATUS"
        echo "..."
    fi
    echo ""
    
    # Bedrock Resources
    echo -e "${CYAN}Bedrock Knowledge Bases:${NC}"
    KB_STATUS=$(aws bedrock-agent list-knowledge-bases --query 'knowledgeBaseSummaries[*].{name:name,status:status}' --output yaml 2>&1) || KB_STATUS="None"
    echo "$KB_STATUS"
    echo ""
    
    # OpenSearch
    echo -e "${CYAN}OpenSearch Serverless:${NC}"
    OS_STATUS=$(aws opensearchserverless list-collections --query 'collectionSummaries[*].{name:name,status:status}' --output yaml 2>&1) || OS_STATUS="None"
    echo "$OS_STATUS"
    
    print_status "Status check complete"
}

# =============================================================================
# DEPLOY COMMAND
# =============================================================================
cmd_deploy() {
    print_header "Deploying Decision Layer Analytics"
    
    # Check if app exists
    echo "Checking if Amplify app exists..."
    if aws amplify get-app --app-id $APP_ID > /dev/null 2>&1; then
        print_status "Amplify app found, triggering new deployment..."
        
        # Start a new build
        aws amplify start-job --app-id $APP_ID --branch-name main --job-type RELEASE
        print_status "Deployment triggered!"
        echo ""
        echo "Monitor at: https://console.aws.amazon.com/amplify/home?region=$REGION#/$APP_ID"
    else
        print_warning "Amplify app not found. Creating new app..."
        
        # Create new app (requires GitHub connection in console first)
        echo ""
        echo "To create a new Amplify app:"
        echo "1. Go to: https://console.aws.amazon.com/amplify"
        echo "2. Click 'New app' → 'Host web app'"
        echo "3. Connect to GitHub: $GITHUB_REPO"
        echo "4. Select branch: main"
        echo "5. Deploy"
        echo ""
        echo "After creation, update APP_ID in this script."
    fi
}

# =============================================================================
# TEARDOWN COMMAND
# =============================================================================
cmd_teardown() {
    print_header "⚠️  TEARDOWN - This will delete all resources!"
    
    echo "This will remove:"
    echo "  - Amplify app and all deployments"
    echo "  - Route53 hosted zone and DNS records"
    echo "  - S3 knowledge base bucket (optional)"
    echo ""
    
    read -p "Are you sure? Type 'yes' to confirm: " CONFIRM
    if [ "$CONFIRM" != "yes" ]; then
        echo "Teardown cancelled."
        exit 0
    fi
    
    echo ""
    
    # 1. Delete Amplify Domain Association
    echo "Removing domain association..."
    aws amplify delete-domain-association --app-id $APP_ID --domain-name $DOMAIN 2>/dev/null || print_warning "Domain association not found or already deleted"
    
    # 2. Delete Amplify App
    echo "Deleting Amplify app..."
    aws amplify delete-app --app-id $APP_ID 2>/dev/null || print_warning "Amplify app not found or already deleted"
    print_status "Amplify app deleted"
    
    # 3. Delete Route53 Records (except NS and SOA)
    echo "Deleting Route53 records..."
    
    # Get all records except NS and SOA
    RECORDS=$(aws route53 list-resource-record-sets --hosted-zone-id $HOSTED_ZONE_ID --query "ResourceRecordSets[?Type != 'NS' && Type != 'SOA']" --output json)
    
    if [ "$RECORDS" != "[]" ]; then
        # Create change batch for deletion
        CHANGE_BATCH=$(echo "$RECORDS" | jq '{Changes: [.[] | {Action: "DELETE", ResourceRecordSet: .}]}')
        aws route53 change-resource-record-sets --hosted-zone-id $HOSTED_ZONE_ID --change-batch "$CHANGE_BATCH" 2>/dev/null || print_warning "Could not delete some records"
    fi
    
    # 4. Delete Route53 Hosted Zone
    echo "Deleting Route53 hosted zone..."
    aws route53 delete-hosted-zone --id $HOSTED_ZONE_ID 2>/dev/null || print_warning "Hosted zone not found or already deleted"
    print_status "Route53 hosted zone deleted"
    
    # 5. S3 Bucket (ask first)
    echo ""
    read -p "Delete S3 bucket '$S3_KB_BUCKET'? (yes/no): " DELETE_S3
    if [ "$DELETE_S3" == "yes" ]; then
        echo "Emptying and deleting S3 bucket..."
        aws s3 rm s3://$S3_KB_BUCKET --recursive 2>/dev/null || true
        aws s3 rb s3://$S3_KB_BUCKET 2>/dev/null || print_warning "Bucket not found or already deleted"
        print_status "S3 bucket deleted"
    else
        print_warning "S3 bucket retained"
    fi
    
    echo ""
    print_status "Teardown complete!"
    echo ""
    echo "Note: Update GoDaddy nameservers back to GoDaddy defaults if you want to use another host."
}

# =============================================================================
# COSTS COMMAND
# =============================================================================
cmd_costs() {
    print_header "Estimated Monthly Costs"
    
    cat << EOF
┌─────────────────────────────────┬─────────────────┐
│ Service                         │ Est. Cost       │
├─────────────────────────────────┼─────────────────┤
│ AWS Amplify Hosting             │ \$5-15          │
│ Route53 Hosted Zone             │ \$0.50          │
│ Bedrock (Claude Sonnet chats)   │ \$15-25         │
│ AgentCore Runtime               │ \$2-5           │
│ S3 (KB backup)                  │ \$0.05          │
│ Lambda + API Gateway            │ \$0.02          │
│ CloudWatch Logs                 │ \$1-3           │
│ SES (emails)                    │ \$0.01          │
├─────────────────────────────────┼─────────────────┤
│ TOTAL (low traffic)             │ \$25-50/month   │
│ TOTAL (high chat usage)         │ \$75-100/month  │
└─────────────────────────────────┴─────────────────┘

Cost drivers:
- Chatbot usage is the biggest variable (Claude Sonnet at ~\$3/1M input tokens)
- If chatbot gets heavy use (2,000+ conversations): Could reach \$75-100/mo
- If nobody uses chatbot: As low as \$10-15/mo

View actual costs:
- Billing Dashboard: https://console.aws.amazon.com/billing/
- Cost Explorer: https://console.aws.amazon.com/cost-management/home#/cost-explorer
EOF
}

# =============================================================================
# HELP
# =============================================================================
cmd_help() {
    cat << EOF
Decision Layer Analytics - Infrastructure Management

Usage: ./infrastructure.sh <command>

Commands:
  status    Show current infrastructure status
  deploy    Deploy or trigger a new deployment
  teardown  Remove all AWS resources (with confirmation)
  costs     Show estimated monthly costs
  help      Show this help message

Configuration (edit at top of script):
  APP_ID:         $APP_ID
  DOMAIN:         $DOMAIN
  HOSTED_ZONE_ID: $HOSTED_ZONE_ID
  S3_KB_BUCKET:   $S3_KB_BUCKET
  REGION:         $REGION

Prerequisites:
  - AWS CLI configured with credentials
  - jq installed (for JSON processing)

EOF
}

# =============================================================================
# MAIN
# =============================================================================
case "${1:-help}" in
    status)
        cmd_status
        ;;
    deploy)
        cmd_deploy
        ;;
    teardown)
        cmd_teardown
        ;;
    costs)
        cmd_costs
        ;;
    help|--help|-h)
        cmd_help
        ;;
    *)
        echo "Unknown command: $1"
        cmd_help
        exit 1
        ;;
esac

