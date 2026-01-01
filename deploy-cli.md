# Deploy to AWS Amplify using CLI

## Prerequisites
- AWS CLI configured with credentials
- Git repository (GitHub, GitLab, Bitbucket, or AWS CodeCommit)

## Option 1: Using AWS CLI (Recommended for CLI approach)

### Step 1: Create Amplify App
```bash
aws amplify create-app \
  --name consulting-website \
  --repository https://github.com/YOUR_USERNAME/YOUR_REPO \
  --platform WEB \
  --environment-variables NODE_ENV=production
```

**Note:** Replace `YOUR_USERNAME` and `YOUR_REPO` with your actual repository URL.

### Step 2: Create Branch
```bash
aws amplify create-branch \
  --app-id <APP_ID_FROM_STEP_1> \
  --branch-name main
```

### Step 3: Start Deployment
```bash
aws amplify start-job \
  --app-id <APP_ID> \
  --branch-name main \
  --job-type RELEASE
```

## Option 2: Using Amplify Console (Easier for Next.js)

Since you're using Next.js, the **Amplify Console with Git integration is recommended**:

1. **Push your code to Git:**
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy via Console:**
   - Go to: https://console.aws.amazon.com/amplify
   - Click "New app" → "Host web app"
   - Connect your Git provider
   - Select repository and branch
   - Amplify auto-detects Next.js
   - Click "Save and deploy"

## Option 3: Manual Deployment Script

If you want to automate it, here's a script:

```powershell
# Set your repository URL
$REPO_URL = "https://github.com/YOUR_USERNAME/YOUR_REPO"
$APP_NAME = "consulting-website"

# Create the app
$app = aws amplify create-app --name $APP_NAME --repository $REPO_URL --platform WEB | ConvertFrom-Json
$appId = $app.app.appId

Write-Host "Created app with ID: $appId" -ForegroundColor Green

# Create main branch
aws amplify create-branch --app-id $appId --branch-name main

# Start deployment
aws amplify start-job --app-id $appId --branch-name main --job-type RELEASE

Write-Host "Deployment started! Check status at:" -ForegroundColor Green
Write-Host "https://console.aws.amazon.com/amplify/home?region=us-east-1#/$appId" -ForegroundColor Cyan
```

## Current Status

✅ Code is committed and ready
✅ `amplify.yml` is configured
✅ Build tested and working
⏳ Need Git repository URL to proceed

## Next Steps

1. **If you have a GitHub/GitLab/Bitbucket repo:**
   - Push your code: `git push origin main`
   - Use Option 2 (Console) - it's the easiest!

2. **If you want to use AWS CodeCommit:**
   ```bash
   # Create CodeCommit repository
   aws codecommit create-repository --repository-name consulting-website
   
   # Add remote
   git remote add codecommit https://git-codecommit.us-east-1.amazonaws.com/v1/repos/consulting-website
   
   # Push
   git push codecommit main
   ```

3. **Then use Option 1 or 2 above to deploy**



