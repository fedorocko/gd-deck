import Media from './Media.jsx'

/**
 * Media filling the stage behind a slide's text, under a scrim that keeps the
 * text readable. Goes first in the slide, before what stands on it.
 * name, from: as for Media — the asset and the deck's own media list.
 */
export default function Backdrop({ name, from }) {
  return (
    <>
      <Media name={name} from={from} className="backdrop" />
      <div className="backdrop__scrim" />
    </>
  )
}
