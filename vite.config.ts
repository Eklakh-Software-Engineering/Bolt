import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages deployment configuration
// IMPORTANT: Update the base path to match your repository name!
// Example: If your GitHub repo URL is https://github.com/eklakh-dewan/portfolio
//          then set the base to '/portfolio/'

const getConfig = () => {
  // Check if building for GitHub Pages
  const isGitHubPages = process.env.GITHUB_PAGES === 'true';

  // Set base path - update 'portfolio' to match your repo name
  const base = isGitHubPages ? '/portfolio/' : '/';

  return {
    plugins: [react()],
    base,
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            icons: ['lucide-react'],
          },
        },
      },
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(getConfig());
