import asset from '../../../shared/asset.js'

/**
 * columns: [{ icon, head, body, items }]
 * Renders 3 or 4 evenly weighted columns under a slide heading.
 * iconBelow: drop the icons under the copy, inset from the column edge.
 * variant 'display': the heads carry the column, set large with their first
 * letter enlarged.
 * titleFit: hold the heading to a single line, sized down to fit the stage.
 * artSlot: hold open the space an icon would take, for art still to come.
 * iconSmall: set the icons small above the head, a marker rather than art.
 * itemsSmall: set the bullets well under the head, as supporting detail.
 * headLarge: set short heads large, so they carry the column.
 */
export default function ColumnsLayout({
  title,
  subtitle,
  columns,
  iconBelow = false,
  artSlot = false,
  iconSmall = false,
  itemsSmall = false,
  headLarge = false,
  titleFit = false,
  variant,
}) {
  const display = variant === 'display'

  return (
    <section className="slide">
      <header className="slidehead">
        <h2 className={titleFit ? 'h2 h2--fit' : 'h2'}>{title}</h2>
        {subtitle && <p className="kicker">{subtitle}</p>}
      </header>
      <div
        className={[
          'cols',
          `cols--${columns.length}`,
          variant && `cols--${variant}`,
          headLarge && 'cols--heads-large',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {columns.map((col, i) => (
          <div className="col" key={i}>
            {col.icon && !iconBelow && (
              <img
                className={
                  iconSmall ? 'col__icon col__icon--small' : 'col__icon'
                }
                src={asset(col.icon)}
                alt=""
              />
            )}
            <h3
              className={headLarge ? 'colhead colhead--large' : 'colhead'}
            >
              {display ? (
                <>
                  <span className="colhead__lead">{col.head.slice(0, 1)}</span>
                  {col.head.slice(1)}
                </>
              ) : (
                col.head
              )}
            </h3>
            {col.body && <p className="col__body">{col.body}</p>}
            {col.items && (
              <ul
                className={
                  itemsSmall ? 'col__list col__list--small' : 'col__list'
                }
              >
                {col.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {col.icon && iconBelow && (
              <img
                className="col__icon col__icon--below"
                src={asset(col.icon)}
                alt=""
              />
            )}
            {artSlot && !col.icon && (
              <span className="col__slot" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
