import Mark from '../components/Mark.jsx'
import StatementLayout from '../layouts/StatementLayout.jsx'

export default function S28BuiltIn() {
  return (
    <StatementLayout
      statement={
        <>
          Interfaces contains <Mark keep>ready-made</Mark> UI apps and agents, plus
          composable <Mark>building blocks</Mark> for creating your own
          experiences.
        </>
      }
    />
  )
}

S28BuiltIn.schema = 'builtin'
