import SplitLayout from '../layouts/SplitLayout.jsx'

export default function S07Private() {
  return (
    <SplitLayout
      title="It keeps everything private."
      subtitle="So your data and IP are air-gapped and costs stay under control."
      badges={[
        'On-Premise Deployment',
        'Private Cloud',
        'Local Inferences',
      ]}
      mediaName="pillarPrivate"
    />
  )
}
