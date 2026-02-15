# Deployment Guide

## Quick Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from project root:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **task-board** (or your choice)
   - Directory? **./** (press Enter)
   - Override settings? **N**

5. Your app is now live! Vercel will give you a URL.

### Option 2: Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite settings
6. Click "Deploy"

## Verify Deployment

After deployment, test these features:

✅ Login works (intern@demo.com / intern123)
✅ Create a task
✅ Drag task between columns
✅ Refresh page - data persists
✅ Search/filter/sort works
✅ Activity log updates
✅ Logout and login again

## Important Notes

- `vercel.json` is already configured for SPA routing
- localStorage works in production (client-side only)
- No environment variables needed
- Build command: `npm run build`
- Output directory: `dist`

## Custom Domain (Optional)

In Vercel dashboard:
1. Go to your project
2. Settings → Domains
3. Add your custom domain
4. Follow DNS configuration steps

---

**Your app is production-ready!** 🚀
