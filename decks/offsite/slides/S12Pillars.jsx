import Mark from '../../../shared/Mark.jsx'
import TilesLayout from '../layouts/TilesLayout.jsx'

// The ASP pitch's four pillars, its slides 6–9, one headline to a column, in
// the order they are spoken to here. Under each, what we have for it: `soon`
// is what is still coming. Behind each, dimmed, that pillar's video from the
// pitch (`clip`), played in turn from the left as the slide comes up.
export default function S12Pillars() {
  return (
    <TilesLayout
      columns={4}
      tiles={[
        {
          id: 'language',
          clip: 'pillarLanguage',
          text: (
            <>
              It speaks the language of agents: <Mark>code.</Mark>
            </>
          ),
          pills: [
            'Semantics as code',
            'Context as code',
            'APIs',
            'MCPs',
            'SDKs',
          ],
        },
        {
          id: 'creativity',
          clip: 'pillarCreativity',
          text: (
            <>
              It unlocks creativity and <Mark>sets no limits.</Mark>
            </>
          ),
          pills: [
            'Shell apps',
            'Flex marts',
            'Flex Connect',
            'Flow API',
            'Skills',
          ],
          soon: ['Sandboxes'],
        },
        {
          id: 'private',
          clip: 'pillarPrivate',
          text: (
            <>
              It keeps everything <Mark>private.</Mark>
            </>
          ),
          pills: ['On-premise', 'Local inference', 'RBAC'],
        },
        {
          id: 'efficiency',
          clip: 'pillarEfficiency',
          text: (
            <>
              It drives efficiency at agent <Mark>scale.</Mark>
            </>
          ),
          pills: ['Query caching', 'Model routing', 'Evaluations'],
        },
      ]}
    />
  )
}

S12Pillars.notes = `
With GoodData AI, we must speak the language of agents: code.
All the context and semantics available as code. All the functions available as APIs and MCPs. All the components available as SDKs.
We’ll give agents absolute flexibility, so they can build whatever they want without adjusting to us, with things like shell apps, Flow API, Flex smart, and hopefully sandboxes.
And we will also take responsibility for their data privacy and security with local inference and on-premise deployments.
And we will make sure that everything works efficiently at agent scale by optimizing queries, compute, and inference.
`
