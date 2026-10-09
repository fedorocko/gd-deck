/** invert: set the slide on paper — for the internal pages, so they can never
 *  be mistaken for part of the client deck.
 *  aside: a figure set to the right of the text block.
 *  centered: set the block in the middle of the stage, each line centred.
 *  backdrop: a <Backdrop>, media filling the stage behind the block. */
export default function SectionLayout({
  eyebrow,
  title,
  children,
  flag,
  invert,
  aside,
  centered,
  backdrop,
}) {
  return (
    <section
      className={`slide slide--section${invert ? ' slide--invert' : ''}${
        aside ? ' slide--aside' : ''
      }${centered ? ' slide--centered' : ''}`}
    >
      {backdrop}
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
