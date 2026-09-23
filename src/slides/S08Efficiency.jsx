import SplitLayout from '../layouts/SplitLayout.jsx'

export default function S08Efficiency() {
  return (
    <SplitLayout
      title="It drives efficiency at agent scale."
      subtitle="So every agent’s operation is optimized, with predictable cost, latency and high accuracy."
      badges={[
        'Inference Gateway',
        'Query Caching',
        'Pre-Aggregations',
        'Fine-Tuned Models',
        'Zero Data Copy',
      ]}
      mediaName="pillarEfficiency"
    />
  )
}
