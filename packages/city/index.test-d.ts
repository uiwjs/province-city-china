import chinaDivisionCityData, {
  ChinaDivisionCityData,
  ChinaDivisionCityItem,
} from '.';

const data: ChinaDivisionCityData = chinaDivisionCityData;
const data2: chinaDivisionCityData.ChinaDivisionCityData = chinaDivisionCityData;
const item: ChinaDivisionCityItem = chinaDivisionCityData[0];
const item2: chinaDivisionCityData.ChinaDivisionCityItem = chinaDivisionCityData[0];
console.log(chinaDivisionCityData[0].code);
