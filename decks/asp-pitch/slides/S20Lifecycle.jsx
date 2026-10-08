import Mark from '../components/Mark.jsx'
import StatementLayout from '../layouts/StatementLayout.jsx'

export default function S20Lifecycle() {
  return (
    <StatementLayout
      statement={
        <>
          Lifecycle management ensures <Mark>quality</Mark> and{' '}
          <Mark>accuracy</Mark> from inception through production.
        </>
      }
      list={[
        { head: 'Evaluations', body: 'QA and fine-tuning.' },
        {
          head: 'Observability',
          body: 'Every agent operation, traceable.',
        },
        {
          head: 'Self-learning',
          body: 'Automatic memories and continuous improvement.',
        },
      ]}
    />
  )
}

S20Lifecycle.schema = 'lifecycle'
