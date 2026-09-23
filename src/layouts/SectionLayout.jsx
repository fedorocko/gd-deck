export default function SectionLayout({ eyebrow, title, children, flag }) {
  return (
    <section className="slide slide--section">
      {flag && <p className="flag">{flag}</p>}
      <div className="sectionblock">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="h1">{title}</h2>
        {children}
      </div>
    </section>
  )
}
