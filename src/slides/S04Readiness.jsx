import ColumnsLayout from '../layouts/ColumnsLayout.jsx'

export default function S04Readiness() {
  return (
    <ColumnsLayout
      title="Lasting AI transformation will depend on 4 key pillars (4S):"
      variant="display"
      titleFit
      iconBelow
      columns={[
        {
          icon: '/media/icon-start.png',
          head: 'Start',
          items: [
            'Can you let agents into your systems, or will they hold them back?',
            'Does most of the knowledge live in human heads?',
          ],
        },
        {
          icon: '/media/icon-secure.png',
          head: 'Secure',
          items: [
            'Once you let agents in, how do you keep your data and IP safe and private?',
            'How do you make sure they can access only what you authorize?',
          ],
        },
        {
          icon: '/media/icon-spend.png',
          head: 'Spend',
          items: [
            'Once it is safe and agents start working, how will their actions impact your budgets?',
            'How will your systems perform under 10× load?',
          ],
        },
        {
          icon: '/media/icon-success.png',
          head: 'Success',
          items: [
            'Once they work economically at scale, what measurable results do they deliver?',
            'More activity needs to translate to tangible outcomes.',
          ],
        },
      ]}
    />
  )
}
