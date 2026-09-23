import SplitLayout from '../layouts/SplitLayout.jsx'

export default function S12Mastercard() {
  return (
    <SplitLayout
      eyebrow="Case study — Mastercard"
      titleClass="h3"
      variant="case"
      title="Unlocking new revenue streams by up-selling personalized AI agents."
      subtitle="Mastercard uses GoodData’s AI Hub and agent builder to create agents with tiered capabilities and personalize them across its client base — under centralized governance."
      badges={['AI Hub', 'Agent Builder']}
      mediaName="mastercard"
    />
  )
}
