import { NextPage } from "next"
import { ReactElement, useState } from "react"
import { defaultCategoryFilters, FilterCategory, MobileViewFilter, MobileViewMenu, ViewFilterBar } from "../components/changelog/ViewFilterBar"

export default function ChangeLogDetailLayout({children}) {
    const [ mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [ filters, setFilters ] = useState<FilterCategory[]>(defaultCategoryFilters)
    
    return (<>
        {/* Mobile filter dialog */}
        <MobileViewFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} filters={filters}/>
    
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="relative z-10 flex items-baseline justify-between pt-5 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Changelog</h1>
             <MobileViewMenu setMobileFiltersOpen={setMobileFiltersOpen}/>
          </div>
    
          {/* Main content section */}
          <section className="pt-6 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <ViewFilterBar filters={filters}/>
    
              {/* Content grid */}
              <div className="lg:col-span-3">
                  {children}
              </div>
            </div>
          </section>
        </main>
    </>
    )
}
