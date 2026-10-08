/** quiet: outlined and muted, for features listed as supporting detail rather
 *  than as the point of the slide. */
export default function Badges({ items, quiet = false }) {
  return (
    <ul className={quiet ? 'badges badges--quiet' : 'badges'}>
      {items.map((item) => (
        <li className="badge" key={item}>
          {item}
        </li>
      ))}
    </ul>
  )
}
