import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiUrl = env.API_URL || ''

  return {
    plugins: [react()],
    define: {
      'import.meta.env.API_URL': JSON.stringify(apiUrl),
    },
    server: {
      proxy: {
        '/api': 'http://localhost:5000',
      },
    },
  }
})
