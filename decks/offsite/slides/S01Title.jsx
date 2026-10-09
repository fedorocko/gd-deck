import TitleLayout from '../../../shared/TitleLayout.jsx'

// The ASP pitch's title slide, its slide 2, word for word.
export default function S01Title() {
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
