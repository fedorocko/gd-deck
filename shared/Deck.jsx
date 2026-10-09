import { useCallback, useEffect, useState } from 'react'
import useStageScale, { STAGE_H, STAGE_W } from './useStageScale.js'

// Hairline progress bar along the bottom edge. Set to false to remove it.
const SHOW_PROGRESS = true

const PREV_KEYS = ['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace']
const NEXT_KEYS = ['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter']

const clamp = (i, count) => Math.min(count - 1, Math.max(0, i))

/** Nearest slide from `from` in direction `dir` that `ok` accepts, or -1. */
function seek(slides, from, dir, ok) {
  for (let i = from; i >= 0 && i < slides.length; i += dir) {
    if (ok(slides[i])) return i
  }
  return -1
}

/** The hash carries a 1-based slide number, so `#7` is the seventh slide. */
function indexFromHash(count) {
  const n = Number.parseInt(window.location.hash.slice(1), 10)
  return Number.isFinite(n) ? clamp(n - 1, count) : 0
}

/**
 * One presentation: the scaled stage, navigation, the URL hash and presenting.
 *
 * slides: components in running order. A slide marked `internal = true` is
 *   skipped while presenting. One with `notes` — a string, written a thought
 *   to a line with a blank line between groups — shows them as speaker notes
 *   in a column down the right, and only outside presenting.
 * overlay: given the current slide, returns what to render on the stage
 *   outside the keyed slide — so it survives the slide change instead of
 *   being remounted with it.
 */
export default function Deck({ slides, overlay }) {
  const [index, setIndex] = useState(() => indexFromHash(slides.length))
  // Presenting = full screen with internal slides skipped. The index stays a
  // position in the full deck so `#N` means the same slide in both modes.
  const [presenting, setPresenting] = useState(false)
  const scale = useStageScale()

  const shown = useCallback((s) => !(presenting && s.internal), [presenting])
  const first = seek(slides, 0, 1, shown)
  const last = seek(slides, slides.length - 1, -1, shown)

  const go = useCallback(
    (delta) =>
      setIndex((i) => {
        const next = seek(slides, i + delta, Math.sign(delta), shown)
        return next === -1 ? i : next
      }),
    [slides, shown],
  )

  const present = () => {
    setPresenting(true)
    // Land on a client-facing slide if we are sitting on an internal one.
    setIndex((i) => {
      const ok = (s) => !s.internal
      const next = seek(slides, i, 1, ok)
      return next === -1 ? seek(slides, i, -1, ok) : next
    })
    document.documentElement.requestFullscreen?.().catch(() => {})
  }

  const stopPresenting = useCallback(() => {
    setPresenting(false)
    if (document.fullscreenElement) document.exitFullscreen?.()
  }, [])

  // The browser handles Escape in full screen itself and only tells us via
  // fullscreenchange, so leaving full screen by any route ends presenting.
  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) setPresenting(false)
    }
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  // Keep the URL in step so a refresh (or a shared link) lands on this slide.
  // replaceState leaves the history stack alone, so Back still exits the deck.
  useEffect(() => {
    const hash = `#${index + 1}`
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash)
    }
  }, [index])

  // Someone editing the hash by hand, or a restored session, moves the deck.
  useEffect(() => {
    const onHashChange = () => setIndex(indexFromHash(slides.length))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [slides])

  useEffect(() => {
    const onKey = (e) => {
      if (PREV_KEYS.includes(e.key)) {
        e.preventDefault()
        go(-1)
      } else if (NEXT_KEYS.includes(e.key)) {
        e.preventDefault()
        go(1)
      } else if (e.key === 'Home') {
        setIndex(first)
      } else if (e.key === 'End') {
        setIndex(last)
      } else if (e.key === 'Escape' && presenting) {
        // Reached only where full screen is unavailable (e.g. iOS Safari).
        stopPresenting()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, first, last, presenting, stopPresenting])

  const Slide = slides[index]
  const visible = slides.filter(shown)
  const position = visible.indexOf(Slide) + 1
  // Speaker notes are for whoever is preparing the talk, never for the room.
  const notes = !presenting && Slide.notes

  return (
    <div
      className={presenting ? 'deck deck--presenting' : 'deck'}
      // While presenting, a click anywhere but the controls advances, like a
      // clicker would. Outside it, clicks are left alone so text can be selected.
      onClick={(e) => {
        if (presenting && !e.target.closest('button')) go(1)
      }}
    >
      <div
        className="stage"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        aria-live="polite"
      >
        {/* key remounts the slide so the entrance animation replays */}
        <Slide key={index} />

        {overlay?.(Slide)}
      </div>

      {/* Before the buttons, so the next one can step out of its way in CSS.
          key remounts it so a long note starts from the top on every slide. */}
      {notes && (
        <aside className="notes" key={index}>
          <h2 className="notes__label">Speaker notes</h2>
          {notes
            .trim()
            .split(/\n\s*\n/)
            .map((group, i) => (
              <div className="notes__group" key={i}>
                {group.split('\n').map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
            ))}
        </aside>
      )}

      <button
        className="nav nav--prev"
        onClick={() => go(-1)}
        disabled={index === first}
        aria-label="Previous slide"
      >
        <Chevron dir="left" />
      </button>
      <button
        className="nav nav--next"
        onClick={() => go(1)}
        disabled={index === last}
        aria-label="Next slide"
      >
        <Chevron dir="right" />
      </button>

      {presenting ? (
        <button
          className="close"
          onClick={stopPresenting}
          aria-label="Exit full screen"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M7 7l10 10M17 7 7 17" strokeLinecap="round" />
          </svg>
        </button>
      ) : (
        <button className="present" onClick={present}>
          Enter Full screen without internal notes
        </button>
      )}

      {SHOW_PROGRESS && (
        <div
          className="progress"
          style={{ width: `${(position / visible.length) * 100}%` }}
        />
      )}
    </div>
  )
}

function Chevron({ dir }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d={dir === 'left' ? 'M15 5 8 12l7 7' : 'M9 5l7 7-7 7'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Stage dimensions are re-exported for anything that needs the design space.
export { STAGE_W, STAGE_H }
