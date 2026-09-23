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
    />
  )
}
