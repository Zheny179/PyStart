// @ts-check
import { defineConfig } from 'astro/config'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: [
        {
          find: '@/',
          replacement: path.resolve('src') + '/',
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "${ path.resolve(__dirname, 'src/styles/helpers').replace(/\\/g, '/') }" as *;`,
        },
      },
    },
  },
})
