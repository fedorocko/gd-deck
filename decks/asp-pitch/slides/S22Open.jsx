import Mark from '../../../shared/Mark.jsx'
import StatementLayout from '../../../shared/StatementLayout.jsx'

export default function S22Open() {
  return (
    <StatementLayout
      statement={
        <>
          But does not lock you in and is fully <Mark>open</Mark> to external
          integration.
        </>
      }
    />
  )
}

S22Open.schema = 'open'
