/** The person and four screens come up from the bottom, then the AI rectangle
 *  falls in from the top between them with “Abstract” on it — one click,
 *  played in a run. */
export default function S03Abstract() {
  return <section className="slide" />
}

// The picture is the deck's overlay (components/Scene.jsx); this slide only
// names its states in scene/model.js. Several play in a run, each holding for
// its HOLD before the next.
S03Abstract.scene = ['empty', 'people', 'abstract']

S03Abstract.notes = `
AI creates this abstraction between humans and software
Which means that we are stopping using software directly.
Take Excel for example.
Instead of writing formulas in Excel and formatting the cells, you tell AI what kind of spreadsheet you want to build.
Instead of viewing someone else’s Excel that they sent to you, you ask an agent to represent it in a way that is most suitable for you.
That also means that you don’t think about the software in terms of UX, difficulty or simplicity.
In the past software innovation was build on this premise.
From Excel to Sheets, or from Sheets to Causal.
Not anymore.
`
