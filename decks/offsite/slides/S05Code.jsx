/** “Reduce” drops away, and code runs in from the left like a train, breaking Function and Form. */
export default function S05Code() {
  return <section className="slide" />
}

// The picture is the deck's overlay (components/Scene.jsx); this slide only
// names its state in scene/model.js.
S05Code.scene = 'code'

S05Code.notes = `
And if you think about software purely as a set of functions and forms, every single software product, no matter which one, will look super limited compared to code.
Because every programming language is a Turing-complete language, and any software is just its limited application.
So what does it mean?
`
