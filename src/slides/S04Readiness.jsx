import Mark from '../components/Mark.jsx'
import ColumnsLayout from '../layouts/ColumnsLayout.jsx'

export default function S04Readiness() {
  return (
    <ColumnsLayout
      title="Lasting AI transformation will depend on 4 key pillars (4S):"
      titleFit
      iconSmall
      itemsSmall
      columns={[
        {
          icon: '/media/icon-start.png',
          head: (
            <>
              You have systems that agents can <Mark>start</Mark> working with.
            </>
          ),
          items: [
            'Can you let agents into your systems, or will they hold them back?',
            'Does most of the knowledge live in human heads?',
          ],
        },
        {
          icon: '/media/icon-secure.png',
          head: (
            <>
              You can keep your data and IP <Mark>secure</Mark> while agents
              access it.
            </>
          ),
          items: [
            'Once you let agents in, how do you keep your data and IP safe and private?',
            'How do you make sure they can access only what you authorize?',
          ],
        },
        {
          icon: '/media/icon-spend.png',
          head: (
            <>
              You can grow your AI usage while keeping <Mark>spend</Mark> under
              control.
            </>
          ),
          items: [
            'Once it is safe and agents start working, how will their actions impact your budgets?',
            'How will your systems perform under 10× load?',
          ],
        },
        {
          icon: '/media/icon-success.png',
          head: (
            <>
              Your AI deployments will <Mark>succeed</Mark> by bringing tangible
              value to the company.
            </>
          ),
          items: [
            'Once they work economically at scale, what measurable results do they deliver?',
            'More activity needs to translate to tangible outcomes.',
          ],
        },
      ]}
    />
  )
}
