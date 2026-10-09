import Mark from '../../../shared/Mark.jsx'
import StatementLayout from '../../../shared/StatementLayout.jsx'

// The ASP pitch's slide 17, word for word.
export default function S15BuiltIn() {
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
          They let you build{' '}
          <Mark keep>new use-cases</Mark> and become an{' '}
          <Mark keep>AI leader.</Mark>
        </>
      }
    />
  )
}

S15BuiltIn.schema = 'builtin'
