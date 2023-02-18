import "./DataMap.css";

export default function DataMap({
  regionIdx,
  regionToCount,
  regionToNameToCount,
  selectedNameList,
}) {
  let trList = [];

  let thList = [<th>Region</th>];
  for (let selectedName of selectedNameList) {
    const keyCell = 'header-cell-' + selectedName;
    thList.push(
      <th key={keyCell}>          
        {selectedName}
       </th> 
    );
  }      


  for (let [regionId, nameToCount] of Object.entries(regionToNameToCount)) {
    const totalCount = regionToCount[regionId];
    if (!totalCount) {
      continue;
    }
    const region = regionIdx[regionId];
    const regionName = region.name;

    const filteredNameAndCount = Object.entries(nameToCount).filter((item) => selectedNameList.includes(item[0])).sort((a, b) => b[1] - a[1]);
    
    if (filteredNameAndCount.length === 0) {
      continue;
    }

    const keyRow = 'row-' + regionId;
    let tdList = [];
    for (let iSelectedName in selectedNameList) {
      const selectedName = selectedNameList[iSelectedName];
      const keyCell = keyRow + '-cell-' + selectedName;
      const count = nameToCount[selectedName] || 0;
      const p = count / totalCount;
      const pStr = p.toLocaleString(undefined, { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 });

      
      const isHighest = filteredNameAndCount[0][0] === selectedName;
      let backgroundColor = 'white';
      if (isHighest) {
        const hue = parseInt(360 * iSelectedName / selectedNameList.length);
        backgroundColor = `hsla(${hue}, 100%, 50%, 0.5)`;
      }

      const fontSize = 12;
      
      tdList.push(
        <td key={keyCell} className={"td-right"} style={{backgroundColor, fontSize}}>          
          {pStr}
         </td> 
      );
    }      
    
    const tr = (
      <tr key={keyRow}>
        <td>{regionName}</td>  
        {tdList}    
      </tr>
    );
    trList.push(tr);
  }

  return (
    <table>
      <thead><tr>{thList}</tr></thead>
      <tbody>{trList}</tbody>
    </table>
  );
}
