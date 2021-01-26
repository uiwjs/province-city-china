import countryData, {
  CountryData,
  CountryItem,
} from '.';

const data: CountryData = countryData;
const data2: countryData.CountryData = countryData;
const item: CountryItem = countryData[0];
const item2: countryData.CountryItem = countryData[0];
console.log(countryData[0].cnname);
