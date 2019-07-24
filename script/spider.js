const request = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');

require('superagent-charset')(request);

/**
 * 获取城镇数据
 * @param {Object} {code,name}
 */
async function getTown({ name, code, province, city }) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await request.get(`http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2018/${province}/${city}/${code}.html`).buffer(true).charset('gb2312');
      if (!res || !res.text) return resolve([]);
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
          data.push(json)
        };
      });
      resolve(data);
    } catch (error) {
      resolve([]);
    }
  });
}

/**
 * 获取省市区数据
 */
function getProvinceCity() {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('=> 获取省市区数据')
      const res = await request.get('http://www.mca.gov.cn/article/sj/xzqh/2019/201901-06/201906211421.html');
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
      let totals = data;
      let num = 0;
      const emptyArea = [];
      const func = () => {
        if (data[num]) {
          setTimeout(() => {
            num += 1;
            // 数据请求完成
            if (data.length === num) {
              console.log('emptyArea:', emptyArea);
              return resolve(totals);
            }
            // 市，区代码为 0，不请求数据
            if (data[num] && data[num].area === 0) {
              return func();
            }
            console.log('> Fetch: ', data[num]);
            getTown(data[num]).then((townData) => {
              if (townData && townData.length > 0) {
                // console.log('> Fetch: ', townData.length, data[num].name, data[num].code, data[num].area);
                totals = totals.concat(townData);
              } else {
                if (emptyArea.indexOf(data[num].code) > -1) {
                  emptyArea.push(data[num].code);
                }
              }
              func();
            }).catch((error) => {
              console.log('> error:', error);
            });
          }, 2000);
        }
      }
      func();
    } catch (error) {
      reject(error);
    }
  });
}


async function saveFile(filePath, data) {
  filePath = path.join(process.cwd(), 'dist', filePath);
  console.log('> 数据保存:', filePath);
  await fs.outputFile(filePath, data);
}

async function main() {
  const data = await getProvinceCity();
  console.log(`> 省市区数据：${data.length}`)
  await saveFile('data.json', JSON.stringify(data));
}

main().then(() => process.exit(0)).catch(e => {
  if (e && e.status) {
    console.log('err:=>>', e.status, e.message, e.response.get('date'), e.response.toJSON().method)
    console.log('err:=>>', e.response.toJSON().req.method, e.response.toJSON().req.url)
  } else {
    console.log('err::=>>', e)
  }
  process.exit(-1)
})