import Kpis from '../components/Kpis.jsx'

/**
 * One claim on the left, art or a diagram on the right.
 * note: a second, quieter line under the claim — what it gets you. It is set
 * below the points, so a claim that opens onto a list keeps hold of it.
 * kpis: [{ value, label }] — the numbers that back the note up.
 * list: numbered points that carry the claim's detail — a string, or
 * { head, body } when the point needs a name over its gloss.
 * listLead: the points are the slide's content rather than a gloss on it, so
 * they are set up at the weight of a claim instead of receding under one.
 * children: whatever fills the right half — omitted, the space is held open
 * for art still to come.
 */
export default function StatementLayout({
  statement,
  note,
  kpis,
  list,
  listLead,
  children,
}) {
  return (
    <section className="slide">
      <div className="statement">
        <div className="statement__copy">
          <p className="statement__text">{statement}</p>
          {list && (
            <ol
              className={`statement__list${
                listLead ? ' statement__list--lead' : ''
              }`}
            >
              {list.map((item) =>
                typeof item === 'string' ? (
                  <li key={item}>{item}</li>
                ) : (
                  <li key={item.head}>
                    <span className="statement__listhead">{item.head}</span>
                    {item.body}
                  </li>
                ),
              )}
            </ol>
          )}
          {note && <p className="statement__note">{note}</p>}
          {kpis && <Kpis items={kpis} />}
        </div>
        {children || <div className="statement__slot" aria-hidden="true" />}
      </div>
    </section>
  )
}
