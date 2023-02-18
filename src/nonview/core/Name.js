import Region from "./Region.js";
export default class Name {
  static async listAll() {
    const regionIdx = await Region.idxAll();
    const country = regionIdx["LK"];
    const nameToCount = await country.getNameToCount();
    return Object.keys(nameToCount);
  }
}
