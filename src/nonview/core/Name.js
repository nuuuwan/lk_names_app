import Region from "./Region.js";
export default class Name {
  static async listAll() {
    const regionIdx = await Region.idxAll();
    const country = regionIdx["LK"];
    const nameToCount = await country.getNameToCount();
    return Object.keys(nameToCount);
  }

  static async regionToNameToCount() {
    const regionIdx = await Region.idxAll();
    const regionIds = Object.keys(regionIdx);
    const nameToCountList = await Promise.all(
      regionIds.map(async function (regionId) {
        const region = regionIdx[regionId];
        const nameToCount = await region.getNameToCount();
        return nameToCount;
      })
    );
    return regionIds.reduce(function (acc, regionId, i) {
      acc[regionId] = nameToCountList[i];
      return acc;
    }, {});
  }
}
