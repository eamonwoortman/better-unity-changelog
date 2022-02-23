
// const fs = require('fs');

class ChangelogDataService {
  getCatalog() {
    return require("/public/changelogs/catalog.json");
  }

  get(id:string) {
    return require(`/public/changelogs/${id}`);
  }
}

export default new ChangelogDataService();