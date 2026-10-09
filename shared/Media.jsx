import { useRef } from 'react'
import assetUrl from './asset.js'

/**
 * Renders the asset for `name`, or a labelled placeholder until it exists.
 * from: the deck's own media list (its media.js) — every deck keeps its own
 * files, so the list is handed in rather than imported here.
 */
export default function Media({ name, from, className = '', style }) {
  const asset = from?.[name]
  const cls = `media ${asset?.src ? '' : 'media--empty'} ${className}`.trim()

  if (!asset?.src) {
    return (
      <div className={cls} style={style}>
        <p className="media__label">{asset?.label ?? name}</p>
      </div>
    )
  }

  return (
    <div className={cls} style={style}>
      {asset.kind === 'video' ? (
        <Video src={assetUrl(asset.src)} plays={asset.plays} />
      ) : (
        <img src={assetUrl(asset.src)} alt="" />
      )}
    </div>
  )
}

/** Loops forever, or `plays` times and then rests on the last frame. The
 *  slide remounts on every visit, so the count starts over each time. */
function Video({ src, plays }) {
  const played = useRef(0)

  const onEnded = (e) => {
    played.current += 1
    if (played.current < plays) {
      e.currentTarget.currentTime = 0
      e.currentTarget.play()
    }
  }

  return (
    <video
      src={src}
      autoPlay
      muted
      loop={!plays}
      playsInline
      onEnded={plays ? onEnded : undefined}
    />
  )
}
