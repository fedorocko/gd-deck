import Mark from '../../../shared/Mark.jsx'
import StatementLayout from '../../../shared/StatementLayout.jsx'

// The ASP pitch's slide 21, word for word.
export default function S19Lifecycle() {
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

S19Lifecycle.schema = 'lifecycle'
