# Railway Deployment Fix

## The Problem
Railway is trying to run `cd backend && npm install` but can't find the backend directory because it's building from the wrong root.

## Solution: Set Root Directory in Railway

### Step 1: Configure Backend Service in Railway

1. Go to your Railway project dashboard
2. Click on your **backend service**
3. Go to **Settings** tab
4. Under **"Root Directory"**, set it to: `backend`
5. **Save** the changes

### Step 2: Verify Start Command

In the same Settings page, make sure:
- **Start Command**: `node src/server.js` (or leave empty - it will use the Procfile)
- Railway will automatically detect the `package.json` in the `backend` directory

### Step 3: Redeploy

After setting the root directory:
1. Railway should automatically redeploy
2. Or click **"Redeploy"** manually
3. The build should now work correctly

## Alternative: If Root Directory Setting Doesn't Work

If Railway still has issues, you can:

1. **Delete the current service** and create a new one
2. When creating the new service:
   - Select your GitHub repo
   - **Immediately set Root Directory to `backend`** before the first deploy
   - Railway will then build from the correct directory

## What Should Happen

With the root directory set to `backend`:
- Railway will run `npm install` from the `backend/` directory ✅
- It will find `package.json` in `backend/package.json` ✅
- It will run `node src/server.js` to start the server ✅

## Verify Build Logs

Check the Railway build logs. You should see:
```
✓ Installing dependencies
✓ Building application
✓ Starting server with: node src/server.js
```

If you still see errors, check:
- Root Directory is set to `backend` (not empty, not `/`)
- `package.json` exists in `backend/package.json`
- All dependencies are listed in `package.json`

