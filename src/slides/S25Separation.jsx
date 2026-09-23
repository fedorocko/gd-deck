import StatementLayout from '../layouts/StatementLayout.jsx'
import BoxGrid from '../components/BoxGrid.jsx'

export default function S25Separation() {
  return (
    <StatementLayout statement="While storage and compute separation drives cost and query latency down.">
      <BoxGrid items={['Inference', 'Compute', 'Storage']} />
    </StatementLayout>
  )
}
