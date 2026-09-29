import Mark from '../components/Mark.jsx'
import StatementLayout from '../layouts/StatementLayout.jsx'

export default function S25Separation() {
  return (
    <StatementLayout
      statement={
        <>
          While different compute engines fit any use case and{' '}
          <Mark>drive cost and latency down.</Mark>
        </>
      }
      kpis={[
        { value: '30%', label: 'savings on compute' },
        // query latency on our engines, not the model benchmark in benchmarks.js
        { value: '50%', label: 'lower latency' },
      ]}
    />
  )
}

S25Separation.schema = 'separation'
