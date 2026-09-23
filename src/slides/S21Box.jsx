import Mark from '../components/Mark.jsx'
import StatementLayout from '../layouts/StatementLayout.jsx'

export default function S21Box() {
  return (
    <StatementLayout
      statement={
        <>
          ASP contains everything you need to build your new AI use-cases{' '}
          <Mark>end-to-end</Mark>.
        </>
      }
    />
  )
}

// The three layers, whole. Every schema slide that follows opens one of them.
S21Box.schema = 'box'
