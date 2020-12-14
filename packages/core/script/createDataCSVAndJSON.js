/**
 * 将 `data.csv`, `data.json` 数据与 `town.csv`, `town.json` 合并，
 * 并生成 `data.sql`。
 */
const { save, JSON2CSV } = require('./utils');
const data = require('../dist/data.json');
const townData = require('../dist/town.json');

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
  townData.forEach((item) => {
    const find = data.find(m => m.code === item.code);
    if (!find) {
      data.push(item);
    }
  });
  await save('data.json', JSON.stringify(data, null, 2));

  const sqlStr = outPutSQL(data);
  await save('data.sql', sqlStr)
  await save('data.csv', JSON2CSV(data));

})();