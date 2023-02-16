import { ChangelogNode, ChangelogRoot } from 'components/changelog/changelog.types';
import { slugify } from 'utils/stringutils';

export type NestedHeading = {
  id: string;
  title: string;
  depth: number;
  items: NestedHeading[];
}

export default function useHeadingsData ( changelogs : ChangelogRoot[] ) : NestedHeading[] {
  // This must match with whatever RenderNode is doing
  const createHeading = (id:string, node: ChangelogNode, depth: number) => {
    const nameSlug:string = slugify(node.name);
    const heading: NestedHeading = {
      id: `${id}_${nameSlug}`,
      title: node.name,
      depth: depth,
      items: []
    };
    return heading;
  }

  const traverseCategories = (id: string, node: ChangelogNode, depth: number = 0) : NestedHeading => {
    const heading = createHeading(id, node, depth);
    if (node.children) {
      node.children.forEach((childNode, child_index) => {
        const childCategories = traverseCategories(`${id}_${depth}`, childNode, heading.depth + 1);
        heading.items = [...heading.items, childCategories];
      });
    }
    return heading;
  };

  const createHeadings = (changelogs : ChangelogRoot[]): NestedHeading[] => {
    let headings = [];
    changelogs.forEach((root, index) => {
      const heading: NestedHeading = {
        id: `${root.slug}`,
        title: root.version_string,
        depth: 0,
        items: []
      };
      
      const mainCategory = root.categories;
      if (mainCategory) {
        mainCategory.children.forEach((childNode, child_index) => {
          const childCategories = traverseCategories(heading.id, childNode, heading.depth);
          heading.items = [...heading.items, childCategories];
        });
      }
      headings.push(heading);
    });
    return headings;
  }
  return createHeadings(changelogs);
}
