const fs = require('fs-extra');
const path = require('path');
const request = require('superagent');
const cheerio = require('cheerio');

require('superagent-charset')(request);

/**
 * 获取<省><市>数据
 * 获取省数据： http://www.mca.gov.cn/article/sj/xzqh/2020/20201201.html
 * @callback
 * ```js
 * {
 *    province: [
 *      {
 *         "code": "420000",
 *         "name": "湖北省",
 *         "province": "42"
 *      },
 *    ],
 *    city: [
 *      {
 *         "code": "421100",
 *         "name": "黄冈市",
 *         "province": "42",
 *         "city": "11"
 *      },
 *    ]
 * }
 * ```
 */
exports.getProvince = async () => {
  try {
    const url = 'http://www.mca.gov.cn/article/sj/xzqh/2020/20201201.html';
    const result = await request.get(url);
    if (!result.text) {
      throw new Error(`请重新请求 ${result.statusCode} \n 请求失败：${url}`)
    }
    const resultData = {
      province: [],
      city: [],
    }
    const $ = cheerio.load(result.text);
    $('table tbody tr[height="19"]').map((_, item) => {
      const data = $(item).text().trim().split('\n').map(str => str.trim());
      if (data && /0000$/.test(data[0])) {
        resultData.province.push({
          code: data[0],
          name: data[1],
          province: data[0].replace(/0000$/, '')
        });
      } else if (data.length > 1) {
        // 310118  青浦区
        //     ^^↖﹏﹏﹏ 第5~6字符串【区】编号
        //   ^^↖﹏﹏﹏﹏ 第3~4字符串【市】编号
        // ^^↖﹏﹏﹏﹏﹏ 第1~2字符串【省】编号
        resultData.city.push({
          code: data[0],
          name: data[1],
          province: data[0].substring(0, 2),
          city: data[0].substring(2, 4),
        });
      } else {
        console.log(`  🚸 NotFound: ${data.toString()} 数据错误`);
      }
    });
    /**
     * 下面有<自治区直辖县级行政区划> 需要单独获取
     * - 42 湖北省
     * - 46 海南省
     * - 65 新疆维吾尔自治区
     * - 41 河南省
     */
    resultData.city.push({
      "code": "429000",
      "name": "湖北省-自治区直辖县级行政区划",
      "province": "42",
      "city": "90"
    });
    resultData.city.push({
      "code": "469000",
      "name": "海南省-自治区直辖县级行政区划",
      "province": "46",
      "city": "90"
    });
    resultData.city.push({
      "code": "659000",
      "name": "新疆维吾尔自治区-自治区直辖县级行政区划",
      "province": "65",
      "city": "90"
    });
    resultData.city.push({
      "code": "419000",
      "name": "河南省-省直辖县级行政区划",
      "province": "41",
      "city": "90"
    });

    // [`新疆维吾尔自治区-自治区直辖县级行政区划`] 缺 `新星市`
    // 数据校验
    console.log(`  🚸 校验数据: 新疆维吾尔自治区-自治区直辖县级行政区划`);
    const xinjiangData = (await this.getCityDetail({
      province: '65',
      code: '6590'
    })).filter(m => !resultData.city.map(c => c.code).includes(m.code));
    resultData.city = resultData.city.concat(xinjiangData);

    // 海南省-三沙市
    console.log(`  🚸 补充数据: 海南省-三沙市 -> 区信息`);
    const shanshaData = (await this.getCityDetail({
      "code": "4603",
      "name": "三沙市",
      "province": "46",
    })).filter(m => !resultData.city.map(c => c.code).includes(m.code));
    resultData.city = resultData.city.concat(shanshaData);

    // const hubeiData = (await this.getCityDetail({
    //   province: '42',
    //   code: '4290'
    // })).filter(m => !resultData.city.map(c => c.code).includes(m.code));
    // resultData.city = resultData.city.concat(hubeiData);

    // const hainanData = (await this.getCityDetail({
    //   province: '46',
    //   code: '4690'
    // })).filter(m => !resultData.city.map(c => c.code).includes(m.code));
    // resultData.city = resultData.city.concat(hainanData);

    // const henanData = (await this.getCityDetail({
    //   province: '41',
    //   code: '4190'
    // })).filter(m => !resultData.city.map(c => c.code).includes(m.code));
    // resultData.city = resultData.city.concat(henanData);
    // console.log('henanData:', henanData)

    return resultData;
  } catch (error) {
    console.log(`获取【省】数据[getProvince]: ${error.message}`);
  }
}

exports.sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 获取区详情数据
 */
exports.getTown = async () => {
  const cacheAreaPath = path.join(process.cwd(), '.cache', 'area.json');
  const notFoundTownPath = path.join(process.cwd(), 'dist', 'not-found-town.json');
  const jsonPath = path.join(process.cwd(), 'dist', 'town.json');
  const csvPath = path.join(process.cwd(), 'dist', 'town.csv');
  if (!fs.existsSync(cacheAreaPath)) {
    console.log('\x1b[31;1m x \x1b[0m请先获取省市区数据');
    return;
  }
  if (!fs.existsSync(jsonPath)) {
    await fs.outputJSON(jsonPath, []);
  }
  let data = null;
  const cacheData = require(cacheAreaPath);
  if (cacheData.length === 0) {
    console.log(' \x1b[32;1m✔\x1b[0m 数据获取完毕！💯');
    const minData = require(jsonPath);
    // 保存 town.min.json 数据
    const minDataPath = path.resolve(process.cwd(), 'dist/town.min.json');
    await fs.outputFile(minDataPath, JSON.stringify(minData.map(item => ({
      c: item.code, n: item.name, p: item.province, y: item.city || 0, a: item.area || 0, town: item.code.substring(6) || 0
    }))));
    console.log(' \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), minDataPath));
    return;
  }
  data = cacheData[0];
  try {
    if (!data) {
      console.log(' 💯 > 乡级(乡镇/街)数据获取完成！');
      return;
    }
    console.log(`  ♻️  获取 ${data.name}(${data.code}/${data.province}${data.city}${data.area}) 数据`);
    const dataList = await this.getCityDetail(data, 'towntr');
    if (!fs.existsSync(csvPath) && dataList && Array.isArray(dataList) && dataList.length > 0) {
      await fs.outputFile(csvPath, Object.keys(dataList[0]).join(','));
    }
    if (dataList && Array.isArray(dataList) && dataList.length > 0) {
      let townJson = await fs.readJSON(jsonPath);
      townJson = townJson.concat(dataList);
      await fs.outputFile(jsonPath, JSON.stringify(townJson, null, 2));

      let csvStr = '';
      dataList.forEach(m => {
        csvStr += '\n';
        csvStr += Object.keys(m).map(v => m[v]).join(',');
      });
      let townCsvStr = await fs.readFile(csvPath);
      townCsvStr += csvStr;
      await fs.outputFile(csvPath, townCsvStr);
      // 获取成功删除第一条数据
      cacheData.shift();
      await fs.outputFile(cacheAreaPath, JSON.stringify(cacheData, null, 2));
    }
    console.log(`     \x1b[32;1m✔\x1b[0m  获取 \x1b[37;1m${data.name}\x1b[0m \x1b[35;1m${(dataList || []).length}\x1b[0m 条数据！还剩下 \x1b[33;1m${cacheData.length}\x1b[0m 数据需要获取！💯`);
    data = null;
    await this.sleep(2000);
    this.getTown();

  } catch (error) {
    if(error && error.message) {
      console.log(`     ❌ getTown:loop:error:001: ${data.name}/${data.code}`, error.status, error.message, error.url);
      // 数据不存在或者请求错误跳过
      if(error.status === 404 && data) {
        if (!fs.existsSync(notFoundTownPath)) {
          await fs.outputJSON(notFoundTownPath, []);
        }
        const notFoundData = require(notFoundTownPath);
        const find = notFoundData.find(m => m.code === data.code && m.name === data.name);
        if (!find) {
          notFoundData.unshift(data);
          await fs.outputFile(notFoundTownPath, JSON.stringify(notFoundData, null, 2));
          console.log(`     🚸 NotFound: ${data.name}(${data.code})`);
        } else {
          console.log(`     🚸 NotFound: ${data.name}(${data.code}) 数据重复`);
        }
        // 获取成功删除第一条数据
        cacheData.shift();
        await fs.outputFile(cacheAreaPath, JSON.stringify(cacheData, null, 2));
      } else {
        console.log('     🚸 getTown:loop:暂停 90s 继续！');
        await this.sleep(90000);
      }
    } else {
      console.log(`     ❌ getTown:loop:error:002: ${data.name}/${data.code}`, error);
      console.log('     🚸 getTown:loop:暂停 90s 继续！');
      await this.sleep(90000);
    }
    this.getTown();
  }
}

/**
 * 获取详情数据
 */
 exports.getCityDetail = async ({ code, province, city }, selecter = 'countytr') => {
  const url = `http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2021/${province}/${city ? city + '/': ''}${code}.html`;
    try {
      console.log(`     👉 URL: \x1b[34;1m${url}\x1b[0m`);
      const result = await request.get(url).buffer(true);
      if (!result.text) {
        throw new Error(`请重新请求 ${result.statusCode} 请求失败：${url}`)
      }
      const $ = cheerio.load(result.text);
      const data = [];
      // tr.towntr
      $(`table tbody tr.${selecter}`).map((_, item) => {
        const code = $(item).children('td:first-child').text();
        const name = $(item).children('td:last-child').text();
        // 429021  神农架林区
        //     ^^↖﹏﹏﹏ 第5~6字符串【区】编号
        //   ^^↖﹏﹏﹏﹏ 第3~4字符串【市】编号
        // ^^↖﹏﹏﹏﹏﹏ 第1~2字符串【省】编号
        const json = {
          code: code.substring(0, 6),
          name: name,
          province: code.substring(0, 2),
          city: code.substring(2, 4),
          area: code.substring(4, 6),
        }
        if (selecter === 'towntr') {
          json.town = code.substring(6);
        }
        data.push(json);
      });
      return data;
    } catch (error) {
      if (error.status === 404) {
        throw error
      }
      // console.log(`  ❌ 获取详情数据[getCityDetail]: ${error.message} ${url}`);
      throw new Error(`  ❌ 请重新请求 ${error.message} \n 请求失败：${url}`)
    }
 }