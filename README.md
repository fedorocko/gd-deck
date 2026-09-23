# GoodData.AI — exec pitch deck

19 full-screen slides, React + Vite. No editor, no deck management — just the deck.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

**Navigating:** the two floating buttons, or `←`/`→` (also `space`, `PageUp`/`PageDown`,
`Home`/`End`). Present with the browser in fullscreen (`⌃⌘F` / `F11`).

## How it is put together

Slides are authored against a fixed **1600 × 900** design space in plain pixels.
`src/useStageScale.js` scales that stage to fit any window and letterboxes the rest, so
nothing needs responsive rules and font sizes can be literal.

| Path | What it holds |
| --- | --- |
| `src/slides/index.js` | the running order — **reorder the deck here** |
| `src/slides/S01…S19.jsx` | one file per slide, content only |
| `src/layouts/` | the five layouts every slide is built from |
| `src/styles.css` | design tokens and every shared style |
| `src/media.js` | slide images and video |

## Swapping in real media

Every image and the opening video are labelled placeholders today. To replace one, drop the
file into `public/media/` and set its path in `src/media.js`:

```js
datev: { src: '/media/datev-office.jpg', label: 'Photo — Datev office' },
```

Portrait slots render best at roughly **3:4** (e.g. 900 × 1200). The slide-3 video slot is
full-bleed 16:9 and plays muted, looped and autoplaying.

Slide 4's four icons are real assets already in `public/media/` (`icon-start`, `icon-secure`,
`icon-spend`, `icon-success`) and are referenced straight from the slide. They are square art on
their own dark ground, so `.col__icon` fades their edges with a radial mask — drop-in
replacements should be square and dark-backgrounded to match.

## Changing the look

Everything lives in the `:root` block at the top of `src/styles.css`. `--accent` is the single
highlight colour — swap that one value to rebrand. `--ink` is the canvas, `--paper` the type.

The hairline progress bar can be removed with `SHOW_PROGRESS = false` in `src/App.jsx`.

## Content notes

Slide 1 is the internal positioning slide and is marked **INTERNAL — not for client**; start
presenting from slide 2. The slide references on it (“Slide 2”, “Slides 9–11”, …) count the
**client-facing** deck, so the GoodData.AI title slide is #1 and the internal slide is excluded. Lines marked *Narrative* in the source brief are speaker guidance and
are deliberately not on the slides.
