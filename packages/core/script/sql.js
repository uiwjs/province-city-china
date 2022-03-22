/**
 * 将 `data.csv`, `data.json` 数据与 `town.csv`, `town.json` 合并，
 * 并生成 `data.sql`。
 */
const fs = require('fs-extra');
 
const sql = `# ************************************************************
# 中华人民共和国行政区划代码 SQL dump
# Generation Time: ${new Date()}
# ************************************************************

DROP TABLE IF EXISTS \`province\`;
CREATE TABLE \`province\` (
  \`id\` int(11) unsigned NOT NULL AUTO_INCREMENT,
  \`code\` bigint(12) DEFAULT NULL COMMENT '行政区划代码',
  \`name\` varchar(32) DEFAULT NULL COMMENT '名称',
  \`province\` varchar(32) DEFAULT NULL COMMENT '省/直辖市',
  \`city\` varchar(32) DEFAULT NULL COMMENT '市',
  \`area\` varchar(32) DEFAULT NULL COMMENT '区',
  \`town\` varchar(32) DEFAULT NULL COMMENT '城镇地区',
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB;

LOCK TABLES \`province\` WRITE;

INSERT INTO \`province\` (\`id\`, \`code\`, \`name\`, \`province\`, \`city\`, \`area\`, \`town\`)
VALUES
{{sqldata}};

UNLOCK TABLES;
`;
 
 /**
  * 输出 SQL 文件，此为所有数据的输出
  */
 function outPutSQL(arr) {
   let sqldt = arr.map((item, idx) => {
     const dt = Object.keys(item).map(key => {
       if (/(name|city|area|town)/.test(key)) return `'${item[key]}'`;
       return item[key];
     }).join(',');
     return `(${idx + 1},${dt})`;
   })
   return sql.replace(/\{\{sqldata\}\}/g, sqldt.join(',\n'));
 }
 
 ;(async () => {
  const province = require('../dist/province.json');
  const city = require('../dist/city.json');
  const area = require('../dist/area.json');
  const town = require('../dist/town.json');

  const data = [...province, ...city, ...area, ...town].map(item => {
    return { ...item, city: item.city || 0, area: item.area || 0, town: item.town || 0 }
  });
  
  const mindata = [...province, ...city, ...area, ...town].map(item => {
    return { c: item.code, n: item.name, p: item.province, y: item.city || 0, a: item.area || 0, t: item.town || 0 }
  });
  
  console.log(`✅ >\x1b[35;1m <省市区>\x1b[0m数据：`);
  await fs.outputFile('./dist/data.json', JSON.stringify(data, null, 2));
  console.log('  \x1b[32;1m✔\x1b[0m 保存与 <town.json> 合并的数据: ./dist/data.json');
  
  await fs.outputFile('./dist/data.min.json', JSON.stringify(mindata));
  console.log('  \x1b[32;1m✔\x1b[0m 保存与 <town.json> 合并的数据: ./dist/data.min.json');

  console.log(`✅ >\x1b[35;1m <SQL>\x1b[0m数据：`);
  const sqlStr = outPutSQL(data);
  await fs.outputFile('./dist/data.sql', sqlStr);
  console.log('  \x1b[32;1m✔\x1b[0m 数据保存: ./dist/data.sql');

 })();