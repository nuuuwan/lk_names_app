import React from "react";
import DataMapMultiple from "./DataMapMultiple";
import DataMapSingle from "./DataMapSingle";
export default function DataMap({ regionToNameToCount, selectedNameList }) {
  if (selectedNameList.length === 1) {
    return (
      <DataMapSingle
        selectedName={selectedNameList[0]}
        regionToNameToCount={regionToNameToCount}
      />
    );
  }

  return (
    <DataMapMultiple
      selectedNameList={selectedNameList}
      regionToNameToCount={regionToNameToCount}
    />
  );
}
