/**
 * Resolve a path in `public/` against the deploy base.
 *
 * Slides write plain absolute paths (`/media/hero.mp4`). Vite rewrites those
 * in `index.html` but not in JavaScript, so on GitHub Pages — where the deck
 * is served from `/gd-deck/` rather than the domain root — they would resolve
 * to the wrong place. Every `src` that points into `public/` goes through here.
 */
export default function asset(path) {
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`
}
