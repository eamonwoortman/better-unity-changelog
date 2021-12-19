import http from './http-common';

class ChangelogDataService {
  getCatalog() {
    return http.get("/changelogs/catalog.json");
  }

  get(id:string) {
    return http.get(`/changelogs/${id}`);
  }
}

export default new ChangelogDataService();