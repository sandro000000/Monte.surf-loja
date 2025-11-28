import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  // Note: If you want React Fast Refresh / SWC JSX transforms, add '@vitejs/plugin-react'.
  // It caused an ESM/CJS resolution error in this environment, so it's omitted for now.
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4242',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
}))
// ESM block removed to keep CommonJS require form intact (avoid ESM/CJS conflicts)
