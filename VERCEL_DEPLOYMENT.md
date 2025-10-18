# Vercel Deployment Guide with Supabase

## Environment Variables Required

Add these environment variables to your Vercel project settings:

### Database (Supabase PostgreSQL)
```
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

### NextAuth
```
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key-here
```

## Quick Setup Steps

### 1. Create Supabase Database
1. Go to [supabase.com](https://supabase.com) → Sign up
2. Create new project → Wait 2-3 minutes
3. Go to Settings → Database → Copy connection string
4. Add as `DATABASE_URL` in Vercel

### 2. Set Up Database Tables
**Option A: Using Supabase Dashboard (Recommended)**
1. Go to Supabase Dashboard → SQL Editor
2. Run the SQL from `SUPABASE_SETUP.md` file

**Option B: Using Prisma CLI**
```bash
npx prisma db push
```

### 3. Deploy to Vercel
1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Local Development

Create a `.env.local` file with:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-local-secret"
```

## Important Notes

- ✅ Using PostgreSQL with Supabase (production-ready)
- ✅ All API routes properly configured for Next.js 14
- ✅ OTP storage is in-memory (consider Redis for production)
- ✅ File uploads stored in `/public/uploads` (consider cloud storage)
- ✅ Database migrations handled via Supabase Dashboard or Prisma

## Troubleshooting

- **Database connection failed**: Check `DATABASE_URL` format
- **Tables don't exist**: Run SQL migration in Supabase Dashboard
- **Build fails**: Ensure all environment variables are set in Vercel
