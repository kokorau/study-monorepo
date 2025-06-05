import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/main.tsx'),
      name: 'StudyMonorepoReact',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {}
  }
})
