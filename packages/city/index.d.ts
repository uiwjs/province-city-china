declare namespace chinaDivisionCityData {
  export type ChinaDivisionCityItem = {
    code: string;
    name: string;
    province: string;
    city: string;
  };
  
  export type ChinaDivisionCityData = ChinaDivisionCityItem[];
}

declare const chinaDivisionCityData: chinaDivisionCityData.ChinaDivisionCityData;

export = chinaDivisionCityData;
