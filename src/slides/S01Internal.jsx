import SectionLayout from '../layouts/SectionLayout.jsx'

// Slide numbers refer to the client-facing deck, i.e. this internal slide
// excluded: the GoodData.AI title slide is #1.
const arc = [
  { text: 'Set the future vision.', ref: 'Slide 2' },
  {
    lead: 'BUT!',
    text: 'Call out the risks of change and unpreparedness.',
    ref: 'Slide 3',
    note: 'Start, Secure, Spend, Success',
  },
  {
    text: 'Say what we do to help them prepare and endure the change.',
    ref: 'Slides 4–8',
    note: 'Agentic Serving Plane + 4 pillars',
  },
  {
    text: 'Call out proof points with case studies.',
    ref: 'Slides 9–12',
    note: 'Datev, Mastercard, Boozt',
  },
  {
    text: 'Explain what exactly makes us able to do it.',
    ref: 'Slides 13–19',
  },
]

export default function S01Internal() {
  return (
    <SectionLayout
      flag="Internal — not for client"
      eyebrow="How I position this"
      title="They don’t yet know why they need it."
    >
      <ul className="arc">
        {arc.map((step) => (
          <li key={step.text}>
            <span className="arc__text">
              {step.lead && <strong>{step.lead}</strong>} {step.text}
            </span>
            <span className="arc__ref">{step.ref}</span>
            {step.note && <span className="arc__note">{step.note}</span>}
          </li>
        ))}
      </ul>
    </SectionLayout>
  )
}
