import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import https from "https";
import { Catalog, ChangelogRoot } from "./changelog.types";

const library_base_url =
  "https://eamonwoortman.github.io/unity-changelog-scraper";
const domain = "eamonwoortman.github.io";
const cache = setupCache({
  maxAge: 5 * 60 * 1000, // Five minutes
});

class ChangelogDataService {
  api = axios.create({
    baseURL: domain,
    adapter: cache.adapter,
    timeout: 60000, //optional
    httpsAgent: new https.Agent({ keepAlive: true }),
    headers: { "Content-Type": "application/json" },
  });
  fetcher = async (url) => await this.api.get(url).then((res) => res.data);

  async getCatalog(): Promise<Catalog> {
    const now = Date.now();
    const catalogUrl = `${library_base_url}/catalog.json?time=${now}`;
    const { data } = await this.api.get(catalogUrl);
    // Todo: use error
    return data;
  }

  async get(id: string) : Promise<ChangelogRoot> {
    const changelogUrl = `${library_base_url}/${id}`;
    const { data } = await this.api.get(changelogUrl);
    // Todo: use error
    return data;
  }
}

export default new ChangelogDataService();
