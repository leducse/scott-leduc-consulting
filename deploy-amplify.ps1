# PowerShell script to help deploy to AWS Amplify
# This script prepares your project and provides instructions

Write-Host "=== AWS Amplify Deployment Helper ===" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "⚠️  Git repository not found. Initializing..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit for Amplify deployment"
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository found" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Next Steps ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "For Next.js apps, the recommended approach is to use AWS Amplify Console:" -ForegroundColor White
Write-Host ""
Write-Host "1. Push your code to a Git repository (GitHub, GitLab, Bitbucket, or CodeCommit)" -ForegroundColor Yellow
Write-Host "2. Go to: https://console.aws.amazon.com/amplify" -ForegroundColor Yellow
Write-Host "3. Click 'New app' → 'Host web app'" -ForegroundColor Yellow
Write-Host "4. Connect your Git provider and select this repository" -ForegroundColor Yellow
Write-Host "5. Amplify will auto-detect Next.js and use amplify.yml" -ForegroundColor Yellow
Write-Host "6. Click 'Save and deploy'" -ForegroundColor Yellow
Write-Host ""
Write-Host "Your amplify.yml is already configured and ready!" -ForegroundColor Green
Write-Host ""

# Check if remote exists
$remotes = git remote -v 2>$null
if ($remotes) {
    Write-Host "Current Git remotes:" -ForegroundColor Cyan
    Write-Host $remotes
    Write-Host ""
    Write-Host "To push to your remote:" -ForegroundColor Yellow
    Write-Host "  git push origin main" -ForegroundColor White
} else {
    Write-Host "No Git remote configured. Add one with:" -ForegroundColor Yellow
    Write-Host "  git remote add origin <your-repo-url>" -ForegroundColor White
    Write-Host "  git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "=== Alternative: AWS CLI Deployment ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "If you prefer CLI, you can create the app using AWS CLI:" -ForegroundColor White
Write-Host ""
Write-Host "aws amplify create-app --name consulting-website --repository <repo-url> --platform WEB" -ForegroundColor Yellow
Write-Host ""



