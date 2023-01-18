import type { NextApiHandler } from 'next';
import { ChangelogDatabase } from '../../../services/changelogdb';

const changelogHandler: NextApiHandler = async (request, response) => {
    try {
        const changelogs = await ChangelogDatabase.getAllVersions();
        response.json(changelogs);
    } catch (e) {
        console.error(e);
        response.json([]);
    }
}

export default changelogHandler