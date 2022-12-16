import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { defaultCategoryFilters, FilterCategory, FilterCategoryOption, MobileViewFilter, MobileViewMenu, ViewFilterBar } from "../components/changelog/ViewFilterBar";
import { ChangelogRoot } from '../features/changelogs/changelog.types';
import { filtersSelector } from '../features/filters/filters.slice';

interface ChangelogDetailsProps { 
  changelogs: ChangelogRoot[];
}

export default function ChangeLogDetailLayout(props: React.PropsWithChildren<ChangelogDetailsProps>) {
    const [ mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [ filters, setFilters ] = useState<FilterCategory[]>(defaultCategoryFilters)
    const { initial_categories } = useAppSelector(filtersSelector);
    
    // Todo: move to util class
    const transformCategoryString = (label: string): FilterCategoryOption => {
      const value = label.toLowerCase().replace(' ', '_');
      return { value, label, checked: false };
    }

    useEffect(() => {
      const categoryFilter = filters.find(x => x.id == "category");
      categoryFilter.options = initial_categories.map(category => transformCategoryString(category));
    }, [initial_categories]);

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
                  {props.children}
              </div>
            </div>
          </section>
        </main>
    </>
    )
}

