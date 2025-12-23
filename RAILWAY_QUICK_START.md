# Quick Start: Deploy to Railway

## 🚀 Quick Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for Railway deployment"
git push
```

### 2. Create Railway Project
1. Go to [railway.app](https://railway.app) → Sign up/Login
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository

### 3. Add PostgreSQL Database
1. In Railway dashboard, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. ✅ Railway automatically sets `DATABASE_URL`

### 4. Deploy Backend
Railway should auto-detect your backend. If not:
- **Root Directory**: `backend` (or leave empty if root)
- **Start Command**: `node backend/src/server.js`
- **Environment Variables** (Railway sets these automatically):
  - `DATABASE_URL` ✅ (auto-set from PostgreSQL)
  - `PORT` ✅ (auto-set by Railway)
  - `NODE_ENV`: `production`
  - `FRONTEND_URL`: (set after frontend deploys)

### 5. Deploy Frontend

**Option A: Railway (Full Stack)**
1. Click **"+ New"** → **"GitHub Repo"** (same repo)
2. **Root Directory**: `frontend`
3. **Build Command**: `npm install && npm run build`
4. **Start Command**: `npx serve -s build -l $PORT`
5. **Environment Variable**:
   - `REACT_APP_API_URL`: `https://your-backend.railway.app/api`

**Option B: Vercel (Easier for React) - Recommended**
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repo
3. **Root Directory**: `frontend`
4. **Environment Variable**:
   - `REACT_APP_API_URL`: `https://your-backend.railway.app/api`
5. Deploy!

### 6. Connect Services
- Backend automatically connects to PostgreSQL ✅
- Update `FRONTEND_URL` in backend with your frontend URL
- Update `REACT_APP_API_URL` in frontend with your backend URL

### 7. Get Your URLs
- Railway provides: `https://your-app.railway.app`
- Copy backend URL → Use in frontend's `REACT_APP_API_URL`
- Copy frontend URL → Use in backend's `FRONTEND_URL`

## 📝 Environment Variables Summary

### Backend (Railway)
```
DATABASE_URL = (auto-set by Railway)
PORT = (auto-set by Railway)
NODE_ENV = production
FRONTEND_URL = https://your-frontend.vercel.app (or Railway URL)
```

### Frontend (Vercel or Railway)
```
REACT_APP_API_URL = https://your-backend.railway.app/api
```

## ✅ Test Your Deployment
1. Visit your frontend URL
2. Create a task
3. Check it appears in the list
4. Try editing/deleting

## 🐛 Common Issues

**Backend can't connect to database?**
- Check `DATABASE_URL` exists (Railway sets it automatically)
- Verify PostgreSQL service is running

**Frontend can't reach backend?**
- Check `REACT_APP_API_URL` is correct
- Verify CORS settings allow your frontend domain
- Make sure backend URL uses `https://`

**Build fails?**
- Check Railway logs
- Verify all dependencies in `package.json`

## 💰 Cost
- Railway: $5 free credit/month
- Vercel: Free tier available
- Total: Usually $0 for small projects!

