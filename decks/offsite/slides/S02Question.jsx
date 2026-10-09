import Backdrop from '../../../shared/Backdrop.jsx'
import SectionLayout from '../../../shared/SectionLayout.jsx'
import media from '../media.js'

export default function S02Question() {
  return (
    <SectionLayout
      centered
      backdrop={<Backdrop name="hero" from={media} />}
      title="How does AI change traditional software?"
    />
  )
}

S02Question.notes = `
I spent the summer exploring how AI changes the software industry and what’s it’s future.
And today I want to tell you about what I learned:
How the future looks like.
How it impacts what we do in GoodData.
How we pitch the future and our fit there to our customers and prospects.
And then Tomáš will give you a demo of how we demo all of this to our customers.
This is how it goes.
`
