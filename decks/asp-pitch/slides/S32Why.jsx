import CardsLayout from '../../../shared/CardsLayout.jsx'
import {
  ACCURACY,
  CLICKHOUSE,
  IN_MEMORY_P90,
  LATENCY,
} from '../../../shared/benchmarks.js'
import Mark from '../../../shared/Mark.jsx'

// The four promises made over the course of the architecture run, collected in
// the words they were made in: slides 16, 17, 25 and 26.
export default function S32Why() {
  return (
    <CardsLayout
      title="Why the Agentic Serving Plane"
      cols={2}
      cards={[
        {
          id: 'build',
          text: (
            <>
              It lets you implement new solutions{' '}
              <Mark keep>faster</Mark> and with{' '}
              <Mark keep>less risk.</Mark>
            </>
          ),
        },
        {
          id: 'lead',
          text: (
            <>
              It lets you build{' '}
              <Mark keep>new use-cases</Mark> and become an{' '}
              <Mark keep>AI leader.</Mark>
            </>
          ),
        },
        {
          id: 'compute',
          text: (
            <>
              It lets you run your compute workflow for{' '}
              <Mark keep>less.</Mark>
            </>
          ),
        },
        {
          id: 'tokens',
          text: (
            <>
              It gives you{' '}
              <Mark keep>predictable spend</Mark> on your AI
              tokens.
            </>
          ),
        },
      ]}
      kpis={[
        CLICKHOUSE,
        IN_MEMORY_P90,
        { value: '20%', label: 'savings on token costs' },
        ACCURACY,
        LATENCY,
      ]}
    />
  )
}
