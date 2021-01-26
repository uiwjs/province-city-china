declare namespace chinaDivisionData {
  export type ChinaDivisionItem = {
    code: string;
    name: string;
    province: string;
    city: string | 0;
    area: string | 0;
    town: string | 0;
  };
  
  export type ChinaDivisionData = ChinaDivisionItem[];
}

declare const chinaDivisionData: chinaDivisionData.ChinaDivisionData;

export = chinaDivisionData;
