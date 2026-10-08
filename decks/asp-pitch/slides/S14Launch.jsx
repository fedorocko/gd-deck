import Taxonomy from '../components/Taxonomy.jsx'
import SectionLayout from '../layouts/SectionLayout.jsx'

export default function S14Launch() {
  return (
    <SectionLayout
      eyebrow="Architecture"
      title="Agentic Serving Plane capabilities"
      aside={<Taxonomy />}
    >
      <p className="kicker">
        10 years of architecture innovation and layering that helped us
        successfully launch a secure and tailored solution for each customer.
      </p>
    </SectionLayout>
  )
}
