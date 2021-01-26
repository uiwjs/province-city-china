declare namespace chinaDivisionAreaData {
  export type ChinaDivisionAreaItem = {
    code: string;
    name: string;
    province: string;
    city: string;
    area: string;
  };
  
  export type ChinaDivisionAreaData = ChinaDivisionAreaItem[];
}

declare const chinaDivisionAreaData: chinaDivisionAreaData.ChinaDivisionAreaData;

export = chinaDivisionAreaData;
