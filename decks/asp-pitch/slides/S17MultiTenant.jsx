import Mark from '../../../shared/Mark.jsx'
import StatementLayout from '../../../shared/StatementLayout.jsx'

export default function S17MultiTenant() {
  return (
    <StatementLayout
      statement={
        <>
          Multi-tenant architecture lets you <Mark>scale</Mark> apps and agents
          across your customer base.
        </>
      }
      list={[
        'Save time by applying changes once and deploying to everyone',
        'Save cost by running apps and agents on shared infrastructure',
        'Fulfill customers’ specific needs with tenant-level customization',
      ]}
    />
  )
}

// The one authored stack, fanned out to many tenants over shared infrastructure.
S17MultiTenant.schema = 'tenants'
