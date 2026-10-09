import Mark from '../../../shared/Mark.jsx'
import { CLICKHOUSE, IN_MEMORY_P90 } from '../../../shared/benchmarks.js'
import StatementLayout from '../../../shared/StatementLayout.jsx'

// The ASP pitch's slide 25, word for word.
export default function S23Separation() {
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

S23Separation.schema = 'separation'
