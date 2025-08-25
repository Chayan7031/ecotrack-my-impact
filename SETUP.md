# EcoTrack Setup Instructions

## 🔧 Fixing "Page Can't Be Reached" Email Confirmation Issue

The issue is that Supabase doesn't know where to redirect users after email confirmation. Here's how to fix it:

### Step 1: Configure Supabase Redirect URLs (REQUIRED)

1. Go to your Supabase dashboard: https://app.supabase.com/project/vxguchtwmrtrkruhxrqh
2. Navigate to **Authentication** → **URL Configuration**
3. Set the **Site URL** to: `http://localhost:5173`
4. Add these **Redirect URLs**:
   - `http://localhost:5173/**`
   - `http://localhost:8080/**`
   - `http://localhost:8081/**`
   - `http://localhost:3000/**`
5. Save the changes

### Step 2: Test the Fix

1. Make sure your dev server is running: `npm run dev`
2. Note which port it's running on (e.g., 5173, 8080, 8081)
3. Sign up with a real email address
4. Check your email and click "Confirm your email"
5. You should now be redirected to `http://localhost:[PORT]/auth/confirm`
6. The app will handle the confirmation and redirect you to the dashboard

### Alternative: Disable Email Confirmation (Development Only)

If you prefer to skip email confirmation during development:
1. Go to **Authentication** → **Settings** in your Supabase dashboard
2. Under **User Management**, turn OFF "Enable email confirmations"
3. Save changes
4. Users can now sign in immediately after signing up

### Configure Custom Email Provider (Production)

For production or custom email templates:
1. Go to **Authentication** → **Settings**
2. Configure **SMTP Settings** with your email provider
3. Recommended: Gmail SMTP, SendGrid, or Resend

### Current Database Setup

The application is now configured with:
- ✅ User authentication with Supabase
- ✅ Database schema with tables: profiles, activities, goals, achievements
- ✅ Row Level Security (RLS) policies
- ✅ Theme toggle functionality (light/dark mode)
- ✅ Real-time data integration
- ✅ Protected routes for authenticated users

### Features Implemented

1. **Authentication System**:
   - Sign up and sign in forms
   - Password validation
   - User session management
   - Protected routes

2. **Database Integration**:
   - Activities tracking with CRUD operations
   - User profiles with automatic creation
   - Goals management system
   - Achievements tracking

3. **Theme System**:
   - Light/Dark/System theme toggle
   - Persistent theme preference
   - Eco-friendly color scheme

4. **Dashboard**:
   - Real-time carbon footprint data
   - Weekly activity charts
   - Activity breakdown by category
   - Today's impact tracking

5. **Activities Management**:
   - Add new activities with dialog
   - Filter and search activities
   - Delete activities
   - Real-time updates

6. **Profile Management**:
   - Real user data display
   - Dynamic achievements based on user activity
   - User statistics calculation
   - Account management

## Quick Start

1. Follow Option 1 above to disable email confirmation
2. Run `npm install` (already done)
3. Run `npm run dev`
4. Visit http://localhost:8081
5. Create an account - you should be able to sign in immediately
6. Start tracking your carbon footprint!

## Database Migration

If you have access to your Supabase SQL editor, run the migration file:
`supabase/migrations/001_initial_schema.sql`

Or if you prefer to apply it manually, the schema creates the necessary tables and policies for the application to work properly.
