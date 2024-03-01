'use client'; // todo: remove

// Import { defaultCategoryFilters, FilterCategory, FilterCategoryOption } from "../components/changelog/ViewFilterBar";
import { useState } from 'react';
import { ChangelogRoot } from '../components/changelog/changelog.types';
import { FilterCategory, MobileViewFilter, MobileViewMenu, ViewFilterBar } from 'components/changelog/ViewFilterBar';

interface ChangelogDetailsProps {
  changelogs: ChangelogRoot[];
  filters?: FilterCategory[];
  simpleView: boolean;
}

export default function ChangeLogDetailLayout(props: React.PropsWithChildren<ChangelogDetailsProps>) {
  const [ mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  return (<>
       <MobileViewFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} filters={props.filters}/>
   
       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   
         <div className="relative z-10 flex items-baseline justify-between pt-5 pb-6 border-b border-gray-200">
           <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Changelog</h1>
            <MobileViewMenu setMobileFiltersOpen={setMobileFiltersOpen}/>
         </div>
   
         <section className="pt-6 pb-24">
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
             <ViewFilterBar filters={props.filters} simpleView={props.simpleView}/>
   
             <div className="lg:col-span-3">
                 {props.children}
             </div>
           </div>
         </section>
       </main>
   </>
   )
  
}

