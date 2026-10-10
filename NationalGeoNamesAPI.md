中国国家地名信息库-接口服务
===

国家地名信息库提供好了接口可以使用，这是一个非常好的进步，现在数据通过官方接口更新数据

## 行政区划搜索

行政区划搜索服务根据用户输入的年份和最大查询深度来查询相关的行政区划信息。

```
https://dmfw.mca.gov.cn/9095/xzqh/getList
```

| **参数名称** | **是否必须** | **类型** | **默认值** | **描述（示例）** |
| -------- | -------- | ------- | ------- | ------- |
| year     | 否        | int    |         | 年份，默认为最新年版 |
| code     | 否        | String |         | 行政区划代码 |
| maxLevel | 是        | int    |         | 最大查询深度，最多支持2级深度，0表示仅查询本级，1表示本级及下级区划，2表示查询本级、下级及下下级区划 |

## 地名搜索

地名搜索服务根据输入的地名名称来查询相关地名信息。

```
https://dmfw.mca.gov.cn/9095/stname/listPub
```

请求报文结构

| **参数名称**      | **是否必须** | **类型** | **默认值** | **描述（示例）**  |
| ------------- | -------- | ------ | ------- | ----------- |
| stName        | 是        | String |         | 标准名称        |
| placeTypeCode | 否        | String |         | 类别代码        |
| year          | 否        | int    |         | 年份          |
| searchType    | 否        | String | 模糊      | 匹配方式 精确\|模糊 |
| code          | 否        | String |         | 行政区划代码      |
| page          | 否        | int    |         | 页码          |
| size          | 否        | int    |         | 每页大小        |

响应报文结构

| **参数名称** | | | **描述**           | **类型**    |
| -------- | --------------------------- | ----------- | ---------------- | --------- |
| records  |                             |             | 返回结果集            | Object\[] |
|          | id                          |             | 数据ID             | String    |
|          | place\_code                 |             | 地名代码             | String    |
|          | standard\_name              |             | 标准名称             | String    |
|          | ethnic\_minorities\_writing |             | 少数民族语书写          | String    |
|          | place\_type                 |             | 地名类别             | String    |
|          | place\_type\_code           |             | 地名类别代码           | String    |
|          | province\_name              |             | 省级政区名称           | String    |
|          | city\_name                  |             | 市级政区名称           | String    |
|          | area\_name                  |             | 区县级政区名称          | String    |
|          | area                        |             | 区县级行政代码          | String    |
|          | city                        |             | 市级行政代码           | String    |
|          | province                    |             | 省级行政代码           | String    |
|          | gdm                         |             | 空间坐标信息，GeoJson格式 | Object    |
|          |                             | type        | 类型               | String    |
|          |                             | coordinates | 空间坐标             | Object    |
| total    |                             |             | 数据总数             | int       |


## 地名详情获取

地名详情获取服务根据地名的ID来查询地名的详细信息。

```
https://dmfw.mca.gov.cn/9095/stname/detailsPub
```

请求报文结构

| **参数名称** | **是否必须** | **类型** | **默认值** | **描述（示例）** |
| -------- | -------- | ------ | ------- | ---------- |
| id       | 是        | String |         | 地名ID       |

响应报文结构

| **参数名称**                    |             | **描述**           | **类型** |
| --------------------------- | ----------- | ---------------- | ------ |
| area\_name                  |             | 所在区县名称           | String |
| city\_name                  |             | 所在地市名称           | String |
| old\_name                   |             | 历史地名             | String |
| ethnic\_minorities\_writing |             | 少数民族语书写          | String |
| gdm                         |             | 空间坐标信息，GeoJson格式 | Object |
|                             | type        | 类型               | String |
|                             | coordinates | 空间坐标             | Object |
| government\_history         |             | 政区的历史沿革          | String |
| id                          |             | 数据ID             | String |
| place\_code                 |             | 地名代码             | String |
| place\_history              |             | 地名的历史沿革          | String |
| place\_meaning              |             | 地名的含义            | String |
| place\_origin               |             | 地名的来历            | String |
| place\_type                 |             | 地名类别             | String |
| place\_type\_code           |             | 地名类别代码           | String |
| province\_name              |             | 省级政区名称           | String |
| roman\_alphabet\_spelling   |             | 罗马字母拼写           | String |
| standard\_name              |             | 标准名称             | String |
| area                        |             | 区县级行政代码          | String |
| city                        |             | 市级行政代码           | String |
| province                    |             | 省级行政代码           | String |


## 同名区划统计

同名区划统计服务根据输入的地名名称和年份以及选择的全国或者各省各市来统计对应选择区划（未选择则为全国）的下级区划的地名同名的数量。

```
https://dmfw.mca.gov.cn/9095/datastatis/GroupCountNameByCode
```

请求报文结构

| **参数名称** | **是否必须** | **类型** | **默认值** | **描述（示例）** |
| -------- | -------- | ------ | ------- | ---------- |
| distCode | 否        | String |         | 区划代码       |
| name     | 是        | String |         | 地名         |

响应报文结构

| **参数名称** |       | **描述**   | **类型** |
| -------- | ----- | -------- | ------ |
| data     |       | 接口返回的数据集 |        |
|          | name  | 区划名称     | String |
|          | count | 数量       | int    |
|          | code  | 区划代码     | String |
| message  |       | 服务信息     | String |
| status   |       | 服务状态码    | int    |
| total    |       | 数据总数     | int    |

## 同名类别统计

同名类别统计服务根据选择的区划包括已输入的地名关键字和已选择的年份来统计对应区划内地名类别和同名地名数量。

```
https://dmfw.mca.gov.cn/9095/datastatis/GroupCountNameByType
```


请求报文结构

| **参数名称** | **是否必须** | **类型** | **默认值** | **描述（示例）** |
| -------- | -------- | ------ | ------- | ---------- |
| distCode | 是        | String |         | 区划代码       |
| name     | 是        | String |         | 地名         |


响应报文结构

| **参数名称** |          | **描述**   | **类型** |
| -------- | -------- | -------- | ------ |
| data     |          | 接口返回的数据集 |        |
|          | type     | 地名类别名称   | String |
|          | typeCode | 地名类别代码   | String |
|          | count    | 数量       | int    |
| message  |          | 服务信息     | String |
| status   |          | 服务状态码    | int    |
| total    |          | 数据总数     | int    |

## 同音区划统计

同音区划统计服务根据输入的地名名称和年份以及选择的全国或者各省各市来统计对应选择区划（未选择则为全国）的下级区划的地名同名的数量。

```
https://dmfw.mca.gov.cn/9095/datastatis/GroupCountPinyinByCode
```

请求报文结构

| **参数名称** | **是否必须** | **类型** | **默认值** | **描述（示例）** |
| -------- | -------- | ------ | ------- | ---------- |
| distCode | 否        | String |         | 区划代码       |
| name     | 是        | String |         | 罗马字母拼写     |

响应报文结构

| **参数名称** |       | **描述**   | **类型** |
| -------- | ----- | -------- | ------ |
| data     |       | 接口返回的数据集 |        |
|          | name  | 区划名称     | String |
|          | count | 数量       | int    |
|          | code  | 区划代码     | String |
| message  |       | 服务信息     | String |
| status   |       | 服务状态码    | int    |
| total    |       | 数据总数     | int    |

## 同音类别统计

同音类别统计服务根据选择的区划包括已输入的地名罗马拼音和已选择的年份来统计对应区划内地名类别和同名地名数量。

```
https://dmfw.mca.gov.cn/9095/datastatis/GroupCountPinyinByType
```

请求报文结构

| **参数名称** | **是否必须** | **类型** | **默认值** | **描述（示例）** |
| -------- | -------- | ------ | ------- | ---------- |
| distCode | 是        | String |         | 区划代码       |
| name     | 是        | String |         | 罗马字母拼写     |


响应报文结构

| **参数名称** |          | **描述**   | **类型** |
| -------- | -------- | -------- | ------ |
| data     |          | 接口返回的数据集 |        |
|          | type     | 地名类别名称   | String |
|          | typeCode | 地名类别代码   | String |
|          | count    | 数量       | int    |
| message  |          | 服务信息     | String |
| status   |          | 服务状态码    | int    |
| total    |          | 数据总数     | int    |
