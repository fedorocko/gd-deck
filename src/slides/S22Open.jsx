import Mark from '../components/Mark.jsx'
import StatementLayout from '../layouts/StatementLayout.jsx'

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
