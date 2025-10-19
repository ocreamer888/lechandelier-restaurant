# Reservation System Setup Guide

This guide will help you set up the Supabase-powered reservation system for Le Chandelier restaurant.

## Prerequisites

- Node.js 20.x or higher
- A Supabase account (free tier is sufficient)
- A Resend account for email notifications (free tier is sufficient)

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in or create an account
2. Click "New Project"
3. Fill in your project details:
   - Name: `lechandelier-reservations` (or your preferred name)
   - Database Password: Choose a strong password (save it securely)
   - Region: Select the closest region to your restaurant
4. Click "Create new project" and wait for it to initialize

## Step 2: Set Up Database Table

1. In your Supabase project, go to the **SQL Editor**
2. Click "New Query"
3. Copy and paste the following SQL:

```sql
CREATE TABLE reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  guests INTEGER NOT NULL CHECK (guests > 0 AND guests <= 20),
  date DATE NOT NULL,
  time TIME NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Allow public to insert (create reservations)
CREATE POLICY "Anyone can create reservations" ON reservations
  FOR INSERT WITH CHECK (true);

-- Allow users to view their own reservations by email
CREATE POLICY "Users can view their reservations" ON reservations
  FOR SELECT USING (true);

-- Allow users to cancel their own reservations
CREATE POLICY "Users can update their reservations" ON reservations
  FOR UPDATE USING (true);
```

4. Click "Run" to execute the SQL
5. Verify the table was created by going to **Table Editor** and checking for the `reservations` table

## Step 3: Get Supabase API Keys

1. In your Supabase project, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**: This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key**: This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key**: This is your `SUPABASE_SERVICE_ROLE_KEY` ⚠️ Keep this secret!

## Step 4: Set Up Resend for Email Notifications

1. Go to [https://resend.com](https://resend.com) and sign up
2. Verify your email address
3. Go to **API Keys** in the dashboard
4. Click "Create API Key"
5. Name it "Le Chandelier Reservations" and click "Create"
6. Copy the API key (this is your `RESEND_API_KEY`)

### Verify Your Domain (Optional but Recommended)

To send emails from your own domain:

1. Go to **Domains** in Resend dashboard
2. Click "Add Domain"
3. Enter your domain (e.g., `lechandelier.com`)
4. Follow the DNS setup instructions
5. Once verified, update the `from` address in `src/lib/email.ts` to use your domain

For testing, you can use Resend's test domain which sends to your verified email only.

## Step 5: Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Email Configuration
RESEND_API_KEY=re_your_api_key_here
RESTAURANT_ADMIN_EMAIL=admin@lechandelier.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Update `RESTAURANT_ADMIN_EMAIL` to the email where you want to receive reservation notifications
4. For production, update `NEXT_PUBLIC_SITE_URL` to your actual domain

## Step 6: Test the System

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to [http://localhost:3000/reservation](http://localhost:3000/reservation)

3. Fill out and submit the reservation form

4. Check that:
   - You see a success toast notification
   - You receive a confirmation email at the customer's email address
   - You receive a notification at the admin email address
   - The reservation appears in your Supabase database (Table Editor → reservations)

## Step 7: Test Reservation Management

1. Copy the reservation ID from the success message or from the email
2. Navigate to `http://localhost:3000/reservations/[id]` (replace `[id]` with the actual UUID)
3. Verify you can:
   - View the reservation details
   - Cancel the reservation
   - See the status update

## Troubleshooting

### Emails Not Sending

1. **Check Resend API Key**: Verify it's correct in `.env.local`
2. **Check Resend Console**: Go to your Resend dashboard → Logs to see email status
3. **Domain Verification**: If using a custom domain, ensure it's verified
4. **Check Spam Folder**: Test emails might go to spam initially

### Database Errors

1. **Check Supabase Keys**: Verify all three keys are correct in `.env.local`
2. **Check RLS Policies**: Ensure Row Level Security policies were created correctly
3. **Check Table Structure**: Verify the table was created with all required columns

### TypeScript Errors

1. **Restart Dev Server**: Sometimes TypeScript needs a restart after adding new types
2. **Clear Next.js Cache**: Run `rm -rf .next` and restart

## Production Deployment

Before deploying to production:

1. **Update Environment Variables** in your hosting platform (Vercel, Netlify, etc.):
   - Add all the environment variables from `.env.local`
   - Update `NEXT_PUBLIC_SITE_URL` to your production domain

2. **Update Email Templates**:
   - Edit `src/lib/email.ts` to update contact information
   - Customize the email design if needed

3. **Configure Resend Domain**:
   - Add and verify your production domain in Resend
   - Update the `from` address in `src/lib/email.ts`

4. **Test Thoroughly**:
   - Test the reservation form
   - Test email delivery
   - Test the reservation management page
   - Test cancellations

## Features

✅ **Reservation Form**
- Real-time validation
- Custom barrel-style pickers for guests, date, and time
- Loading states during submission
- Success/error toast notifications

✅ **Email Notifications**
- Customer confirmation email with reservation details
- Admin notification email with customer information
- Cancellation link included in emails

✅ **Reservation Management**
- View reservation details by ID
- Cancel reservations
- Status tracking (pending/confirmed/cancelled)

✅ **Database**
- Secure storage in Supabase
- Row Level Security policies
- Automatic timestamps

## Customization

### Changing Guest Limits

Edit `src/lib/validation.ts`:
```typescript
export const validateGuests = (guests: number): boolean => {
  return guests >= 1 && guests <= 20; // Change 20 to your max
};
```

Also update the database constraint in Supabase SQL Editor:
```sql
ALTER TABLE reservations DROP CONSTRAINT reservations_guests_check;
ALTER TABLE reservations ADD CONSTRAINT reservations_guests_check CHECK (guests > 0 AND guests <= YOUR_MAX);
```

### Customizing Email Templates

Edit `src/lib/email.ts` to:
- Change colors and styling
- Update contact information
- Modify email content
- Add your logo

### Adding More Reservation Fields

1. Update the database schema in Supabase
2. Update types in `src/types/database.ts` and `src/types/reservation.ts`
3. Update the form in `src/components/Reservation/ReservationForm.tsx`
4. Update validation in `src/lib/validation.ts`
5. Update API route in `src/app/api/reservations/route.ts`

## Support

For issues or questions:
- Check the troubleshooting section above
- Review Supabase logs in your project dashboard
- Review Resend logs in your Resend dashboard
- Check browser console for client-side errors
- Check server logs for API errors

## Security Notes

⚠️ **IMPORTANT**: Never commit `.env.local` to version control!

- The `.env.local` file contains sensitive credentials
- It's already in `.gitignore` to prevent accidental commits
- Use environment variables in your hosting platform for production
- Rotate keys immediately if they are exposed

---

**Congratulations!** Your reservation system is now set up and ready to use. 🎉

