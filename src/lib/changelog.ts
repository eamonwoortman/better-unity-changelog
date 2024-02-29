import { FilterCategory, FilterCategoryOption } from 'components/changelog/ViewFilterBar';
import { ChangelogNode, ChangelogRoot } from 'components/changelog/changelog.types';
import { ChangelogDatabase } from 'services/changelogdb';
import { Version } from 'utils/vparse';

export type ChangelogsPageProps = {
  changelogs: ChangelogRoot[];
  filters?: FilterCategory[];
}

export type ChangelogProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export type SearchFilterParams = { [key: string]: string | string[] | undefined };

export type ChangelogsProps = {
  params: { from: string, to: string };
  searchParams?: SearchFilterParams;
}

export type LayoutPageProps = {
  params?: ChangelogProps;
  children?: React.ReactNode;
};
  
// Todo: move to util class
const transformCategoryString = (label: string): FilterCategoryOption => {
  const value = label.toLowerCase().replace(' ', '_');
  return { value, label, checked: false };
}

const getChangelog = async (versionString: string): Promise<ChangelogRoot | undefined> => {
  const version: Version = Version.parseVersion(versionString)
  if (version.isEmpty) {
    return undefined
  }
  return await ChangelogDatabase.findVersion<ChangelogRoot>(version.text)
}

const getChangelogs = async (fromQuery: string, toQuery: string): Promise<ChangelogRoot[]> => {
  const from: Version = Version.parseVersion(fromQuery)
  const to: Version = Version.parseVersion(toQuery)

  if (from.isEmpty || to.isEmpty) {
    console.log(`Could not parse 'from'(${fromQuery}) or 'to'(${toQuery}) queries`)
    return []
  }
  const result = await ChangelogDatabase.findVersions(from, to)
  return result as ChangelogRoot[]
}

export async function getPageProps(props: ChangelogProps): Promise<ChangelogsPageProps> {
  const { params } = props;
  const slug = params.slug[0];
  if (!slug) {
    return {changelogs: []};
  }
  const changelogs:ChangelogRoot[] = []
  const matchingChangelog = await getChangelog(slug)
  if (matchingChangelog) {
    changelogs.push(matchingChangelog)
  }
  if (props.searchParams) {
    filterChangelogs(changelogs, props.searchParams);
  }
  const filters = getCategoryFilters(changelogs);
  return {changelogs, filters}
}

function filter(nodes: ChangelogNode[], category_filters: string[]) {
  var matches:ChangelogNode[] = [];
  if (!Array.isArray(nodes)) return matches;
  nodes.forEach(function (node) {
    const nodeName:string = node.name!.toLowerCase().replace(' ', '_');
    if (category_filters.some(filter => filter.includes(nodeName))) {
      matches.push(node);
    } else if (node.children) {
      let childResults = filter(node.children, category_filters);
      if (childResults.length > 0)
        matches.push(Object.assign({}, node, { children: childResults }));
    }
  })
  return matches;
}

function filterChangelogs(changelogs: ChangelogRoot[], searchParams: SearchFilterParams) {
  const categories = searchParams.categories as string;
  if (!categories) {
    return;
  }
  const category_filters = categories.split(',');
  changelogs.forEach(x => {
    if (x.categories.children) {
      x.categories.children = filter(x.categories.children, category_filters);
    }
  });
}

const defaultCategoryFilters = [
  {
    id: 'category',
    name: 'Category',
    options: [

      /* Filled by the catalog */
      /*
       *{ value: '2d', label: '2D', checked: false },
       *{ value: 'ai', label: 'AI', checked: false },
       *{ value: 'linux', label: 'Linux', checked: false },
       *{ value: 'opengl', label: 'OpenGL', checked: false },
       *{ value: 'shaders', label: 'Shaders', checked: false },
       */
    ]
  }
]

function getCategoryFilters(changelogs: ChangelogRoot[]) {
  const allChangelogCategories =  changelogs.map(changelog => changelog.category_types.map(category => transformCategoryString(category))).flat(1);
  const uniqueOptions = allChangelogCategories.filter((category, index, self) => self.findIndex(other => other.value === category.value) === index);
  const changelogFilters:FilterCategory[] = defaultCategoryFilters;
  const categoryFilter = changelogFilters.find(x => x.id == "category");
  categoryFilter!.options = uniqueOptions;
  return changelogFilters;
}

export async function getPagePropsMultiple(props: ChangelogsProps): Promise<ChangelogsPageProps> {
  const { params } = props
  if (!params) {
    return {changelogs: [], filters: []}
  }
  const changelogs = await getChangelogs(params.from, params.to);
  if (props.searchParams) {
    filterChangelogs(changelogs, props.searchParams);
  }
  const filters = getCategoryFilters(changelogs);
  return {changelogs, filters};
}