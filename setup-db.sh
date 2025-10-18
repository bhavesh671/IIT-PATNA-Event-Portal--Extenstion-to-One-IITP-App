#!/bin/bash

# Database Setup Script for Supabase
echo "🚀 Setting up database for IIT Patna Event Portal..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable is not set!"
    echo "Please set it to your Supabase PostgreSQL connection string"
    echo "Example: postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
    exit 1
fi

echo "✅ DATABASE_URL is set"

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Push schema to database
echo "🗄️ Pushing schema to database..."
npx prisma db push

echo "✅ Database setup complete!"
echo "🎉 Your app is ready to deploy!"
