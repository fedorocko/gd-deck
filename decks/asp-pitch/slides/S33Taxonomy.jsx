import Taxonomy from '../components/Taxonomy.jsx'
import SectionLayout from '../layouts/SectionLayout.jsx'

const points = [
  'I introduce a taxonomy to explain the ASP architecture and capabilities — think of it as a hierarchy.',
  'It carries the message that we are end-to-end and cover everything.',
  'It untangles our features, so infrastructure is never mixed with tooling and apps in one big blob.',
]

export default function S33Taxonomy() {
  return (
    <SectionLayout
      invert
      flag="Internal — not for client"
      eyebrow="How I position this"
      title="One hierarchy, not a blob of features."
      aside={<Taxonomy />}
    >
      <ul className="arc">
        {points.map((text) => (
          <li key={text}>
            <span className="arc__text">{text}</span>
          </li>
        ))}
      </ul>
    </SectionLayout>
  )
}

// Skipped in "Enter Full screen without internal notes" mode.
S33Taxonomy.internal = true
