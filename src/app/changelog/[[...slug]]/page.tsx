
import { ChangelogRoot } from 'components/changelog/changelog.types';
import ChangelogContainer from 'components/changelog/ChangelogContainer';
import TableOfContents from 'components/sidebar/TableOfContents';
import ChangeLogDetailLayout from 'layouts/ChangelogDetailLayout';
import { ChangelogProps, getPageProps } from 'lib/changelog';
import { Suspense } from 'react';

export default async function Page(props: ChangelogProps) {
  const changelogs = await getPageProps(props)

  return (<>
            <div>
                <div className="hidden lg:block fixed z-20 inset-0 top-[5.8125rem] 
                    left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] 
                    pb-10 px-8 overflow-y-auto">
                  <nav id="nav" className="lg:text-sm lg:leading-6 relative">
                    <Suspense fallback={<p>Fast component loading...</p>}>
                          <TableOfContents changelogs={changelogs} />
                    </Suspense>
                  </nav>
                </div>
                <div className="lg:pl-[19.5rem]">
                    <div className="max-w-3xl mx-auto xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
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
