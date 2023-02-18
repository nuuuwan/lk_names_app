import { WWW } from "@nuuuwan/utils-js-dev";

const URL = [
  "https://raw.githubusercontent.com",
  "nuuuwan",
  "gig-data",
  "master",
  "ents",
  "district.tsv",
].join("/");

export const MISSING_DISTRICT_IDS = ["LK-52"];
export const MISSING_DISTRICT_NAMES = ["Ampara"];

const URL_BASE_NAME_TO_COUNT = [
  "https://raw.githubusercontent.com",
  "nuuuwan",
  "lk_names",
  "main",
  "data",
  "most_common",
  "name_to_count",
].join("/");

const SIMILARITY_LIMIT = 0.85;

export default class Region {
  constructor(id, name, districtID) {
    this.id = id;
    this.name = name;
  }

  get urlNameToCount() {
    return URL_BASE_NAME_TO_COUNT + `/${this.id}-${SIMILARITY_LIMIT}.json`;
  }

  async getNameToCount() {
    return await WWW.json(this.urlNameToCount);
  }

  static fromDict(d) {
    return new Region(d["id"], d["name"], d["district_id"]);
  }

  static async fromID(id) {
    const idx = await Region.idx();
    return idx[id];
  }

  static async listAllRegions() {
    const dList = await WWW.tsv(URL);
    return dList.map((d) => Region.fromDict(d));
  }

  static async listAllCountries() {
    return [new Region("LK", "Sri Lanka")];
  }

  static async listAll() {
    const districts = await Region.listAllRegions();
    const countries = await Region.listAllCountries();
    return [...countries, ...districts];
  }

  static async idxAll() {
    const dList = await Region.listAll();
    const idx = {};
    dList.forEach((e) => {
      idx[e.id] = e;
    });
    return idx;
  }
}
