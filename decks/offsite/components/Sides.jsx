import sides from '../sides.js'

/**
 * The two boxes of slides 9 and 10.
 *
 * Like the scene, it is mounted once, outside the keyed slide, so it survives
 * the change from 9 to 10: the boxes and the features in them stay, and what
 * the features are worth comes in around them. Everything is in the DOM the
 * whole time and `show` says how much of it is in view; plain CSS transitions
 * do the rest, so stepping back plays the same change the other way.
 *
 * show: 'features' — what Clerk does, a quiet pill each, sorted into groups
 *       'values'   — the same, with the principle set over each box and a
 *                    lime pill opened in over each group: what it is worth
 */
export default function Sides({ show }) {
  const valued = show === 'values'

  return (
    <section className={`slide sides sides--${show}`}>
      <ul className="tiles">
        {sides.map(({ id, title, groups }) => (
          <li className="tile side" key={id}>
            <h2 className="tile__text side__title" aria-hidden={!valued}>
              {title}
            </h2>

            <ul className="side__groups">
              {groups.map(({ features, value }, i) => (
                <li className="side__group" style={{ '--i': i }} key={value}>
                  <p className="side__value" aria-hidden={!valued}>
                    <span className="pill pill--lit">{value}</span>
                  </p>
                  <ul className="pills">
                    {features.map((feature) => (
                      <li className="pill" key={feature}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
