import StatementLayout from '../layouts/StatementLayout.jsx'
import BoxGrid from '../components/BoxGrid.jsx'

export default function S21Box() {
  return (
    <StatementLayout
      statement="Everything you need to build your new use-cases is included in the box."
      list={['Products', 'Management Tools', 'Infrastructure']}
    >
      <BoxGrid items={['Products', 'Management Tools', 'Infrastructure']} />
    </StatementLayout>
  )
}
