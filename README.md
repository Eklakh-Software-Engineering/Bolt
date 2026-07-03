# Eklakh Dewan - AI Engineer Portfolio

A modern, production-ready portfolio website showcasing AI/ML engineering skills and projects.

## Features

- **Interactive Neural Network Background** - Animated particles that respond to mouse movement
- **Live Code Terminal** - Typewriter effect showcasing profile as Python code
- **Animated Skill Bars** - Progress indicators with shimmer effects
- **Modern Dark Theme** - AI/ML aesthetic with cyan/teal accents
- **Fully Responsive** - Mobile-first design
- **GitHub Actions CI/CD** - Automatic deployment on push

## Tech Stack

- **React 18** + TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **GitHub Pages** for hosting

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. **Fork or push this repo to GitHub**

2. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"

3. **Update the base URL:**
   - Open `vite.config.ts`
   - Change `/portfolio/` to match your repo name:
   ```ts
   const base = process.env.GITHUB_PAGES ? '/your-repo-name/' : '/';
   ```

4. **Update package.json homepage:**
   ```json
   "homepage": "https://your-username.github.io/your-repo-name"
   ```

5. **Push to main branch** - GitHub Actions will automatically build and deploy

### Option 2: Manual Deployment with gh-pages

```bash
# Install gh-pages if not already
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

## Custom Domain Setup (Optional)

1. **Add CNAME file:**
   Create `public/CNAME` with your domain:
   ```
   eklakh.dev
   ```

2. **Update DNS:**
   Add these records to your domain:
   - **A Record**: `185.199.108.153`
   - **A Record**: `185.199.109.153`
   - **A Record**: `185.199.110.153`
   - **A Record**: `185.199.111.153`
   - **CNAME**: `www` → `your-username.github.io`

3. **Update vite.config.ts:**
   ```ts
   const base = '/'; // Root path for custom domain
   ```

## Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions CI/CD
├── public/
│   └── vite.svg           # Favicon
├── src/
│   ├── App.tsx            # Main component
│   ├── index.css          # Global styles
│   └── main.tsx           # Entry point
├── index.html             # HTML template
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind config
└── vite.config.ts         # Vite config
```

## Customization

### Update Personal Info
Edit `src/App.tsx` and update:
- Name and title
- Skills and percentages
- Project details
- Timeline entries
- Contact information

### Update Colors
Edit `src/index.css` CSS variables:
```css
:root {
  --accent-primary: #06b6d4;    /* Main accent */
  --accent-secondary: #14b8a6;  /* Secondary accent */
  --bg-primary: #0a0f1a;        /* Background */
}
```

### Add/Remove Projects
Edit the `projects` array in `src/App.tsx`

## Performance

- **Lighthouse Score: 95+**
- **First Contentful Paint: < 1.5s**
- **Bundle Size: ~55KB gzipped**

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

**Eklakh Dewan**
- Email: eklakh.inplace@gmail.com
- LinkedIn: [linkedin.com/in/eklakh-dewan](https://linkedin.com/in/eklakh-dewan)
- GitHub: [github.com/Eklakh-Dewan](https://github.com/Eklakh-Dewan)
