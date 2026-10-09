import Mark from '../../../shared/Mark.jsx'
import StatementLayout from '../../../shared/StatementLayout.jsx'

export default function S29Context() {
  return (
    <StatementLayout
      statement={
        <>
          All UI apps and agents run on definitions and context{' '}
          <Mark>specific to your business.</Mark>
        </>
      }
      list={[
        {
          head: 'Data Context',
          body: 'Deterministic data semantics — metrics, attributes, relationships.',
        },
        {
          head: 'Business Context',
          body: 'Customer-curated and auto-generated knowledge and memories.',
        },
        {
          head: 'Agent Context',
          body: 'Skills and personality tailored for each individual agent.',
        },
      ]}
    />
  )
}

S29Context.schema = 'context'
