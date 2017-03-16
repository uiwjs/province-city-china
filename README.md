
province city china
---

An util to query china province, city and district data.

### Install

```bash
npm install province-city-china --save-dev
```

### Usage

```js
var provinces = require('province-city-china');

// result ===>

[
  {'id':1,'name':'北京市','parent_id':0,'level':1},
  {'id':2,'name':'天津市','parent_id':0,'level':1},
  {'id':3,'name':'河北省','parent_id':0,'level':1},
  {'id':4,'name':'山西省','parent_id':0,'level':1},
  {'id':5,'name':'内蒙古自治区','parent_id':0,'level':1},
  {'id':6,'name':'辽宁省','parent_id':0,'level':1},
  {'id':7,'name':'吉林省','parent_id':0,'level':1},
  {'id':8,'name':'黑龙江省','parent_id':0,'level':1},
  {'id':9,'name':'上海市','parent_id':0,'level':1},
  ....
]
```

result json

```js
var provinces = require('province-city-china');
provinces.json

// result ===>
[
  {
    "label": "北京市",
    "value": "北京市",
    "children": [
      {
        "label": "东城区",
        "value": "东城区",
        "children": [
          {"label": "东华门街道", "value": "东华门街道"},
          {"label": "东四街道", "value": "东四街道"},
          {"label": "东直门街道", "value": "东直门街道"},
          {"label": "交道口街道", "value": "交道口街道"},
          {"label": "北新桥街道", "value": "北新桥街道"}, 
          {"label": "和平里街道", "value": "和平里街道"},
          {"label": "安定门街道", "value": "安定门街道"},
          {"label": "建国门街道", "value": "建国门街道"},
          {"label": "景山街道", "value": "景山街道"},
          {"label": "朝阳门街道", "value": "朝阳门街道"}
        ]
      },
      ...
    ]
  }
  ....
]
```
