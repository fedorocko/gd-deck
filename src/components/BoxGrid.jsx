/** The layers of the box, stacked top to bottom. */
export default function BoxGrid({ items }) {
  return (
    <ul className="boxgrid">
      {items.map((item) => (
        <li className="boxgrid__cell" key={item}>
          {item}
        </li>
      ))}
    </ul>
  )
}
