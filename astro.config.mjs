// @ts-check
import { defineConfig } from "astro/config"
import path from "path"
import { fileURLToPath } from "url"
import icon from "astro-icon"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://astro.build/config
export default defineConfig({
  site: "https://Zheny179.github.io",
  base: "/PyStart/",
  trailingSlash: "always",

  markdown: {
    shikiConfig: {
      theme: "andromeeda",
    },
  },

  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "${path.resolve(__dirname, "./src/styles/helpers").replace(/\\/g, "/")}" as *;`,
        },
      },
    },
  },

  integrations: [
    icon({
      iconDir: "src/assets/icons",
    }),
  ],
})
