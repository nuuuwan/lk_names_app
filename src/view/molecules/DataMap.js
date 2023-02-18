import React from "react";
import DataMapMultiple from "./DataMapMultiple";
import DataMapSingle from "./DataMapSingle";

import "./DataMap.css";

export default function DataMap({
  regionIdx,
  regionToCount,
  regionToNameToCount,
  selectedNameList,
}) {
  if (selectedNameList.length === 1) {
    return (
      <DataMapSingle
        regionIdx={regionIdx}
        selectedName={selectedNameList[0]}
        regionToCount={regionToCount}
        regionToNameToCount={regionToNameToCount}
      />
    );
  }

  return (
    <DataMapMultiple
      regionIdx={regionIdx}
      selectedNameList={selectedNameList}
      regionToCount={regionToCount}
      regionToNameToCount={regionToNameToCount}
    />
  );
}
