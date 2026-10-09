const fs = require('fs-extra');
const path = require('path');
const request = require('superagent');

/**
 * 国家地名信息库 - 行政区划搜索
 * https://dmfw.mca.gov.cn/9095/xzqh/getList
 * 参数见 NationalGeoNamesAPI.md
 *
 * maxLevel：0 仅本级，1 本级及下级，2 本级、下级及下下级。
 * 返回代码为 12 位，落盘时仍拆成原来的 6 位 code / province / city / area / town。
 *
 * 香港、澳门的区级数据不走这个接口，见 script/hongkong-macau.js。
 */
const XZQH_URL = 'https://dmfw.mca.gov.cn/9095/xzqh/getList';

/** 直辖市没有地级市，区县直接挂在省下面，不补虚拟地级市 */
const MUNICIPALITIES = new Set(['11', '12', '31', '50']);

/**
 * 省直辖县级在接口里直接挂在省下面，没有 419000 这类节点。
 * 继续写入原来的虚拟市，名称与字段保持不变。
 */
const DIRECT_CITY_NAMES = {
  '419000': '河南省-省直辖县级行政区划',
  '429000': '湖北省-自治区直辖县级行政区划',
  '469000': '海南省-自治区直辖县级行政区划',
  '659000': '新疆维吾尔自治区-自治区直辖县级行政区划',
};

/** 台湾代码接口暂缺；香港、澳门下级仍用原来的接口 */
const SKIP_DETAIL_PROVINCE = new Set(['710000', '810000', '820000']);

exports.sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function digits(code) {
  return String(code || '').replace(/\D/g, '');
}

function code6(code) {
  return digits(code).slice(0, 6);
}

/**
 * 调用方传入的 code 可能是 6 位（110101）、4 位（1301 / 6590）或 2 位。
 */
function normalizeQueryCode(code) {
  const raw = digits(code);
  if (raw.length >= 6) return raw.slice(0, 6);
  if (raw.length === 4) return `${raw}00`;
  if (raw.length === 2) return `${raw}0000`;
  return raw;
}

function requestUrl(code, maxLevel) {
  const query = new URLSearchParams({ maxLevel: String(maxLevel) });
  if (code) query.set('code', code);
  return `${XZQH_URL}?${query.toString()}`;
}

function notFound(url) {
  const error = new Error(`请重新请求 404 请求失败：${url}`);
  error.status = 404;
  error.url = url;
  return error;
}

function isRetryable(error) {
  const status = error.status || error.statusCode;
  if (!status) return true;
  return status >= 500 || status === 429;
}

async function fetchXzqh({ code, maxLevel }) {
  const query = { maxLevel };
  if (code) query.code = code;
  const url = requestUrl(code, maxLevel);
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const result = await request
        .get(XZQH_URL)
        .query(query)
        .accept('json')
        .timeout({ response: 20000, deadline: 30000 });
      const body = result.body;
      if (!body || typeof body !== 'object' || body.status !== 200) {
        const error = new Error(`请重新请求 ${result.status} 请求失败：${url}`);
        error.status = result.status;
        error.url = url;
        throw error;
      }
      return body.data || null;
    } catch (error) {
      lastError = error;
      if (!isRetryable(error) || attempt === 3) break;
      await exports.sleep(1500 * attempt);
    }
  }
  throw lastError;
}

/** 省、市列表使用的扁平结构，不含 area */
function toFlat(node) {
  const code = code6(node.code);
  return {
    code,
    name: node.name,
    province: code.slice(0, 2),
    city: code.slice(2, 4),
  };
}

/** 区、街道详情。街道的 town 取 12 位代码的后 6 位 */
function toDetail(node, selector) {
  const code = digits(node.code);
  const six = code.slice(0, 6);
  const json = {
    code: six,
    name: node.name,
    province: six.slice(0, 2),
    city: six.slice(2, 4),
    area: six.slice(4, 6),
  };
  if (selector === 'towntr') {
    json.town = code.slice(6);
  }
  return json;
}

/**
 * 419000 / 429000 / 469000 / 659000 在接口中不存在。
 * 从省级节点里筛出对应前缀的县级单位。
 */
async function fetchDirectCounties(cityCode) {
  const provinceCode = `${cityCode.slice(0, 2)}0000`;
  const prefix = cityCode.slice(0, 4);
  const url = requestUrl(provinceCode, 2);
  console.log(`     👉 URL: \x1b[34;1m${url}\x1b[0m`);
  const node = await fetchXzqh({ code: provinceCode, maxLevel: 2 });
  if (!node) throw notFound(url);
  return (node.children || [])
    .filter((child) => child.level === 3 && code6(child.code).startsWith(prefix))
    .map((child) => toDetail(child, 'countytr'));
}

/**
 * 获取<省><市>数据
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
  const root = await fetchXzqh({ maxLevel: 1 });
  const nodes = (root && root.children) || [];
  const province = [];
  const city = [];
  const list = nodes.map((node) => {
    if (node && node.name === '台湾省' && !/^\d{6}/.test(digits(node.code))) {
      return { ...node, code: '710000000000', name: '台湾省' };
    }
    return node;
  }).filter((node) => /^\d{6}/.test(code6(node && node.code)));

  list.sort((a, b) => code6(a.code).localeCompare(code6(b.code)));

  for (const node of list) {
    const six = code6(node.code);
    province.push({
      code: six,
      name: node.name,
      province: six.slice(0, 2),
    });
    if (SKIP_DETAIL_PROVINCE.has(six)) {
      console.log(`  ⏭️  ${node.name}(${six}) 下级不从国家地名信息库获取`);
      continue;
    }

    const url = requestUrl(six, 2);
    console.log(`  ♻️  获取 ${node.name}(${six})`);
    console.log(`     👉 URL: \x1b[34;1m${url}\x1b[0m`);
    const detail = await fetchXzqh({ code: six, maxLevel: 2 });
    if (!detail) throw notFound(url);

    const directCounties = [];
    (detail.children || []).forEach((child) => {
      if (child.level === 2) {
        city.push(toFlat(child));
        (child.children || []).forEach((grand) => {
          if (grand.level === 3) city.push(toFlat(grand));
        });
      } else if (child.level === 3) {
        directCounties.push(child);
      }
    });

    if (MUNICIPALITIES.has(six.slice(0, 2))) {
      directCounties.forEach((item) => city.push(toFlat(item)));
    } else if (directCounties.length > 0) {
      const cityCodes = new Set();
      directCounties.forEach((item) => {
        const flat = toFlat(item);
        city.push(flat);
        cityCodes.add(`${flat.province}${flat.city}00`);
      });
      cityCodes.forEach((cityCode) => {
        if (city.some((item) => item.code === cityCode)) return;
        city.push({
          code: cityCode,
          name: DIRECT_CITY_NAMES[cityCode] || `${node.name}-省直辖县级行政区划`,
          province: cityCode.slice(0, 2),
          city: cityCode.slice(2, 4),
        });
      });
    }
    await exports.sleep(200);
  }

  return { province, city };
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
    }
    if (dataList && Array.isArray(dataList)) {
      // 没有下级街道时也前进，避免在空结果上反复请求
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
 * selecter = countytr 时返回下级区县，towntr 时返回街道/乡镇。
 * 省直辖虚拟市（xx9000）接口没有对应节点，改从省级数据里筛选。
 */
exports.getCityDetail = async ({ code }, selecter = 'countytr') => {
  const queryCode = normalizeQueryCode(code);
  const maxLevel = 1;
  const url = requestUrl(queryCode, maxLevel);
  try {
    if (selecter !== 'towntr' && queryCode.slice(2, 4) === '90' && queryCode.endsWith('00')) {
      return await fetchDirectCounties(queryCode);
    }
    console.log(`     👉 URL: \x1b[34;1m${url}\x1b[0m`);
    const node = await fetchXzqh({ code: queryCode, maxLevel });
    if (!node) throw notFound(url);
    const level = selecter === 'towntr' ? 4 : 3;
    return (node.children || [])
      .filter((item) => item.level === level)
      .map((item) => toDetail(item, selecter));
  } catch (error) {
    if (error.status === 404) {
      throw error
    }
    throw new Error(`  ❌ 请重新请求 ${error.message} \n 请求失败：${url}`)
  }
}
