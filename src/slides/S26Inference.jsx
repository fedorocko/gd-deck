import Mark from '../components/Mark.jsx'
import StatementLayout from '../layouts/StatementLayout.jsx'

export default function S26Inference() {
  return (
    <StatementLayout
      statement="The native inference gives you the best accuracy and token economics by:"
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
      kpis={[{ value: '20%', label: 'savings on token costs' }]}
    />
  )
}

S26Inference.schema = 'inference'
