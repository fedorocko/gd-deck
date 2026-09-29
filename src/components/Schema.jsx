import { useEffect, useMemo, useState } from 'react'
import asset from '../asset.js'
import { ICONS, STATES } from '../schema/model.js'
import {
  MODELS,
  ORDER,
  spotKey,
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
 * The diagram behind slides 16–26.
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
 *
 * Everything renders from `ORDER`, never from the state's own maps. DOM order
 * has to stay fixed: React moves a reordered element, and re-inserting an
 * element cancels its CSS transition, which makes the box jump to its new
 * position instead of travelling there.
 */

/** Long enough for the boxes to have moved before anything new appears. */
const ENTER_DELAY = '280ms'

/** Spotlight pacing: a beat to take the slide in, then each picture's turn —
    roughly two seconds held once the 520ms grow has run. */
const SPOT_LEAD = 1400
const SPOT_TURN = 2600

/**
 * Which of a state's spotlit pictures is up, or null. It cycles only while
 * that state is showing and starts over from the first on every return; the
 * turn is stamped with its state so a stale one never leaks into a visit.
 */
function useSpotlight(state) {
  const ids = STATES[state]?.spotlight
  const [turn, setTurn] = useState({ state: null, n: 0 })

  useEffect(() => {
    if (!ids) return undefined
    let n = 0
    let timer = setTimeout(function next() {
      setTurn({ state, n: n++ })
      timer = setTimeout(next, SPOT_TURN)
    }, SPOT_LEAD)
    return () => clearTimeout(timer)
  }, [state, ids])

  if (!ids || turn.state !== state) return null
  return ids[turn.n % ids.length]
}

export default function Schema({ state }) {
  // While a picture has its turn, the state is drawn from the layout with
  // that picture grown in its row; the boxes around it move to make room.
  const spot = useSpotlight(state)
  const model = MODELS[spot ? spotKey(state, spot) : state]

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
        {ORDER.frames.map((id) => {
          const f = model.frames.get(id)
          return (
            <div
              key={id}
              className={f.strong ? 'sx-frame sx-frame--strong' : 'sx-frame'}
              style={{
                transform: `translate(${f.x}px, ${f.y}px)`,
                width: f.w,
                height: f.h,
                opacity: f.visible ? 1 : 0,
                '--d': delay(id),
              }}
            />
          )
        })}

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
          {ORDER.arrows.map((id) => {
            const a = model.arrows.get(id)
            return (
              <path
                key={id}
                d={a.d}
                className={
                  a.visible && a.flow !== undefined ? 'sx-arrows__flow' : undefined
                }
                markerEnd={a.head ? 'url(#sx-head)' : undefined}
                style={{
                  opacity: a.visible ? 1 : 0,
                  '--d': delay(id),
                  '--i': a.flow,
                }}
              />
            )
          })}
        </svg>

        {ORDER.labels.map((id) => {
          const l = model.labels.get(id)
          const cls = [
            'sx-label',
            l.kind === 'arrow' && 'sx-label--arrow',
            l.kind === 'logos' && 'sx-label--logos',
            l.kind === 'section' && 'sx-label--section',
            l.hl && 'sx-label--hl',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <div
              key={id}
              className={cls}
              style={{
                transform: `translate(${l.x}px, ${l.y}px)`,
                width: l.w,
                opacity: l.visible ? 1 : 0,
                '--d': delay(id),
              }}
            >
              {l.logos
                ? l.logos.map((src) => (
                    <img key={src} src={asset(src)} alt="" />
                  ))
                : l.kind === 'section'
                  ? <span className="sx-label__pill">{l.text}</span>
                  : l.text}
            </div>
          )
        })}

        {ORDER.nodes.map((id) => {
          const n = model.nodes.get(id)
          const icon = ICONS[id]
          // A card's picture is a box like any other, with art in place of a
          // label; until the art is supplied it holds its space as a hatch.
          const pic = n.art !== undefined
          const cls = [
            'sx',
            n.hl && 'sx--hl',
            n.ctx && 'sx--ctx',
            n.plain && 'sx--plain',
            n.flow !== undefined && 'sx--flow',
            n.badge && 'sx--badge',
            icon && 'sx--icon',
            pic && 'sx--pic',
            pic && !n.art && 'sx--empty',
            n.spot && 'sx--spot',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <div
              key={id}
              className={cls}
              style={{
                transform: `translate(${n.x}px, ${n.y}px)`,
                width: n.w,
                height: n.h,
                fontSize: n.font,
                borderRadius: n.radius,
                opacity: n.visible ? 1 : 0,
                '--d': delay(id),
                '--i': n.flow,
              }}
            >
              {n.art && <img className="sx__pic" src={asset(n.art)} alt="" />}
              {icon && (
                <img
                  className="sx__icon"
                  src={asset(icon)}
                  alt=""
                  // Art named in ICONS but not yet dropped into public/media
                  // leaves its space empty rather than a broken-image glyph.
                  onError={(e) => {
                    e.currentTarget.style.visibility = 'hidden'
                  }}
                />
              )}
              {n.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}
