import StatementLayout from '../layouts/StatementLayout.jsx'
import BoxGrid from '../components/BoxGrid.jsx'

export default function S24Colocated() {
  return (
    <StatementLayout statement="Co-located storage and inference ensures absolute data and knowledge privacy.">
      <BoxGrid items={['Inference', 'Compute', 'Storage']} />
    </StatementLayout>
  )
}
