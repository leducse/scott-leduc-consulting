#!/bin/bash

# Add redirect domains to AWS Amplify
# Run this AFTER decision-layer.com is verified and working

APP_ID="d3jq7pom4n937u"
PRIMARY_DOMAIN="decision-layer.com"

# List of domains to add as redirects to the primary domain
REDIRECT_DOMAINS=(
  "leducanalyticsconsulting.com"
  "scottleduc.biz"
  "bi-viz.com"
  "bi-viz.biz"
  "leducbiconsulting.com"
)

echo "🌐 Adding redirect domains to AWS Amplify..."
echo "   Primary domain: $PRIMARY_DOMAIN"
echo ""

for DOMAIN in "${REDIRECT_DOMAINS[@]}"; do
  echo "➡️  Adding $DOMAIN..."
  
  aws amplify create-domain-association \
    --app-id $APP_ID \
    --domain-name $DOMAIN \
    --sub-domain-settings '[
      {"prefix": "", "branchName": "main"},
      {"prefix": "www", "branchName": "main"}
    ]' \
    --output json
  
  if [ $? -eq 0 ]; then
    echo "   ✅ $DOMAIN added successfully"
    echo ""
    echo "   📋 Get DNS records with:"
    echo "   aws amplify get-domain-association --app-id $APP_ID --domain-name $DOMAIN"
  else
    echo "   ❌ Failed to add $DOMAIN"
  fi
  
  echo ""
  sleep 2
done

echo ""
echo "🎉 Done! Now add DNS records at each registrar."
echo ""
echo "To check status of all domains:"
echo "aws amplify list-domain-associations --app-id $APP_ID --output table"
