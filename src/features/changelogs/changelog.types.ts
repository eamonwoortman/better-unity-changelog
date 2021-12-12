
export interface CatalogEntry {
    version: string,
    file_name: string,
    slug?: string
  }
  
export interface Catalog {
    date_modified: string,
    changelogs: CatalogEntry[]
}

export interface ChangelogNode {
    name: string,
    children?: ChangelogNode[],
    entries?: string[]
}

export interface ChangelogRoot {
    version: string,
    url: string,
    categories: ChangelogNode[]
}

export interface ChangelogState {
    catalog?: Catalog,
    changelogs:any[],
    status:string,
    error?: any
}
