/**
 * 合并省、市、区、乡和香港、澳门，写入 data.json / data.min.json / data.csv。
 * 这是总数据文件。只写省市区会把乡级记录盖掉。
 */
const fs = require('fs-extra');
const path = require('path');

function readJson(name) {
  const file = path.resolve(process.cwd(), 'dist', name);
  if (!fs.existsSync(file)) return [];
  return fs.readJsonSync(file);
}

async function writeMergedData() {
  const province = readJson('province.json');
  const city = readJson('city.json');
  const area = readJson('area.json');
  const town = readJson('town.json');
  const hongkong = readJson('hongkong.json');
  const macau = readJson('macau.json');
  const data = [...province, ...city, ...area, ...town, ...hongkong, ...macau].map((item) => ({
    ...item,
    city: item.city || 0,
    area: item.area || 0,
    town: item.town || 0,
  }));
  const mindata = data.map((item) => ({
    c: item.code,
    n: item.name,
    p: item.province,
    y: item.city || 0,
    a: item.area || 0,
    t: item.town || 0,
  }));

  console.log(`✅ >\x1b[35;1m <省/地/县/乡>\x1b[0m总数据：${data.length}（省 ${province.length}，市 ${city.length}，区 ${area.length}，乡 ${town.length}，香港 ${hongkong.length}，澳门 ${macau.length}）`);

  const jsonPath = path.resolve(process.cwd(), 'dist/data.json');
  await fs.outputFile(jsonPath, JSON.stringify(data, null, 2));
  console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), jsonPath));

  const minPath = path.resolve(process.cwd(), 'dist/data.min.json');
  await fs.outputFile(minPath, JSON.stringify(mindata));
  console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), minPath));

  let csvAllData = 'code,name,province,city,area,town\n';
  data.forEach((dt) => {
    csvAllData += ['code', 'name', 'province', 'city', 'area', 'town'].map((name) => dt[name] || '').join(',') + '\n';
  });
  const csvPath = path.resolve(process.cwd(), 'dist/data.csv');
  await fs.outputFile(csvPath, csvAllData.replace(/\n$/, ''));
  console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), csvPath));

  return data;
}

module.exports = { writeMergedData };
