省/地/县/乡层级数据
---

```bash
npm install @province-city-china/level --save-dev
```

[level.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/level.json) | [level.min.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/level.min.json)

```js
[
  {
    "code": "420000",
    "name": "湖北省",
    "province": "42",
    "children": [
      {
        "code": "420100",
        "name": "武汉市",
        "province": "42",
        "city": "01",
        "children": [
          {
            "code": "420102",
            "name": "江岸区",
            "province": "42",
            "city": "01",
            "area": "02"
          },
          // ...
        ]
      }
      // ...
    ]
  }
  // ...
]
```

压缩数据说明 [level.min.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/level.min.json)

```js
code: 'c'
name: 'n'
province: 'p'
city: 'y'
area: 'a'
children: 'd'
```


| 包名 | 说明  | 版本 | 大小 |
| ---- | ---- | ---- | ---- |
| [province-city-china](https://github.com/uiwjs/province-city-china) | 包含所有包内容 | [![npm package](https://img.shields.io/npm/v/province-city-china.svg)](https://www.npmjs.com/package/province-city-china) | - |
| [@province-city-china/country](packages/country) | 国家和地区代码列表 | [![npm package](https://img.shields.io/npm/v/@province-city-china/country.svg)](https://www.npmjs.com/package/@province-city-china/country) |![](https://img.shields.io/bundlephobia/min/@province-city-china/country) |
| [@province-city-china/data](packages/data) | 总数据(省/地/县/乡) | [![npm package](https://img.shields.io/npm/v/@province-city-china/data.svg)](https://www.npmjs.com/package/@province-city-china/data) | ![](https://img.shields.io/bundlephobia/min/@province-city-china/data) |
| [@province-city-china/province](packages/province) | 省级(省/直辖市/特别行政区) | [![npm package](https://img.shields.io/npm/v/@province-city-china/province.svg)](https://www.npmjs.com/package/@province-city-china/province) | ![](https://img.shields.io/bundlephobia/min/@province-city-china/province) |
| [@province-city-china/city](packages/city) | 地级(城市) | [![npm package](https://img.shields.io/npm/v/@province-city-china/city.svg)](https://www.npmjs.com/package/@province-city-china/city) | ![](https://img.shields.io/bundlephobia/min/@province-city-china/city) |
| [@province-city-china/area](packages/area) | 县级(区县) | [![npm package](https://img.shields.io/npm/v/@province-city-china/area.svg)](https://www.npmjs.com/package/@province-city-china/area) | ![](https://img.shields.io/bundlephobia/min/@province-city-china/area) |
| [@province-city-china/town](packages/town) | 乡级(乡镇/街) | [![npm package](https://img.shields.io/npm/v/@province-city-china/town.svg)](https://www.npmjs.com/package/@province-city-china/town) | ![](https://img.shields.io/bundlephobia/min/@province-city-china/town) |
| [@province-city-china/level](packages/level) | 省/地/县/乡层级数据 | [![npm package](https://img.shields.io/npm/v/@province-city-china/level.svg)](https://www.npmjs.com/package/@province-city-china/level) | ![](https://img.shields.io/bundlephobia/min/@province-city-china/level) |
| [@province-city-china/utils](packages/utils) | 提供使用数据方法 | [![npm package](https://img.shields.io/npm/v/@province-city-china/utils.svg)](https://www.npmjs.com/package/@province-city-china/utils) | ![](https://img.shields.io/bundlephobia/min/@province-city-china/utils) |