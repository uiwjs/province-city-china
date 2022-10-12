/// <reference types="@province-city-china/types" />

export function sortProvince(arr: ProvinceCityChina.Level[], level?: number): ProvinceCityChina.Level[];
export function findCityChild(arr: ProvinceCityChina.Level[], code: string, level?: number): ProvinceCityChina.City[];
export function findAreaChild(arr: ProvinceCityChina.Level[], code: string, level?: number): ProvinceCityChina.Area[];
