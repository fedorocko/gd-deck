import { useCallback, useEffect, useState } from 'react'
import Schema from './components/Schema.jsx'
import slides from './slides/index.js'
import useStageScale, { STAGE_H, STAGE_W } from './useStageScale.js'

// Hairline progress bar along the bottom edge. Set to false to remove it.
const SHOW_PROGRESS = true

const PREV_KEYS = ['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace']
const NEXT_KEYS = ['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter']

const clamp = (i) => Math.min(slides.length - 1, Math.max(0, i))

/** The hash carries a 1-based slide number, so `#7` is the seventh slide. */
function indexFromHash() {
  const n = Number.parseInt(window.location.hash.slice(1), 10)
  return Number.isFinite(n) ? clamp(n - 1) : 0
}

export default function App() {
  const [index, setIndex] = useState(indexFromHash)
  const scale = useStageScale()

  const go = useCallback((delta) => setIndex((i) => clamp(i + delta)), [])

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
    const onHashChange = () => setIndex(indexFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (PREV_KEYS.includes(e.key)) {
        e.preventDefault()
        go(-1)
      } else if (NEXT_KEYS.includes(e.key)) {
        e.preventDefault()
        go(1)
      } else if (e.key === 'Home') {
        setIndex(0)
      } else if (e.key === 'End') {
        setIndex(slides.length - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const Slide = slides[index]

  return (
    <div className="deck">
      <div
        className="stage"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        aria-live="polite"
      >
        {/* key remounts the slide so the entrance animation replays */}
        <Slide key={index} />

        {/* Slides that carry a schema state share one diagram. It lives out
            here, unkeyed, so it survives the slide change and animates from
            the previous state instead of being redrawn. */}
        {Slide.schema && <Schema state={Slide.schema} />}
      </div>

      <button
        className="nav nav--prev"
        onClick={() => go(-1)}
        disabled={index === 0}
        aria-label="Previous slide"
      >
        <Chevron dir="left" />
      </button>
      <button
        className="nav nav--next"
        onClick={() => go(1)}
        disabled={index === slides.length - 1}
        aria-label="Next slide"
      >
        <Chevron dir="right" />
      </button>

      {SHOW_PROGRESS && (
        <div
          className="progress"
          style={{ width: `${((index + 1) / slides.length) * 100}%` }}
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
