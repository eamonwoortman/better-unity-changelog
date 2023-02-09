import type { NextApiHandler } from 'next'
import { ChangelogDatabase } from '../../services/changelogdb'
import { Version } from '../../utils/vparse'

const searchHandler: NextApiHandler = async (req, res) => {
  const fromQuery:string = req.query.from as string
  const toQuery:string = req.query.to as string

  if (!fromQuery || !toQuery) {
    return res.send([])
  }

  const from:Version = Version.parseVersion(fromQuery)
  const to:Version = Version.parseVersion(toQuery)

  const result = await ChangelogDatabase.findVersions(from, to)

  return res.send(result)
}

export default searchHandler
