import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Every deck is a folder in decks/ with its own index.html, published at
// /gd-decks/<folder>/. A new deck goes here and in the list on decks/index.html.
const DECKS = ['asp-pitch', 'offsite']

// decks/ is the site root, so its folders map straight onto URLs; public/ and
// the build output stay at the repo root.
const at = (...path) => resolve(import.meta.dirname, ...path)
const page = (...path) => at('decks', ...path, 'index.html')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: at('decks'),
  publicDir: at('public'),
  // GitHub Pages serves this repo from /gd-decks/, not the domain root, so every
  // asset URL is prefixed with it. Set BASE_PATH to override — `BASE_PATH=/`
  // for a custom domain or a <user>.github.io repo.
  base: process.env.BASE_PATH ?? '/gd-decks/',
  build: {
    outDir: at('dist'),
    // dist/ sits outside the root, so Vite would otherwise leave old files in it.
    emptyOutDir: true,
    rolldownOptions: {
      input: {
        index: page(),
        ...Object.fromEntries(DECKS.map((deck) => [deck, page(deck)])),
      },
    },
  },
})
