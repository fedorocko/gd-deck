# GoodData.AI — exec pitch deck

19 full-screen slides, React + Vite. No editor, no deck management — just the deck.

```bash
npm install
npm run dev      # http://localhost:5173/gd-deck/
npm run build    # static output in dist/
```

Dev and build both run under the `/gd-deck/` base that GitHub Pages serves from, so
what you see locally is what ships.

**Navigating:** the two floating buttons, or `←`/`→` (also `space`, `PageUp`/`PageDown`,
`Home`/`End`). Present with the browser in fullscreen (`⌃⌘F` / `F11`).

## Publishing

Pushing to `main` builds the deck and publishes it to
**https://fedorocko.github.io/gd-deck/** via `.github/workflows/deploy.yml`.

One-time setup, in the repo on GitHub: **Settings → Pages → Build and deployment →
Source: GitHub Actions**. Nothing else to configure; there is no `gh-pages` branch.

Pages serves the site from `/gd-deck/`, not the domain root, so `vite.config.js` sets
`base` to match. Vite rewrites asset URLs in `index.html`, but not paths written as
strings in JavaScript — those go through `src/asset.js`, so keep writing them the
documented way (`/media/hero.mp4`) and let the helper prefix the base.

Moving the deck elsewhere means changing the base:

```bash
BASE_PATH=/ npm run build        # custom domain, or a <user>.github.io repo
```

For a custom domain, also put the domain in `public/CNAME` and set it under Settings → Pages.

## How it is put together

Slides are authored against a fixed **1600 × 900** design space in plain pixels.
`src/useStageScale.js` scales that stage to fit any window and letterboxes the rest, so
nothing needs responsive rules and font sizes can be literal.

| Path | What it holds |
| --- | --- |
| `src/slides/index.js` | the running order — **reorder the deck here** |
| `src/slides/S01…S31.jsx` | one file per slide, content only |
| `src/layouts/` | the five layouts every slide is built from |
| `src/schema/` | the animated diagram behind slides 15–26 |
| `src/styles.css` | design tokens and every shared style |
| `src/media.js` | slide images and video |

## The schema on slides 15–26

Those twelve slides share **one diagram** that unfolds as you go, rather than twelve
separate pictures. A slide opts in by naming a state:

```js
S30Management.schema = 'management'
```

`App.jsx` renders the diagram outside the keyed slide, so it survives the slide change and
animates from the previous state instead of being redrawn.

| Path | What it holds |
| --- | --- |
| `src/schema/model.js` | the tree of every box, and the twelve states over it |
| `src/schema/layout.js` | turns a state into geometry: rectangles, frames, arrows |
| `src/components/Schema.jsx` | renders it and stages the timing |

To change what a slide shows, edit its state in `model.js` — `expand` unfolds a branch, `hl`
highlights, `focus` says what the view centres on. To add a box, put it in the tree; it will
be laid out in every state, hidden until some state expands its parent.

Two things are deliberate. **Tier decides size**: a tier-1 box is taller and set larger than
tier 2, which outranks tier 3, and each tier keeps a fixed inset so same-rank borders line up
whatever branch they hang off. **The scale never changes** — only the vertical offset does —
so a box reads the same size on every slide and size stays legible as rank.

Transitions are plain CSS, staged by delay so a viewer can follow them: boxes shift to make
room, the view slides to re-centre, and only then do the newly uncovered boxes fade up. No
animation library is involved; the timings live in the `.schema` block of `styles.css`.

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
