export default function DataMapMultiple({
  regionIdx,
  regionToCount,
  regionToNameToCount,
  selectedNameList,
}) {
  let renderedTrs = [];

  let nameToHue = {};
  let iName = 0;
  const nNames = selectedNameList.length;

  for (let [regionId, nameToCount] of Object.entries(regionToNameToCount)) {
    const filteredNameAndCount = Object.entries(nameToCount)
      .filter(([name, count]) => selectedNameList.includes(name) && count > 0)
      .sort((a, b) => b[1] - a[1]);
    const totalCount = regionToCount[regionId];

    if (filteredNameAndCount.length > 0) {
      const [name, count] = filteredNameAndCount[0];

      const PRECISION = 10_000;
      const p = Math.round((PRECISION * count) / totalCount) / PRECISION;
      const pStr =
        p >= 0.005
          ? p.toLocaleString("en", {
              style: "percent",
              maximumSignificantDigits: 2,
            })
          : "-";

      const key = `tr-${regionId}`;

      if (nameToHue[name] === undefined) {
        nameToHue[name] = parseInt((360 * iName) / nNames);
        iName++;
      }
      const hue = nameToHue[name];
      const backgroundColor = `hsla(${hue},100%,50%,0.5)`;
      const styleCustom = { backgroundColor };

      const region = regionIdx[regionId];
      const regionName = region.name;

      const tr = (
        <tr key={key}>
          <td>{regionName}</td>
          <td style={styleCustom}>{name}</td>
          <td>{pStr}</td>
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
