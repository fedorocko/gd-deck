import SectionLayout from '../layouts/SectionLayout.jsx'

// The same hierarchy the schema slides that follow walk through, named as they
// name it, flattened to one page so the whole shape is visible at once.
const TAXONOMY = {
  label: 'Agentic Serving Plane',
  kids: [
    {
      label: 'Interfaces',
      kids: [
        {
          label: 'Built-in',
          leaves: ['Dashboard Copilot', 'AI Analyst', 'AI Publisher'],
        },
        { label: 'Building blocks', leaves: ['SDK', 'MCP'] },
      ],
    },
    {
      label: 'Management Tools',
      kids: [
        {
          label: 'Definitions & Context',
          leaves: ['Data', 'Business', 'Agents'],
        },
        {
          label: 'Governance & Control',
          leaves: ['Catalog', 'AI Hub', 'Builder'],
        },
        {
          label: 'Lifecycle Management',
          leaves: ['Evaluations', 'Observability', 'Self-learning'],
        },
      ],
    },
    {
      label: 'Infrastructure',
      kids: [
        {
          label: 'Inference',
          leaves: ['Router', 'Models', 'Customer profiles'],
        },
        {
          label: 'Compute',
          leaves: ['Massive-parallel processing', 'In-memory', 'AI search', 'Real-time'],
        },
        { label: 'Storage', leaves: ['Structured data', 'Documents'] },
      ],
    },
  ],
}

const points = [
  'I introduce a taxonomy to explain the ASP architecture and capabilities — think of it as a hierarchy.',
  'It carries the message that we are end-to-end and cover everything.',
  'It untangles our features, so infrastructure is never mixed with tooling and apps in one big blob.',
]

function Node({ node, tier }) {
  return (
    <li className={`tax__item tax__item--t${tier}`}>
      <div className="tax__row">
        <span className={`tax__node tax__node--t${tier}`}>{node.label}</span>
        {node.leaves && (
          <span className="tax__leaves">
            {node.leaves.map((leaf) => (
              <span key={leaf} className="tax__leaf">
                {leaf}
              </span>
            ))}
          </span>
        )}
      </div>
      {node.kids && (
        <ul className="tax__kids">
          {node.kids.map((kid) => (
            <Node key={kid.label} node={kid} tier={tier + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default function S33Taxonomy() {
  return (
    <SectionLayout
      invert
      flag="Internal — not for client"
      eyebrow="How I position this"
      title="One hierarchy, not a blob of features."
      aside={
        <ul className="tax">
          <Node node={TAXONOMY} tier={0} />
        </ul>
      }
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
