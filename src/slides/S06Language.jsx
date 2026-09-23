import SplitLayout from '../layouts/SplitLayout.jsx'

export default function S06Language() {
  return (
    <SplitLayout
      title="It speaks the language of agents."
      subtitle="So agents can naturally work with it and fully utilize its capabilities."
      badges={[
        'As-Code Definitions (YAML/JSON)',
        'MCP Server',
        'RAG',
        'Evals',
        'APIs',
        'CLIs',
        'SDKs',
        'Skills',
      ]}
      mediaName="pillarLanguage"
    />
  )
}
