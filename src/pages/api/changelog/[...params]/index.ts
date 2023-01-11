import type { NextApiHandler } from 'next';
import { ChangelogService } from '../../../../services/changelog';

const changelogHandler: NextApiHandler = async (request, response) => {
    try {
        const searchQuery : string | string[] = request.query.params;
        
        console.log(searchQuery);

        if (searchQuery) {
            const result = await ChangelogService.findVersions(searchQuery);
            response.json(result);
        } else {
            const changelogs = await ChangelogService.getAllVersions();
            response.json(changelogs);
        }
        
    } catch (e) {
        console.error(e);
    }
}

export default changelogHandler