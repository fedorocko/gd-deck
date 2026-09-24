import CardsLayout from '../layouts/CardsLayout.jsx'
import Mark from '../components/Mark.jsx'

// The four promises made over the course of the architecture run, collected in
// the words they were made in: slides 15, 16, 24 and 25.
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
              We help you implement new solutions{' '}
              <Mark keep>faster</Mark> and with{' '}
              <Mark keep>less risk</Mark>.
            </>
          ),
        },
        {
          id: 'lead',
          text: (
            <>
              We help you build{' '}
              <Mark keep>new use-cases</Mark> and become an{' '}
              <Mark keep>AI leader</Mark>.
            </>
          ),
        },
        {
          id: 'compute',
          text: (
            <>
              We help you run your compute workflow for{' '}
              <Mark keep>less</Mark>.
            </>
          ),
        },
        {
          id: 'tokens',
          text: (
            <>
              We give you{' '}
              <Mark keep>predictable spend</Mark> on your AI
              tokens.
            </>
          ),
        },
      ]}
      kpis={[
        { value: '30%', label: 'savings on compute' },
        { value: '20%', label: 'savings on token costs' },
      ]}
    />
  )
}
