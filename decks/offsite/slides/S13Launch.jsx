import Taxonomy from '../../../shared/Taxonomy.jsx'
import SectionLayout from '../../../shared/SectionLayout.jsx'

// The ASP pitch's slide 14, word for word.
export default function S13Launch() {
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

// The hand-over from the pillars on slide 12.
S13Launch.notes = `
So this is the future, and we call it the agentic serving plane.
And let me show you what is inside and how we pitch it to our customers, and then I’ll hand over to Tomáš.
`
