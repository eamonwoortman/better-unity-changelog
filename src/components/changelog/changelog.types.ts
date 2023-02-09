
/* Catalog  */
export interface CatalogEntry {
    version_string: string,
    slug: string,
    date: string
  }

export interface Catalog {
    changelogs: CatalogEntry[]
}

export type ExtendedEntryType = {
    title: string,
    label: string
}

export type ChangelogEntryType = ExtendedEntryType | string

export type ChangelogNodeType =
    'MainCategory' | // 'Known Issues', 'Changed in ...'
    'ChangeType' | // Improvements, Changes, Fixes, ...
    'ModificationType' // Added, Removed, ...

/* Changelog */
export interface ChangelogNode {
    name?: string,
    children?: ChangelogNode[],
    entries?: ChangelogEntryType[],
    type?: ChangelogNodeType,
}

export interface ChangelogRoot {
    version_string: string,
    slug: string,
    url: string,
    categories: ChangelogNode,
    category_types: string[]
}

export interface ChangelogState {
    catalog?: Catalog,
    changelogs:ChangelogRoot[],
    status:string,
    error?: any
}
