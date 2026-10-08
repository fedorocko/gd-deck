import Mark from '../components/Mark.jsx'
import { CLICKHOUSE, IN_MEMORY_P90 } from '../benchmarks.js'
import StatementLayout from '../layouts/StatementLayout.jsx'

export default function S25Separation() {
  return (
    <StatementLayout
      statement={
        <>
          While different compute engines fit any use case and{' '}
          <Mark>drive cost and latency down.</Mark>
        </>
      }
      kpis={[
        {
          value: 'Predictable',
          label:
            'cost: not billed per TB like BigQuery, no hidden costs like Snowflake',
        },
        { value: '5.5×', label: 'faster than Trino on the MPP engine' },
        CLICKHOUSE,
        IN_MEMORY_P90,
      ]}
    />
  )
}

S25Separation.schema = 'separation'
