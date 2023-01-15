import { useRouter } from 'next/router';
import Turnstone from 'turnstone';

type ChangelogStub = {
    version_string: string,
    slug: string,
    released: string
  };

const styles = {
    input: 'w-full border py-2 px-4 text-lg outline-none rounded-md',
    listbox: 'bg-neutral-900 w-full text-slate-50 rounded-md',
    highlightedItem: 'bg-neutral-800',
    query: 'text-oldsilver-800 placeholder:text-slate-600',
    typeahead: 'text-slate-500',
    clearButton:
      'absolute inset-y-0 text-lg right-0 w-10 inline-flex items-center justify-center bg-netural-700 hover:text-red-500',
    noItems: 'cursor-default text-center my-20',
    match: 'font-semibold',
    groupHeading: 'px-5 py-3 text-pink-500',
  }

  const listbox = {
    displayField: 'versions',
    data: async (query) => {
      const res = await fetch(`/api/search/?version=${encodeURIComponent(query)}`)
      const data = await res.json()
      console.log(`doing query for: ${query}, data: ${data}`)
      return data
    },
    searchType: 'startsWith',
  }

  const Item = ({ item }) => {
    return (
      <div className='flex items-center cursor-pointer px-5 py-4'>
         <p>{item.version_string}</p>
      </div>
    )
  }
  

export default function VersionSelector() {
    const router = useRouter();
    const OnItemSelected = (item: ChangelogStub | undefined, displayField: string | number | undefined) => {
        if (item === undefined) {
            return;
        }
        console.log(item, displayField);
        router.push(`/changelog/${item.slug}`);
    }
    
    return (
      <Turnstone id='version-selector'
      name='search'
      autoFocus={true}
      typeahead={true}
      clearButton={true}
      debounceWait={250}
      listboxIsImmutable={true}
      maxItems={6}
      noItemsMessage="Version not found"
      placeholder='Search for specific version e.g. 2018.4.0'
      listbox={listbox}
      styles={styles}
      Item={Item}
      plugins={[]}
      onSelect={OnItemSelected}
      // text='Iron M'
      />
    )
  }

/*
.const items = [
  {
    id: "eg",
    name: "Engineers",
    items: [
      {
        id: 1,
        name: "Wade Cooper",
        avatar:
          "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        id: 2,
        name: "Arlene Mccoy",
        avatar:
          "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        id: 3,
        key: "devon webb",
        name: "Devon Webb",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
      },
      {
        id: 4,
        name: "Tom Cook",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        id: 5,
        name: "Tanya Fox",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ]
  },
  {
    id: "md",
    name: "Merchandisers",
    items: [
      {
        id: 6,
        name: "Hellen Schmidt",
        avatar:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        id: 7,
        name: "Caroline Schultz",
        avatar:
          "https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        id: 8,
        name: "Mason Heaney",
        avatar:
          "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        id: 9,
        name: "Claudie Smitham",
        avatar:
          "https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        id: 10,
        name: "Emil Schaefer",
        avatar:
          "https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ]
  }
];

import { Combobox } from '@headlessui/react';
import { useState } from 'react';

type ChangelogStub = {
    //version_string: string,
    slug: string,
    //released: string
  };

const people: ChangelogStub[] = [
  { slug: 'Durward Reynolds' },
  { slug: 'Kenton Towne' },
  { slug: 'Therese Wunsch' },
  { slug: 'Benedict Kessler' },
  { slug: 'Katelyn Rohan' },
]

export default function VersionSelector() {
  const [selectedPerson, setSelectedPerson] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.slug.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson} nullable>
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(person: ChangelogStub) => person?.slug}
      />
      <Combobox.Options>
        {filteredPeople.map((person) => (
          <Combobox.Option key={person.slug} value={person}>
            {person.slug}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}
*/

/*
export default function VersionSelector() {
  return (
    <div className="p-4">
      <AutoComplete label="Version" defaultItems={items} />
      <br />
    </div>
  );
}
*/

/*
import { Combobox } from '@headlessui/react'
import { useState } from 'react'

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
]

function VersionSelector() {
  const [selectedPerson, setSelectedPerson] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson} nullable>
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(person) => person?.name}
      />
      <Combobox.Options>
        {filteredPeople.map((person) => (
          <Combobox.Option key={person.id} value={person}>
            {person.name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}

export default VersionSelector;
*/

/*import { useEffect, useState } from "react";
import Autocomplete from "./autocomplete";

//return type for restcountries.com api.
//do this for the static type checking. very important!
type ChangelogStub = {
  version_string: string,
  slug: string,
  released: string
};
const VersionSelector = () => {
  //query typed by user
  const [val, setVal] = useState("");
  //a list to show on the dropdown when user types
  const [items, setItems] = useState<string[]>([]);
  //query rest countries api and set the countries list
  const searchEndpoint = (query: string) => `/api/search/?version=${encodeURIComponent(query)}`

  async function fetchData(query) {
    const url = searchEndpoint(query);
    const response = await fetch(url);
    const countries = (await response.json()) as ChangelogStub[];
    const newItems = countries.map((p) => p.slug).sort();
    console.log(newItems);
    setItems(newItems);
  }

  useEffect(() => {
    //if there is no value, return the countries list.
    if (!val) {
      setItems([]);
      return;
    }
    //if the val changes, we filter items so that it can be filtered. and set it as new state
    fetchData(val);
  }, [val]);
  //use the common auto complete component here.
  return <Autocomplete items={items} value={val} onChange={setVal} />;
};
export default VersionSelector;
*/
