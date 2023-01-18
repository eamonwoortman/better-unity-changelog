import { Document, MongoClient } from "mongodb";
import { CatalogEntry, ChangelogRoot } from "../features/changelogs/changelog.types";
import clientPromise from "../lib/mongodb";

class ChangelogDatabase {
    client: MongoClient;
   
    async findVersion(versionSlug: string): Promise<ChangelogRoot> {
        const client = await clientPromise;
        let result = await client
            .db("changelog")
            .collection<ChangelogRoot>("changelogs")
            .aggregate<ChangelogRoot>([
                {
                    $match : { 
                        slug : versionSlug 
                    } 
                },
                {
                    $project: {
                        _id: 0,
                        released: {
                            $dateFromString: {
                                dateString: "$released",
                            },
                        },
                        version_string: 1,
                        slug: 1,
                        url: 1,
                        category_types: 1,
                        categories: 1,
                    },
                },
                {
                    $limit: 1,
                }
            ]).toArray();
            
        return result.length > 0 ? result[0] : null; 
    }

    async findVersions(searchQuery: string | string[]): Promise<Document[]> {
        const client = await clientPromise;
        let result = await client
            .db("changelog")
            .collection("changelogs")
            .aggregate([
                {
                    $search: {
                        index: "version_autocomplete",
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
                        version_string: 1,
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
                }
            ])
            .toArray();
        return result;
    }
    async searchVersionAc(searchQuery: string | undefined): Promise<Document[]> {
        const client = await clientPromise;
        if (!searchQuery) {
            let results = await client
            .db("changelog")
            .collection("changelogs")
            .aggregate([
                {
                    $sort: {
                        index: -1,
                    },
                },
                {
                    $project: {
                        _id: 0,
                        version_string: 1,
                        slug: 1,
                        released: {
                            $dateFromString: {
                                dateString: "$released",
                            },
                        },
                    },
                }
            ]).toArray();
            return results; 
        }
        let result = await client
            .db("changelog")
            .collection("changelogs")
            .aggregate([
                {
                    $search: {
                        index: "version_autocomplete",
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
                        version_string: 1,
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
                }
            ])
            .toArray();
        return result;
    }

    async getAllVersions(): Promise<CatalogEntry[]> {
        const client = await clientPromise;
        const changelogs = await client
            .db("changelog")
            .collection<CatalogEntry>("changelogs_view")
            .find({})
            .toArray();
        return changelogs;
    }
}

const serviceInstance = new ChangelogDatabase();
export { serviceInstance as ChangelogDatabase };

