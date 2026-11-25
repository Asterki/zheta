import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const sharedSource = fileURLToPath(new URL('../shared/src', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@shared$/, replacement: `${sharedSource}/index.ts` },
      { find: /^@shared\//, replacement: `${sharedSource}/` },
    ],
  },
})
