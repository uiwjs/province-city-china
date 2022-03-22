中华人民共和国行政区划代码
===

[![Github Issues](https://img.shields.io/github/issues/uiwjs/province-city-china.svg)](https://github.com/uiwjs/province-city-china/issues) [![Github Forks](https://img.shields.io/github/forks/uiwjs/province-city-china.svg)](https://github.comuiwjs/province-city-china/network) [![Github Stars](https://img.shields.io/github/stars/uiwjs/province-city-china.svg)](https://github.com/uiwjs/province-city-china/stargazers) [![Github Release](https://img.shields.io/github/release/uiwjs/province-city-china.svg)](https://github.com/uiwjs/province-city-china/releases) ![](http://wabg.github.io/sb/status/no-dependencies.svg) [![npm package](https://img.shields.io/npm/v/province-city-china.svg)](https://www.npmjs.com/package/province-city-china)

中华人民共和国行政区划（五级）：省级、地级、县级、乡级和村级。来自中华人民共和国民政部，用于查询中国省，市和区数据的网站。 

```
数据更新时间：2021/03/22 15:39:04 GMT+0800 (中国标准时间)
```

- [中华人民共和国行政区划代码，更新时间：2021-01-04](http://www.mca.gov.cn/article/sj/xzqh/2020/)  
- [统计用区划和城乡划分代码，更新时间：2021-12-30](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/)
- [~~国家和地区代码列表(下载)，更新时间：2011-12-06~~](http://www.mohrss.gov.cn/SYrlzyhshbzb/zhuanti/jinbaogongcheng/Jbgcbiaozhunguifan/201112/t20111206_47429.html) 数据已被删除

### 数据更新 Diff

- [数据更新 2022/03/22](https://github.com/uiwjs/province-city-china/compare/v8.2.0...v8.3.0) 
- [数据更新 2022/03/22](https://github.com/uiwjs/province-city-china/compare/v8.1.0...v8.2.0) 
- [数据更新 2022/02/08](https://github.com/uiwjs/province-city-china/compare/v8.0.0...v8.1.0) 
- [数据更新 2021/05/11](https://github.com/uiwjs/province-city-china/compare/v7.1.3...v8.0.0) 
- [数据更新 2020/11/24](https://github.com/uiwjs/province-city-china/compare/v6.1.1...v7.1.3) 
- [数据更新 2020/11/05](https://github.com/uiwjs/province-city-china/compare/v6.0.3...v6.1.1) 
- [数据更新 2020/07/28](https://github.com/uiwjs/province-city-china/commit/f511f4b) 县以上行政区【没变】，县以下发生变更
- [数据更新 2020/03/30](https://github.com/uiwjs/province-city-china/commit/14cb636)
- [数据更新 2020/03/06](https://github.com/uiwjs/province-city-china/commit/eacab73)
- [数据更新 2019/12/24](https://github.com/uiwjs/province-city-china/commit/85cde25)
- [数据更新 2019/11/25](https://github.com/uiwjs/province-city-china/commit/d001be0)
- [数据更新 2019/11/05](https://github.com/uiwjs/province-city-china/commit/5e9eeba854677018fcb7975dd460c86195b98ccc)
- [数据更新 2019/06/21](https://github.com/uiwjs/province-city-china/commit/77408e62c1945cc3235f68f2b7c7f79be132bf99)

### 安装

```bash
npm install province-city-china --save-dev
```

| 包名 | 说明  | 版本 | 大小 |
| ---- | ---- | ---- | ---- |
| [province-city-china](https://github.com/uiwjs/province-city-china) | 包含所有包内容 | [![npm package](https://img.shields.io/npm/v/province-city-china.svg)](https://www.npmjs.com/package/province-city-china) | - |
| [@province-city-china/country](https://github.com/uiwjs/province-city-china/tree/master/packages/country) | 国家和地区代码列表 | [![npm package](https://img.shields.io/npm/v/@province-city-china/country.svg)](https://www.npmjs.com/package/@province-city-china/country) |![](https://img.shields.io/bundlephobia/min/@province-city-china/country) |
| [@province-city-china/data](https://github.com/uiwjs/province-city-china/tree/master/packages/data) | 总数据(省/地/县/乡) | [![npm package](https://img.shields.io/npm/v/@province-city-china/data.svg)](https://www.npmjs.com/package/@province-city-china/data) | ![](https://img.shields.io/bundlephobia/min/@province-city-china/data) |
| [@province-city-china/province](https://github.com/uiwjs/province-city-china/tree/master/packages/province) | 省级(省/直辖市/特别行政区) | [![npm package](https://img.shields.io/npm/v/@province-city-china/province.svg)](https://www.npmjs.com/package/@province-city-china/province) | ![](https://img.shields.io/bundlephobia/min/@province-city-china/province) |
| [@province-city-china/city](https://github.com/uiwjs/province-city-china/tree/master/packages/city) | 地级(城市) | [![npm package](https://img.shields.io/npm/v/@province-city-china/city.svg)](https://www.npmjs.com/package/@province-city-china/city) | ![](https://img.shields.io/bundlephobia/min/@province-city-china/city) |
| [@province-city-china/area](https://github.com/uiwjs/province-city-china/tree/master/packages/area) | 县级(区县) | [![npm package](https://img.shields.io/npm/v/@province-city-china/area.svg)](https://www.npmjs.com/package/@province-city-china/area) | ![](https://img.shields.io/bundlephobia/min/@province-city-china/area) |
| [@province-city-china/town](https://github.com/uiwjs/province-city-china/tree/master/packages/town) | 乡级(乡镇/街) | [![npm package](https://img.shields.io/npm/v/@province-city-china/town.svg)](https://www.npmjs.com/package/@province-city-china/town) | ![](https://img.shields.io/bundlephobia/min/@province-city-china/town) |
| [@province-city-china/level](https://github.com/uiwjs/province-city-china/tree/master/packages/level) | 总数据(省/地/县/乡)层级数据 | [![npm package](https://img.shields.io/npm/v/@province-city-china/level.svg)](https://www.npmjs.com/package/@province-city-china/level) | ![](https://img.shields.io/bundlephobia/min/@province-city-china/level) |
| [@province-city-china/utils](https://github.com/uiwjs/province-city-china/tree/master/packages/utils) | 提供使用数据方法 | [![npm package](https://img.shields.io/npm/v/@province-city-china/utils.svg)](https://www.npmjs.com/package/@province-city-china/utils) | ![](https://img.shields.io/bundlephobia/min/@province-city-china/utils) |
| [@province-city-china/types](https://github.com/uiwjs/province-city-china/tree/master/packages/types) | 类型文件 | [![npm package](https://img.shields.io/npm/v/@province-city-china/types.svg)](https://www.npmjs.com/package/@province-city-china/types) | - |
| [@province-city-china/district-code](https://github.com/uiwjs/province-city-china/tree/master/packages/district-code) | 国内长途电话区号 | [![npm package](https://img.shields.io/npm/v/@province-city-china/district-code.svg)](https://www.npmjs.com/package/@province-city-china/district-code) | - |

### 使用

```js
const { data, province, city, area, town } = require('province-city-china/data');
```

- `data` - 总数据(省/地/县/乡)
- `province` - 省级(省/直辖市/特别行政区)
- `city` - 地级(城市)
- `area` - 县级(区县)
- `town` - 乡级(乡镇/街)

**所有数据**

```js
const provinces = require('province-city-china/dist/data.json');
// provinces 输出 ===>
[
  {"code":"110000","name":"北京市","province":"11","city":0,"area":0,"town":0},
  {"code":"110101","name":"东城区","province":"11","city":"01","area":"01","town":0},
  {"code":"110102","name":"西城区","province":"11","city":"01","area":"02","town":0},
  {"code":"110105","name":"朝阳区","province":"11","city":"01","area":"05","town":0},
  ....
]
```

规则：

- `province - 省级(省/直辖市/特别行政区)` - `city=0`, `area=0`, `town=0`
- `city - 地级(城市)` - `area=0`, `town=0`
- `area - 县级(区县)` - `town=0` 其它不为 `0`
- `town - 乡级(乡镇/街)` - 所有值不为 `0`

> `province` 第一位表示：华北区`1`，东北区`2`，华东区`3`，中南区`4`，西南区`5`，西北区`6`。 如 `湖北省 -> 42` 以 `4` 开头，表示为 `中南区`。

**获取城市数据**

```js
const city = require('province-city-china/dist/city.json');
// city 输出 ===>
[
  {"code":"01","name":"石家庄市","province":"13"},
  {"code":"02","name":"唐山市","province":"13"},
  {"code":"03","name":"秦皇岛市","province":"13"},
  {"code":"04","name":"邯郸市","province":"13"},
  {"code":"05","name":"邢台市","province":"13"},
  ....
]
```

说明：

- `code` - 城市代码
- `name` - 城市名称
- `province` - 省/直辖市/特别行政区代码

## 更多数据

> 可以通过 [UNPKG](https://unpkg.com/province-city-china/dist/) 下载使用 `CDN` 资源: https://unpkg.com/province-city-china/dist/

| 文件列表 | JSON | CSV | SQL | CDN |
| ---- | ---- | ---- | ---- |  ---- |
| 国家和地区代码列表([#13](https://github.com/uiwjs/province-city-china/issues/13)) | [country.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/country.json) ([min](https://github.com/uiwjs/province-city-china/blob/gh-pages/country.min.json)) | [country.csv](https://github.com/uiwjs/province-city-china/blob/gh-pages/country.csv) | - | [csv](https://unpkg.com/province-city-china/dist/country.csv) / [json](https://unpkg.com/province-city-china/dist/country.json) |
| 总数据(省/地/县/乡) | [data.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/data.json) ([min](https://github.com/uiwjs/province-city-china/blob/gh-pages/data.min.json)) | [data.csv](https://github.com/uiwjs/province-city-china/blob/gh-pages/data.csv) | [data.sql](https://github.com/uiwjs/province-city-china/blob/gh-pages/data.sql) | [data.sql](https://unpkg.com/province-city-china/dist/data.sql) / [csv](https://unpkg.com/province-city-china/dist/data.csv) / [json](https://unpkg.com/province-city-china/dist/data.json) |
| 总数据(省/地/县/乡)层级数据 | [level.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/level.json) ([min](https://github.com/uiwjs/province-city-china/blob/gh-pages/level.min.json)) | - | - | [level.json](https://unpkg.com/province-city-china/dist/level.json) |
| 省级(省/直辖市/特别行政区) | [province.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/province.json) ([min](https://github.com/uiwjs/province-city-china/blob/gh-pages/province.min.json)) | [province.csv](https://github.com/uiwjs/province-city-china/blob/gh-pages/province.csv) | - | [province.json](https://unpkg.com/province-city-china/dist/province.json) / [csv](https://unpkg.com/province-city-china/dist/province.csv) |
| 地级(城市) | [city.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/city.json) ([min](https://github.com/uiwjs/province-city-china/blob/gh-pages/city.min.json)) | [city.csv](https://github.com/uiwjs/province-city-china/blob/gh-pages/city.csv) | - | [city.json](https://unpkg.com/province-city-china/dist/city.json) / [csv](https://unpkg.com/province-city-china/dist/city.csv) |
| 县级(区县) | [area.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/area.json) ([min](https://github.com/uiwjs/province-city-china/blob/gh-pages/area.min.json)) | [area.csv](https://github.com/uiwjs/province-city-china/blob/gh-pages/area.csv) | - | [area.json](https://unpkg.com/province-city-china/dist/area.json) / [csv](https://unpkg.com/province-city-china/dist/area.csv) |
| 乡级(乡镇/街) | [town.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/town.json) ([min](https://github.com/uiwjs/province-city-china/blob/gh-pages/town.min.json)) | [town.csv](https://github.com/uiwjs/province-city-china/blob/gh-pages/town.csv) | - | [town.json](https://unpkg.com/province-city-china/dist/town.json) / [csv](https://unpkg.com/province-city-china/dist/town.csv) |
| 县市区没有乡级数据 | [not-found-town.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/not-found-town.json) ([min](https://github.com/uiwjs/province-city-china/blob/gh-pages/not-found-town.min.json)) | - | - | [not-found-town.json](https://unpkg.com/province-city-china/dist/not-found-town.json) |
| 香港澳门<区>数据 | [hongkong.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/hongkong.json) <br> [macau.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/macau.json)  | - | - | [hongkong.json](https://unpkg.com/province-city-china/dist/hongkong.json) <br> [macau.json](https://unpkg.com/province-city-china/dist/macau.json) |
| 国内长途电话区号 | [district-code.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/district-code.json) | - | - | [district-code.json](https://unpkg.com/province-city-china/dist/district-code.json) |

更多 CDN 数据访问

- https://unpkg.com/province-city-china/dist/city.json
- https://raw.githack.com/uiwjs/province-city-china/gh-pages/city.json
- https://cdn.statically.io/gh/uiwjs/province-city-china/gh-pages/city.json

```bash
✅ > <省>数据：34
  ✔ 数据保存: data/province.json
  ✔ 数据保存: data/province.csv
  ✔ 数据保存: data/province.min.json
✅ > <市>数据：337
  ✔ 数据保存: data/city.json
  ✔ 数据保存: data/city.csv
  ✔ 数据保存: data/city.min.json
✅ > <区>数据：2846
  ✔ 数据保存: data/area.json
  ✔ 数据保存: data/area.csv
  ✔ 数据保存: data/area.min.json
✅ > <省><市><区>总数据：3217
  ✔ 数据保存: data/data.json
  ✔ 数据保存: data/data.min.json
  ✔ 数据保存: data/data.csv
✅ > <省市区>层级数据：
  ✔ 数据保存: data/level.json
  ✔ 数据保存: data/level.min.json
```

### 国家和地区代码列表

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

### 总数据(省/地/县/乡)

[data.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/data.json) | [data.min.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/data.min.json) | [data.csv](https://github.com/uiwjs/province-city-china/blob/gh-pages/data.csv) | [data.sql](https://github.com/uiwjs/province-city-china/blob/gh-pages/data.sql) 

包含香港澳门<区>数据

```js
[
  {
    "code": "110000",
    "name": "北京市",
    "province": "11",
    "city": 0,
    "area": 0,
    "town": 0
  },
  // ...
]
```

压缩数据说明 [data.min.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/data.min.json)

```js
code: 'c'
name: 'n'
province: 'p'
city: 'y'
area: 'a'
town: 't'
```

### 省/地/县/乡层级数据

[level.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/level.json) | [level.min.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/level.min.json)

包含香港澳门<区>数据

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

### 省级(省/直辖市/特别行政区)

[province.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/province.json) | [province.min.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/province.min.json) | [province.csv](https://github.com/uiwjs/province-city-china/blob/gh-pages/province.csv)

```js
[
  {
    "code": "110000",
    "name": "北京市",
    "province": "11"
  },
  {
    "code": "120000",
    "name": "天津市",
    "province": "12"
  },
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

### 地级(城市)

[city.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/city.json) | [city.min.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/city.min.json) | [city.csv](https://github.com/uiwjs/province-city-china/blob/gh-pages/city.csv)

```js
[
  {
    "code": "130100",
    "name": "石家庄市",
    "province": "13",
    "city": "01"
  },
  // ...
]
```

压缩数据说明 [city.min.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/city.min.json)

```js
code: 'c'
name: 'n'
province: 'p'
city: 'y'
```

### 县级(区县)

[area.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/area.json) | [area.min.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/area.min.json) | [area.csv](https://github.com/uiwjs/province-city-china/blob/gh-pages/area.csv)

```js
[
  {
    "code": "110101",
    "name": "东城区",
    "province": "11",
    "city": "01",
    "area": "01"
  },
  // ...
]
```

压缩数据说明 [city.min.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/city.min.json)

```js
code: 'c'
name: 'n'
province: 'p'
city: 'y'
area: 'a'
```

### 乡级(乡镇/街)

[town.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/town.json) | [town.min.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/town.min.json) | [town.csv](https://github.com/uiwjs/province-city-china/blob/gh-pages/town.csv)

```js
[
  {
    "code": "110101001000",
    "name": "东华门街道",
    "province": "11",
    "city": "01",
    "area": "01",
    "town": "001000"
  },
  // ...
]
```

压缩数据说明 [city.min.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/city.min.json)

```js
code: 'c'
name: 'n'
province: 'p'
city: 'y'
area: 'a'
town: 't'
```

### 县市区没有乡级数据

[not-found-town.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/not-found-town.json) | [not-found-town.min.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/not-found-town.min.json)

```js
[
  {
    "code": "659010",
    "name": "胡杨河市",
    "province": "65",
    "city": "90",
    "area": "10",
    "town": 0
  },
  // ...
]
```

压缩数据说明 [not-found-town.min.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/not-found-town.min.json)

```js
code: 'c'
name: 'n'
province: 'p'
city: 'y'
area: 'a'
town: 't'
```

### 香港澳门<区>数据

[hongkong.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/hongkong.json) | [macau.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/macau.json)

```js
[
  {
    "code": "810002",
    "name": "湾仔区",
    "province": "81",
    "city": "00",
    "area": "02"
  },
  // ...
]
```

### 国内长途电话区号

[district-code.json](https://github.com/uiwjs/province-city-china/blob/gh-pages/district-code.json)

```js
[
  { "name": "北京市", "code": "010" },
  // ...
]
```

## 脚本获取数据说明

### ① 获取<省><市>数据

在 [中华人民共和国民政部-总省市区数据](http://www.mca.gov.cn/article/sj/xzqh/2020/20201201.html) 上有完整的公开省市区数据。

获取省数据： http://www.mca.gov.cn/article/sj/xzqh/2020/20201201.html 

### ② 校验四个<自治区直辖县级行政区划> & 以及其它数据

省市区数据来源于 ~~[中华人民共和国民政部-总省市区数据](http://www.mca.gov.cn/article/sj/xzqh/2020/20201201.html)~~，数据太老，`自治区直辖县级行政区划` 中有数据不存在，校验此数据。

🚧 注意：部分省份下面有 `省直辖县级行政区划` 如([湖北省](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2021/42.html)、[河南省](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2021/41.html)等)，需要将此部分数据重新爬下来进行校验数据，如 [`新疆维吾尔自治区-自治区直辖县级行政区划`] 缺 `新星市`。

为提升速度，通过 `标记` 校验哪些特殊省份有这类数据。

```bash
http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2021/<省>/<省><自治区直辖县级行政区划>.html

- 42 湖北省         -> # 自治区直辖县级行政区划
- 46 海南省         -> # 自治区直辖县级行政区划
- 65 新疆维吾尔自治区 -> # 自治区直辖县级行政区划
- 41 河南省         -> # 省直辖县级行政区划
# - 46 重庆市 -> 🚧 县
# - 23 黑龙江省 -> 🚧 大兴安岭地区
```

上面 `4` 个省区比较特殊的 `自治区直辖县级行政区划`，都有独立的 `城市` 代码，里面的数据拥有 `区` 代码，所以放到 `区` 数据中，例如：湖北省的 `自治区直辖县级行政区划` 编码为 `90`

```js
[
  { code: '429004', name: '仙桃市', province: '42', city: '90' },
  { code: '429005', name: '潜江市', province: '42', city: '90' },
  { code: '429006', name: '天门市', province: '42', city: '90' },
  { code: '429021', name: '神农架林区', province: '42', city: '90' }
]
```

### ③ 处理四个<北京市|上海市|天津市|重庆市>直辖市数据

在 ① 步已获取直辖市数据：http://www.mca.gov.cn/article/sj/xzqh/2020/20201201.html

🚧 这里只是在生成层级数据的时候，需要特殊处理，因为它只有市区数据。

### ④ 分别存储<省><市><区>数据

分别存储 <省><市><区> 提供 `csv`, `min.json`, `level.json`, `level.min.json` 等数据。

### ⑤ 缓存<区>数据

此数据用于<街道>数据获取，避免中断从头爬数据。

### ⑥ 通过<街道>数据获取街道数据

```bash
□□□□□□  □□□  □□□
┈┈┬┈┈┈  ┈┬┈  ┈┬┈
  ╰┈┈┈┈┈┈┆┈┈┈┈┆┈┈┈┈→ ¹<省市区>代码
         ╰┈┈┈┈┆┈┈┈┈→ ²<乡镇街道>代码
              ╰┈┈┈┈→ ³<居民委员会>和<村民委员会>的代码
```

第²二段代码

1. 001—099 表示街道的代码，应在本地区的范围内由小到大顺序编写；
2. 100—199 表示镇的代码，应在本地区的范围内由小到大顺序编写；
3. 200—399 表示乡的代码，应在本地区的范围内由小到大顺序编写；
4. 400—599 表示政企合一单位的代码，应在本地区的范围内由小到大顺序编写。

第³三段代码

1. 居民委员会的代码从001—199由小到大顺序编写；
2. 村民委员会的代码从200-399由小到大顺序编写。

## 参考链接

- [国家统计局 - 行政区划代码](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/)
- [民政部 - 中华人民共和国行政区划代码](http://www.mca.gov.cn/article/sj/xzqh)
- [高德地图 - 行政区划](https://lbs.amap.com/api/webservice/guide/api/district)
- [维基百科 - 中华人民共和国行政区划](https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E8%A1%8C%E6%94%BF%E5%8C%BA%E5%88%92)
- [维基百科 - 中华人民共和国行政区划代码](https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E8%A1%8C%E6%94%BF%E5%8C%BA%E5%88%92%E4%BB%A3%E7%A0%81)
- [统计上使用的县以下行政区划代码编制规则](http://www.mca.gov.cn/article/sj/xzqh/1980/201507/20150715854849.shtml)
- [民政统计代码编制规则](http://www.mca.gov.cn/article/sj/xzqh/1980/201507/20150715854848.shtml)
- [国家和地区代码列表（下载）](http://www.mohrss.gov.cn/SYrlzyhshbzb/zhuanti/jinbaogongcheng/Jbgcbiaozhunguifan/201112/t20111206_47429.html)
- [长途区号-行政区划对照表(修订稿)，更新时间：2010-01-15](http://www.gov.cn/gzdt/2010-01/15/content_1511043.htm)

## Contributors

<a href="https://github.com/uiwjs/province-city-china/graphs/contributors">
  <img src="https://uiwjs.github.io/province-city-china/CONTRIBUTORS.svg" />
</a>

## License

[MIT](./LICENSE)
