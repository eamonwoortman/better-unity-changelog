import { useRouter } from 'next/router';
import SelectSearch from 'react-select-search';

function customOptionRenderer(props, { value, name }, snapshot, className) {
  return (
      <button {...props} className={className}>
          <span id={value}>{name}</span>
      </button>
  );
}

export default function VersionSelector() {
  const router = useRouter();
  const OnSelectChanged = (slug: string) => {
      if (slug === undefined) {
          return;
      }
      router.push(`/changelog/${slug}`);
  }

  return (
    <SelectSearch
      renderOption={customOptionRenderer}
      options={[]}
      onChange={OnSelectChanged}
      defaultValue={''}
      getOptions={(query) => {
          return new Promise((resolve, reject) => {
              fetch(`/api/search/?version=${encodeURIComponent(query)}`)
                .then((response) => response.json())
                .then((changelogs) => {
                    resolve(
                        changelogs.map(({ slug, version_string }) => ({
                            value: slug,
                            name: version_string,
                        })),
                    );
                })
                .catch(reject);
          });
      }}
      search
      placeholder="Search for version"
    />
    )
}
