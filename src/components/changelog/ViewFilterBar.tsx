import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';
import { Fragment, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { add_category_filter, filtersSelector, remove_category_filter, set_simple_view } from '../../features/filters/filters.slice';
import Toggle from '../generic/Toggle';

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
 /* { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },*/
]

export interface FilterCategoryOption {
  value: string;
  label: string;
  checked: boolean;
}

export interface FilterCategory {
  id: string;
  name: string;
  options: FilterCategoryOption[];
}

export const defaultCategoryFilters = [  
  {
    id: 'category',
    name: 'Category',
    options: [
      /* filled by the catalog */
      /*
      { value: '2d', label: '2D', checked: false },
      { value: 'ai', label: 'AI', checked: false },
      { value: 'linux', label: 'Linux', checked: false },
      { value: 'opengl', label: 'OpenGL', checked: false },
      { value: 'shaders', label: 'Shaders', checked: false },
      */
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function ViewFilterBar ({filters}) {
  const dispatch = useAppDispatch();
  const { category_filters } = useAppSelector(filtersSelector);
  
  const checkFilterOptions = () => {
    category_filters.map(filter => filters.map(filterCategory => filterCategory.options.map(filterOption => filterOption.checked = filterOption.value === filter.id)));
  }

  useEffect(() => {
    checkFilterOptions();
  }, [filters]);
  
  const handleViewModeChanged = (isChecked) => {
    dispatch(set_simple_view(isChecked));
  }

  const handleFilterChecked = (filterOption, isChecked) => {
    var option = { id: filterOption.value, name: filterOption.label };
    if (isChecked) {
      dispatch(add_category_filter(option));
    } else {
      dispatch(remove_category_filter(option));
    }
  };

  return (
    <div>
        {/* Filters */}
        <form className="hidden lg:block">

            {/* Options */}
            <Disclosure as="div" defaultOpen={true} key='view-options' className="border-b border-gray-200 py-6 select-none">
                {({ open }) => (
                <>
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">Options</span>
                          <span className="ml-6 flex items-center">
                          {open ? (
                              <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                          ) : (
                              <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                          )}
                          </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Toggle label="Simple view" onChange={handleViewModeChanged}/>
                        </div>
                        
                    </div>
                    </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <h3 className="sr-only">Categories</h3>
            {subCategories.length > 0 && 
              <ul role="list" className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
              {subCategories.map((category) => (
                  <li key={category.name}>
                  <a href={category.href}>{category.name}</a>
                  </li>
              ))}
              </ul>
            }

            <h3 className="hidden lg:block text-cyan-600 pb-5 pt-0 m-0" >Filters</h3>
            {filters.map((section) => (
            <Disclosure as="div" defaultOpen={true} key={section.id} className="border-b border-gray-200 py-6 select-none">
                {({ open }) => (
                <>
                    <h3 className="-my-3 flow-root">
                    <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name} ({section.options.length})</span>
                        <span className="ml-6 flex items-center">
                        {open ? (
                            <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                        ) : (
                            <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                        )}
                        </span>
                    </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6 overflow-auto h-72">
                    <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                            <input
                            id={`filter-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            defaultValue={option.value}
                            type="checkbox"
                            defaultChecked={option.checked}
                            onChange={(e) => handleFilterChecked(option, e.target.checked)}
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="ml-3 text-sm text-gray-600 select-none break-all">
                              {option.label}
                            </label>
                        </div>
                        ))}
                    </div>
                    </Disclosure.Panel>
                </>
                )}
            </Disclosure>
            ))}
        </form>
    </div>
  );
}

export const MobileViewMenu = ({setMobileFiltersOpen}) => {
return (
  <div className="flex items-center">
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          Sort
          <ChevronDownIcon
            className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {sortOptions.map((option) => (
              <Menu.Item key={option.name}>
                {({ active }) => (
                  <a
                    href={option.href}
                    className={classNames(
                      option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    {option.name}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>

    <button
      type="button"
      className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
      onClick={() => setMobileFiltersOpen(true)}>
        <span className="sr-only">Filters</span>
        <FilterIcon className="w-5 h-5" aria-hidden="true" />
    </button>
  </div>
)}

export const MobileViewFilter = ({mobileFiltersOpen, setMobileFiltersOpen, filters}) => {
  return(<Transition.Root show={mobileFiltersOpen} as={Fragment}>
    <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <Transition.Child
        as={Fragment}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
          <div className="px-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
              onClick={() => setMobileFiltersOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Filters */}
          <form className="mt-4 border-t border-gray-200">
            <h3 className="sr-only">Categories</h3>
            <ul role="list" className="font-medium text-gray-900 px-2 py-3">
              {subCategories.map((category) => (
                <li key={category.name}>
                  <a href={category.href} className="block px-2 py-3">
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>

            {filters.map((section) => (
              <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                {({ open }) => (
                  <>
                    <h3 className="-mx-2 -my-3 flow-root">
                      <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option.value}
                              type="checkbox"
                              defaultChecked={option.checked}
                              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </form>
        </div>
      </Transition.Child>
    </Dialog>
  </Transition.Root>)
}
