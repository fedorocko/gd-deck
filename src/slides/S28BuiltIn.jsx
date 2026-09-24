import Mark from '../components/Mark.jsx'
import StatementLayout from '../layouts/StatementLayout.jsx'

export default function S28BuiltIn() {
  return (
    <StatementLayout
      statement="Interfaces contains:"
      listLead
      list={[
        'Ready-made UI apps and agents',
        'Composable building blocks for creating your own experiences',
      ]}
      note={
        <>
          We help you build{' '}
          <Mark keep>new use-cases</Mark> and become an{' '}
          <Mark keep>AI leader</Mark>.
        </>
      }
    />
  )
}

S28BuiltIn.schema = 'builtin'
