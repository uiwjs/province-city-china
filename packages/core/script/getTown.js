const fs = require('fs-extra');
const path = require('path');
const { getTown, sleep } = require('./utils');

const rootPath = path.join(process.cwd(), 'dist');
const cachePath = path.join(process.cwd(), '.cache', 'data.json');
const cityeNotFoundTown = path.join(rootPath, 'cityNotFoundTown.json');
const jsonPath = path.join(rootPath, 'town.json');
const csvPath = path.join(rootPath, 'town.csv');

;(async () => {
  if (!fs.existsSync(cachePath)) {
    console.log(' x 请先获取省市区数据');
    return;
  }

  const loop = async () => {
    const cacheData = require(cachePath);
    let itemData = null;
    try {
      if (cacheData.length === 0) {
        console.log(' \x1b[32;1m✔\x1b[0m 数据获取完毕！');
        return;
      }
      itemData = cacheData[0];
      if (!itemData) {
        console.log(' > 乡级(乡镇/街)数据获取完成！')
        return;
      }
  
      if (!fs.existsSync(jsonPath)) {
        await fs.outputJSON(jsonPath, []);
      }
      console.log(`> 获取 ${itemData.name}(${itemData.code} - ${itemData.province}/${itemData.city}/${itemData.area}) 数据`);
      const data = await getTown(itemData);
      itemData = null;
      if (!fs.existsSync(csvPath) && data && Array.isArray(data) && data.length > 0) {
        await fs.outputFile(csvPath, Object.keys(data[0]).join(','));
      }

      if (data && Array.isArray(data) && data.length > 0) {
        let townJson = await fs.readJSON(jsonPath);
        townJson = townJson.concat(data);
        await fs.outputFile(jsonPath, JSON.stringify(townJson, null, 2));

        let csvStr = '';
        data.forEach(m => {
          csvStr += '\n';
          csvStr += Object.keys(m).map(v => m[v]).join(',');
        });
        let townCsvStr = await fs.readFile(csvPath);
        townCsvStr += csvStr;
        await fs.outputFile(csvPath, townCsvStr);

        // 获取成功删除第一条数据
        cacheData.shift();
        await fs.outputFile(cachePath, JSON.stringify(cacheData, null, 2));
      }
      console.log(`  \x1b[32;1m✔\x1b[0m 获取 ${data.length} 条数据！还剩下 ${cacheData.length} 数据需要获取！`);
      await sleep(2000);
      loop();
    } catch (error) {
      if(error && error.message) {
        console.log('loop:error:001:', error.message, error.url);
        // 数据不存在或者请求错误跳过
        if(error.message === 'Not Found' && itemData) {
          if (!fs.existsSync(cityeNotFoundTown)) {
            await fs.outputJSON(cityeNotFoundTown, []);
          }
          const notFoundData = require(cityeNotFoundTown);
          notFoundData.unshift(itemData);
          await fs.outputFile(cityeNotFoundTown, JSON.stringify(notFoundData, null, 2));
          // 获取成功删除第一条数据
          cacheData.shift();
          await fs.outputFile(cachePath, JSON.stringify(cacheData, null, 2));
        } else {
          console.log('loop:暂停 20s 继续！');
          await sleep(20000);
        }
      } else {
        console.log('loop:error:002:', error);
        console.log('loop:暂停 20s 继续！');
        await sleep(20000);
      }
      loop();
    }
  }
  loop();
})();
