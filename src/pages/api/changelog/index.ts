import type { NextApiHandler } from 'next';
import { ChangelogService } from '../../../services/changelog';

const changelogHandler: NextApiHandler = async (request, response) => {
    try {
        const changelogs = await ChangelogService.getAllVersions();
        response.json(changelogs);
    } catch (e) {
        console.error(e);
        response.json([]);
    }
}

export default changelogHandler