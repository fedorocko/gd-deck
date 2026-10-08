import Mark from '../components/Mark.jsx'
import SplitLayout from '../layouts/SplitLayout.jsx'

export default function S09Creativity() {
  return (
    <SplitLayout
      title={
        <>
          It unlocks creativity and <Mark>sets no limits.</Mark>
        </>
      }
      subtitle="So it adjusts to whatever use case you imagine, not the other way around."
      quietBadges
      badges={[
        'Open Architecture',
        'Model Agnostic',
        'Composable',
        'Embeddable',
        'Forward Deployed Engineers',
      ]}
      mediaName="pillarCreativity"
    />
  )
}
