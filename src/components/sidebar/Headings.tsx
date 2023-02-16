export function Headings({ headings, activeId }) {
  return (<ul className="nav nav-pills menu-sidebar">
    {headings.map((heading) => (
      <li key={heading.id} className={`ml-${heading.depth}`}>
        <a className={`nav-link ${activeId === heading.id ? 'active' : ''}`} href={`#${heading.id}`}>{heading.title}</a>
        {heading.items.length > 0 && <Headings headings={heading.items} activeId={activeId}/>}
      </li>
    ))}
  </ul>);
}
