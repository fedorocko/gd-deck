import StatementLayout from '../layouts/StatementLayout.jsx'

export default function S21Box() {
  return (
    <StatementLayout
      statement="Everything you need to build your new use-cases is included in the box."
      list={['Interfaces', 'Management Tools', 'Infrastructure']}
    />
  )
}

// The three layers, whole. Every schema slide that follows opens one of them.
S21Box.schema = 'box'
