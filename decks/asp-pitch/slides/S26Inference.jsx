import Mark from '../../../shared/Mark.jsx'
import { ACCURACY, LATENCY } from '../../../shared/benchmarks.js'
import StatementLayout from '../../../shared/StatementLayout.jsx'

export default function S26Inference() {
  return (
    <StatementLayout
      statement={
        <>
          The native inference gives you the best <Mark>accuracy</Mark> and{' '}
          <Mark>token economics</Mark> by:
        </>
      }
      list={[
        'Routing each prompt to the right model',
        'Caching outputs',
        'Building personalized profiles',
      ]}
      note={
        <>
          We give you{' '}
          <Mark keep>predictable spend</Mark> on your AI tokens.
        </>
      }
      kpis={[
        { value: '20%', label: 'savings on token costs' },
        ACCURACY,
        LATENCY,
      ]}
    />
  )
}

S26Inference.schema = 'inference'
