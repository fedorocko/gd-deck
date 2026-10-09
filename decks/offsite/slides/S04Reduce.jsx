/** The person, the screens and the abstraction drop out the bottom, then
 *  “Reduce” drops in from the top with Form and Function — one click, played
 *  in a run. */
export default function S04Reduce() {
  return <section className="slide" />
}

// The picture is the deck's overlay (components/Scene.jsx); this slide only
// names its states in scene/model.js. Several play in a run, each holding for
// its HOLD before the next.
S04Reduce.scene = ['clear', 'reduce']

S04Reduce.notes = `
AI reduces every software product to two substances:
Functions and forms.
What can I do with the software?
How can I consume the outcomes?
`
