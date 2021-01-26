declare namespace chinaDivisionProvinceData {
  export type ChinaDivisionProvinceItem = {
    code: string;
    name: string;
    province: string;
  };

  export type ChinaDivisionProvinceData = ChinaDivisionProvinceItem[];
}

declare const chinaDivisionProvinceData: chinaDivisionProvinceData.ChinaDivisionProvinceData;

export = chinaDivisionProvinceData;
