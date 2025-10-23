# 🚀 Supabase Database Setup Guide

Follow these steps to set up your production database on Supabase.

---

## 📋 Prerequisites

1. ✅ Supabase account (https://supabase.com)
2. ✅ Vercel account (https://vercel.app)
3. ✅ Your project code (already pushed to GitHub)

---

## Step 1: Drop Existing Tables in Supabase

1. Go to your **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy the contents of `drop-tables.sql` file and paste it
6. Click **Run** or press `Ctrl+Enter`
7. You should see: `All tables dropped successfully!`

---

## Step 2: Get Your Supabase Connection String

1. In Supabase Dashboard, go to **Settings** → **Database**
2. Scroll to **Connection String** section
3. Select **URI** tab
4. Copy the connection string (looks like this):
   ```
   postgresql://postgres.[REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
5. **IMPORTANT**: Replace `[YOUR-PASSWORD]` with your actual database password
6. **IMPORTANT**: If your password has special characters, URL-encode them:
   - `@` → `%40`
   - `#` → `%23`
   - `&` → `%26`
   - `!` → `%21`
   - Use this tool: https://www.urlencoder.org/

---

## Step 3: Update Local `.env.local`

Open `.env.local` and replace ALL content with:

```env
DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD_ENCODED]@aws-0-[REGION].pooler.supabase.com:6543/postgres"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="isbo0ELK/phQzP1GV07zk+pZAbRRq4101a2eUaV+1fw="
```

**Replace** the Supabase connection string with your actual one from Step 2.

---

## Step 4: Run Setup Script

Open your terminal and run:

```bash
node setup-supabase.js
```

This will:
- ✅ Create all database tables in Supabase
- ✅ Add 2 default admin users
- ✅ Add 3 demo users (Student, Club, Admin)

You should see output like:
```
📌 Creating default admin users...
✅ Admin 1 created: admin@iitp.ac.in
✅ Admin 2 created: admin2@iitp.ac.in

📌 Creating 3 demo users (same email)...
✅ Demo Student created
✅ Demo Club created
✅ Demo Admin created

🎉 Database setup completed successfully!
```

---

## Step 5: Add Environment Variables to Vercel

1. Go to **Vercel Dashboard**: https://vercel.app
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these 3 variables (select **Production**, **Preview**, **Development** for each):

### Variable 1: DATABASE_URL
```
postgresql://postgres.[REF]:[PASSWORD_ENCODED]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```
*(Use the same Supabase URL from Step 3)*

### Variable 2: NEXTAUTH_URL
```
https://iit-patna-event-portal-extenstion-t-nu.vercel.app
```

### Variable 3: NEXTAUTH_SECRET
```
isbo0ELK/phQzP1GV07zk+pZAbRRq4101a2eUaV+1fw=
```

5. Click **Save** after adding each variable

---

## Step 6: Redeploy on Vercel

1. Go to **Deployments** tab
2. Click on the **latest deployment**
3. Click **⋯** (three dots) → **Redeploy**
4. Select **Use existing Build Cache** (optional)
5. Click **Redeploy**

Wait 1-2 minutes for deployment to complete.

---

## Step 7: Restore Local `.env.local`

After Vercel deployment, restore your local `.env.local` to use SQLite:

```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="isbo0ELK/phQzP1GV07zk+pZAbRRq4101a2eUaV+1fw="
```

---

## 🎉 Done! Test Your Site

Visit: https://iit-patna-event-portal-extenstion-t-nu.vercel.app/auth/login

### Test Credentials:

**Default Admins:**
- `admin@iitp.ac.in` / `Admin@2025`
- `admin2@iitp.ac.in` / `Admin2@2025`

**Demo Users (all roles):**
- `demo@gmail.com` / `trial@2025`
- *(Select role on login page: Student, Club, or Admin)*

---

## 📊 Check Database in Supabase

1. Go to Supabase Dashboard → **Table Editor**
2. You should see 4 tables:
   - `User` - 5 users total (2 admins + 3 demo users)
   - `UserRole` - 5 role assignments
   - `StudentProfile` - 1 student profile
   - `CommitteeProfile` - 1 committee profile

---

## 🐛 Troubleshooting

### Error: "Connection refused"
- Check that DATABASE_URL is correct
- Verify your Supabase password is URL-encoded

### Error: "Invalid credentials"
- Make sure you ran `setup-supabase.js` successfully
- Check Supabase Table Editor to verify users exist

### Error: "Prisma Client not generated"
- Run: `npx prisma generate`

### Vercel Deployment Failed
- Check Vercel build logs
- Verify all 3 environment variables are set
- Make sure latest code is pushed to GitHub

---

## 📸 Photo Uploads

**Current Status:**
- Local dev: Photos saved to `public/uploads/` folder
- Production: **NOT YET CONFIGURED** (Vercel has ephemeral filesystem)

**To fix for production:**
You need to use Supabase Storage. Let me know if you want me to implement this!

---

**Need help?** Check the console logs or reach out for support!

