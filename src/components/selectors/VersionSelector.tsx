'use client'
import { useRouter } from 'next/navigation'
import SelectSearch from 'react-select-search'

function customOptionRenderer(props, { value, name }, snapshot, className) {
  return (
    <button {...props} className={className}>
      <span id={value}>{name}</span>
    </button>
  )
}

export default function VersionSelector() {
  const router = useRouter()
  const OnSelectChanged = (slug: string) => {
    if (slug === undefined) {
      return
    }
    router.push(`/changelog/${slug}`)
  }

  return (
    <SelectSearch
      defaultValue=""
      getOptions={(query) => new Promise((resolve, reject) => {
        fetch(`/api/version/?q=${encodeURIComponent(query)}`).
          then((response) => response.json()).
          then((changelogs) => {
            resolve(changelogs.map(({ slug, version_string }) => ({
              value: slug,
              name: version_string
            })))
          }).
          catch(reject)
      })}
      onChange={OnSelectChanged}
      options={[]}
      placeholder="Search for version"
      renderOption={customOptionRenderer}
      search
    />
  )
}
