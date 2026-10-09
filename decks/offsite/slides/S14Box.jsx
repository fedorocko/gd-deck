import Mark from '../../../shared/Mark.jsx'
import StatementLayout from '../../../shared/StatementLayout.jsx'

// The ASP pitch's slide 16, word for word.
export default function S14Box() {
  return (
    <StatementLayout
      statement={
        <>
          ASP contains everything you need to build your new data &amp; AI
          solutions{' '}
          <Mark>end-to-end.</Mark>
        </>
      }
      note={
        <>
          It lets you implement new solutions{' '}
          <Mark keep>faster</Mark> and with{' '}
          <Mark keep>less risk.</Mark>
        </>
      }
    />
  )
}

// The three layers, whole. Every schema slide that follows opens one of them.
S14Box.schema = 'box'
