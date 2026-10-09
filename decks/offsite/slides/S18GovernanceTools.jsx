import Mark from '../../../shared/Mark.jsx'
import StatementLayout from '../../../shared/StatementLayout.jsx'

// The ASP pitch's slide 20, word for word.
export default function S18GovernanceTools() {
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

S18GovernanceTools.schema = 'governance'
