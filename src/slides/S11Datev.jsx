import SplitLayout from '../layouts/SplitLayout.jsx'

export default function S11Datev() {
  return (
    <SplitLayout
      eyebrow="Case study — Datev"
      titleClass="h3"
      variant="case"
      title="Helping one of Germany’s largest finance institutions deliver AI analytics to its clients."
      subtitle="Datev uses GoodData’s on-premise deployment and local inference to deliver completely private and secure AI analytics — compliant with strict German regulation."
      badges={['On Premise', 'Local Inference']}
      mediaName="datev"
    />
  )
}
