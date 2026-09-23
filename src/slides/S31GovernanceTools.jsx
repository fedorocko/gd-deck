import StatementLayout from '../layouts/StatementLayout.jsx'
import BoxGrid from '../components/BoxGrid.jsx'

export default function S31GovernanceTools() {
  return (
    <StatementLayout
      statement="Governance tools give you centralized control across all layers."
      list={[
        'Data Governance (Catalog)',
        'Context Governance (AI Hub)',
        'Agent Governance (Agent Builder)',
      ]}
    >
      <BoxGrid
        items={['Data Governance', 'Context Governance', 'Agent Governance']}
      />
    </StatementLayout>
  )
}
