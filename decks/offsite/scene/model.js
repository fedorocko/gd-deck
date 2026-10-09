/**
 * The scene behind slides 3–5: how traditional software is made, and what
 * code does to it.
 *
 * It is one picture that changes as you go rather than separate ones.
 * Every piece is on the stage the whole time; a state only says where each
 * piece sits — in the picture, or parked off the stage on the side it comes in
 * from or leaves by. Moving between two slides is then nothing but CSS
 * transitions, the way the ASP pitch's schema moves.
 *
 * Positions are in the 1600 × 900 stage's own pixels, and every piece is
 * placed by its centre.
 */

/** Far enough above or below its place that a piece is out of sight. */
const OFF = 900

/**
 * Each piece's size, fixed for good: a state moves, turns, scales and fades a
 * piece but never resizes it. An `iso` piece is a face on an isometric plane;
 * its w × h is the face before the slant, so on the stage it runs 0.87 w
 * across and h + w / 2 down.
 *
 * `ai` is the rectangle that stands for AI. It is one piece across slides 3
 * and 4 — only the word on it changes, "Abstract" flying out and "Reduce"
 * flying in to the same place at the same size. Between the two it turns off
 * its plane to face the room (`flat`), at its true w × h, so that "Reduce"
 * stands on a plain rectangle like the two boxes beside it.
 */
export const PIECES = {
  track: { w: 1600, h: 2 },
  ai: { w: 520, h: 380, iso: true },
  abstractWord: { w: 600, h: 120 },
  person: { w: 512, h: 640 },
  screen1: { w: 250, h: 165, iso: true },
  screen2: { w: 250, h: 165, iso: true },
  screen3: { w: 250, h: 165, iso: true },
  screen4: { w: 250, h: 165, iso: true },
  reduceWord: { w: 600, h: 120 },
  fn: { w: 440, h: 150 },
  form: { w: 440, h: 150 },
  train: { w: 1800, h: 150 },
}

/** Paint order, back to front. Fixed: re-ordering an element cancels its
 *  transition, so the DOM must never shuffle. */
export const ORDER = Object.keys(PIECES)

// ------------------------------------------------------------------ timing
/** The train's easing — all speed, then the brakes — kept as numbers so the
 *  moment its nose reaches the boxes can be worked out from it. */
const BRAKE = [0.1, 0.9, 0.2, 1]

/** How a piece travels into a spot. A piece moving into a spot takes that
 *  spot's timing, whichever way through the deck it is going — unless the
 *  spot says to `wait` longer when entered from a given state, for a way
 *  back that would otherwise cross something still on its way out. */
const EASE = {
  // overshoots a touch and settles, like something set down
  land: 'cubic-bezier(0.3, 1.18, 0.45, 1)',
  // gathers speed on its way out
  fall: 'cubic-bezier(0.55, 0, 0.85, 0.3)',
  // the deck's own
  move: 'var(--ease-move)',
  brake: `cubic-bezier(${BRAKE})`,
}

const how = (e, t, d = 0) => ({ e: EASE[e], t, d })

/** How far through its time (0–1) an easing has run when it has covered
 *  `share` of the distance — found on the curve by halving, since the
 *  curves here only ever climb. */
function timeFor([x1, y1, x2, y2], share) {
  const at = (s, a, b) => 3 * (1 - s) ** 2 * s * a + 3 * (1 - s) * s ** 2 * b + s ** 3
  let lo = 0
  let hi = 1
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2
    if (at(mid, y1, y2) < share) lo = mid
    else hi = mid
  }
  return at((lo + hi) / 2, x1, x2)
}

// ------------------------------------------------------------------ places
/** Slide 3 ends on three things in a row — the person, the AI rectangle, the
 *  screens — with even gaps between them. The rectangle is set a little under
 *  its drawn size to fit that row, and stands there through slide 4.
 *
 *  The person is a half-length figure, cut off straight under the hands, so
 *  it does not stand in the row but rises out of the stage's bottom edge:
 *  sunk 8px past it, which puts the picture's own bottom edge out of sight.
 *  It is as large as the slot allows, and set far enough left to keep its
 *  sleeve off the rectangle's near corner — which takes the picture's edge a
 *  little past the stage's, where there is only the dark of the mantle. */
const PERSON = { x: 224, y: 900 + 8 - PIECES.person.h / 2 }
const AI = { x: 695, y: 450, s: 0.88 }

/** The four screens make a 2 × 2 wall on one isometric plane, centred here.
 *  Stepping along the plane moves 0.87 across and half a step up, so the
 *  centres are offset along the same slant as the faces. */
const WALL = { x: 1228, y: 450 }
const STEP_U = (PIECES.screen1.w + 16) / 2
const STEP_V = (PIECES.screen1.h + 16) / 2

const screenAt = (col, row) => {
  const u = (col ? 1 : -1) * STEP_U
  const v = (row ? 1 : -1) * STEP_V
  return { x: WALL.x + 0.866 * u, y: WALL.y + v - 0.5 * u }
}

/** The two boxes software comes down to. They land where the screens stood,
 *  beside the rectangle, with room between them for the train. */
const FN = { x: WALL.x, y: 285 }
const FORM = { x: WALL.x, y: 615 }
const BOX_LEFT = FN.x - PIECES.fn.w / 2

/** The train is long enough that its tail never shows. It waits with its
 *  nose just off the left edge, sets off once "Reduce" has dropped out of its
 *  way, and stops wedged between the boxes, 140px in. */
const TRAIN_Y = 450
const TRAIN_FROM = -60
const NOSE = BOX_LEFT + 140
const TRAIN_GO = 350
const TRAIN_T = 1000

/** When the nose reaches the boxes' left edge, worked out on the train's own
 *  easing so the blow stays in time wherever the boxes are put. */
const IMPACT =
  TRAIN_GO +
  Math.round(TRAIN_T * timeFor(BRAKE, (BOX_LEFT - TRAIN_FROM) / (NOSE - TRAIN_FROM)))

/** Stepping back from slide 4, what returns waits this long for "Reduce",
 *  Function and Form to clear the places it comes back to. */
const BACK = 450

/** Where a screen can be: on the wall, or below the stage. */
const screen = (i) => {
  const at = screenAt(i % 2, Math.floor(i / 2))
  return {
    down: { ...at, y: at.y + OFF, ...how('fall', 550, 50 * (3 - i)) },
    in: { ...at, ...how('land', 850, 90 + 70 * i), wait: { reduce: BACK + 70 * i } },
  }
}

// ------------------------------------------------------------------- spots
/** Every place each piece can be. Anything a spot leaves out is the
 *  default: no turn, full size, fully shown, on its plane. */
export const SPOTS = {
  // the rail the train runs on, just under its floor
  track: {
    off: { x: 800, y: TRAIN_Y + 63, o: 0, ...how('move', 300, 450) },
    in: { x: 800, y: TRAIN_Y + 63, ...how('move', 500, TRAIN_GO) },
  },
  // Falls in from the top, between the person and the screens once they are
  // up. `flat`: where it stands, but turned off its plane to face the room;
  // it does not travel to get there, so the turn is timed in styles.css. It
  // leaves flat too. Stepping back from slide 5, the rectangle and "Reduce"
  // rise once the train has backed away.
  ai: {
    up: { ...AI, y: 450 - OFF, ...how('fall', 600) },
    in: { ...AI, ...how('land', 950) },
    flat: { ...AI, flat: true, ...how('land', 950), wait: { code: 420 } },
    down: { ...AI, y: 450 + OFF, flat: true, ...how('fall', 450) },
  },
  // stands on the rectangle and falls in with it, on the same timing, so the
  // two come down as one; it drops out just after the person and the screens
  abstractWord: {
    up: { ...AI, y: 450 - OFF, ...how('fall', 600) },
    in: { ...AI, ...how('land', 950), wait: { reduce: BACK } },
    down: { ...AI, y: 450 + OFF, ...how('fall', 650, 220) },
  },
  // Comes up without the overshoot the others land with: rising past its
  // place would lift the cut under its shoulders clear of the bottom edge.
  person: {
    down: { ...PERSON, y: PERSON.y + OFF, ...how('fall', 600) },
    in: { ...PERSON, ...how('move', 850), wait: { reduce: BACK } },
  },
  screen1: screen(0),
  screen2: screen(1),
  screen3: screen(2),
  screen4: screen(3),
  // lands where "Abstract" stood, at its size, and leaves with the rectangle
  reduceWord: {
    up: { ...AI, y: 450 - OFF, ...how('fall', 550) },
    in: { ...AI, ...how('land', 950), wait: { code: 420 } },
    down: { ...AI, y: 450 + OFF, ...how('fall', 450) },
  },
  // Function and Form drop in from the top just behind "Reduce", Form first:
  // it lands lower, so going first keeps it from overtaking Function on the
  // way down. Stepping back from slide 5, they close up once the train has
  // backed away. `hit`: knocked off their places by the train and cracked
  // through, the blow landing as the nose reaches them.
  fn: {
    up: { ...FN, y: FN.y - OFF, ...how('fall', 550) },
    in: { ...FN, ...how('land', 950, 220), wait: { code: 560 } },
    hit: { x: FN.x + 24, y: FN.y - 38, r: -6, broken: true, ...how('brake', 600, IMPACT) },
  },
  form: {
    up: { ...FORM, y: FORM.y - OFF, ...how('fall', 550) },
    in: { ...FORM, ...how('land', 950, 110), wait: { code: 640 } },
    hit: { x: FORM.x - 8, y: FORM.y + 44, r: 5, broken: true, ...how('brake', 600, IMPACT + 20) },
  },
  train: {
    off: { x: TRAIN_FROM - PIECES.train.w / 2, y: TRAIN_Y, ...how('fall', 700) },
    in: { x: NOSE - PIECES.train.w / 2, y: TRAIN_Y, ...how('brake', TRAIN_T, TRAIN_GO) },
  },
}

// ------------------------------------------------------------------ states
// In the order the slides show them. Each builds on the one before, so a
// state reads as what changes when it comes up.

const empty = {
  track: 'off',
  ai: 'up',
  abstractWord: 'up',
  person: 'down',
  screen1: 'down',
  screen2: 'down',
  screen3: 'down',
  screen4: 'down',
  reduceWord: 'up',
  fn: 'up',
  form: 'up',
  train: 'off',
}

const SCREENS = ['screen1', 'screen2', 'screen3', 'screen4']
const all = (ids, spot) => Object.fromEntries(ids.map((id) => [id, spot]))

const people = { ...empty, person: 'in', ...all(SCREENS, 'in') }
const abstract = { ...people, ai: 'in', abstractWord: 'in' }
const clear = {
  ...abstract,
  ai: 'flat',
  abstractWord: 'down',
  person: 'down',
  ...all(SCREENS, 'down'),
}
const reduce = { ...clear, reduceWord: 'in', fn: 'in', form: 'in' }
const code = {
  ...reduce,
  ai: 'down',
  reduceWord: 'down',
  fn: 'hit',
  form: 'hit',
  train: 'in',
  track: 'in',
}

export const STATES = {
  // slide 3, played in a run: the stage opens empty, every piece off it on
  // the side it comes in from …
  empty,
  // … the person and four screens come up from the bottom …
  people,
  // … and the AI rectangle falls in from the top between them, "Abstract"
  // on it
  abstract,
  // slide 4, played in a run: the person and the screens drop out the
  // bottom, "Abstract" just after them; the rectangle stays, turning to face
  // the room …
  clear,
  // … then "Reduce" drops in onto it from the top, Form and Function with it
  reduce,
  // 5 — the rectangle and "Reduce" drop away, and code runs in from the left
  //     like a train, breaking Function and Form
  code,
}

/**
 * A slide can name several states to play in a run, as slides 3 and 4 do: how
 * long each holds before the next takes over — long enough for its own moves to
 * land and be seen. The last state of a run stays until the slide changes.
 */
export const HOLD = {
  // only long enough for the empty stage to be drawn, so that what comes up
  // next has somewhere to travel from
  empty: 100,
  // the last screen lands about 1150ms in; a beat more for the two to be
  // seen facing each other before the rectangle comes between them
  people: 1600,
  // the stage is clear after about 870ms; the next pieces set off just before
  clear: 750,
}

/** The pose a piece holds in a state, with every default filled in.
 *  from: the state the scene is coming from, if any. */
export function pose(state, id, from) {
  const { wait, ...spot } = SPOTS[id][STATES[state][id]]
  return { r: 0, s: 1, o: 1, broken: false, flat: false, ...spot, d: wait?.[from] ?? spot.d }
}
