import { Document, MongoClient } from 'mongodb'
import { CatalogEntry } from '../components/changelog/changelog.types'
import clientPromise from '../lib/mongodb'
import { Version } from '../utils/vparse'


class ChangelogDatabase {
  client: MongoClient

  async findVersion<T>(versionSlug: string): Promise<T> {
    const client = await clientPromise
    const response = await client.
      db('changelog').
      collection('changelogs').
      aggregate([
        {
          $match: {
            slug: versionSlug
          }
        },
        {
          $project: {
            _id: 0,
            released: {
              $dateFromString: {
                dateString: '$released'
              }
            },
            version_string: 1,
            slug: 1,
            url: 1,
            category_types: 1,
            categories: 1
          }
        },
        {
          $limit: 1
        }
      ]).
      toArray()

    return (response.length > 0
      ? response[0]
      : null) as T
  }

  async findVersions<T>(from: Version, to: Version): Promise<T[]> {
    const client = await clientPromise
    const response = await client.
      db('changelog').
      collection('changelogs').
      aggregate([
        {
          $match:
                    {
                      version_hash: {
                        $gte: from.createHash(),
                        $lte: to.createHash()
                      }
                    }
        },
        {
          $sort: {
            index: 1
          }
        },
        {
          $project: {
            _id: 0,
            version_string: 1,
            slug: 1,
            released: {
              $dateFromString: {
                dateString: '$released'
              }
            },
            url: 1,
            category_types: 1,
            change_types: 1,
            categories: 1
          }
        }
      ]).
      toArray()

    return response as T[]
  }

  async searchVersionAc(searchQuery: string | undefined): Promise<Document[]> {
    const client = await clientPromise

    if (!searchQuery) {
      const results = await client.
        db('changelog').
        collection('changelogs').
        aggregate([
          {
            $sort: {
              index: -1
            }
          },
          {
            $project: {
              _id: 0,
              version_string: 1,
              slug: 1,
              released: {
                $dateFromString: {
                  dateString: '$released'
                }
              }
            }
          }
        ]).
        toArray()

      return results
    }
    const result = await client.
      db('changelog').
      collection('changelogs').
      aggregate([
        {
          $search: {
            index: 'version_autocomplete',
            autocomplete: {
              query: searchQuery,
              path: 'version_string'
            }
          }
        },
        {
          $sort: {
            index: 1
          }
        },
        {
          $project: {
            _id: 0,
            version_string: 1,
            slug: 1,
            released: {
              $dateFromString: {
                dateString: '$released'
              }
            }
          }
        },
        {
          $limit: 10
        }
      ]).
      toArray()

    return result
  }

  async getAllVersions(): Promise<CatalogEntry[]> {
    const client = await clientPromise
    const changelogs = await client.
      db('changelog').
      collection<CatalogEntry>('changelogs_view').
      find({}).
      toArray()

    return changelogs
  }
}

const serviceInstance = new ChangelogDatabase()

export { serviceInstance as ChangelogDatabase }

