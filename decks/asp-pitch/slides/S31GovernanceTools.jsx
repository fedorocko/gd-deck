import Mark from '../components/Mark.jsx'
import StatementLayout from '../layouts/StatementLayout.jsx'

export default function S31GovernanceTools() {
  return (
    <StatementLayout
      statement={
        <>
          Governance tools give you <Mark>centralized control</Mark> across
          data, context and agents.
        </>
      }
    />
  )
}

S31GovernanceTools.schema = 'governance'
