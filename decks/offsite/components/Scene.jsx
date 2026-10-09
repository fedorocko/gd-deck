import { useEffect, useState } from 'react'
import { HOLD, ORDER, PIECES, STATES, pose } from '../scene/model.js'
import Media from '../../../shared/Media.jsx'
import media from '../media.js'

/** The states in the order the slides show them, to tell forwards from back. */
const SEQUENCE = Object.keys(STATES)

/** A slide's `scene` is one state, or a list of them to play in a run. */
const steps = (run) => (Array.isArray(run) ? run : [run])

/**
 * The picture behind slides 3–5.
 *
 * It is mounted once, outside the keyed slide, so it survives every slide
 * change inside that run and moves from one arrangement to the next instead
 * of being rebuilt. Every piece is in the DOM the whole time and only its
 * transform and opacity change, so plain CSS transitions do the animating;
 * how each move is timed comes from the model, through custom properties.
 *
 * run: the slide's `scene` — a state, or several played one after another.
 */
export default function Scene({ run }) {
  // How far into the slide's run the picture has got. Entered going forwards,
  // a run starts from its first state and plays itself through; entered going
  // back, it lands straight on its last, the state it ended on. Adjusting it
  // while rendering is the supported way to derive from a changed prop: React
  // discards this pass and re-runs before anything is committed.
  const [play, setPlay] = useState({ run, step: 0 })
  if (play.run !== run) {
    const before = steps(play.run)[play.step]
    const forwards = SEQUENCE.indexOf(before) < SEQUENCE.indexOf(steps(run)[0])
    setPlay({ run, step: forwards ? 0 : steps(run).length - 1 })
  }
  const state = steps(play.run)[play.step]

  // Each state in a run holds for its HOLD, then hands over to the next.
  useEffect(() => {
    const list = steps(play.run)
    if (play.step === list.length - 1) return undefined
    const timer = setTimeout(
      () => setPlay({ run: play.run, step: play.step + 1 }),
      HOLD[list[play.step]],
    )
    return () => clearTimeout(timer)
  }, [play])

  // Which state we came from. Some moves are timed by it, and the train's
  // blow only lands when it has just run in — not when slide 5 is reached
  // backwards from slide 6.
  const [seen, setSeen] = useState({ from: null, to: state })
  if (seen.to !== state) setSeen({ from: seen.to, to: state })
  const impact = seen.from === 'reduce' && state === 'code'

  return (
    <div className={impact ? 'scene scene--impact' : 'scene'} aria-hidden="true">
      {ORDER.map((id) => {
        const { w, h } = PIECES[id]
        const p = pose(state, id, seen.from)
        const cls = [
          'scene__piece',
          CLASS[id],
          p.broken && 'scene__box--broken',
          p.flat && 'scene__piece--flat',
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <div
            key={id}
            className={cls}
            style={{
              width: w,
              height: h,
              transform: `translate(${p.x - w / 2}px, ${p.y - h / 2}px) rotate(${p.r}deg) scale(${p.s})`,
              opacity: p.o,
              '--t': `${p.t}ms`,
              '--e': p.e,
              '--d': `${p.d}ms`,
            }}
          >
            {ART[id]?.()}
          </div>
        )
      })}
    </div>
  )
}

const CLASS = {
  track: 'scene__track',
  abstractWord: 'scene__word',
  reduceWord: 'scene__word',
  fn: 'scene__box',
  form: 'scene__box',
  train: 'scene__train',
}

const screen = (name) => () => (
  <div className="scene__iso">
    <Media name={name} from={media} className="scene__screen" />
  </div>
)

const ART = {
  ai: () => <div className="scene__iso scene__plane" />,
  abstractWord: () => <span>Abstract</span>,
  person: () => <Media name="person" from={media} className="scene__person" />,
  screen1: screen('screen1'),
  screen2: screen('screen2'),
  screen3: screen('screen3'),
  screen4: screen('screen4'),
  reduceWord: () => <span>Reduce</span>,
  fn: () => <Box label="Function" crack={[[57, 0], [52, 27], [60, 48], [53, 71], [58, 100]]} />,
  form: () => <Box label="Form" crack={[[45, 0], [50, 30], [43, 52], [49, 76], [44, 100]]} />,
  train: () => <Train />,
}

/**
 * A box that can break. It is drawn three times: whole underneath, and once
 * either side of the crack on top. Intact, the halves line up over the whole
 * box, which hides the hairline seam two clip paths leave between them;
 * broken, the whole box goes and the halves part.
 *
 * crack: the line it breaks along, top to bottom, as [x%, y%] points.
 */
function Box({ label, crack }) {
  const pts = crack.map(([x, y]) => `${x}% ${y}%`)
  const left = ['0 0', ...pts, '0 100%'].join(', ')
  const right = ['100% 0', '100% 100%', ...[...pts].reverse()].join(', ')

  return (
    <div className="scene__jolt">
      <span className="scene__shard scene__shard--whole">{label}</span>
      <span className="scene__shard scene__shard--a" style={{ clipPath: `polygon(${left})` }}>
        {label}
      </span>
      <span className="scene__shard scene__shard--b" style={{ clipPath: `polygon(${right})` }}>
        {label}
      </span>
    </div>
  )
}

/** The cars behind the engine, each from its first inch to the coupling at
 *  its nose end. Only the last 500px of the nearer one is ever on the stage;
 *  the rest is there so the tail runs out of sight wherever the nose stops. */
const CARS = [
  [-256, 444],
  [452, 1152],
]

/** Where the wheels stand, by the middle of each pair: one pair under either
 *  end of a car, and two under the engine. */
const BOGIES = [...CARS.flatMap(([from, to]) => [from + 90, to - 90]), 1250, 1566]

/**
 * The train, nose to the right: the engine with the word on its side — its
 * last 640px — and the cars behind it. It is drawn in its own box, 1800 × 150
 * (`train` in scene/model.js): the roof is 20px down, the skirts end at 124,
 * and the wheels come down onto the rail, which runs under them at 137.
 */
function Train() {
  return (
    <svg viewBox="0 0 1800 150" width="1800" height="150">
      <defs>
        <radialGradient id="scene-train-lamp">
          <stop className="scene__train-light" offset="0" stopOpacity="0.45" />
          <stop className="scene__train-light" offset="1" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* the body: a long roof running down into the nose, and the chin
          turning back under it */}
      <path
        className="scene__train-body"
        d="M0 20H1396C1500 20 1592 38 1668 70C1720 92 1768 104 1790 112C1800 116 1798 124 1782 124H0Z"
      />
      {/* the skirts, a shade deeper, drawn out to a point at the nose */}
      <path
        className="scene__train-skirt"
        d="M0 106H1580C1660 106 1730 108 1790 112C1800 116 1798 124 1782 124H0Z"
      />
      {/* where each bogie sits, cut out of the skirts, and its two wheels */}
      {BOGIES.map((x) => (
        <g key={x}>
          <rect
            className="scene__train-ink"
            x={x - 48}
            y="110"
            width="96"
            height="14"
            rx="7"
          />
          {[x - 27, x + 27].map((cx) => (
            <g key={cx}>
              <circle className="scene__train-wheel" cx={cx} cy="125" r="12" />
              <circle className="scene__train-hub" cx={cx} cy="125" r="3" />
            </g>
          ))}
        </g>
      ))}
      {/* light along the roof, following it down the nose */}
      <path
        className="scene__train-gloss"
        d="M0 27H1396C1498 27 1588 44 1660 74"
      />

      {CARS.map(([from, to]) => (
        <g key={from}>
          {/* one band of glass the length of the car, parted by its pillars */}
          <rect
            className="scene__train-ink"
            x={from + 90}
            y="40"
            width="504"
            height="30"
            rx="9"
          />
          {[1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              className="scene__train-body"
              x={from + 87 + i * 84}
              y="40"
              width="6"
              height="30"
            />
          ))}
          <Door x={from + 34} />
          <Door x={to - 80} />
          {/* the coupling to whatever is ahead */}
          <rect className="scene__train-ink" x={to} y="20" width="8" height="104" />
        </g>
      ))}

      <Door x={1180} />
      <text className="scene__train-word" x="1328" y="98" textAnchor="middle">
        Code
      </text>
      {/* the windscreen, following the curve of the nose, and the light on it */}
      <path
        className="scene__train-glass"
        d="M1452 37C1526 37 1592 51 1650 79C1655 82 1654 86 1648 86H1606C1562 71 1512 65 1452 65Z"
      />
      <path className="scene__train-gloss" d="M1474 45C1530 46 1578 56 1622 75" />
      {/* the headlamp, low on the nose, and its glow */}
      <circle cx="1736" cy="100" r="26" fill="url(#scene-train-lamp)" />
      <rect
        className="scene__train-light"
        x="1708"
        y="95"
        width="38"
        height="7"
        rx="3.5"
        transform="rotate(18 1727 98.5)"
      />
    </svg>
  )
}

/** A door, by its left edge: a seam in the body and a window at the height
 *  of the others. */
function Door({ x }) {
  return (
    <>
      <rect className="scene__train-seam" x={x} y="32" width="38" height="72" rx="5" />
      <rect className="scene__train-ink" x={x + 8} y="40" width="22" height="30" rx="7" />
    </>
  )
}
