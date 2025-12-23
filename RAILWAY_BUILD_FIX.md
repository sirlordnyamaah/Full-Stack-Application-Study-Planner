# Railway Build Error Fix

## The Error
```
cd backend && npm install
sh: 1: cd: can't cd to backend
```

## Root Cause
Railway has a build command set that tries to `cd backend`, but this fails because:
- Either the root directory is already set to `backend` (so there's no `backend` subdirectory)
- Or Railway is building from the wrong context

## Solution: Clear Build Command in Railway UI

### Step 1: Go to Railway Service Settings

1. Open your Railway project
2. Click on your **backend service**
3. Go to the **Settings** tab
4. Scroll down to **"Build Command"** or **"Build"** section

### Step 2: Clear/Remove Build Command

**Option A: Clear the Build Command**
- Find the **"Build Command"** field
- **Delete/clear** any text in it (remove `cd backend && npm install`)
- Leave it **empty**
- Save

**Option B: Set Correct Build Command**
If you can't leave it empty, set it to:
```
npm install
```
(Without the `cd backend` part)

### Step 3: Verify Root Directory

Make sure **Root Directory** is set to: `backend`

### Step 4: Verify Start Command

Make sure **Start Command** is set to: `node src/server.js`

### Step 5: Redeploy

1. Click **"Redeploy"** or Railway will auto-redeploy
2. Check the build logs - it should now just run `npm install` from the `backend/` directory

## What Should Happen

After clearing the build command:
- Railway will detect `package.json` in the `backend/` directory
- It will automatically run `npm install` (no `cd` needed since root is `backend`)
- It will start with `node src/server.js`

## Alternative: Delete and Recreate Service

If the above doesn't work:

1. **Delete** the current backend service in Railway
2. **Create a new service**:
   - Select your GitHub repo
   - **Set Root Directory to `backend`** (do this FIRST, before any deploy)
   - **Leave Build Command EMPTY**
   - **Set Start Command to**: `node src/server.js`
   - Railway will auto-detect and build correctly

## Verify in Build Logs

After fixing, your build logs should show:
```
✓ Detected Node.js project
✓ Installing dependencies from package.json
✓ Build complete
✓ Starting: node src/server.js
```

NOT:
```
✗ cd backend && npm install  ← This is the problem
```

