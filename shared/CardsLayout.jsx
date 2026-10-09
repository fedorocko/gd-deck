import Kpis from './Kpis.jsx'

/**
 * A slide that stands on a handful of claims, each boxed.
 *
 * cards: [{ id, text }] — the claim in the card's own words.
 * cols: how many boxes across; the rest wrap onto the next row.
 * kpis: figures set beside the boxes rather than inside them, so they read as
 * the slide's evidence and not as part of any one claim. More than four would
 * outrun the slide in one stack, so they go two to a row.
 */
export default function CardsLayout({
  title,
  subtitle,
  cards,
  cols = 4,
  kpis,
}) {
  return (
    <section className="slide">
      <header className="slidehead">
        <h2 className="h2">{title}</h2>
        {subtitle && <p className="kicker">{subtitle}</p>}
      </header>
      <div className={kpis ? 'cardsrow' : undefined}>
        <ul className={`cards cards--${cols}`}>
          {cards.map((card) => (
            <li className="card" key={card.id}>
              <p className="card__text">{card.text}</p>
            </li>
          ))}
        </ul>
        {kpis && (
          <Kpis
            items={kpis}
            stack={kpis.length <= 4}
            cols={kpis.length > 4 ? 2 : undefined}
          />
        )}
      </div>
    </section>
  )
}
