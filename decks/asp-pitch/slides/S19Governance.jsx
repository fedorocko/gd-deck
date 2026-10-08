import ColumnsLayout from '../layouts/ColumnsLayout.jsx'

export default function S19Governance() {
  return (
    <ColumnsLayout
      title="Centralized governance and control across all layers"
      artSlot
      columns={[
        {
          head: 'Data Governance',
          body: 'Maintain unified definitions and define granular access rights across all analytics objects.',
        },
        {
          head: 'Context Governance',
          body: 'Control what context and when should be available to individual agents.',
        },
        {
          head: 'Agent Governance',
          body: 'Control what skills and who can access individual agents.',
        },
      ]}
    />
  )
}
