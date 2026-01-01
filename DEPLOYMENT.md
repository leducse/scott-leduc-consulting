# AWS Amplify Deployment Guide

This guide will help you deploy the consulting website to AWS Amplify.

## Prerequisites

1. AWS Account with appropriate permissions
2. Git repository (GitHub, GitLab, Bitbucket, or AWS CodeCommit)
3. Your code pushed to the repository

## Deployment Options

### Option 1: Deploy via AWS Amplify Console (Recommended)

1. **Log in to AWS Console**
   - Go to https://console.aws.amazon.com/amplify
   - Sign in with your AWS account

2. **Create New App**
   - Click "New app" → "Host web app"
   - Choose your Git provider (GitHub, GitLab, Bitbucket, or CodeCommit)
   - Authorize AWS Amplify to access your repository

3. **Configure Repository**
   - Select your repository: `consulting-website` (or your repo name)
   - Select branch: `main` (or your default branch)
   - Click "Next"

4. **Configure Build Settings**
   - AWS Amplify should auto-detect Next.js
   - Verify the build settings match:
     ```yaml
     version: 1
     frontend:
       phases:
         preBuild:
           commands:
             - npm ci
         build:
           commands:
             - npm run build
       artifacts:
         baseDirectory: .next
         files:
           - '**/*'
       cache:
         paths:
           - node_modules/**/*
           - .next/cache/**/*
     ```
   - If needed, you can paste the contents of `amplify.yml` here
   - Click "Next"

5. **Review and Deploy**
   - Review your settings
   - Click "Save and deploy"
   - Wait for the build to complete (usually 5-10 minutes)

6. **Access Your Site**
   - Once deployed, you'll get a URL like: `https://main.xxxxx.amplifyapp.com`
   - You can customize the domain in the Amplify console

### Option 2: Deploy via AWS CLI

1. **Install AWS CLI and Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   aws configure
   ```

2. **Initialize Amplify**
   ```bash
   cd consulting-website
   amplify init
   ```
   - Follow the prompts to set up your project

3. **Add Hosting**
   ```bash
   amplify add hosting
   ```
   - Select "Hosting with Amplify Console"
   - Choose "Manual deployment" or connect to Git

4. **Deploy**
   ```bash
   amplify publish
   ```

## Environment Variables (if needed)

If you need to add environment variables later:

1. Go to AWS Amplify Console
2. Select your app
3. Go to "Environment variables" in the left sidebar
4. Add variables like:
   - `NODE_ENV=production`
   - Any API keys or configuration values

## Custom Domain Setup

1. In Amplify Console, go to "Domain management"
2. Click "Add domain"
3. Enter your domain name
4. Follow the DNS configuration instructions
5. AWS will automatically provision SSL certificates

## Build Troubleshooting

If the build fails:

1. **Check Build Logs**
   - Go to Amplify Console → Your app → Build history
   - Click on the failed build to see logs

2. **Common Issues:**
   - **Node version**: Amplify uses Node 18 by default (should work fine)
   - **Build timeout**: Increase timeout in build settings if needed
   - **Memory issues**: Check if you need to increase build instance size

3. **Local Build Test**
   ```bash
   npm ci
   npm run build
   ```
   - If this works locally, the Amplify build should work too

## Continuous Deployment

Once connected to Git:
- Every push to your main branch will trigger a new deployment
- Pull requests can be set up to create preview deployments
- Configure this in "App settings" → "Build settings"

## Monitoring

- **Build History**: View all deployments in the Amplify Console
- **Access Logs**: Monitor traffic and errors
- **Performance**: Check Lighthouse scores and performance metrics

## Cost

AWS Amplify hosting is very affordable:
- Free tier: 15 GB storage, 5 GB served per month
- Pay-as-you-go after that
- Typically costs $1-5/month for small to medium sites

## Support

- AWS Amplify Documentation: https://docs.aws.amazon.com/amplify/
- Next.js on Amplify: https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-app.html



