import StatementLayout from '../layouts/StatementLayout.jsx'
import BoxGrid from '../components/BoxGrid.jsx'

export default function S27Infra() {
  return (
    <StatementLayout
      statement="Complete infrastructure for data & execution."
      list={['Inference', 'Compute', 'Storage']}
    >
      <BoxGrid items={['Inference', 'Compute', 'Storage']} />
    </StatementLayout>
  )
}
