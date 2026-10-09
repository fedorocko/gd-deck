import Media from '../../../shared/Media.jsx'
import media from '../media.js'

/** A product screen, framed nearly to the stage's edges so it can be read. */
export default function ShotLayout({ mediaName }) {
  return (
    <section className="slide slide--shot">
      <Media name={mediaName} from={media} className="shot" />
    </section>
  )
}
