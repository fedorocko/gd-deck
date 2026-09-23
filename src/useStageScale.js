import { useEffect, useState } from 'react'

export const STAGE_W = 1600
export const STAGE_H = 900

/** Scale the fixed 1600x900 stage to fit the viewport, letterboxed. */
export default function useStageScale() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const fit = () =>
      setScale(
        Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H),
      )
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return scale
}
