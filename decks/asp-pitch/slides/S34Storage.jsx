import Mark from '../components/Mark.jsx'
import StatementLayout from '../layouts/StatementLayout.jsx'

export default function S34Storage() {
  return (
    <StatementLayout
      statement={
        <>
          {/* non-breaking space and hyphens: "Apache Iceberg", "high-performance"
              and "open-source" each read as one word, so none should split */}
          Storage is based on Apache Iceberg — a high‑performance
          open‑source table format, so you <Mark keep>avoid lock-in</Mark> and{' '}
          <Mark>never copy data again.</Mark>
        </>
      }
    />
  )
}

S34Storage.schema = 'storage'
