import Mark from '../../../shared/Mark.jsx'
import StatementLayout from '../../../shared/StatementLayout.jsx'

// The ASP pitch's slide 23, word for word.
export default function S21Infra() {
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

S21Infra.schema = 'infra'
