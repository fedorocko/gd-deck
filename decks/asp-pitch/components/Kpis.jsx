/**
 * The numbers that back a claim up. items: [{ value, label, footnote }]
 *
 * A figure is the one thing a room remembers, so it is set large and in the
 * accent with its label kept quiet underneath. `stack` runs them down a
 * column instead of across a row; `cols` wraps them onto a grid that many
 * across, for when a row of them would run out of width.
 *
 * A figure with a `footnote` is starred, and the note is set once under the
 * figures however many of them share it.
 */
export default function Kpis({ items, stack, cols }) {
  const notes = [...new Set(items.map((kpi) => kpi.footnote).filter(Boolean))]
  // one note is a plain star; several are told apart by repeating it
  const star = (note) => '*'.repeat(notes.indexOf(note) + 1)

  return (
    <div className="kpiset">
      <dl
        className={`kpis${stack ? ' kpis--stack' : ''}${cols ? ' kpis--grid' : ''}`}
        style={cols ? { '--kpi-cols': cols } : undefined}
      >
        {items.map((kpi) => (
          <div className="kpi" key={kpi.label}>
            <dt className="kpi__value">
              {kpi.value}
              {kpi.footnote && <sup className="kpi__star">{star(kpi.footnote)}</sup>}
            </dt>
            <dd className="kpi__label">{kpi.label}</dd>
          </div>
        ))}
      </dl>
      {notes.map((note) => (
        <p className="kpis__note" key={note}>
          {star(note)} {note}
        </p>
      ))}
    </div>
  )
}
