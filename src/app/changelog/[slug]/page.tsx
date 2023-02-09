
import { ChangelogRoot } from '../../../components/changelog/changelog.types'
import ChangelogContainer from '../../../components/changelog/ChangelogContainer'
import ChangeLogDetailLayout from '../../../layouts/ChangelogDetailLayout'
import { ChangelogDatabase } from '../../../services/changelogdb'
import { Version } from '../../../utils/vparse'

type ChangelogsPageProps = ChangelogRoot[];

type ChangelogProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Page(props: ChangelogProps) {
  const changelogs = await getServerSideProps(props)

  return (<>
      <ChangeLogDetailLayout changelogs={changelogs}>
        {changelogs !== undefined && changelogs.map((changelog:ChangelogRoot, index:number) => (
          <ChangelogContainer key={index} root={changelog} id={index} />
          )
        )}
      </ChangeLogDetailLayout>
    </>)
  ;
}
const getChangelog = async (versionString: string) : Promise<ChangelogRoot> => {
  const version:Version = Version.parseVersion(versionString)

  if (version.isEmpty) {
    console.log(`isempty: ${versionString}`)

    return null
  }

  return await ChangelogDatabase.findVersion<ChangelogRoot>(version.text)
}

const getChangelogs = async (fromQuery: string, toQuery: string) : Promise<ChangelogRoot[]> => {
  const from:Version = Version.parseVersion(fromQuery)
  const to:Version = Version.parseVersion(toQuery)

  if (from.isEmpty || to.isEmpty) {
    console.log(`Could not parse 'from'(${fromQuery}) or 'to'(${toQuery}) queries`)

    return []
  }

  const result = await ChangelogDatabase.findVersions(from, to)

  return result as ChangelogRoot[]
}

export async function getServerSideProps(props: ChangelogProps): Promise<ChangelogsPageProps> {
  const { params, searchParams } = props

  if (!params) {
    return []
  }
  console.log('TEST', params, searchParams)
  const changelogs = []

  if (params.slug != undefined) {
    const matchingChangelog = await getChangelog(params.slug)

    if (matchingChangelog) {
      changelogs.push(matchingChangelog)
    }
  } else if (searchParams != undefined) {

    /*
     * Var [ from, to ] = searchParams;
     * changelogs = await getChangelogs(from, to)
     */
  }

  return changelogs
}
