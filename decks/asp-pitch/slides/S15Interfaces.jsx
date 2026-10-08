import ColumnsLayout from '../layouts/ColumnsLayout.jsx'

export default function S15Interfaces() {
  return (
    <ColumnsLayout
      title="Composable interfaces for every use-case"
      subtitle="All hosted in the application or fully embeddable."
      columns={[
        { head: 'Built-in', items: ['Dashboards', 'AI Publishers'] },
        { head: 'AI agents' },
        { head: 'Custom apps' },
      ]}
    />
  )
}
