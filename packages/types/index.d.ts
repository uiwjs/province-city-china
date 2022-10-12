declare namespace ProvinceCityChina {
  type Base = {
    /** 代码 */
    code: string;
    /** 名称 */
    name: string;
  }
  /**
   * 省级(省/直辖市/特别行政区)
   * 
   * ```js
   * [
   *   {
   *     "code": "360000",
   *     "name": "江西省",
   *     "province": "36"
   *   },
   * ]
   * ```
   */
  type Province = Base & {
    /** 省代码 */
    province: string;
  }
  /**
   * 地级(城市)
   * 
   * ```js
   * [
   *   {
   *     "code": "654000",
   *     "name": "伊犁哈萨克自治州",
   *     "province": "65",
   *     "city": "40"
   *   },
   * ]
   * ```
   */
  type City = Province & {
    /** 地级(城市)代码 */
    city: string;
  }
  /**
   * 总数据(省/地/县/乡)
   * 
   * ```js
   * [
   *   {
   *     "code": "621202",
   *     "name": "武都区",
   *     "province": "62",
   *     "city": "12",
   *     "area": "02",
   *     "town": 0
   *   },
   * ]
   * ```
   */
  type Data = City & {
    /** 县级(区县) 代码 */
    area: string;
    /** 乡级(乡镇/街) 代码 */
    town: string | 0;
  }
  /**
   * 县级(区县)
   * 
   * ```js
   * [
   *   {
   *     "code": "422827",
   *     "name": "来凤县",
   *     "province": "42",
   *     "city": "28",
   *     "area": "27"
   *   },
   * ]
   * ```
   */
  type Area = City & {
    /** 县级(区县) 代码 */
    area: string | 0;
  }
  /**
   * 乡级(乡镇/街)
   * 
   * ```js
   * [
   *   {
   *     "code": "110101002000",
   *     "name": "景山街道",
   *     "province": "11",
   *     "city": "01",
   *     "area": "01",
   *     "town": "002000"
   *   },
   * ]
   * ```
   */
  type Town = Area & {
    /** 乡级(乡镇/街) 代码 */
    town: string | 0;
  }
  /**
   * 总数据(省/地/县/乡)层级数据
   */
  type Level = ProvinceCityChina.Province & {
    children?: Array<ProvinceCityChina.City & {
      children?: Array<ProvinceCityChina.Area>;
    }>;
  };
  /**
   * 国家数据
   * 
   * ```js
   * [
   *   {
   *     "id": 240,
   *     "cnname": "瓦利斯和富图纳",
   *     "name": "Wallis and Futuna",
   *     "fullname": "Wallis and Futuna Islands",
   *     "alpha2": "WF",
   *     "alpha3": "WLF",
   *     "numeric": 876
   *   },
   * ]
   * ```
   */
  type Country = {
    id: number,
    cnname: string;
    name: string;
    fullname: string;
    alpha2: string;
    alpha3: string;
    numeric: number
  }
}

declare module 'province-city-china/dist/data.json' {
  type Data = ProvinceCityChina.Data[];
  export default Data;
}
declare module '@province-city-china/data/data.json' {
  type Data = ProvinceCityChina.Data[];
  export default Data;
}
declare module '@province-city-china/data/' {
  type Data = ProvinceCityChina.Data[];
  export default Data;
}

declare module 'province-city-china/dist/area.json' {
  type Area = ProvinceCityChina.Area[];
  export default Area;
}
declare module '@province-city-china/area/' {
  type Area = ProvinceCityChina.Area[];
  export default Area;
}
declare module '@province-city-china/area/area.json' {
  type Area = ProvinceCityChina.Area[];
  export default Area;
}

declare module 'province-city-china/dist/city.json' {
  type City = ProvinceCityChina.City[];
  export default City;
}
declare module '@province-city-china/city/' {
  type City = Array<ProvinceCityChina.City>;
  export default City;
}
declare module '@province-city-china/city/city.json' {
  type City = ProvinceCityChina.City[];
  export default City;
}

declare module 'province-city-china/dist/province.json' {
  type Province = ProvinceCityChina.Province[];
  export default Province;
}
declare module '@province-city-china/province/' {
  type Province = ProvinceCityChina.Province[];
  export default Province;
}
declare module '@province-city-china/province/province.json' {
  type Province = ProvinceCityChina.Province[];
  export default Province;
}

declare module 'province-city-china/dist/town.json' {
  type Town = ProvinceCityChina.Town[];
  export default Town;
}
declare module '@province-city-china/town/' {
  type Town = ProvinceCityChina.Town[];
  export default Town;
}
declare module '@province-city-china/town/town.json' {
  type Town = ProvinceCityChina.Town[];
  export default Town;
}

declare module 'province-city-china/dist/country.json' {
  type Country = ProvinceCityChina.Country[];
  export default Country;
}
declare module '@province-city-china/country/' {
  type Country = ProvinceCityChina.Country[];
  export default Country;
}
declare module '@province-city-china/country/country.json' {
  type Country = ProvinceCityChina.Country[];
  export default Country;
}

declare module 'province-city-china/dist/level.json' {
  type Level = Array<ProvinceCityChina.Level>;
  export default Level;
}
declare module '@province-city-china/level/' {
  type Level = Array<ProvinceCityChina.Level>;
  export default Level;
}
declare module '@province-city-china/level/level.json' {
  type Level = Array<ProvinceCityChina.Level>;
  export default Level;
}
declare module '@province-city-china/utils' {
  export function sortProvince(arr: ProvinceCityChina.Level[], level?: number): ProvinceCityChina.Level[];
  export function findCityChild(arr: ProvinceCityChina.Level[], code: string, level?: number): ProvinceCityChina.City[];
  export function findAreaChild(arr: ProvinceCityChina.Level[], code: string, level?: number): ProvinceCityChina.Area[];
}
declare module 'province-city-china/data' {
  export const data: ProvinceCityChina.Data[];
  export const province: ProvinceCityChina.Province[];
  export const city: ProvinceCityChina.City[];
  export const area: ProvinceCityChina.Area[];
  export const town: ProvinceCityChina.Town[];
  export const level: ProvinceCityChina.Level[];
}

declare module 'province-city-china' {
  export type Base = ProvinceCityChina.Base;
  export type Data = ProvinceCityChina.Data;
  export type Province = ProvinceCityChina.Province;
  export type City = ProvinceCityChina.City;
  export type Area = ProvinceCityChina.Area;
  export type Town = ProvinceCityChina.Town;
  export type Level = ProvinceCityChina.Level;
  export function sortProvince(arr: ProvinceCityChina.Level[], level?: number): ProvinceCityChina.Level[];
  export function findCityChild(arr: ProvinceCityChina.Level[], code: string, level?: number): ProvinceCityChina.City[];
  export function findAreaChild(arr: ProvinceCityChina.Level[], code: string, level?: number): ProvinceCityChina.Area[];
}

declare module '@province-city-china/types' {
  export type Base = ProvinceCityChina.Base;
  export type Data = ProvinceCityChina.Data;
  export type Province = ProvinceCityChina.Province;
  export type City = ProvinceCityChina.City;
  export type Area = ProvinceCityChina.Area;
  export type Town = ProvinceCityChina.Town;
  export type Level = ProvinceCityChina.Level;
  export default ProvinceCityChina
}
