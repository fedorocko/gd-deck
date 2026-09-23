import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this repo from /gd-deck/, not the domain root, so every
  // asset URL is prefixed with it. Set BASE_PATH to override — `BASE_PATH=/`
  // for a custom domain or a <user>.github.io repo.
  base: process.env.BASE_PATH ?? '/gd-deck/',
})
