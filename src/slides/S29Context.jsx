import StatementLayout from '../layouts/StatementLayout.jsx'
import BoxGrid from '../components/BoxGrid.jsx'

export default function S29Context() {
  return (
    <StatementLayout
      statement="All applications run on shared definitions and multi-layer context."
      list={[
        {
          head: 'Data Context',
          body: 'Deterministic data semantics — metrics, attributes, relationships.',
        },
        {
          head: 'Business Context',
          body: 'Centrally and customer-curated knowledge and memories.',
        },
        {
          head: 'Personalized Instructions',
          body: 'Tailored for each individual agent.',
        },
      ]}
    >
      <BoxGrid items={['Personalities', 'Knowledge & Memories', 'Data Semantics']} />
    </StatementLayout>
  )
}
