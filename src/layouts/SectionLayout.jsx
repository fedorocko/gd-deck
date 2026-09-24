/** invert: set the slide on paper — for the internal pages, so they can never
 *  be mistaken for part of the client deck. */
export default function SectionLayout({
  eyebrow,
  title,
  children,
  flag,
  invert,
}) {
  return (
    <section
      className={`slide slide--section${invert ? ' slide--invert' : ''}`}
    >
      {flag && <p className="flag">{flag}</p>}
      <div className="sectionblock">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="h1">{title}</h2>
        {children}
      </div>
    </section>
  )
}
