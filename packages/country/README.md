国家和地区代码列表
---

```bash
npm install @province-city-china/country --save-dev
```

[country.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/country.json) | [country.min.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/country.min.json) | [country.csv](https://github.com/uiwjs/province-city-china/blob/gh-pages/country.csv)

<kbd>id=序号</kbd>、<kbd>cnname=中文简称</kbd>、<kbd>name=英文简称</kbd>、<kbd>fullname=英文全称</kbd>、<kbd>alpha2=两字母代码</kbd>、<kbd>alpha3=三字母代码</kbd>、<kbd>numeric=数字代码</kbd>

```js
[
  {
    "id": 1,
    "cnname": "阿富汗",
    "name": "Afghanistan",
    "fullname": "the Islamic Republic of Afghanistan",
    "alpha2": "AF",
    "alpha3": "AFG",
    "town": 4
  },
  {
    "id": 45,
    "cnname": "中国",
    "name": "China",
    "fullname": "the People's Republic of China",
    "alpha2": "CN",
    "alpha3": "CHN",
    "town": 156
  }
  // ...
]
```

压缩数据说明 [country.min.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/country.min.json)

```js
id: 'i'
cnname: 'c'
name: 'n'
fullname: 'f'
alpha2: 'a2'
alpha3: 'a3'
numeric: 'r'
```


| 包名 | 说明  | 版本 |
| ---- | ---- | ---- |
| [province-city-china](https://github.com/uiwjs/province-city-china) | 包含所有包内容 | [![npm package](https://img.shields.io/npm/v/province-city-china.svg)](https://www.npmjs.com/package/province-city-china) |
| [@province-city-china/country](packages/country) | 国家和地区代码列表 | [![npm package](https://img.shields.io/npm/v/@province-city-china/country.svg)](https://www.npmjs.com/package/@province-city-china/country) |
| [@province-city-china/data](packages/data) | 总数据(省/地/县/乡) | [![npm package](https://img.shields.io/npm/v/@province-city-china/data.svg)](https://www.npmjs.com/package/@province-city-china/data) |
| [@province-city-china/province](packages/province) | 省级(省/直辖市/特别行政区) | [![npm package](https://img.shields.io/npm/v/@province-city-china/province.svg)](https://www.npmjs.com/package/@province-city-china/province) |
| [@province-city-china/city](packages/city) | 地级(城市) | [![npm package](https://img.shields.io/npm/v/@province-city-china/city.svg)](https://www.npmjs.com/package/@province-city-china/city) |
| [@province-city-china/area](packages/area) | 县级(区县) | [![npm package](https://img.shields.io/npm/v/@province-city-china/area.svg)](https://www.npmjs.com/package/@province-city-china/area) |
| [@province-city-china/town](packages/town) | 乡级(乡镇/街) | [![npm package](https://img.shields.io/npm/v/@province-city-china/town.svg)](https://www.npmjs.com/package/@province-city-china/town) |
| [@province-city-china/level](packages/level) | 省/地/县/乡层级数据 | [![npm package](https://img.shields.io/npm/v/@province-city-china/level.svg)](https://www.npmjs.com/package/@province-city-china/level) |
| [@province-city-china/utils](packages/utils) | 提供使用数据方法 | [![npm package](https://img.shields.io/npm/v/@province-city-china/utils.svg)](https://www.npmjs.com/package/@province-city-china/utils) |