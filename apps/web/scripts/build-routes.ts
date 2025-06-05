import { resolve } from 'path'
import path from 'path'
import { glob } from 'glob'

export function generateRouteInputs(rootDir: string) {
  return Object.fromEntries(
    glob.sync('src/routes/*.html', { cwd: rootDir }).map(file => {
      const name = path.basename(file, '.html')
      const key = name === 'index' ? 'index' : `${name}/index`
      return [key, resolve(rootDir, file)]
    })
  )
}