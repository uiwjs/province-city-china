/**
 * 数据来源：http://datav.aliyun.com/portal/school/atlas/area_selector
 * ⚠️ 数据需要点击地图拿到 api
 */

const fs = require('fs-extra');
const path = require('path');
const request = require('superagent');
const cheerio = require('cheerio');

require('superagent-charset')(request);

;(async () => {
  const hongkongurl = `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=810000_full`;
  const macauurl = `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=820000_full`;
  try {
    const result = await request.get(hongkongurl).buffer(true);
    let data = [];
    if (result.statusCode !== 200 || !result.body || !Array.isArray(result.body.features)) {
      throw new Error(`${hongkongurl} - ${result.statusCode} - ${result.body}`);
    }
    result.body.features.forEach(item => {
      if (item.properties) {
        const adcode = String(item.properties.adcode)
        data.push({
          code: adcode,
          name: item.properties.name,
          province: adcode.substring(0, 2),
          city: adcode.substring(2, 4),
          area: adcode.substring(4, 6),
        });
      }
    })
    await fs.writeFile('./dist/hongkong.json', JSON.stringify(data, null, 2));
    console.log('  \x1b[32;1m✔\x1b[0m 获取香港 <区> 数据: ./dist/hongkong.json');

    // -----> 保存 hongkong.csv 数据
    let csvData = 'code, name, province, city, area\n';
    [...data].forEach(dt => {
      csvData += ['code', 'name', 'province', 'city', 'area'].map(name => dt[name] || '').join(',') + '\n';
    });
    await fs.outputFile('./dist/hongkong.csv', csvData.replace(/\n$/, ''));
    console.log('  \x1b[32;1m✔\x1b[0m 生成香港 <区> CSV 数据: ./dist/hongkong.csv');

    data = [];
    const resultMacau = await request.get(macauurl).buffer(true);
    if (resultMacau.statusCode !== 200 || !resultMacau.body || !Array.isArray(resultMacau.body.features)) {
      throw new Error(`${hongkongurl} - ${resultMacau.statusCode} - ${resultMacau.body}`);
    }
    resultMacau.body.features.forEach(item => {
      if (item.properties) {
        const adcode = String(item.properties.adcode)
        data.push({
          code: adcode,
          name: item.properties.name,
          province: adcode.substring(0, 2),
          city: adcode.substring(2, 4),
          area: adcode.substring(4, 6),
        });
      }
    })
    await fs.writeFile('./dist/macau.json', JSON.stringify(data, null, 2));
    console.log('  \x1b[32;1m✔\x1b[0m 获取澳门 <区> 数据: ./dist/macau.json');

    // -----> 保存 macau.csv 数据
    csvData = 'code, name, province, city, area\n';
    [...data].forEach(dt => {
      csvData += ['code', 'name', 'province', 'city', 'area'].map(name => dt[name] || '').join(',') + '\n';
    });
    await fs.outputFile('./dist/macau.csv', csvData.replace(/\n$/, ''));
    console.log('  \x1b[32;1m✔\x1b[0m 生成澳门 <区> CSV 数据: ./dist/macau.csv');

  } catch (error) {
    console.log(`ERR:获取<香港>数据[]:`, error);
  }
})();