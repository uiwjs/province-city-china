import chinaDivisionAreaData, {
  ChinaDivisionAreaData,
  ChinaDivisionAreaItem,
} from '.';

const data: ChinaDivisionAreaData = chinaDivisionAreaData;
const data2: chinaDivisionAreaData.ChinaDivisionAreaData = chinaDivisionAreaData;
const item: ChinaDivisionAreaItem = chinaDivisionAreaData[0];
const item2: chinaDivisionAreaData.ChinaDivisionAreaItem = chinaDivisionAreaData[0];
console.log(chinaDivisionAreaData[0].code);
