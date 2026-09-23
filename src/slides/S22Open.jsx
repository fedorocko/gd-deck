import StatementLayout from '../layouts/StatementLayout.jsx'
import BoxGrid from '../components/BoxGrid.jsx'

export default function S22Open() {
  return (
    <StatementLayout statement="But fully open for external integration and no lock-ins.">
      <BoxGrid items={['Inference', 'Compute', 'Storage']} />
    </StatementLayout>
  )
}
