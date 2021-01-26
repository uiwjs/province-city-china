declare namespace chinaDivisionTownData {
  export type ChinaDivisionTownItem = {
    code: string;
    name: string;
    province: string;
    city: string;
    area: string;
    town: string;
  };

  export type ChinaDivisionTownData = ChinaDivisionTownItem[];
}

declare const chinaDivisionTownData: chinaDivisionTownData.ChinaDivisionTownData;

export = chinaDivisionTownData;
