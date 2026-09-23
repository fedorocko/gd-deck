/**
 * Full-bleed title statement.
 * art: image dropped beside the copy so a text-only slide has something to hold.
 * variant 'lead': the subtitle carries the claim, so it is set in paper, not muted.
 */
export default function TitleLayout({
  eyebrow,
  title,
  subtitle,
  accent,
  art,
  variant,
}) {
  return (
    <section className={`slide slide--title ${art ? 'slide--title--art' : ''}`.trim()}>
      <div className="titleblock">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className={accent ? 'display accent' : 'display'}>{title}</h1>
        {subtitle && (
          <p
            className={`titleblock__sub ${variant ? `titleblock__sub--${variant}` : ''}`.trim()}
          >
            {subtitle}
          </p>
        )}
      </div>
      {art && <img className="titleart" src={art} alt="" />}
    </section>
  )
}
