# Railway Database Connection Fix

## The Error
```
Error: connect ECONNREFUSED ::1:5432
```

This means the backend can't connect to the database because `DATABASE_URL` is not set.

## Solution: Connect PostgreSQL Service to Backend Service

### Step 1: Verify PostgreSQL Service Exists

1. In Railway dashboard, check if you have a **PostgreSQL** service
2. If not, create one:
   - Click **"+ New"**
   - Select **"Database"** → **"Add PostgreSQL"**

### Step 2: Connect PostgreSQL to Backend Service

1. Click on your **PostgreSQL service** in Railway
2. Go to the **"Variables"** tab
3. You should see `DATABASE_URL` listed
4. Copy the value (or note that it exists)

### Step 3: Link Services (Critical Step)

1. Click on your **backend service** (not PostgreSQL)
2. Go to the **"Settings"** tab
3. Scroll down to **"Service Connections"** or **"Connected Services"**
4. Look for your PostgreSQL service
5. **Click "Connect"** or **"Link"** to connect the PostgreSQL service to your backend service

**OR**

1. In your backend service, go to **"Variables"** tab
2. Click **"+ New Variable"**
3. Railway should show a dropdown with available services
4. Select your **PostgreSQL service**
5. Select **`DATABASE_URL`** from the PostgreSQL service
6. This will automatically link the services

### Step 4: Verify DATABASE_URL is Set

1. In your backend service, go to **"Variables"** tab
2. You should now see `DATABASE_URL` listed
3. It should have a value like: `postgresql://user:password@host:port/database`

### Step 5: Redeploy

After connecting the services:
1. Railway should automatically redeploy
2. Or manually click **"Redeploy"** on your backend service
3. Check the logs - you should see:
   ```
   Using DATABASE_URL for database connection
   Connected to PostgreSQL database
   Database schema initialized
   Server is running on port XXXX
   ```

## Alternative: Manual DATABASE_URL Setup

If the automatic linking doesn't work:

1. Go to your **PostgreSQL service** → **"Variables"** tab
2. Copy the `DATABASE_URL` value
3. Go to your **backend service** → **"Variables"** tab
4. Click **"+ New Variable"**
5. Name: `DATABASE_URL`
6. Value: Paste the DATABASE_URL from PostgreSQL
7. Save and redeploy

## Verify Connection

After redeploying, check the backend logs. You should see:
- ✅ `Using DATABASE_URL for database connection`
- ✅ `Connected to PostgreSQL database`
- ✅ `Database schema initialized`
- ✅ `Server is running on port XXXX`

NOT:
- ❌ `DATABASE_URL not found`
- ❌ `Error: connect ECONNREFUSED`

## Common Issues

**Issue:** DATABASE_URL still not showing in backend service
- **Fix:** Make sure you've connected/linked the PostgreSQL service to the backend service in Railway's UI

**Issue:** Services are connected but still getting connection refused
- **Fix:** Wait a few seconds for Railway to propagate the connection, then redeploy

**Issue:** Can't find "Service Connections" option
- **Fix:** In Railway, when you add a variable, it should show a dropdown to select from other services. Use that to link `DATABASE_URL` from PostgreSQL.

## Quick Checklist

- [ ] PostgreSQL service exists in Railway
- [ ] PostgreSQL service has `DATABASE_URL` variable
- [ ] Backend service is connected/linked to PostgreSQL service
- [ ] Backend service has `DATABASE_URL` variable (from PostgreSQL)
- [ ] Backend service has been redeployed after connection
- [ ] Logs show "Using DATABASE_URL" and "Connected to PostgreSQL database"

