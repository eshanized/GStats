import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/gstats/', // Replace with your repository name
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'script.js', // Bundle JavaScript as script.js
        chunkFileNames: '[name].js', // Optional: name other chunks
        assetFileNames: (assetInfo) => {
          // Check if the asset name exists and ends with .css
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'style.css'; // Rename CSS files to style.css
          }
          return '[name][extname]'; // Default naming for other assets
        },
      },
    },
  },
})
