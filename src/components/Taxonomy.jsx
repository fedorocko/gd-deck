/**
 * The Agentic Serving Plane as one indented tree: the same hierarchy the
 * schema slides walk through, named as they name it, flattened to one page so
 * the whole shape is visible at once.
 */
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
        {
          label: 'Building blocks',
          leaves: ['SDK', 'MCP/A2A', 'ML functions', 'Data flows', 'AI Search'],
        },
      ],
    },
    {
      label: 'Management Tools',
      kids: [
        { label: 'Context', leaves: ['Data', 'Business', 'Agents'] },
        { label: 'Governance', leaves: ['Catalog', 'AI Hub', 'Builder'] },
        {
          label: 'Lifecycle',
          leaves: ['Evaluations', 'Observability', 'Self-Learning'],
        },
      ],
    },
    {
      label: 'Infrastructure',
      kids: [
        {
          label: 'Inference',
          leaves: ['Router', 'Local Models', 'Customer Profiles'],
        },
        {
          label: 'Compute',
          leaves: [
            'Connectors',
            'Flex Connect',
            'MPP Engine',
            'In-memory Datamart',
            'Real-time',
          ],
        },
        { label: 'Storage', leaves: ['Structured data', 'Documents'] },
      ],
    },
  ],
}

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

export default function Taxonomy() {
  return (
    <ul className="tax">
      <Node node={TAXONOMY} tier={0} />
    </ul>
  )
}
