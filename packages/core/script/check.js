/**
 * 用国家地名信息库核对<市>下面的区县，缺的补进 area.json。
 */
const path = require('path');
const fs = require('fs-extra');
const { getCityDetail, sleep } = require('./utils');

const cacheCity = path.resolve(process.cwd(), '.cache/city.json');
const areaPath = path.join(process.cwd(), 'dist/area.json');

const loop = async () => {
  if (!fs.existsSync(cacheCity) || !fs.existsSync(areaPath)) {
    console.log('\x1b[31;1m x \x1b[0m请先获取省市区数据');
    return;
  }
  let data = null;
  const cacheData = require(cacheCity);
  const areaData = require(areaPath);
  if (cacheData.length === 0) {
    console.log(' \x1b[32;1m✔\x1b[0m 数据校验完毕！💯');
    return;
  }
  data = cacheData[0];
  try {
    if (!data) {
      console.log(' 💯 > (区)数据校验完毕！');
      return;
    }
    console.log(`  ♻️  校验 ${data.name}(${data.code}/${data.province}${data.city}) 数据`);
    const dataList = await getCityDetail({ code: data.province + data.city, province: data.province });
    dataList.forEach(item => {
      const find = areaData.find(m => m.name === item.name && m.code === item.code);
      if (!find) {
        console.log(`     🚸 补充区信息数据: \x1b[37;1m${item.name}\x1b[0m/${item.code}`);
        areaData.push(item);
      }
    });
    await fs.writeFile(areaPath, JSON.stringify(areaData, null, 2));

    cacheData.shift();
    await fs.writeFile(cacheCity, JSON.stringify(cacheData, null, 2));
    console.log(`     \x1b[32;1m✔\x1b[0m  校验 \x1b[37;1m${data.name}\x1b[0m 完毕！ \x1b[35;1m 还剩下 \x1b[33;1m${cacheData.length}\x1b[0m 数据需要校验！💯`);
    data = null;
    await sleep(2000);
    loop();
  } catch (error) {
    console.log(`     ❌ 校验<区>数据:loop:error:001: ${data.name}/${data.code}`, error.status, error.message, error.url);
    // 数据不存在或者请求错误跳过
    if(error.status === 404 && data) {
      cacheData.shift();
      await fs.writeFile(cacheCity, JSON.stringify(cacheData, null, 2));
    } else {
      console.log(`     ❌ 校验<区>数据:loop:error:002: ${data.name}/${data.code}`, error);
      console.log('     🚸 校验<区>数据:loop:暂停 90s 继续！');
      await sleep(90000);
    }
    loop();
  }
}

loop();