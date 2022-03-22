/// <reference types="@province-city-china/types" />

declare module 'province-city-china/data' {
  export const data: ProvinceCityChina.Data[];
  export const province: ProvinceCityChina.Province[];
  export const city: ProvinceCityChina.City[];
  export const area: ProvinceCityChina.Area[];
  export const town: ProvinceCityChina.Town[];
  export const level: ProvinceCityChina.Level[];
}

export function sortProvince(arr: ProvinceCityChina.Level[], level?: number): ProvinceCityChina.Level[];
export function findCityChild(arr: ProvinceCityChina.Level[], code: string, level?: number): ProvinceCityChina.City[];
export function findAreaChild(arr: ProvinceCityChina.Level[], code: string, level?: number): ProvinceCityChina.Area[];
