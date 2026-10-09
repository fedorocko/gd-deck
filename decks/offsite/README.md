# Offsite

How AI changes traditional software, and why anyone still buys software when an agent can
code it. Published at **https://fedorocko.github.io/gd-decks/offsite/**; locally at
http://localhost:5173/gd-decks/offsite/ under `npm run dev`.

## How it is put together

Paths are relative to this folder. The stage, navigation and design tokens are shared by
every deck and live in `../../shared/` — see the root `README.md`.

| Path | What it holds |
| --- | --- |
| `slides/index.js` | the running order — **reorder the deck here** |
| `slides/S01…S25.jsx` | one file per slide, content only |
| `layouts/` | the tiles, quote and screenshot slides |
| `components/` | the scene, the two boxes of slides 9–10, and `Brand`, a product's mark set in a line with its name |
| `scene/model.js` | where every piece of the scene sits on slides 3–5, and how it moves |
| `sides.js` | what the two boxes hold on slides 9–10 — **edit their pills here** |
| `styles.css` | this deck's own styles, on top of `../../shared/deck.css`, `slides.css` and `schema.css` |
| `media.js` | slide images, placeholders until supplied, and the video behind slide 2 |
| `main.jsx` | mounts the deck, with the scene, the two boxes and the schema as its overlay |

The look is the ASP pitch's: the type scale, `Mark`, `Media`, `Backdrop`, the title slide
(`TitleLayout`) and the section slide (`SectionLayout`) live in `../../shared/`, and both
decks use them. So does everything slides 13–25 are built from: the statement and card
slides (`StatementLayout`, `CardsLayout`), their figures (`Kpis`, `benchmarks.js`), the
`Taxonomy` and the `Schema`.

## The scene on slides 3–5

Those three slides share **one picture** that changes as you go, the way the ASP pitch's
schema does. A slide opts in by naming a state, and the picture is the deck's `overlay`, so
it survives the slide change and moves into the next arrangement instead of being redrawn:

```js
S05Code.scene = 'code'
```

| Slide | State | What happens |
| --- | --- | --- |
| 3 | `empty` | the stage opens empty for an instant, then, without a click… |
| | `people` | …the person and four screens come up from the bottom, and… |
| | `abstract` | …the AI rectangle falls in from the top between them, “Abstract” on it |
| 4 | `clear` | the person and the screens drop out the bottom, then “Abstract”; the rectangle stays, turning off its isometric plane to face the room… |
| | `reduce` | …and “Reduce” drops onto it from the top, Form and Function landing where the screens stood |
| 5 | `code` | the rectangle and “Reduce” drop away; the Code train runs in from the left and breaks Function and Form |

The rectangle stands for AI and is one piece, `ai`, from slide 3 through slide 4: only the
word on it changes, “Reduce” landing exactly where “Abstract” stood, at the same size.
Between the two it turns from isometric to flat, so that “Reduce” stands on a plain
rectangle like Function and Form beside it. A spot marked `flat` in `scene/model.js` says
where it lies flat; the turn itself is timed on `.scene__plane` in `styles.css`.

A slide can name several states to play in a run, as slides 3 and 4 do:

```js
S03Abstract.scene = ['empty', 'people', 'abstract']
S04Reduce.scene = ['clear', 'reduce']
```

Each state holds for its `HOLD` in `scene/model.js`, then the next takes over, so one click
plays the whole run. Stepping back onto such a slide lands on its last state instead of
replaying the run.

Everything is in `scene/model.js`. `PIECES` gives each piece its size, which never changes;
`SPOTS` lists every place a piece can be and how it travels there (duration, easing,
delay); `STATES` says which spot each piece is in on each slide. A piece moving into a spot
takes that spot's timing whichever way through the deck you go, so stepping back plays the
moves in reverse; a spot can `wait` longer when entered from a particular state, where the
way back would otherwise cross something still leaving.

The motion is plain CSS transitions: every piece stays in the DOM, and a state change only
moves and fades it. The train's blow lands only when it has just run in, so reaching slide 5
backwards from slide 6 finds Function and Form already broken. Where the train stops, and when
its blow lands, are worked out from where Function and Form stand, so moving the boxes keeps
the two in step.

The train itself is drawn in `components/Scene.jsx`, in a box of 1800 × 150 with its nose at
the right edge. It is the one thing in the deck that is not lime: it is set in the orange of
the Claude Code mark on slide 6, `#d97757`, so that the train and the question after it read
as the same thing. The colour is `--train` on `.scene__train` in `styles.css`.

## The ASP pitch on slides 13–25

After the pillars the deck goes through the pitch's architecture run: its slide 14 and its
slides 16–27, in the pitch's order. The pitch's slide 15, the internal page on how the
taxonomy is positioned, is left out.

| Slides | In the pitch | What they are |
| --- | --- | --- |
| 13 | 14 | the Agentic Serving Plane's capabilities, with the taxonomy beside them |
| 14–24 | 16–26 | the platform, layer by layer, over the schema |
| 25 | 27 | why the Agentic Serving Plane: the four promises and the figures behind them |

Each slide's file is a copy of the pitch's, word for word, named for its place here:
`S14Box.jsx` is the pitch's `S21Box.jsx`. They are copied, not shared, so a change of
wording there has to be made here too. What they are built from is shared: the layouts, the
figures, the taxonomy and the schema live in `../../shared/`, so a change to the diagram or
to a benchmark figure shows in both decks.

Slides 14–24 share the pitch's **schema**, one diagram that unfolds as you go. Like the
scene it is the deck's `overlay`, and a slide opts in by naming a state:

```js
S16Management.schema = 'management'
```

The states, and the tree of boxes they unfold, are in `../../shared/schema/model.js`; the
ASP pitch's `README.md` says how they work. The diagram steps from each state to the next,
so these slides only make sense together, in this order.

## Swapping in real media

Every slot is filled. To replace a picture, drop the file into `../../public/media/` and
set its path in `media.js`; a slot whose `src` is `null` shows a labelled placeholder.

```js
person: { src: '/media/mona-lisa.png', label: 'Person' },
```

`person` is the figure on slide 3: the Mona Lisa, half-length, cut out on a transparent
ground, 1122 × 1402. The picture is cut off straight under the hands, so it rises out of the
stage's bottom edge instead of standing in the row, sunk 8px past it to hide where it ends.
She is turned to the right, towards the screens, and is shown as supplied, not mirrored. A
replacement should be the same kind of picture at 4 : 5, turned to the right, with the body
running out of the bottom of the frame; one of another shape or crop needs `PIECES.person`
and `PERSON` in `scene/model.js` set to match. `screen1`–`screen4` are the app screens on slide 3:
Excel, Workday, Slack and Salesforce, two to a row in that order (`screen-*.png`). They are
laid on a slanted plane in a frame of about 3 : 2 and cropped from the top; these are 16 : 9,
so each loses a sliver off either side. `hero` is the video behind slide 2: it is the ASP pitch's
`hero.mp4`, the same file, so replacing it changes both decks. `claudeCodeLogo` is the mark
set before “Claude Code” in slide 6's headline: the mark alone on a transparent ground, any
proportions, since it is sized by its height. `clerkScreenshot` is slide 8, Clerk's home
page at 1680 × 928; a replacement is best at 16:9, ideally 2816 × 1584, and is cropped from
the top otherwise. `pillarLanguage`, `pillarCreativity`, `pillarPrivate` and
`pillarEfficiency` are the videos behind slide 12's columns: the ASP pitch's `pil-1.mp4` to
`pil-4.mp4`, the same files, portrait at 9 : 16, cropped a little from the left.

## Speaker notes

A slide can carry notes for whoever is giving the talk. They show in a see-through column
down the right of the window, and only outside full screen: **Enter Full screen without
internal notes** hides them. A slide without notes has no column at all.

The notes sit at the foot of each slide's file, as plain text: a thought to a line, and a
blank line where a wider gap should open.

```js
S09Clerk.notes = `
They make sure that signups are working all the time.
Are up to date, and that everything works smoothly.

So, if you are a customer, would you say:
I don’t need Clerk.
`
```

Slides 2–13 have their notes. Slide 13's are the hand-over into the pitch, which was
written for a slide after the pillars and waited on slide 12 until the deck had one. The
pitch's slides after it, 14–25, have none yet. The column belongs to the
shared deck (`../../shared/Deck.jsx`, `.notes` in `../../shared/deck.css`), so its look is
set there.

## Content notes

Slide 1 is the ASP pitch's title slide, its slide 2, and slide 2 asks its question over the
video behind the pitch's slide 3. The title's words are copied, not shared, like the
pillars' on slide 12.

Slides 7, 9 and 10 share their columns: the customer's side on the left, the vendor's on
the right.

Slides 9 and 10 are **one pair of boxes** that change as you go. Slide 9 fills each with
what Clerk does, a quiet pill to a feature, sorted into groups. On slide 10 the features
stay and step back to grey, the principle they come down to appears over each box in a
pill outlined in lime — take responsibility, give flexibility — and over each group a solid
lime pill comes in, the features parting to let it, saying what that group is worth.
Everything the boxes hold is in `sides.js`, a column to a side:

```js
{
  id: 'customer',
  title: 'Take responsibility', // slide 10, over the box
  groups: [
    {
      // slide 9
      features: [
        'Supports all the authentication options',
        'Implements latest best practices',
      ],
      value: 'for innovation', // slide 10, over those two
    },
  ],
}
```

Like the scene, the boxes are the deck's `overlay` (`components/Sides.jsx`), so they
survive the slide change, and a slide opts in by naming what to show:
`S09Clerk.sides = 'features'`, `S10Principles.sides = 'values'`. Each pill has a row to
itself, and a box is only as tall as what it holds, the two keeping to the taller: they are
short on slide 9 and grow as the values open in them on slide 10, stepping down a little to
leave the titles room. The stage has room for about ten rows a side on slide 10, features
and values together. A pill longer than about 45 characters runs past the box.

Slide 12 closes on the ASP pitch's four pillars, the headlines of its slides 6–9, one to a
column. They are copied, not shared, so a change of wording there has to be made here too.
They stand in the order they are spoken to: code, no limits, private, scale. Under each
headline is what we have for it, a pill each: filled where it is out, in no colour so that
the lime stays on the headline's key word, and left as an outline where it is still coming
(`soon` in the slide's file, Sandboxes today).

Behind each column is that pillar's video from the pitch (`clip` in the slide's file), at a
fifth of its light so that it stays behind the words. The four do not loop and do not play
together: as the slide comes up they play in turn from the left, once each, about twenty
seconds in all, and then rest on their last frames, so the slide is still while it is
spoken to. How dim they sit is `.tile__clip` in `styles.css`.
