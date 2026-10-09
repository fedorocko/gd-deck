import Mark from '../../../shared/Mark.jsx'
import StatementLayout from '../../../shared/StatementLayout.jsx'

// The ASP pitch's slide 24, word for word.
export default function S22Storage() {
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

S22Storage.schema = 'storage'
