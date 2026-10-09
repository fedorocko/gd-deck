import Backdrop from '../../../shared/Backdrop.jsx'
import media from '../media.js'

/** Full-bleed media with a centred headline and a quieter second line. */
export default function HeroMediaLayout({ mediaName, headline, sub }) {
  return (
    <section className="slide slide--hero">
      <Backdrop name={mediaName} from={media} />
      <div className="hero__text">
        <h2 className="hero__headline">{headline}</h2>
        {sub && <p className="hero__sub">{sub}</p>}
      </div>
    </section>
  )
}
