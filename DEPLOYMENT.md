# Quick Deployment Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Name your repo `portfolio` (or any name you prefer)
3. Don't initialize with README (you already have one)
4. Click "Create repository"

## Step 2: Update Configuration

**Edit `vite.config.ts` line 14:**
```typescript
const base = isGitHubPages ? '/YOUR-REPO-NAME/' : '/';
```
Replace `portfolio` with your actual repo name.

**Edit `package.json` line 7:**
```json
"homepage": "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME"
```

## Step 3: Initialize Git and Push

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial portfolio setup"

# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select **GitHub Actions**
4. The workflow will automatically deploy your site

## Step 5: Access Your Site

Your portfolio will be live at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

## Updating Your Portfolio

Simply make changes and push:
```bash
git add .
git commit -m "Update portfolio"
git push
```

GitHub Actions will automatically rebuild and deploy!

## Custom Domain (Optional)

1. Create `public/CNAME` file with your domain:
   ```
   eklakh.dev
   ```

2. Update DNS with your domain registrar:
   - Type: CNAME
   - Name: www
   - Value: YOUR-USERNAME.github.io

3. Wait 24-48 hours for DNS propagation

## Troubleshooting

**Blank page after deployment?**
- Make sure `base` path in `vite.config.ts` matches your repo name
- Check that GitHub Actions completed successfully

**Styles not loading?**
- Clear browser cache
- Check that CSS file is in the built `dist` folder

**Need help?**
- Check GitHub Actions logs: Actions tab → workflow run
- View build output: Settings → Pages → View deployment logs
