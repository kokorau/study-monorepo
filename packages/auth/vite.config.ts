import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/index.ts'),
      name: 'StudyMonorepoAuth',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {}
  }
})