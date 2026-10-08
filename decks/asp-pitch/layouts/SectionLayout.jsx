/** invert: set the slide on paper — for the internal pages, so they can never
 *  be mistaken for part of the client deck.
 *  aside: a figure set to the right of the text block. */
export default function SectionLayout({
  eyebrow,
  title,
  children,
  flag,
  invert,
  aside,
}) {
  return (
    <section
      className={`slide slide--section${invert ? ' slide--invert' : ''}${
        aside ? ' slide--aside' : ''
      }`}
    >
      {flag && <p className="flag">{flag}</p>}
      <div className="sectionblock">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="h1">{title}</h2>
        {children}
      </div>
      {aside && <div className="sectionaside">{aside}</div>}
    </section>
  )
}
