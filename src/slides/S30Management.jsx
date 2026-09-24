import Mark from '../components/Mark.jsx'
import StatementLayout from '../layouts/StatementLayout.jsx'

export default function S30Management() {
  return (
    <StatementLayout
      statement={
        <>
          Management tools help you configure and launch new solutions to
          production with <Mark>confidence</Mark>.
        </>
      }
    />
  )
}

S30Management.schema = 'management'
