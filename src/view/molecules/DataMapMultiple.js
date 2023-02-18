export default function DataMapMultiple({
  regionToNameToCount,
  selectedNameList,
}) {
  let renderedTrs = [];
  for (let [regionId, nameToCount] of Object.entries(regionToNameToCount)) {
    const filteredNameAndCount = Object.entries(nameToCount)
      .filter(([name, count]) => selectedNameList.includes(name) && count > 0)
      .sort((a, b) => b[1] - a[1]);

    if (filteredNameAndCount.length > 0) {
      const name = filteredNameAndCount[0][0];
      const key = `tr-${regionId}`;
      const tr = (
        <tr key={key}>
          <td>{regionId}</td>
          <td>{name}</td>
        </tr>
      );
      renderedTrs.push(tr);
    }
  }

  return (
    <table>
      <tbody>{renderedTrs}</tbody>
    </table>
  );
}
