declare namespace countryData {
  export type CountryItem = {
    id: number;
    cnname: string;
    name: string;
    fullname: string;
    alpha2: string;
    alpha3: string;
    numeric: number;
  };
  
  export type CountryData = CountryItem[];
}

declare const countryData: countryData.CountryData;

export = countryData;
