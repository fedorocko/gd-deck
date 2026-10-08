import ColumnsLayout from '../layouts/ColumnsLayout.jsx'

export default function S16Agents() {
  return (
    <ColumnsLayout
      title="From ready-made to external agents"
      columns={[
        {
          head: 'Built-in',
          items: ['AI Analyst', 'Dashboard co-pilot', 'AI Publisher'],
        },
        { head: 'Custom' },
        { head: 'External' },
      ]}
    />
  )
}
