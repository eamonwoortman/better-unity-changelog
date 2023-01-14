import type { NextApiHandler } from 'next';
import { ChangelogService } from '../../../../services/changelog';
import { Version } from '../../../../utils/vparse';

const changelogHandler: NextApiHandler = async (request, response) => {
    try {
        const searchQuery : string = request.query.slug as string;
        const version: Version = Version.parseVersion(searchQuery);
        if (version.isEmpty) {
            response.json({})
            return; 
        }
        const result = await ChangelogService.findVersion(version.text);
        response.json(result);
    } catch (e) {
        console.error(e);
    }
}

export default changelogHandler