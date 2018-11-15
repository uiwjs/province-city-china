中华人民共和国行政区划代码
---

中华人民共和国行政区划（五级）：省级、地级、县级、乡级和村级。

用于查询中国省，市和区数据的工具。 

- [中华人民共和国行政区划代码，更新时间：2018-10-29](http://www.mca.gov.cn/article/sj/xzqh/2018/)  
- [统计用区划和城乡划分代码，更新时间：2018-06-20](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/)

### 安装

```bash
npm install province-city-china --save-dev
```

### 使用

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

| 文件列表 | JSON | CSV | SQL |
| ---- | ---- | ---- | ---- |
| 总数据(省/地/县/乡) | [data.json](./dist/data.json) | [data.csv](./dist/data.csv) | [data.sql](./dist/data.sql) |
| 省/地/县/乡层级数据 | [level.json](./dist/level.json) | - | - |
| 省级(省/直辖市/特别行政区) | [province.json](./dist/province.json) | [province.csv](./dist/province.csv) | - |
| 地级(城市) | [city.json](./dist/city.json) | [city.csv](./dist/city.csv) | - |
| 县级(区县) | [area.json](./dist/area.json) | [area.csv](./dist/area.csv) | - |
| 乡级(乡镇/街) | [town.json](./dist/town.json) | [town.csv](./dist/town.csv) | - |