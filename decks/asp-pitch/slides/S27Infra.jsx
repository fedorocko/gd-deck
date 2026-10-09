import Mark from '../../../shared/Mark.jsx'
import StatementLayout from '../../../shared/StatementLayout.jsx'

export default function S27Infra() {
  return (
    <StatementLayout
      statement={
        <>
          ASP contains <Mark>complete</Mark> infrastructure for storing all your
          data, running inference and compute.
        </>
      }
    />
  )
}

S27Infra.schema = 'infra'
