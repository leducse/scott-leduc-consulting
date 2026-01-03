# =============================================================================
# Decision Layer Analytics - Infrastructure Management Script (PowerShell)
# =============================================================================
# This script manages the AWS infrastructure for decision-layer.com
#
# Usage:
#   .\infrastructure.ps1 status    - Show current infrastructure status
#   .\infrastructure.ps1 deploy    - Deploy/redeploy the site
#   .\infrastructure.ps1 teardown  - Remove all AWS resources
#   .\infrastructure.ps1 costs     - Show estimated costs
#
# =============================================================================

param(
    [Parameter(Position=0)]
    [ValidateSet("status", "deploy", "teardown", "costs", "help")]
    [string]$Command = "help"
)

# Configuration
$APP_ID = "d3jq7pom4n937u"
$APP_NAME = "consulting-website"
$DOMAIN = "decision-layer.com"
$HOSTED_ZONE_ID = "Z07640571EKT6R93UIXXB"
$S3_KB_BUCKET = "scottleduc-consulting-kb"
$REGION = "us-east-1"
$GITHUB_REPO = "https://github.com/leducse/consulting-website"

function Write-Header($text) {
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host "  $text" -ForegroundColor Cyan
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host ""
}

function Write-Success($text) {
    Write-Host "✅ $text" -ForegroundColor Green
}

function Write-Warning($text) {
    Write-Host "⚠️  $text" -ForegroundColor Yellow
}

function Write-Error($text) {
    Write-Host "❌ $text" -ForegroundColor Red
}

# =============================================================================
# STATUS COMMAND
# =============================================================================
function Invoke-Status {
    Write-Header "Infrastructure Status"
    
    Write-Host "Checking AWS resources..."
    Write-Host ""
    
    # Amplify App
    Write-Host "Amplify App:" -ForegroundColor Cyan
    try {
        $app = aws amplify get-app --app-id $APP_ID --output json 2>$null | ConvertFrom-Json
        Write-Host "  Name: $($app.app.name)"
        Write-Host "  Domain: $($app.app.defaultDomain)"
        Write-Host "  Branch: $($app.app.productionBranch.branchName)"
    } catch {
        Write-Host "  Not found"
    }
    Write-Host ""
    
    # Domain Association
    Write-Host "Domain Association:" -ForegroundColor Cyan
    try {
        $domains = aws amplify list-domain-associations --app-id $APP_ID --output json 2>$null | ConvertFrom-Json
        foreach ($d in $domains.domainAssociations) {
            Write-Host "  $($d.domainName): $($d.domainStatus)"
        }
    } catch {
        Write-Host "  None"
    }
    Write-Host ""
    
    # Route53 Hosted Zone
    Write-Host "Route53 Hosted Zone:" -ForegroundColor Cyan
    try {
        $zone = aws route53 get-hosted-zone --id $HOSTED_ZONE_ID --output json 2>$null | ConvertFrom-Json
        Write-Host "  Name: $($zone.HostedZone.Name)"
        Write-Host "  Records: $($zone.HostedZone.ResourceRecordSetCount)"
    } catch {
        Write-Host "  Not found"
    }
    Write-Host ""
    
    # S3 Bucket
    Write-Host "S3 Knowledge Base Bucket:" -ForegroundColor Cyan
    try {
        $s3Contents = aws s3 ls s3://$S3_KB_BUCKET 2>$null | Select-Object -First 3
        if ($s3Contents) {
            $s3Contents | ForEach-Object { Write-Host "  $_" }
            Write-Host "  ..."
        } else {
            Write-Host "  Bucket exists but is empty"
        }
    } catch {
        Write-Host "  Not found"
    }
    Write-Host ""
    
    # Bedrock Knowledge Bases
    Write-Host "Bedrock Knowledge Bases:" -ForegroundColor Cyan
    try {
        $kbs = aws bedrock-agent list-knowledge-bases --output json 2>$null | ConvertFrom-Json
        if ($kbs.knowledgeBaseSummaries.Count -eq 0) {
            Write-Host "  None"
        } else {
            foreach ($kb in $kbs.knowledgeBaseSummaries) {
                Write-Host "  $($kb.name): $($kb.status)"
            }
        }
    } catch {
        Write-Host "  None"
    }
    Write-Host ""
    
    # OpenSearch Serverless
    Write-Host "OpenSearch Serverless:" -ForegroundColor Cyan
    try {
        $os = aws opensearchserverless list-collections --output json 2>$null | ConvertFrom-Json
        if ($os.collectionSummaries.Count -eq 0) {
            Write-Host "  None"
        } else {
            foreach ($c in $os.collectionSummaries) {
                Write-Host "  $($c.name): $($c.status)"
            }
        }
    } catch {
        Write-Host "  None"
    }
    
    Write-Host ""
    Write-Success "Status check complete"
}

# =============================================================================
# DEPLOY COMMAND
# =============================================================================
function Invoke-Deploy {
    Write-Header "Deploying Decision Layer Analytics"
    
    Write-Host "Checking if Amplify app exists..."
    
    try {
        $app = aws amplify get-app --app-id $APP_ID --output json 2>$null | ConvertFrom-Json
        Write-Success "Amplify app found, triggering new deployment..."
        
        aws amplify start-job --app-id $APP_ID --branch-name main --job-type RELEASE
        Write-Success "Deployment triggered!"
        Write-Host ""
        Write-Host "Monitor at: https://console.aws.amazon.com/amplify/home?region=$REGION#/$APP_ID"
    } catch {
        Write-Warning "Amplify app not found. Creating new app..."
        Write-Host ""
        Write-Host "To create a new Amplify app:"
        Write-Host "1. Go to: https://console.aws.amazon.com/amplify" -ForegroundColor Yellow
        Write-Host "2. Click 'New app' → 'Host web app'" -ForegroundColor Yellow
        Write-Host "3. Connect to GitHub: $GITHUB_REPO" -ForegroundColor Yellow
        Write-Host "4. Select branch: main" -ForegroundColor Yellow
        Write-Host "5. Deploy" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "After creation, update APP_ID in this script."
    }
}

# =============================================================================
# TEARDOWN COMMAND
# =============================================================================
function Invoke-Teardown {
    Write-Header "⚠️  TEARDOWN - This will delete all resources!"
    
    Write-Host "This will remove:"
    Write-Host "  - Amplify app and all deployments"
    Write-Host "  - Route53 hosted zone and DNS records"
    Write-Host "  - S3 knowledge base bucket (optional)"
    Write-Host ""
    
    $confirm = Read-Host "Are you sure? Type 'yes' to confirm"
    if ($confirm -ne "yes") {
        Write-Host "Teardown cancelled."
        return
    }
    
    Write-Host ""
    
    # 1. Delete Amplify Domain Association
    Write-Host "Removing domain association..."
    try {
        aws amplify delete-domain-association --app-id $APP_ID --domain-name $DOMAIN 2>$null
        Write-Success "Domain association deleted"
    } catch {
        Write-Warning "Domain association not found or already deleted"
    }
    
    # 2. Delete Amplify App
    Write-Host "Deleting Amplify app..."
    try {
        aws amplify delete-app --app-id $APP_ID 2>$null
        Write-Success "Amplify app deleted"
    } catch {
        Write-Warning "Amplify app not found or already deleted"
    }
    
    # 3. Delete Route53 Records and Zone
    Write-Host "Deleting Route53 records..."
    try {
        # Get all records except NS and SOA
        $records = aws route53 list-resource-record-sets --hosted-zone-id $HOSTED_ZONE_ID --output json 2>$null | ConvertFrom-Json
        $toDelete = $records.ResourceRecordSets | Where-Object { $_.Type -ne "NS" -and $_.Type -ne "SOA" }
        
        if ($toDelete.Count -gt 0) {
            $changes = @{
                Changes = $toDelete | ForEach-Object {
                    @{
                        Action = "DELETE"
                        ResourceRecordSet = $_
                    }
                }
            }
            $changeBatch = $changes | ConvertTo-Json -Depth 10
            aws route53 change-resource-record-sets --hosted-zone-id $HOSTED_ZONE_ID --change-batch $changeBatch 2>$null
        }
        
        Write-Host "Deleting Route53 hosted zone..."
        aws route53 delete-hosted-zone --id $HOSTED_ZONE_ID 2>$null
        Write-Success "Route53 hosted zone deleted"
    } catch {
        Write-Warning "Could not delete Route53 resources"
    }
    
    # 4. S3 Bucket
    Write-Host ""
    $deleteS3 = Read-Host "Delete S3 bucket '$S3_KB_BUCKET'? (yes/no)"
    if ($deleteS3 -eq "yes") {
        Write-Host "Emptying and deleting S3 bucket..."
        try {
            aws s3 rm s3://$S3_KB_BUCKET --recursive 2>$null
            aws s3 rb s3://$S3_KB_BUCKET 2>$null
            Write-Success "S3 bucket deleted"
        } catch {
            Write-Warning "Bucket not found or already deleted"
        }
    } else {
        Write-Warning "S3 bucket retained"
    }
    
    Write-Host ""
    Write-Success "Teardown complete!"
    Write-Host ""
    Write-Host "Note: Update GoDaddy nameservers back to GoDaddy defaults if you want to use another host."
}

# =============================================================================
# COSTS COMMAND
# =============================================================================
function Invoke-Costs {
    Write-Header "Estimated Monthly Costs"
    
    Write-Host @"
┌─────────────────────────────────┬─────────────────┐
│ Service                         │ Est. Cost       │
├─────────────────────────────────┼─────────────────┤
│ AWS Amplify Hosting             │ `$5-15          │
│ Route53 Hosted Zone             │ `$0.50          │
│ Bedrock (Claude Sonnet chats)   │ `$15-25         │
│ AgentCore Runtime               │ `$2-5           │
│ S3 (KB backup)                  │ `$0.05          │
│ Lambda + API Gateway            │ `$0.02          │
│ CloudWatch Logs                 │ `$1-3           │
│ SES (emails)                    │ `$0.01          │
├─────────────────────────────────┼─────────────────┤
│ TOTAL (low traffic)             │ `$25-50/month   │
│ TOTAL (high chat usage)         │ `$75-100/month  │
└─────────────────────────────────┴─────────────────┘

Cost drivers:
- Chatbot usage is the biggest variable (Claude Sonnet at ~`$3/1M input tokens)
- If chatbot gets heavy use (2,000+ conversations): Could reach `$75-100/mo
- If nobody uses chatbot: As low as `$10-15/mo

View actual costs:
- Billing Dashboard: https://console.aws.amazon.com/billing/
- Cost Explorer: https://console.aws.amazon.com/cost-management/home#/cost-explorer
"@
}

# =============================================================================
# HELP
# =============================================================================
function Invoke-Help {
    Write-Host @"
Decision Layer Analytics - Infrastructure Management

Usage: .\infrastructure.ps1 <command>

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

"@
}

# =============================================================================
# MAIN
# =============================================================================
switch ($Command) {
    "status"   { Invoke-Status }
    "deploy"   { Invoke-Deploy }
    "teardown" { Invoke-Teardown }
    "costs"    { Invoke-Costs }
    "help"     { Invoke-Help }
    default    { Invoke-Help }
}
