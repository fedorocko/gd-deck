import StatementLayout from '../layouts/StatementLayout.jsx'

export default function S20Lifecycle() {
  return (
    <StatementLayout
      statement="Lifecycle management follows agents from inception to improvements."
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
