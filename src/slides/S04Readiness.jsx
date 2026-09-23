import ColumnsLayout from '../layouts/ColumnsLayout.jsx'

export default function S04Readiness() {
  return (
    <ColumnsLayout
      title="Lasting AI transformation will depend on 4 key pillars."
      variant="display"
      titleFit
      iconBelow
      columns={[
        {
          icon: '/media/icon-start.png',
          head: 'Start',
          body: 'Can you let them in, or will your systems hold them back? Does most of the knowledge live in human heads?',
        },
        {
          icon: '/media/icon-secure.png',
          head: 'Secure',
          body: 'Once you let them in, how do you keep your data and IP safe and private?',
        },
        {
          icon: '/media/icon-spend.png',
          head: 'Spend',
          body: 'Once it is safe and they start working, how will their actions impact your budgets?',
        },
        {
          icon: '/media/icon-success.png',
          head: 'Success',
          body: 'Once they work economically at scale, what results do they deliver?',
        },
      ]}
    />
  )
}
