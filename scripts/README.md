# Sanity Data Import Script

This script imports data into your Sanity CMS automatically.

## Prerequisites

1. A Sanity project set up (see `/SANITY_SETUP.md`)
2. A Sanity write token with Editor or Administrator permissions

## Getting a Write Token

1. Go to https://sanity.io/manage
2. Select your project ("Le Chandelier Restaurant")
3. Navigate to **Settings → API → Tokens**
4. Click **"Add API Token"**
5. Configure the token:
   - **Name**: "Import Script" (or any name you prefer)
   - **Permissions**: Select "Editor" or "Administrator"
6. Click **"Add token"**
7. **Copy the token immediately** (you won't be able to see it again!)

## Usage

Run the script with your token:

```bash
SANITY_WRITE_TOKEN=your_token_here node scripts/import-data.mjs
```

Replace `your_token_here` with the actual token you copied.

## What Gets Imported

The script imports the following data:

### 1. Site Settings
- Opening hours for each day
- Contact information (address, phone, email, maps link)
- Social media links

### 2. Food Menu (Menu3 data)
- **3 categories**: Entradas, Platos Fuertes, Postres
- **33 menu items** total with:
  - Spanish name
  - English name
  - Description
  - Price

### 3. Featured Drink
- House Sangria information
- ⚠️ **Note**: The image needs to be uploaded manually in Sanity Studio

## After Import

1. Go to your Sanity Studio at `http://localhost:3000/studio`
2. Navigate to **Featured Drink → House Sangria**
3. Upload the sangria image (`/public/sangria-le-chandelier-2.png`)
4. Click **Publish**
5. Verify all other data looks correct

## Troubleshooting

### "Insufficient permissions" error
Your token doesn't have write access. Create a new token with "Editor" or "Administrator" permissions.

### "Invalid token" error
The token is incorrect or has been revoked. Create a new token.

### Script won't run
Make sure you have the token in the command:
```bash
SANITY_WRITE_TOKEN=your_actual_token node scripts/import-data.mjs
```

### Data not showing on website
- Check that your `.env.local` has the correct `NEXT_PUBLIC_SANITY_PROJECT_ID`
- Restart your Next.js development server
- Clear your browser cache

## Re-running the Script

You can safely re-run the script multiple times. It uses `createOrReplace`, which will:
- Create documents if they don't exist
- Update existing documents with new data

This is useful if you need to update the data structure or fix any issues.

## Security Notes

- **Never commit your write token** to version control
- Keep your token secure
- Revoke tokens you're no longer using
- Use different tokens for different environments (development, production)

## Need Help?

See the main documentation:
- `/QUICK_START_CMS.md` - Quick start guide
- `/SANITY_SETUP.md` - Detailed setup instructions
- `/CMS_IMPLEMENTATION_SUMMARY.md` - Technical details

