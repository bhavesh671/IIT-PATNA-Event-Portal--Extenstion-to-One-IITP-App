/**
 * Supabase Production Database Setup
 * 
 * Prerequisites:
 * 1. Update .env.local with your Supabase DATABASE_URL
 * 2. Run: node setup-supabase.js
 * 
 * This script will:
 * - Push the Prisma schema to Supabase
 * - Seed the database with default users
 */

const { execSync } = require('child_process');

console.log('🚀 Setting up Supabase Production Database...\n');

try {
  // Step 1: Generate Prisma Client
  console.log('📦 Step 1/3: Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma Client generated!\n');

  // Step 2: Push schema to Supabase
  console.log('📊 Step 2/3: Pushing schema to Supabase...');
  console.log('(This will create all tables in your Supabase database)\n');
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
  console.log('\n✅ Schema pushed to Supabase!\n');

  // Step 3: Seed database
  console.log('🌱 Step 3/3: Seeding database with default users...\n');
  execSync('node setup-demo.js', { stdio: 'inherit' });

  console.log('\n✨ Supabase setup complete!');
  console.log('\n🔗 Next Steps:');
  console.log('1. Go to Vercel dashboard');
  console.log('2. Redeploy your site');
  console.log('3. Test login with the credentials above\n');

} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  console.error('\nTroubleshooting:');
  console.error('- Make sure DATABASE_URL in .env.local points to Supabase');
  console.error('- Check that your Supabase password is URL-encoded');
  console.error('- Verify your internet connection\n');
  process.exit(1);
}

