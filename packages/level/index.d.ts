declare namespace chinaDivisionLevelData {
  export type ChinaDivisionAreaLevelItem = {
    code: string;
    name: string;
    province: string;
    city: string;
    area: string;
  };

  export type ChinaDivisionCityLevelItem = {
    code: string;
    name: string;
    province: string;
    city: string;
    children: ChinaDivisionAreaLevelItem[];
  };

  export type ChinaDivisionProvinceLevelItem = {
    code: string;
    name: string;
    province: string;
    children: ChinaDivisionCityLevelItem[] | ChinaDivisionAreaLevelItem[];
  };

  export type ChinaDivisionLevelItem = ChinaDivisionProvinceLevelItem;

  export type ChinaDivisionLevelData = ChinaDivisionLevelItem[];
}

declare const chinaDivisionLevelData: chinaDivisionLevelData.ChinaDivisionLevelData;

export = chinaDivisionLevelData;
