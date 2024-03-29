import { useEffect, useState } from "react";
import { defaultCategoryFilters, FilterCategory, FilterCategoryOption, MobileViewFilter, MobileViewMenu, ViewFilterBar } from "../components/changelog/ViewFilterBar";
import { ChangelogRoot } from '../features/changelogs/changelog.types';

interface ChangelogDetailsProps { 
  changelogs: ChangelogRoot[];
}

export default function ChangeLogDetailLayout(props: React.PropsWithChildren<ChangelogDetailsProps>) {
    const [ mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [ filters, setFilters ] = useState<FilterCategory[]>(defaultCategoryFilters)
    
    // Todo: move to util class
    const transformCategoryString = (label: string): FilterCategoryOption => {
      const value = label.toLowerCase().replace(' ', '_');
      return { value, label, checked: false };
    }

    const setCategoryFilterOptions = (options: FilterCategoryOption[]) => {
      const categoryFilter = filters.find(x => x.id == "category");
      categoryFilter.options = options;
      setFilters([...filters]);
    }

    useEffect(() => {
      const allChangelogCategories =  props.changelogs.map(changelog => changelog.category_types.map(category => transformCategoryString(category))).flat(1);
      const uniqueOptions = allChangelogCategories.filter((category, index, self) => self.findIndex(other => other.value === category.value) === index);
      const filterOptions = uniqueOptions;
      setCategoryFilterOptions(filterOptions);
    }, [props.changelogs]);

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

