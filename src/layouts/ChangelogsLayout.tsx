import React, { Dispatch, ReactElement, SetStateAction, createContext, useState } from 'react'
import { ChangelogRoot } from '../components/changelog/changelog.types'
import { Footer } from '../components/footer'
import { Header } from '../components/header'
import TableOfContents from '../components/sidebar/TableOfContents'


type State = ChangelogRoot[];
type ContextType = {changelogs: ChangelogRoot[]; setChangelogs: Dispatch<SetStateAction<ChangelogRoot[]>>} | undefined;

export const ChangelogsContext = createContext<ContextType>(undefined)

export function useChangelogs() {
  const context = React.useContext(ChangelogsContext)

  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }

  return context
}

function ChangelogsProvider({ children }: {children: React.ReactNode}) {
  const [
    changelogs,
    setChangelogs
  ] = useState<ChangelogRoot[]>([])
  const value = { changelogs,
    setChangelogs }

  return (
    <ChangelogsContext.Provider value={value}>
      {children}
    </ChangelogsContext.Provider>
  )
}

export default function ChangelogsLayout(page: ReactElement) {
  return (
    <ChangelogsProvider>
      <main className="flex flex-col h-screen">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <div className="flex bg-gray-100 w-45 p-4">
            <TableOfContents page={page} />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 overflow-y-auto scroll-smooth paragraph px-4">
              {page}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </ChangelogsProvider>
  )
}
