import chinaDivisionLevelData, {
  ChinaDivisionProvinceLevelItem,
  ChinaDivisionAreaLevelItem,
  ChinaDivisionCityLevelItem,
  ChinaDivisionLevelData,
  ChinaDivisionLevelItem,
} from '.';

const data: ChinaDivisionLevelData = chinaDivisionLevelData;
const data2: chinaDivisionLevelData.ChinaDivisionLevelData = chinaDivisionLevelData;
const province: ChinaDivisionLevelItem = chinaDivisionLevelData[0];
const province2: ChinaDivisionProvinceLevelItem = chinaDivisionLevelData[0];
const province3: chinaDivisionLevelData.ChinaDivisionProvinceLevelItem =
  chinaDivisionLevelData[0];
const cityOrArea: ChinaDivisionCityLevelItem | ChinaDivisionAreaLevelItem =
  chinaDivisionLevelData[0].children[0];
const cityOrArea2:
  | chinaDivisionLevelData.ChinaDivisionCityLevelItem
  | chinaDivisionLevelData.ChinaDivisionAreaLevelItem =
  chinaDivisionLevelData[0].children[0];
console.log(chinaDivisionLevelData[0].code);
