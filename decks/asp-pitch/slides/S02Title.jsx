import TitleLayout from '../layouts/TitleLayout.jsx'

export default function S02Title() {
  return (
    <TitleLayout
      title="GoodData.AI"
      variant="lead"
      subtitle={
        <>
          <span className="accent sub-lede">Agentic serving plane</span>
          <br />
          Enterprise data environment for the agentic era.
        </>
      }
    />
  )
}
