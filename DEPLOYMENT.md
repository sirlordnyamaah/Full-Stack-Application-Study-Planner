# Railway Deployment Guide

This guide will walk you through deploying your Study Planner application to Railway.

## Prerequisites

1. A GitHub account
2. A Railway account (sign up at [railway.app](https://railway.app))
3. Your code pushed to a GitHub repository

## Step 1: Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
git add .
git commit -m "Prepare for Railway deployment"
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 2: Create Railway Account and Project

1. Go to [railway.app](https://railway.app) and sign up/login
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub account
5. Select your repository

## Step 3: Add PostgreSQL Database

1. In your Railway project dashboard, click "+ New"
2. Select "Database" → "Add PostgreSQL"
3. Railway will automatically create a PostgreSQL database
4. The `DATABASE_URL` environment variable will be automatically set

## Step 4: Deploy Backend Service

1. In your Railway project, click "+ New" → "GitHub Repo"
2. Select your repository again (or it may already be connected)
3. Railway will detect it's a Node.js project
4. Configure the service:
   - **Root Directory**: Leave empty (or set to `backend` if deploying separately)
   - **Start Command**: `node backend/src/server.js`
   - **Build Command**: (leave empty, or `cd backend && npm install`)

## Step 5: Set Environment Variables for Backend

In your backend service settings, add these environment variables:

- `NODE_ENV`: `production`
- `PORT`: Railway will set this automatically (usually `$PORT`)
- `DATABASE_URL`: Railway sets this automatically from the PostgreSQL service
- `FRONTEND_URL`: Will set this after deploying frontend (e.g., `https://your-frontend.railway.app`)

**Note**: Railway automatically provides `DATABASE_URL` from the PostgreSQL service. You don't need to set individual DB variables.

## Step 6: Deploy Frontend Service

### Option A: Deploy Frontend as Separate Service (Recommended)

1. In Railway, click "+ New" → "GitHub Repo"
2. Select your repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx serve -s build -l $PORT`

4. Add environment variable:
   - `REACT_APP_API_URL`: `https://your-backend-service.railway.app/api`

### Option B: Deploy Frontend to Vercel/Netlify (Easier for React)

Since React apps work better on Vercel/Netlify, you might want to:

1. Deploy frontend to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Set root directory to `frontend`
   - Add environment variable: `REACT_APP_API_URL` = your Railway backend URL

2. Update backend CORS to allow Vercel domain

## Step 7: Connect Services

1. In Railway, your PostgreSQL database should automatically be connected
2. The backend service should have access to `DATABASE_URL`
3. Make sure the frontend service has the backend URL in `REACT_APP_API_URL`

## Step 8: Get Your URLs

1. Railway will provide a URL for each service (e.g., `https://your-app.railway.app`)
2. Copy the backend URL and add `/api` for the frontend's `REACT_APP_API_URL`
3. Update the backend's `FRONTEND_URL` environment variable with your frontend URL

## Step 9: Test Your Deployment

1. Visit your frontend URL
2. Try creating a task
3. Check Railway logs if there are any errors

## Troubleshooting

### Backend won't start
- Check Railway logs: Click on your service → "View Logs"
- Verify `DATABASE_URL` is set (Railway sets this automatically)
- Check that the start command is correct

### Database connection errors
- Verify PostgreSQL service is running
- Check that `DATABASE_URL` environment variable exists
- Railway automatically connects services in the same project

### Frontend can't connect to backend
- Verify `REACT_APP_API_URL` is set correctly
- Check CORS settings in backend
- Make sure backend URL includes `https://`

### Build fails
- Check that all dependencies are in `package.json`
- Verify Node.js version (Railway uses the version in `package.json` or `.nvmrc`)

## Railway CLI (Optional)

You can also use Railway CLI:

```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

## Cost

Railway offers:
- $5 free credit monthly
- Pay-as-you-go pricing
- Free tier for small projects

## Next Steps

After deployment:
1. Update your README with the deployment link
2. Test all CRUD operations
3. Make sure your Git commits are up to date

