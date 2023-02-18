export default function DataMapSingle({
  regionIdx,
  regionToCount,
  regionToNameToCount,
  selectedName,
}) {
  let renderedTrs = [];
  for (let [regionId, nameToCount] of Object.entries(regionToNameToCount)) {
    const count = nameToCount[selectedName];
    const totalCount = regionToCount[regionId];

    const PRECISION = 10_000;
    const p = Math.round((PRECISION * count) / totalCount) / PRECISION;
    const pStr =
      p >= 0.005
        ? p.toLocaleString("en", {
            style: "percent",
            maximumSignificantDigits: 2,
          })
        : "-";

    const region = regionIdx[regionId];
    const regionName = region.name;

    const key = `tr-${regionId}`;
    const tr = (
      <tr key={key}>
        <td>{regionName}</td>
        <td>{pStr}</td>
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
