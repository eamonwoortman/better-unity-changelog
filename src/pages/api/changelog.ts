import type { NextApiHandler } from 'next';
import clientPromise from "../../lib/mongodb";

const changelogHandler: NextApiHandler = async (request, response) => {
    try {
        const client = await clientPromise;
        const db = client.db("changelog");

        const changelogs = await db
            .collection("changelogs_view")
            .find({})
            .toArray();

        response.json(changelogs);
    } catch (e) {
        console.error(e);
    }
}

export default changelogHandler