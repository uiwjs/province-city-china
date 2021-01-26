import chinaDivisionTownData, {
  ChinaDivisionTownData,
  ChinaDivisionTownItem,
} from '.';

const data: ChinaDivisionTownData = chinaDivisionTownData;
const data2: chinaDivisionTownData.ChinaDivisionTownData = chinaDivisionTownData;
const item: ChinaDivisionTownItem = chinaDivisionTownData[0];
const item2: chinaDivisionTownData.ChinaDivisionTownItem = chinaDivisionTownData[0];
console.log(chinaDivisionTownData[0].code);
