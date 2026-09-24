import Mark from '../components/Mark.jsx'
import StatementLayout from '../layouts/StatementLayout.jsx'

export default function S21Box() {
  return (
    <StatementLayout
      statement={
        <>
          ASP contains everything you need to build your new data &amp; AI
          solutions{' '}
          <Mark>end-to-end</Mark>.
        </>
      }
      note={
        <>
          We help you implement new solutions{' '}
          <Mark keep>faster</Mark> and with{' '}
          <Mark keep>less risk</Mark>.
        </>
      }
    />
  )
}

// The three layers, whole. Every schema slide that follows opens one of them.
S21Box.schema = 'box'
