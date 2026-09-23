/**
 * One claim on the left, art or a diagram on the right.
 * list: numbered points that carry the claim's detail — a string, or
 * { head, body } when the point needs a name over its gloss.
 * children: whatever fills the right half — omitted, the space is held open
 * for art still to come.
 */
export default function StatementLayout({ statement, list, children }) {
  return (
    <section className="slide">
      <div className="statement">
        <div className="statement__copy">
          <p className="statement__text">{statement}</p>
          {list && (
            <ol className="statement__list">
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
        </div>
        {children || <div className="statement__slot" aria-hidden="true" />}
      </div>
    </section>
  )
}
