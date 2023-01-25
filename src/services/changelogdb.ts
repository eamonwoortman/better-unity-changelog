import { Document, MongoClient } from "mongodb";
import { ApiError } from "next/dist/server/api-utils";
import { CatalogEntry, ChangelogRoot } from "../features/changelogs/changelog.types";
import { Version } from "../utils/vparse";

let clientPromise:Promise<MongoClient> = undefined;
import("../lib/mongodb").then(module => { clientPromise = module.default;}).catch();

class ChangelogDatabase {
    client: MongoClient;

    async getClient() : Promise<MongoClient> {
        if (clientPromise === undefined) {
            const isMongoURIDefined = process.env.MONGODB_URI !== undefined;
            if (isMongoURIDefined) {
                throw new ApiError(500, 'Could not create MongoClient, invalid MONGODB_URI');
            } else {
                throw new ApiError(500, 'Could not create MongoClient, missing MONGODB_URI');
            }
        }
        const client = await clientPromise;
        return client;
    }

    async findVersion(versionSlug: string): Promise<ChangelogRoot> {
        const client = await this.getClient();
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

    async findVersions(from: Version, to: Version): Promise<Document[]> {
        const client = await this.getClient();
        let result = await client
            .db("changelog")
            .collection("changelogs")
            .aggregate([
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
                        url: 1,
                        category_types: 1,
                        change_types: 1,
                        categories: 1
                    },
                }
            ]).toArray()
        return result;
    }
    async searchVersionAc(searchQuery: string | undefined): Promise<Document[]> {
        const client = await this.getClient();
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
        const client = await this.getClient();
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

