import chinaDivisionData, {
  ChinaDivisionData,
  ChinaDivisionItem,
} from '.';

const data: ChinaDivisionData = chinaDivisionData;
const data2: chinaDivisionData.ChinaDivisionData = chinaDivisionData;
const item: ChinaDivisionItem = chinaDivisionData[0];
const item2: chinaDivisionData.ChinaDivisionItem = chinaDivisionData[0];
console.log(chinaDivisionData[0].code);
