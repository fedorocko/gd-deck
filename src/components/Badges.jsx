export default function Badges({ items }) {
  return (
    <ul className="badges">
      {items.map((item) => (
        <li className="badge" key={item}>
          {item}
        </li>
      ))}
    </ul>
  )
}
