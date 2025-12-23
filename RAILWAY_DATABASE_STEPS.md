# Step-by-Step: Connect PostgreSQL to Backend in Railway

## The Problem
Your logs show: `DATABASE_URL not found, using individual connection parameters`

This means Railway hasn't connected your PostgreSQL service to your backend service.

## Solution: Link Services in Railway

### Method 1: Using Variables Tab (Easiest)

1. **Go to Railway Dashboard**
   - Open your project
   - Click on your **backend service** (the one that's failing)

2. **Open Variables Tab**
   - Click on the **"Variables"** tab in your backend service

3. **Add DATABASE_URL from PostgreSQL**
   - Click **"+ New Variable"** or **"Add Variable"**
   - In the **Variable Name** field, type: `DATABASE_URL`
   - Railway should show a dropdown or button that says something like:
     - "Reference from another service"
     - "Select from PostgreSQL"
     - Or a dropdown with your PostgreSQL service name
   - **Select your PostgreSQL service** from the dropdown
   - Select **`DATABASE_URL`** from that service
   - Click **"Add"** or **"Save"**

4. **Verify**
   - You should now see `DATABASE_URL` in your backend service variables
   - It should show it's coming from your PostgreSQL service (might show as a reference/link)

5. **Redeploy**
   - Railway should auto-redeploy
   - Or click **"Redeploy"** manually
   - Check logs - should now show: `Using DATABASE_URL for database connection`

### Method 2: Using Service Connections

1. **Go to Backend Service**
   - Click on your backend service

2. **Settings Tab**
   - Go to **"Settings"** tab
   - Look for **"Service Connections"**, **"Connected Services"**, or **"Dependencies"**

3. **Connect PostgreSQL**
   - You should see your PostgreSQL service listed
   - Click **"Connect"** or toggle it on
   - This should automatically add `DATABASE_URL` to your backend service

4. **Redeploy**
   - Redeploy your backend service
   - Check logs

### Method 3: Manual Copy (If above don't work)

1. **Get DATABASE_URL from PostgreSQL**
   - Click on your **PostgreSQL service**
   - Go to **"Variables"** tab
   - Find `DATABASE_URL`
   - **Copy the entire value** (it's a long string starting with `postgresql://`)

2. **Add to Backend Service**
   - Go to your **backend service**
   - Go to **"Variables"** tab
   - Click **"+ New Variable"**
   - Name: `DATABASE_URL`
   - Value: Paste the copied DATABASE_URL
   - Click **"Add"**

3. **Redeploy**
   - Redeploy backend service
   - Check logs

## What You Should See After Fixing

**In Railway Variables Tab:**
- `DATABASE_URL` should be listed
- It should show it's from PostgreSQL service (or have the full connection string)

**In Railway Logs:**
```
Using DATABASE_URL for database connection
Connected to PostgreSQL database
Database schema initialized
Server is running on port XXXX
```

**NOT:**
```
DATABASE_URL not found
DB_HOST: localhost
Error: connect ECONNREFUSED
```

## Troubleshooting

**If you don't see PostgreSQL service:**
- Create it: Click "+ New" → "Database" → "Add PostgreSQL"

**If Variables tab doesn't show "Reference from service" option:**
- Use Method 3 (manual copy)
- Or check Railway's documentation for your Railway version

**If DATABASE_URL is set but still failing:**
- Make sure PostgreSQL service is running (green status)
- Check that the DATABASE_URL value is correct (starts with `postgresql://`)
- Wait a few seconds and redeploy

## Quick Checklist

- [ ] PostgreSQL service exists and is running
- [ ] Backend service has `DATABASE_URL` variable (from PostgreSQL)
- [ ] Backend service has been redeployed
- [ ] Logs show "Using DATABASE_URL" (not "DATABASE_URL not found")

