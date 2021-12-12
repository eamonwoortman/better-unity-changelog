
/* catalog  */ 
export interface CatalogEntry {
    version: string,
    slug: string,
    file_name: string
  }
  
export interface Catalog {
    date_modified: string,
    changelogs: CatalogEntry[]
}

/* changelog */ 
export interface ChangelogNode {
    name: string,
    children?: ChangelogNode[],
    entries?: string[]
}

export interface ChangelogRoot {
    version: string,
    slug: string,
    url: string,
    categories: ChangelogNode[]
}

export interface ChangelogState {
    catalog?: Catalog,
    changelogs:ChangelogRoot[],
    status:string,
    error?: any
}
