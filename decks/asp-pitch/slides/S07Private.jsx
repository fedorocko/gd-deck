import Mark from '../../../shared/Mark.jsx'
import SplitLayout from '../layouts/SplitLayout.jsx'

export default function S07Private() {
  return (
    <SplitLayout
      title={
        <>
          It keeps everything <Mark>private.</Mark>
        </>
      }
      subtitle="So your data and IP are air-gapped and costs stay under control."
      quietBadges
      badges={[
        'On-Premise Deployment',
        'Private Cloud',
        'Local Inferences',
      ]}
      mediaName="pillarPrivate"
    />
  )
}
