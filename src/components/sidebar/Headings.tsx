export function Headings({ headings }) {
  return (<ul>
    {headings.map((heading) => (
      <li key={heading.id} className={`ml-${heading.depth}`}>
        <a href={`#${heading.id}`}>{heading.title}</a>
        {heading.items.length > 0 && <Headings headings={heading.items}/>}
      </li>
    ))}
  </ul>);
}
