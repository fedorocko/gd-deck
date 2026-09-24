/**
 * The numbers that back a claim up. items: [{ value, label }]
 *
 * A figure is the one thing a room remembers, so it is set large and in the
 * accent with its label kept quiet underneath. `stack` runs them down a
 * column instead of across a row.
 */
export default function Kpis({ items, stack }) {
  return (
    <dl className={`kpis${stack ? ' kpis--stack' : ''}`}>
      {items.map((kpi) => (
        <div className="kpi" key={kpi.label}>
          <dt className="kpi__value">{kpi.value}</dt>
          <dd className="kpi__label">{kpi.label}</dd>
        </div>
      ))}
    </dl>
  )
}
