-- Drop all existing tables in Supabase
-- Run this in Supabase SQL Editor

DROP TABLE IF EXISTS "StudentProfile" CASCADE;
DROP TABLE IF EXISTS "CommitteeProfile" CASCADE;
DROP TABLE IF EXISTS "UserRole" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

-- Drop enum if exists
DROP TYPE IF EXISTS "Role" CASCADE;

-- Confirm cleanup
SELECT 'All tables dropped successfully!' as status;

