import { Document, MongoClient } from "mongodb";
import { CatalogEntry } from "../features/changelogs/changelog.types";
import clientPromise from "../lib/mongodb";

//const mongoClient = setupMongoClient();

class ChangelogService {
    client: MongoClient;

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
                }
            ])
            .toArray();
        return result;
    }
    async searchVersionAc(searchQuery: string | string[]): Promise<Document[]> {
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

const serviceInstance = new ChangelogService();
export { serviceInstance as ChangelogService };

