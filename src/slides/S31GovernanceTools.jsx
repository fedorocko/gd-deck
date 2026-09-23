import StatementLayout from '../layouts/StatementLayout.jsx'

export default function S31GovernanceTools() {
  return (
    <StatementLayout
      statement="Governance tools give you centralized control across all layers."
      list={[
        'Data Governance (Catalog)',
        'Context Governance (AI Hub)',
        'Agent Governance (Agent Builder)',
      ]}
    />
  )
}

S31GovernanceTools.schema = 'governance'
