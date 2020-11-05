const request = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');

require('superagent-charset')(request);

/**
 * 获取城镇数据
 * @param {Object} {code,name}
 * 
 */
exports.getTown = function({ name, code, province, city }) {
  return new Promise(async (resolve, reject) => {
    const url = `http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2019/${province}/${city}/${code}.html`;
    try {
      const res = await request.get(url).buffer(true).charset('gb2312');
      if (!res || !res.text) return reject();
      const $ = cheerio.load(res.text);
      const data = [];
      $('table tbody tr.towntr').map((index, item) => {
        if (item.name === 'tr' && item.type === 'tag') {
          const td = item.children.filter(it => it.name === 'td' && it.children.length > 0);
          const json = {
            code: td[0].children[0].children[0].data,
            name: td[1].children[0].children[0].data,
          }
          // 根据 code 不齐数据
          // code,name,province,city,area,town
          json.province = code.substr(0, 2);
          json.city = code.substr(2, 2);
          json.area = code.substr(4, 2);
          json.town = json.code.substr(6, json.code.length - 6);
          data.push(json);
        };
      });
      resolve(data);
    } catch (error) {
      reject({ message: error.message, url });
    }
  });
}

/**
 * 获取省市区数据
 */
exports.getProvinceCity = () => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('=> 获取省市区数据')
      const res = await request.get('http://www.mca.gov.cn//article/sj/xzqh/2020/2020/2020092500801.html');
      if (!res || !res.text) return resolve([]);
      const $ = cheerio.load(res.text);
      const data = [];
      $('table tbody tr').map((index, item) => {
        if (item.name === 'tr' && item.type === 'tag' && item.attribs.height === '19') {
          const td = item.children.filter(it => it.name === 'td' && it.children.length > 0);
          let code = td[0].children[0].children ? td[0].children[0].children[0].data : td[0].children[0].data;
          let name = td[1].children[0].data;
          if (!code.trim()) {
            code = td[0].children[0].next.data;
          }
          if (!name || !name.trim()) {
            name = td[1].children[0].next.data;
          }
          const json = { code, name }
          const province = String(json.code).replace(/0000$/, '')
          if (json.code && province.length === 2) {
            // 省 规则: 后四位 0000
            json.province = province;
            // 省，城市代码为 0
            json.city = 0;
            // 市，区代码为 0
            json.area = 0;
            // 城镇代码为 0
            json.town = 0;
          } else {
            // 省 code
            json.province = province.substr(0, 2);
            // 市 code 
            json.city = province.substr(2, 2);
            // 区 code 规则: 后两位 00
            const area = province.substr(4, 2);
            json.area = area === '00' ? 0 : area;
            // 城镇code 代码为 0
            json.town = 0;
            // 不为 0 的显示城镇代码
          }
          data.push(json);
        }
      });
      resolve(data)
    } catch (error) {
      reject(error);
    }
  });
}

exports.save = async (filePath, data) => {
  filePath = path.join(process.cwd(), 'dist', filePath);
  console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', filePath.replace(process.cwd(), '').replace(new RegExp(`^${path.sep}`), ''));
  await fs.outputFile(filePath, data);
}

/**
 * JSON数组数据，转换成 CSV
 * 
 * ```js
 * [
 *   {
 *     "code": "130000",
 *     "name": "河北省",
 *     "province": "13",
 *     "city": 0,
 *     "area": 0,
 *     "town": 0
 *   }
 * ]
 * // ===> to CSV
 * code,name,province
 * 110000,北京市,11
 * 120000,天津市,12
 * ```
 * 过滤等于 `0` 的值
 */
exports.JSON2CSV = (arr = []) => {
  let csvStr = '';
  arr.forEach((item, idx) => {
    if (idx === 0) {
      csvStr += Object.keys(item).map(name => item[name] !== 0 && name).filter(Boolean).join(',');
    }
    csvStr += '\n';
    csvStr += Object.keys(item).map(name => item[name] !== 0 && item[name]).filter(Boolean).join(',');
  });
  
  return csvStr;
}

/**
 * 过滤 0 值
 * 
 * ```js
 * [
 *   {
 *     "code": "130000",
 *     "name": "河北省",
 *     "province": "13",
 *     "city": 0,
 *     "area": 0,
 *     "town": 0
 *   }
 * ]
 * ```
 * 将上面数据 `city`, `area`, `town` 过滤掉
 * @param {Object[]} arr 省市区数据
 * @param {String[]} keys 需要过滤的数据 如：[`city`]
 */
exports.filterValue = (arr = [], keys = []) => {
  return arr.map(m => {
    const json = {};
    Object.keys(m).forEach(key => {
      if (!keys.includes(key)) {
        json[key] = m[key];
      }
    });
    return json;
  })
}

exports.sleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

