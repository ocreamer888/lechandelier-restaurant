# Quick Start Guide - Sanity CMS

## 🚀 Get Started in 3 Steps

### Step 1: Create Sanity Project (2 minutes)

1. Go to https://sanity.io/manage
2. Click "Create new project"
3. Name it: "Le Chandelier Restaurant"
4. Choose dataset: "production"
5. **Copy your Project ID** (you'll need this next!)

### Step 2: Configure Environment (30 seconds)

Create a file named `.env.local` in the project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=paste_your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Step 3: Start & Access Studio (1 minute)

```bash
npm run dev
```

Then open: **http://localhost:3000/studio**

## 📝 Add Your First Content

### Quick Test:
1. In Studio, click "Site Settings"
2. Scroll to "Hours Text (Footer)"
3. Change the text
4. Click "Publish"
5. Refresh your homepage - it updates! ✨

### Import Complete Data (Automated):

Use the import script to automatically populate your Sanity dataset:

1. **Create a Write Token** in Sanity.io → Settings → API → Tokens
2. **Run the import script:**
   ```bash
   SANITY_WRITE_TOKEN=your_token_here node scripts/import-data.mjs
   ```

This imports:
- Site Settings
- Food Menu (Entradas, Platos Fuertes, Postres)

### Manual Entry:

You can also add content manually through the Studio interface at `/studio`.

## 📚 Full Documentation

- **Setup Guide**: See `SANITY_SETUP.md` for detailed instructions
- **Implementation Details**: See `CMS_IMPLEMENTATION_SUMMARY.md`
- **Data Reference**: See `scripts/migrate-to-sanity.ts`

## 🎯 What Content Can You Manage?

- ✅ **Site Settings** - Hours, contact, social links
- ✅ **Drinks Menu** - All wines, champagnes, etc.
- ✅ **Food Menu** - Appetizers, pasta, pizza, etc.
- ✅ **Team Members** - Staff photos and roles
- ✅ **Events** - Event cards and descriptions

## ⚡ Pro Tips

1. **No CMS Yet?** - Site uses fallback data automatically
2. **Images** - Upload directly in Studio, don't use file paths
3. **Testing** - Use "production" dataset for live, "development" for testing
4. **Deployment** - Add env vars to Vercel before deploying

## 🆘 Need Help?

- **Content not showing?** Check `.env.local` has correct Project ID
- **Studio won't load?** Clear browser cache and refresh
- **Images not working?** Make sure you uploaded to Sanity, not just linked

## 🎉 You're Done!

You now have a fully functional CMS. No more editing code to change content!

