# 🚀 Supabase + Vercel Setup Guide

## Step 1: Create Supabase Account & Project

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up** with GitHub (recommended)
3. **Create new project**:
   - Organization: Choose or create one
   - Project name: `iit-patna-event-portal`
   - Database password: Generate a strong password (save it!)
   - Region: Choose closest to your users
4. **Wait 2-3 minutes** for project setup

## Step 2: Get Database Connection String

1. **Go to your project dashboard**
2. **Click "Settings"** (gear icon) in the left sidebar
3. **Click "Database"** in the settings menu
4. **Scroll down to "Connection string"**
5. **Copy the URI** (it looks like this):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

## Step 3: Set Up Vercel Environment Variables

1. **Go to your Vercel project dashboard**
2. **Click "Settings"** tab
3. **Click "Environment Variables"** in the left sidebar
4. **Add these variables**:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `DATABASE_URL` | `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres` | Production, Preview, Development |
   | `NEXTAUTH_URL` | `https://your-domain.vercel.app` | Production |
   | `NEXTAUTH_URL` | `http://localhost:3000` | Development |
   | `NEXTAUTH_SECRET` | `your-random-secret-key-here` | Production, Preview, Development |

## Step 4: Run Database Migrations

### Option A: Using Supabase Dashboard (Easiest)
1. **Go to Supabase Dashboard → SQL Editor**
2. **Run this SQL** to create your tables:

```sql
-- Create User table
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "passwordPlain" TEXT,
    "phone" TEXT,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Create Role enum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'COMMITTEE', 'ADMIN');

-- Create UserRole table
CREATE TABLE "UserRole" (
    "userId" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId","role")
);

-- Create StudentProfile table
CREATE TABLE "StudentProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rollNumber" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "photoUrl" TEXT,
    "gender" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "course" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- Create CommitteeProfile table
CREATE TABLE "CommitteeProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "committeeCode" TEXT NOT NULL,
    "clubName" TEXT,

    CONSTRAINT "CommitteeProfile_pkey" PRIMARY KEY ("id")
);

-- Create unique constraints
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
CREATE UNIQUE INDEX "StudentProfile_userId_key" ON "StudentProfile"("userId");
CREATE UNIQUE INDEX "CommitteeProfile_userId_key" ON "CommitteeProfile"("userId");

-- Create foreign key constraints
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CommitteeProfile" ADD CONSTRAINT "CommitteeProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

### Option B: Using Prisma CLI (Advanced)
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

## Step 5: Deploy to Vercel

1. **Push your code to GitHub**
2. **Connect repository to Vercel**
3. **Deploy!**

## Step 6: Test Your Deployment

1. **Visit your Vercel URL**
2. **Try registering a new user**
3. **Check Supabase Dashboard → Table Editor** to see your data

## 🔧 Troubleshooting

### Common Issues:

1. **"Database connection failed"**
   - Check your `DATABASE_URL` format
   - Ensure password doesn't contain special characters

2. **"Table doesn't exist"**
   - Run the SQL migration in Supabase Dashboard
   - Or use `npx prisma db push`

3. **"Authentication failed"**
   - Check your `NEXTAUTH_SECRET` is set
   - Ensure `NEXTAUTH_URL` matches your domain

### Need Help?
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)

## 🎉 You're Done!

Your app is now running on Vercel with a PostgreSQL database on Supabase!
