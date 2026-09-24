import Media from '../components/Media.jsx'
import Badges from '../components/Badges.jsx'
import Kpis from '../components/Kpis.jsx'

/** Large text on the left, media on the right.
 *  kpis: [{ value, label }] — the numbers that back the claim up. */
export default function SplitLayout({
  eyebrow,
  title,
  subtitle,
  kicker,
  kpis,
  badges,
  mediaName,
  titleClass = 'h1',
  variant,
}) {
  // A variant adds its modifier to every piece of the split, so a slide can
  // retune the text column and the media frame together.
  const cx = (base) => (variant ? `${base} ${base}--${variant}` : base)

  return (
    <section className="slide">
      <div className={cx('split')}>
        <div className={cx('split__text')}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className={titleClass}>{title}</h2>
          {subtitle && <p className="body">{subtitle}</p>}
          {kicker && <p className="kicker">{kicker}</p>}
          {kpis && <Kpis items={kpis} />}
          {badges && <Badges items={badges} />}
        </div>
        <Media name={mediaName} className={cx('split__media')} />
      </div>
    </section>
  )
}
