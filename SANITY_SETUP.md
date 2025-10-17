# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for the Le Chandelier restaurant website.

## Prerequisites

- Node.js installed
- A Sanity account (free at https://sanity.io)

## Step 1: Create a Sanity Project

1. Go to https://sanity.io/manage
2. Click "Create new project"
3. Choose a name (e.g., "Le Chandelier Restaurant")
4. Select a dataset name (use "production" for production)
5. Note your **Project ID** - you'll need this

## Step 2: Configure Environment Variables

Create a `.env.local` file in the root of your project:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Replace `your_project_id_here` with your actual Sanity project ID.

## Step 3: Deploy the Sanity Studio

The Sanity Studio is already configured and accessible at `/studio` route.

1. Start your development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000/studio`

3. Sign in with your Sanity account

## Step 4: Add Content

### Site Settings

1. In Sanity Studio, click on "Site Settings"
2. Fill in:
   - Opening hours for each day
   - Hours text for footer
   - Contact information (address, phone, email, maps link)
   - Social media links

### Drinks Menu

1. Click on "Drinks Menu"
2. Add categories (Champagne & Sparkling, White Wines, Red Wines, Others)
3. For each category, add subcategories
4. For each subcategory, add items with name and price

Example structure:
```
Category: White Wines
  Subcategory: Aromatic
    Item: Casillero del Diablo - ₡21,525
    Item: Luigi Bosca - ₡33,032
  Subcategory: Sweet
    Item: Amelia - ₡83,025
```

### Food Menu

1. Click on "Food Menu"
2. Add categories (Appetizers, Pasta, Pizza, Salads, Soups, Desserts)
3. For each category, add menu items with:
   - Name
   - Description
   - Price
   - Tags (optional: Vegan, Vegetarian, Spicy, Gluten-Free)

### Team Members

1. Click on "Team Members" → "Create new"
2. For each team member add:
   - Name
   - Role
   - Image (upload from your computer or use images from `/public`)
   - Display Order (lower numbers appear first)

Current team members to add:
- Andrea Dubuis - Owner
- Federico Sanchez - Manager
- Kevin Araya - Captain
- Luis Offer - Waiter
- Edgar - Waiter
- Kenneth - Main Chef
- Javier Baca - Chef
- Lenner - Sub-Chef

### Events

1. Click on "Events" → "Create new"
2. Add event cards with:
   - Title (e.g., "Corporate Events")
   - Description (optional)
   - Image
   - Display Order

## Step 5: Verify Content is Loading

After adding content:

1. Refresh your website
2. Content should automatically appear
3. If not, check browser console for errors
4. Verify environment variables are set correctly

## Data Migration

All hardcoded data has been preserved as fallback values. The website will:
- Use Sanity CMS data when available
- Fall back to hardcoded data if Sanity is not configured or content is missing

### Option 1: Programmatic Import (Recommended)

Use the import script to automatically populate your Sanity dataset:

1. **Create a Write Token:**
   - Go to https://sanity.io/manage
   - Select your project
   - Go to Settings → API → Tokens
   - Click "Add API Token"
   - Name it "Import Script"
   - Set permissions to "Editor"
   - Copy the token

2. **Run the Import Script:**
   ```bash
   SANITY_WRITE_TOKEN=your_token_here node scripts/import-data.mjs
   ```

This will import:
- Site Settings (hours, contact, social links)
- Food Menu (all Menu3 items: Entradas, Platos Fuertes, Postres)

**Note:** The import script currently includes Site Settings and Food Menu. Team Members, Events, and Drinks Menu can be added manually through the Studio interface.

### Option 2: Manual Entry

Manually enter data through the Sanity Studio interface at `/studio`.

## Deployment to Vercel

1. Add environment variables in Vercel:
   - Go to your Vercel project → Settings → Environment Variables
   - Add the same variables from `.env.local`

2. Redeploy your site

3. Access Studio at `https://yourdomain.com/studio`

## CORS Configuration

If you need to access Sanity from different domains:

1. Go to https://sanity.io/manage
2. Select your project
3. Go to Settings → API
4. Add your domain(s) under "CORS origins"

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router-live-preview)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

## Troubleshooting

### Content not loading
- Check that environment variables are set
- Verify Sanity project ID is correct
- Check browser console for errors

### Images not displaying
- Verify image URLs are allowed in `next.config.ts`
- Check that images are uploaded to Sanity (not just referenced by path)

### Studio won't load
- Clear browser cache
- Check that all Sanity packages are installed: `npm install`
- Verify Sanity configuration in `sanity/sanity.config.ts`

