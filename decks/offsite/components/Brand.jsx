import asset from '../../../shared/asset.js'
import media from '../media.js'

/**
 * A product named in a line of text, its mark set before the name. The two
 * are held on one line, so the mark never parts from the word it belongs to,
 * and the mark is sized in em, so it follows whatever the line is set in.
 * logo: the mark's slot in media.js; until its file exists a dashed ring
 * holds its place.
 */
export default function Brand({ logo, children }) {
  const src = media[logo]?.src

  return (
    <span className="brand">
      {src ? (
        <img className="brand__logo" src={asset(src)} alt="" />
      ) : (
        <span className="brand__logo brand__logo--empty" />
      )}
      {children}
    </span>
  )
}
