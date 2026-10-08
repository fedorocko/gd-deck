import { useRef } from 'react'
import assetUrl from '../../../shared/asset.js'
import media from '../media.js'

/** Renders the asset for `name`, or a labelled placeholder until it exists. */
export default function Media({ name, className = '', style }) {
  const asset = media[name]
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
