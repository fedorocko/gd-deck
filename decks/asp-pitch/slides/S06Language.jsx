import Mark from '../../../shared/Mark.jsx'
import SplitLayout from '../layouts/SplitLayout.jsx'

export default function S06Language() {
  return (
    <SplitLayout
      title={
        <>
          It speaks the language of agents: <Mark>code.</Mark>
        </>
      }
      subtitle="So agents can naturally work with it and fully utilize its capabilities."
      quietBadges
      badges={['YAML', 'MCP', 'A2A', 'APIs', 'CLIs', 'SDKs']}
      mediaName="pillarLanguage"
    />
  )
}
