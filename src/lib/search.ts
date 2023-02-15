import { ChangelogDatabase } from 'services/changelogdb'
import { Version } from 'utils/vparse'

export default async function searchChangelog (term : string | undefined) {
  if (!term) {
    return null;
  }
  const fromVersion = Version.parseVersion(term);
  if (fromVersion.isEmpty) {
    return null;
  }
  const result = await ChangelogDatabase.findVersions<Version[]>(fromVersion, fromVersion);
  return result;
}
