import { ChangelogRoot } from 'components/changelog/changelog.types';
import ChangelogContainer from 'components/changelog/ChangelogContainer';
import ScrollToTop from 'components/scrolltotop';
import TableOfContents from 'components/sidebar/TableOfContents';
import ChangeLogDetailLayout from 'layouts/ChangelogDetailLayout';
import { ChangelogsProps, getPagePropsMultiple } from 'lib/changelog';
import { Suspense } from 'react';

export default async function Page(props: ChangelogsProps) {
  const changelogs = await getPagePropsMultiple(props)

  return (<>
    <div>
      <div className="hidden lg:block fixed z-20 inset-0 top-[5.8125rem] 
                    left-[0.5rem] right-auto w-[16.5rem] 
                    pb-10 px-4 pt-2 overflow-y-auto overscroll-none
                    scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-slate-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        <nav id="nav" className="lg:text-sm lg:leading-6 relative">
          <Suspense fallback={<p>Fast component loading...</p>}>
            <TableOfContents changelogs={changelogs} />
          </Suspense>
        </nav>
      </div>
      <div className="lg:pl-[19.5rem]">
        <div className="max-w-3xl mx-auto xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
          <Suspense fallback={<p>Fast component loading...</p>}>
            <ChangeLogDetailLayout changelogs={changelogs}>
              {changelogs !== undefined && changelogs.map((changelog: ChangelogRoot, index: number) => (
                <ChangelogContainer key={index} root={changelog} id={index} />
              )
              )}
            </ChangeLogDetailLayout>
          </Suspense>
        </div>
      </div>
    </div>
    <ScrollToTop />
  </>)
    ;
}