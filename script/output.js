const fs = require('fs-extra');
const path = require('path');
const totalData = require('../dist/data.json');

/**
 * 保存文件
 * @param {String} filePath 文件名称
 * @param {String} data 需要保存的数据
 */
async function saveFile(filePath, data) {
  filePath = path.join(process.cwd(), 'dist', filePath);
  await fs.outputFile(filePath, data);
  console.log('> 数据保存:', filePath);
}

const sql = `# ************************************************************
# 中华人民共和国行政区划代码 SQL dump
# Generation Time: ${new Date()}
# ************************************************************

DROP TABLE IF EXISTS \`province\`;
CREATE TABLE \`province\` (
  \`id\` int(11) unsigned NOT NULL AUTO_INCREMENT,
  \`code\` int(11) DEFAULT NULL COMMENT '行政区划代码',
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

/**
 * 数组数据转CSV数据
 */
function outPutCSV(arr) {
  let csvStr = '';
  arr.forEach((item, idx) => {
    if (idx === 0) {
      csvStr = Object.keys(item).join(',');
    }
    csvStr += '\n';
    csvStr += Object.keys(item).map(name => item[name]).join(',');
  });
  return csvStr;
}

/**
 * 返回【省/直辖市/特别行政区】的数据
 */
function provinceData(arr) {
  return arr.filter(item => item.city === 0 && item.area === 0 && item.town === 0)
    .map(item => {
      item.code = Number(item.province);
      delete item.province;
      delete item.city;
      delete item.area;
      delete item.town;
      return item;
    });
}

/**
 * 返回【城市】的数据
 */
function getCityData(arr) {
  return arr.filter(item => item.city !== 0 && item.area === 0 && item.town === 0)
    .map(item => {
      item.code = item.city;
      delete item.city;
      delete item.area;
      delete item.town;
      return item;
    });
}

/**
 * 返回【区县】的数据
 */
function getAreaData(arr) {
  return arr.filter(item => item.city !== 0 && item.area !== 0 && item.town === 0)
    .map(item => {
      item.code = item.area;
      delete item.area;
      delete item.town;
      return item;
    });
}

/**
 * 返回【城镇】的数据
 */
function getTownData(arr) {
  return arr.filter(item => item.city !== 0 && item.area !== 0 && item.town !== 0)
    .map((item, idx) => {
      item.code = item.town;
      delete item.town;
      return { ...item };
    });
}

async function main() {
  console.log(`> 省市区数据：${totalData.length}`);
}

main()
  .then(() => outPutSQL(totalData))
  .then(dt => saveFile('data.sql', dt))
  .then(() => outPutCSV(totalData))
  .then(dt => saveFile('data.csv', dt))
  .then(() => getTownData(totalData))
  .then(async (dt) => {
    await saveFile('town.json', JSON.stringify(dt));
    await saveFile('town.csv', outPutCSV(dt));
  })
  .then(() => provinceData(totalData))
  .then(async (dt) => {
    await saveFile('province.json', JSON.stringify(dt));
    await saveFile('province.csv', outPutCSV(dt));
  })
  .then(() => getCityData(totalData))
  .then(async (dt) => {
    await saveFile('city.json', JSON.stringify(dt));
    await saveFile('city.csv', outPutCSV(dt));
  })
  .then(() => getAreaData(totalData))
  .then(async (dt) => {
    await saveFile('area.json', JSON.stringify(dt));
    await saveFile('area.csv', outPutCSV(dt));
  })
  .then(() => process.exit(0))
  .catch(e => {
    if (e) {
      console.log('err::=>>', e);
    }
    process.exit(-1);
  })