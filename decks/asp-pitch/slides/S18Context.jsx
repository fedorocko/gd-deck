import ColumnsLayout from '../layouts/ColumnsLayout.jsx'

export default function S18Context() {
  return (
    <ColumnsLayout
      title="Multi-layered context for accuracy"
      columns={[
        {
          head: 'Data context',
          body: 'Deterministic data semantics — metrics, attributes, relationships.',
        },
        {
          head: 'Business context',
          body: 'Centrally and customer-curated knowledge and memories.',
        },
        {
          head: 'Personalized instructions',
          body: 'Tailored for each individual agent.',
        },
      ]}
    />
  )
}
