import StatementLayout from '../layouts/StatementLayout.jsx'

export default function S17MultiTenant() {
  return (
    <StatementLayout
      statement="Multi-tenant architecture lets you scale each application across your customer base."
      list={[
        'Save time by applying changes once and delivering to everyone',
        'Save cost by running on shared infrastructure',
        'Make customers happy with tenant-level customization and management',
      ]}
    />
  )
}
