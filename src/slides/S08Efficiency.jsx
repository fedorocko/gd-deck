import Mark from '../components/Mark.jsx'
import { ACCURACY, LATENCY } from '../benchmarks.js'
import SplitLayout from '../layouts/SplitLayout.jsx'

export default function S08Efficiency() {
  return (
    <SplitLayout
      title={
        <>
          It drives efficiency at agent <Mark>scale.</Mark>
        </>
      }
      subtitle="So every agent’s operation is optimized, with predictable cost, latency and high accuracy."
      kpis={[
        { value: '30%', label: 'savings on compute' },
        { value: '20%', label: 'savings on token costs' },
        ACCURACY,
        LATENCY,
      ]}
      quietBadges
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
