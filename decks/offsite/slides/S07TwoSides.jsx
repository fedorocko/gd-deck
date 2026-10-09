import TilesLayout from '../layouts/TilesLayout.jsx'

// The customer's side on the left, the vendor's on the right: slides 9 and
// 10 keep to the same sides.
export default function S07TwoSides() {
  return (
    <TilesLayout
      tiles={[
        {
          id: 'customer',
          word: 'Reason',
          text: 'why customers won’t do it',
        },
        {
          id: 'vendor',
          word: 'Condition',
          text: 'that software must meet',
        },
      ]}
    />
  )
}

S07TwoSides.notes = `
I think there is one strong reason why customers want to do this.
But there is also one condition that the software will have to meet.
So let’s take a look. What is it?
Let me explain with one or two examples of different companies, traditional software companies, pre-AI, that are actually thriving in the age of AI. One is Clerk, and one is Causal.
`
