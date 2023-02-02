import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import ChangelogContainer from '../../../components/changelog/ChangelogContainer'
import { ChangelogRoot } from '../../../features/changelogs/changelog.types'
import ChangeLogDetailLayout from '../../../layouts/ChangelogDetailLayout'
import ChangelogsLayout, { ChangelogsContext } from '../../../layouts/ChangelogsLayout'
import { Version } from '../../../utils/vparse'
import { NextPageWithLayout } from '../../_app'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ChangelogDatabase } from '../../../services/changelogdb'

type ChangelogsPageProps = {
  changelogs: Array<ChangelogRoot>;
}

const ChangelogPage: NextPageWithLayout = ({ changelogs: products }: ChangelogsPageProps) => {
  const router = useRouter()
  const params = (router.query.params as string[]) || []
  //const { changelogs, setChangelogs } = useContext(ChangelogsContext);
  const changelogs = products;

  return (<>
    <ChangeLogDetailLayout changelogs={changelogs}>
      {changelogs !== undefined && changelogs.map((changelog:ChangelogRoot, index:number) => (
        <ChangelogContainer key={index} root={changelog} id={index} />
        )
      )}
    </ChangeLogDetailLayout>
  </>)
}


const getChangelog = async (versionString: string) : Promise<ChangelogRoot> => {
  const version:Version = Version.parseVersion(versionString);
  if (version.isEmpty) {
    console.log(`isempty: ${versionString}`);
    return null;
  }
  return await ChangelogDatabase.findVersion<ChangelogRoot>(version.text);
}

const getChangelogs = async(fromQuery: string, toQuery: string) : Promise<ChangelogRoot[]> => {
  const from:Version = Version.parseVersion(fromQuery);
  const to:Version = Version.parseVersion(toQuery);
  if (from.isEmpty || to.isEmpty) {
    console.log(`Could not parse 'from'(${fromQuery}) or 'to'(${toQuery}) queries`);
    return [];
  }
 
  const result = await ChangelogDatabase.findVersions(from, to);
  return result as ChangelogRoot[];
}

export async function getServerSideProps({ res, query }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ChangelogsPageProps>> { 
  const params = query?.params;
  
  if (!params) {
    return {
        redirect: {
            destination: '/',
            permanent: true
        }
    }
  }
  
  let changelogs = [];
  if (params.length == 1) {
    const matchingChangelog = await getChangelog(params[0]);
    if (matchingChangelog) {
      changelogs.push(matchingChangelog);
    }
  } else if (params.length == 2) {
    var [ from, to ] = params;
    changelogs = await getChangelogs(from, to)
  } 

  if (changelogs.length === 0) {
    return {
      notFound: true
    }
  }
 
  return {
    props: {
      changelogs: JSON.parse(JSON.stringify(changelogs)),
    }
  }
}

ChangelogPage.getLayout = ChangelogsLayout;

export default ChangelogPage
