# ASP pitch

The GoodData.AI exec pitch — the agentic serving plane. Published at
**https://fedorocko.github.io/gd-decks/asp-pitch/**; locally at
http://localhost:5173/gd-decks/asp-pitch/ under `npm run dev`.

## How it is put together

Paths are relative to this folder. The stage, navigation and design tokens are shared by
every deck and live in `../../shared/` — see the root `README.md`.

| Path | What it holds |
| --- | --- |
| `slides/index.js` | the running order — **reorder the deck here** |
| `slides/S01…S34.jsx` | one file per slide, content only |
| `layouts/` | the layouts every slide is built from |
| `components/` | the pieces layouts and slides share: badges, figures, marks, media |
| `schema/` | the animated diagram behind the platform slides |
| `styles.css` | every style the slides use, on top of the shared tokens |
| `media.js` | slide images and video |
| `main.jsx` | mounts the deck, with the schema as its overlay |

## The schema on slides 15–26

Those twelve slides share **one diagram** that unfolds as you go, rather than twelve
separate pictures. A slide opts in by naming a state:

```js
S30Management.schema = 'management'
```

`main.jsx` hands the diagram to the deck as its `overlay`, which renders outside the keyed
slide, so it survives the slide change and animates from the previous state instead of being
redrawn.

| Path | What it holds |
| --- | --- |
| `schema/model.js` | the tree of every box, and the twelve states over it |
| `schema/layout.js` | turns a state into geometry: rectangles, frames, arrows |
| `components/Schema.jsx` | renders it and stages the timing |

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
file into `../../public/media/` and set its path in `media.js`:

```js
datev: { src: '/media/datev-office.jpg', label: 'Photo — Datev office' },
```

Portrait slots render best at roughly **3:4** (e.g. 900 × 1200). The slide-3 video slot is
full-bleed 16:9 and plays muted, looped and autoplaying.

Slide 4's four icons are real assets already in `../../public/media/` (`icon-start`, `icon-secure`,
`icon-spend`, `icon-success`) and are referenced straight from the slide. They are square art on
their own dark ground, so `.col__icon` fades their edges with a radial mask — drop-in
replacements should be square and dark-backgrounded to match.

## Content notes

Slide 1 is the internal positioning slide and is marked **INTERNAL — not for client**; start
presenting from slide 2. The slide references on it (“Slide 2”, “Slides 9–11”, …) count the
**client-facing** deck, so the GoodData.AI title slide is #1 and the internal slide is excluded. Lines marked *Narrative* in the source brief are speaker guidance and
are deliberately not on the slides.
