# GoodData decks

Full-screen presentations, React + Vite, published together as one site. No editor, no
deck management — just the decks.

| Deck | Folder | Published at |
| --- | --- | --- |
| ASP pitch | `decks/asp-pitch/` | https://fedorocko.github.io/gd-decks/asp-pitch/ |
| Offsite | `decks/offsite/` | https://fedorocko.github.io/gd-decks/offsite/ |

**https://fedorocko.github.io/gd-decks/** itself lists the decks.

```bash
npm install
npm run dev      # http://localhost:5173/gd-decks/ — each deck at /gd-decks/<folder>/
npm run build    # static output in dist/
```

Dev and build both run under the `/gd-decks/` base that GitHub Pages serves from, so
what you see locally is what ships.

**Navigating:** the two floating buttons, or `←`/`→` (also `space`, `PageUp`/`PageDown`,
`Home`/`End`). Present with the browser in fullscreen (`⌃⌘F` / `F11`).

## Publishing

Pushing to `main` builds every deck and publishes the site to
**https://fedorocko.github.io/gd-decks/** via `.github/workflows/deploy.yml`.

One-time setup, in the repo on GitHub: **Settings → Pages → Build and deployment →
Source: GitHub Actions**. Nothing else to configure; there is no `gh-pages` branch.

Pages serves the site from `/gd-decks/`, not the domain root, so `vite.config.js` sets
`base` to match. Vite rewrites asset URLs in the HTML pages, but not paths written as
strings in JavaScript — those go through `shared/asset.js`, so keep writing them the
documented way (`/media/hero.mp4`) and let the helper prefix the base.

Moving the site elsewhere means changing the base:

```bash
BASE_PATH=/ npm run build        # custom domain, or a <user>.github.io repo
```

For a custom domain, also put the domain in `public/CNAME` and set it under Settings → Pages.

### The old /gd-deck/ address

The site used to be a single deck at https://fedorocko.github.io/gd-deck/. Pages serves a
repo under its own name, so the `/gd-decks/` base only works once the repo is renamed — and
a rename leaves nothing at the old address, so it takes a second, one-page repo to keep it
saying where things went. In order:

1. **Rename this repo** to `gd-decks` (Settings → General), *before* pushing this layout —
   pushed under the old name, it would publish pages whose assets point at `/gd-decks/`.
2. Point the local clone at the new name:
   `git remote set-url origin git@github.com:fedorocko/gd-decks.git`
3. **Create a new repo named `gd-deck`** holding just `legacy/gd-deck/index.html` as its
   `index.html`, and publish it with Settings → Pages → Source: Deploy from a branch →
   `main` / root. That page says the deck has moved and links to `/gd-decks/`.

`legacy/` is not part of this build; it is kept here so the page lives next to what it
points at.

## How it is put together

Each deck is a folder in `decks/` whose name is its URL: `decks/` is Vite's root, so
`decks/offsite/` is published at `/gd-decks/offsite/`. The deck machinery is shared;
everything a deck shows is its own.

| Path | What it holds |
| --- | --- |
| `decks/index.html` | the page at `/gd-decks/` listing the decks |
| `decks/asp-pitch/` | the ASP pitch — slides, layouts, schema, styles; see its `README.md` |
| `decks/offsite/` | the Offsite deck — one blank slide for now |
| `shared/Deck.jsx` | the deck itself: stage, navigation, URL hash, presenting |
| `shared/deck.css` | design tokens, the stage, and the deck's own buttons |
| `shared/useStageScale.js` | fits the stage to the window |
| `shared/asset.js` | resolves `public/` paths against the base |
| `public/` | favicon and media, served at the site root and shared by every deck |
| `legacy/gd-deck/` | the page for the old address (see above) |

Slides are authored against a fixed **1600 × 900** design space in plain pixels.
`shared/useStageScale.js` scales that stage to fit any window and letterboxes the rest, so
nothing needs responsive rules and font sizes can be literal.

A deck's `main.jsx` imports the shared styles, then its own, and mounts
`<Deck slides={slides} />`. The slides are components in running order; one marked
`Slide.internal = true` is skipped while presenting. A deck can also pass `overlay`, a
function of the current slide whose result renders outside the keyed slide and so survives
the change — the ASP pitch uses it for its animated schema.

The URL hash carries the slide number, so `asp-pitch/#7` is that deck's seventh slide.

### Adding a deck

1. Copy `decks/offsite/` to a new folder beside it; the folder name is the deck's URL.
2. In the copy's `index.html`, set the `<title>` and point the script at its own `main.jsx`.
3. Add the folder to `DECKS` in `vite.config.js`, and a row to the list in
   `decks/index.html`.

When another deck wants the ASP pitch's layouts or components, move them into `shared/`
rather than importing across deck folders.

## Changing the look

The tokens live in the `:root` block at the top of `shared/deck.css` and apply to every deck.
`--accent` is the single highlight colour — swap that one value to rebrand. `--ink` is the
canvas, `--paper` the type. `decks/index.html` repeats the few it uses.

The hairline progress bar can be removed with `SHOW_PROGRESS = false` in `shared/Deck.jsx`.
