import { WWW } from "@nuuuwan/utils-js-dev";
import Region from "./Region.js";

const URL_REGION_TO_COUNT = [
  "https://raw.githubusercontent.com",
  "nuuuwan",
  "lk_names",
  "main",
  "data",
  "region_to_count.json",
].join("/");


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

  static async regionToCount() {
    const regionToCountOriginal = await WWW.json(URL_REGION_TO_COUNT);
    const regionToCount = Object.entries(regionToCountOriginal).reduce(
      function (regionToCount, [regionId, count]) {
        if (regionId.substring(0,3) === 'LK-') {
          regionToCount[regionId] = count;
        }
        return regionToCount;
      },
      {},
    )
    const total = Object.values(regionToCount).reduce((a, b) => a + b, 0);
    regionToCount['LK'] = total;
    return regionToCount;
    
  }
}
