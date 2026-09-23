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
        <video src={asset.src} autoPlay muted loop playsInline />
      ) : (
        <img src={asset.src} alt="" />
      )}
    </div>
  )
}
