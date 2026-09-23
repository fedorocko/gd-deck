import { useMemo, useState } from 'react'
import {
  MODELS,
  uncovered,
  VIEW_H,
  VIEW_W,
  VIEW_X,
  VIEW_Y,
  WORLD_H,
  WORLD_W,
  WORLD_X,
} from '../schema/layout.js'

/**
 * The diagram behind slides 15–26.
 *
 * It is mounted once, outside the keyed slide, so it survives every slide
 * change inside that run and animates from one state to the next instead of
 * being rebuilt. Every box, label, frame and arrow is in the DOM the whole
 * time; a state change only moves them and fades them, which is why plain CSS
 * transitions are enough and no animation library is pulled in.
 *
 * The choreography is staged through transition delays, in the order a viewer
 * can follow: the existing boxes shift to make room, the viewport slides to
 * re-centre, and only then do the newly uncovered boxes fade up.
 */

/** Long enough for the boxes to have moved before anything new appears. */
const ENTER_DELAY = '280ms'

export default function Schema({ state }) {
  const model = MODELS[state]

  // Which state we are coming from, so the newly uncovered boxes can be told
  // apart from the ones already on screen. Adjusting it while rendering is the
  // supported way to derive from a changed prop: React discards this pass and
  // re-runs before anything is committed.
  const [seen, setSeen] = useState({ from: null, to: state })
  if (seen.to !== state) setSeen({ from: seen.to, to: state })

  const entering = useMemo(() => uncovered(seen.from, seen.to), [seen])
  const delay = (id) => (entering.has(id) ? ENTER_DELAY : '0ms')

  return (
    <div
      className="schema"
      style={{ left: VIEW_X, top: VIEW_Y, width: VIEW_W, height: VIEW_H }}
      aria-hidden="true"
    >
      <div
        className="schema__world"
        style={{
          left: WORLD_X,
          width: WORLD_W,
          height: WORLD_H,
          transform: `translateY(${model.offset}px)`,
        }}
      >
        {[...model.frames.values()].map((f) => (
          <div
            key={f.id}
            className="sx-frame"
            style={{
              transform: `translate(${f.x}px, ${f.y}px)`,
              width: f.w,
              height: f.h,
              opacity: f.visible ? 1 : 0,
              '--d': delay(f.id),
            }}
          />
        ))}

        <svg
          className="sx-arrows"
          width={WORLD_W}
          height={WORLD_H}
          viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}
        >
          <defs>
            <marker
              id="sx-head"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" className="sx-arrows__head" />
            </marker>
          </defs>
          {[...model.arrows.values()].map((a) => (
            <path
              key={a.id}
              d={a.d}
              markerEnd={a.head ? 'url(#sx-head)' : undefined}
              style={{ opacity: a.visible ? 1 : 0, '--d': delay(a.id) }}
            />
          ))}
        </svg>

        {[...model.labels.values()].map((l) => (
          <div
            key={l.id}
            className={`sx-label${l.kind === 'arrow' ? ' sx-label--arrow' : ''}${
              l.hl ? ' sx-label--hl' : ''
            }`}
            style={{
              transform: `translate(${l.x}px, ${l.y}px)`,
              width: l.w,
              opacity: l.visible ? 1 : 0,
              '--d': delay(l.id),
            }}
          >
            {l.text}
          </div>
        ))}

        {[...model.nodes.values()].map((n) => (
          <div
            key={n.id}
            className={`sx${n.hl ? ' sx--hl' : ''}`}
            style={{
              transform: `translate(${n.x}px, ${n.y}px)`,
              width: n.w,
              height: n.h,
              fontSize: n.font,
              borderRadius: n.radius,
              opacity: n.visible ? 1 : 0,
              '--d': delay(n.id),
            }}
          >
            {n.label}
          </div>
        ))}
      </div>
    </div>
  )
}
