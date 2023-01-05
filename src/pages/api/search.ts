import type { NextApiHandler } from 'next';
import clientPromise from "../../lib/mongodb";

const searchHandler: NextApiHandler = async (req, res) => {
  try {
    const client = await clientPromise;
    const searchQuery : string | string[] = req.query.version;
    if (searchQuery) {
      let results;
      if (searchQuery.includes(",") || searchQuery.includes(" ")) {
        results = await client
          .db("changelog")
          .collection("changelogs")
          .aggregate([
            {
              $search: {
                index: "autocompletev4",
                autocomplete: {
                  query: searchQuery,
                  path: "version",
                },
              },
            },
            {
              $project: {
                _id: 0,
                version: 1,
                slug: 1,
                released: {
                  $dateFromString: {
                    dateString: "$released",
                  },
                }
              },
            },
            {
              $sort: {
                released: 1,
              },
            },
            {
              $limit: 10,
            },
          ])
          .toArray();

        return res.send(results);
      }

      let result = await client
        .db("changelog")
        .collection("changelogs")
        .aggregate([
          {
            $search: {
              index: "autocompletev4",
              autocomplete: {
                query: searchQuery,
                path: "version_string",
              },
            },
          },
          {
            $sort: {
              index: 1,
            },
          },
          {
            $project: {
              _id: 0,
              version: 1,
              slug: 1,
              released: {
                $dateFromString: {
                  dateString: "$released",
                },
              },
            },
          },
          {
            $limit: 10,
          },
        ])
        .toArray();

      return res.send(result);
    }
    res.send([]);
  } catch (error) {
    console.error(error);
    res.send([]);
  }
}

export default searchHandler
