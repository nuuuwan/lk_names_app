export default function DataMapSingle({ regionToNameToCount, selectedName }) {
  let renderedTrs = [];
  for (let [regionId, nameToCount] of Object.entries(regionToNameToCount)) {
    const count = nameToCount[selectedName];
    const key = `tr-${regionId}`;
    const tr = (
      <tr key={key}>
        <td>{regionId}</td>
        <td>{count}</td>
      </tr>
    );
    renderedTrs.push(tr);
  }

  return (
    <table>
      <tbody>{renderedTrs}</tbody>
    </table>
  );
}
