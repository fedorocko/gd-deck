import Mark from '../components/Mark.jsx'
import StatementLayout from '../layouts/StatementLayout.jsx'

export default function S25Separation() {
  return (
    <StatementLayout
      statement="While storage and compute separation drives cost and query latency down."
      note={
        <>
          We help you run your compute workflow for{' '}
          <Mark keep>less</Mark>.
        </>
      }
      kpis={[{ value: '30%', label: 'savings on compute' }]}
    />
  )
}

S25Separation.schema = 'separation'
