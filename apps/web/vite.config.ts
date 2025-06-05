import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { glob } from 'glob'
import { generateRouteInputs } from './scripts/build-routes'

function moveHtmlFiles() {
  return {
    name: 'move-html-files',
    writeBundle() {
      const distDir = resolve(__dirname, 'dist')
      const srcRoutesDir = path.join(distDir, 'src', 'routes')
      
      if (fs.existsSync(srcRoutesDir)) {
        // Get all HTML files in src/routes
        const htmlFiles = glob.sync(path.join(srcRoutesDir, '*.html'))
        
        htmlFiles.forEach(file => {
          const name = path.basename(file, '.html')
          
          if (name === 'index') {
            // Move index.html to root
            fs.renameSync(file, path.join(distDir, 'index.html'))
          } else {
            // Move other files to {name}/index.html
            const targetDir = path.join(distDir, name)
            fs.mkdirSync(targetDir, { recursive: true })
            fs.renameSync(file, path.join(targetDir, 'index.html'))
          }
        })
        
        // Clean up empty directories
        fs.rmSync(path.join(distDir, 'src'), { recursive: true, force: true })
      }
    }
  }
}

export default defineConfig({
  plugins: [vue(), react(), moveHtmlFiles()],
  build: {
    rollupOptions: {
      input: generateRouteInputs(__dirname)
    },
    emptyOutDir: true
  }
})