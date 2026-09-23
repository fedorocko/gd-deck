import StatementLayout from '../layouts/StatementLayout.jsx'
import BoxGrid from '../components/BoxGrid.jsx'

export default function S30Management() {
  return (
    <StatementLayout
      statement="ASP management tools help you launch new applications with confidence. They include tools for:"
      list={[
        'Context Management',
        'Governance & Control',
        'Lifecycle Management',
      ]}
    >
      <BoxGrid
        items={['Lifecycle', 'Governance & Control', 'Context & Definitions']}
      />
    </StatementLayout>
  )
}
