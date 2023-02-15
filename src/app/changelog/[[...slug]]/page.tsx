
import { ChangelogRoot } from 'components/changelog/changelog.types';
import ChangelogContainer from 'components/changelog/ChangelogContainer';
import TableOfContents from 'components/sidebar/TableOfContents';
import ChangeLogDetailLayout from 'layouts/ChangelogDetailLayout';
import { ChangelogProps, getPageProps } from 'lib/changelog';
import { Suspense } from 'react';

export default async function Page(props: ChangelogProps) {
  const changelogs = await getPageProps(props)

  return (<>
            <div className="flex flex-1 overflow-hidden">
                <div className="w-60 relative left-0 top-0 h-screen bg-gray-100 p-10">
                  <Suspense fallback={<p>Fast component loading...</p>}>
                      <TableOfContents changelogs={changelogs} />
                  </Suspense>
                </div>
                <div className="flex flex-1 flex-col ml-6">
                    <div className="flex flex-1 overflow-y-auto scroll-smooth paragraph px-4">
                      <ChangeLogDetailLayout changelogs={changelogs}>
                        {changelogs !== undefined && changelogs.map((changelog:ChangelogRoot, index:number) => (
                          <ChangelogContainer key={index} root={changelog} id={index} />
                          )
                        )}
                      </ChangeLogDetailLayout>
                    </div>
                </div>
            </div>
    </>)
  ;
}
