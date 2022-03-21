/**
 * 1. 获取<省><市><区>数据
 * 2. 获取四个<自治区直辖县级行政区划> !!!需要校验数据数据太老缺失数据
 *    - 42 湖北省
 *    - 46 海南省
 *    - 65 新疆维吾尔自治区
 *    - 41 河南省
 * 3. 处理四个<北京市|上海市|天津市|重庆市>直辖市数据【直辖市区的数据此步骤已获取】
 * 4. 分别存储<省><市><区>数据
 * 5. 缓存<区>数据用于<街道>数据获取，避免中断。
 * 6. 存储一个体积大的<省><市><区>总数据。
 * 7. 存储一个体积大的层级数据。
 */
const FS = require('fs-extra');
const path = require('path');
const { getProvince } = require('./utils');

;(async () => {
  try {
    const { province, city } = await getProvince();
    console.log(`✅ >\x1b[35;1m <省>\x1b[0m数据：${province.length}`);

    // ====================================
    // --------<省,province>数据----------->
    // ====================================
    // 保存 province.json 数据
    const jsonPath = path.resolve(process.cwd(), 'dist/province.json');
    await FS.outputFile(jsonPath, JSON.stringify(province, null, 2));
    console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), jsonPath));

    // 保存 province.csv 数据
    let csvData = 'code,name,province\n';
    province.forEach(dt => csvData += Object.keys(dt).map(name => dt[name]).join(',') + '\n' );
    const csvPath = path.resolve(process.cwd(), 'dist/province.csv');
    await FS.outputFile(csvPath, csvData.replace(/\n$/, ''));
    console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), csvPath));

    // 保存 province.min.json 数据
    const jsonMiniPath = path.resolve(process.cwd(), 'dist/province.min.json');
    await FS.outputFile(jsonMiniPath, JSON.stringify(province.map(item => ({ c: item.code, n: item.name, p: item.province }))));
    console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), jsonMiniPath));

    // ================================
    // --------<市,city>数据----------->
    // ================================
    const cityData = city.filter((item) => !/^(11|31|12|50)$/.test(item.province)).filter((item) => /00$/.test(item.code))
    console.log(`✅ >\x1b[35;1m <市>\x1b[0m数据：${cityData.length}`);
    // 保存 city.json 数据
    const jsonCityPath = path.resolve(process.cwd(), 'dist/city.json');
    await FS.outputFile(jsonCityPath, JSON.stringify(cityData, null, 2));
    console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), jsonCityPath));

    // 保存 city.csv 数据
    let csvCityData = 'code,name,province,city\n';
    cityData.forEach(dt => csvCityData += Object.keys(dt).map(name => dt[name]).join(',') + '\n' );
    const csvCityPath = path.resolve(process.cwd(), 'dist/city.csv');
    await FS.outputFile(csvCityPath, csvCityData.replace(/\n$/, ''));
    console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), csvCityPath));

    // 保存 city.min.json 数据
    const jsonCityMiniPath = path.resolve(process.cwd(), 'dist/city.min.json');
    await FS.outputFile(jsonCityMiniPath, JSON.stringify(cityData.map(item => ({
      c: item.code, n: item.name, p: item.province, y: item.city
    }))));
    console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), jsonCityMiniPath));
    // ================================
    // --------<缓存<区>数据----------->
    // 在通过<区>数据获取<街道>数据时，避免请求中断导致重新获取。
    // ================================
    const cacheCityPath = path.resolve(process.cwd(), '.cache/city.json');
    await FS.outputFile(cacheCityPath, JSON.stringify(cityData, null, 2));

    // ================================
    // --------<区,area>数据----------->
    // ================================
    const areaData = (city.filter((item) => !/00$/.test(item.code))).map(item => ({ ...item, area: item.code.substring(4,6) }));
    console.log(`✅ >\x1b[35;1m <区>\x1b[0m数据：${areaData.length}`);
    // 保存 area.json 数据
    const areaPath = path.resolve(process.cwd(), 'dist/area.json');
    await FS.outputFile(areaPath, JSON.stringify(areaData, null, 2));
    console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), areaPath));

    // 保存 area.csv 数据
    let csvAreaData = 'code,name,province,city,area\n';
    areaData.forEach(dt => csvAreaData += Object.keys(dt).map(name => dt[name]).join(',') + '\n' );
    const csvAreaPath = path.resolve(process.cwd(), 'dist/area.csv');
    await FS.outputFile(csvAreaPath, csvAreaData.replace(/\n$/, ''));
    console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), csvAreaPath));

    // 保存 area.min.json 数据
    const jsonAreaMiniPath = path.resolve(process.cwd(), 'dist/area.min.json');
    await FS.outputFile(jsonAreaMiniPath, JSON.stringify(areaData.map(item => ({
      c: item.code, n: item.name, p: item.province, y: item.city, a: item.area
    }))));
    console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), jsonAreaMiniPath));


    // ================================
    // --------<缓存<区>数据----------->
    // 在通过<区>数据获取<街道>数据时，避免请求中断导致重新获取。
    // ================================
    const cacheAreaPath = path.resolve(process.cwd(), '.cache/area.json');
    await FS.outputFile(cacheAreaPath, JSON.stringify(areaData, null, 2));

    // =================================================
    // --------存储一个体积大的<省><市><区>总数据----------->
    // =================================================
    const allData = [...province].concat([...city]).map((item) => ({ ...item, city: item.code.substring(2,4) || 0, area: item.code.substring(4,6) || 0 }));
    console.log(`✅ >\x1b[35;1m <省><市><区>\x1b[0m总数据：${allData.length}`);
    
    // 保存 data.json 数据
    const allDataPath = path.resolve(process.cwd(), 'dist/data.json');
    await FS.outputFile(allDataPath, JSON.stringify(allData, null, 2));
    console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), allDataPath));

    // 保存 data.min.json 数据
    const allDataMiniPath = path.resolve(process.cwd(), 'dist/data.min.json');
    await FS.outputFile(allDataMiniPath, JSON.stringify(allData.map(item => ({
      c: item.code, n: item.name, p: item.province, y: item.city || 0, a: item.area || 0
    }))));
    console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), allDataMiniPath));

    // 保存 data.csv 数据
    let csvAllData = 'code,name,province,city,area\n';
    [...allData].forEach(dt => {
      csvAllData += ['code', 'name', 'province', 'city', 'area'].map(name => dt[name]).join(',') + '\n';
    });
    const csvAllDataPath = path.resolve(process.cwd(), 'dist/data.csv');
    await FS.outputFile(csvAllDataPath, csvAllData.replace(/\n$/, ''));
    console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), csvAllDataPath));

    // =================================================
    // --------存储一个体积大的层级数据----------->
    // =================================================
    console.log(`✅ >\x1b[35;1m <省市区>\x1b[0m层级数据：`);
    const dataPath = path.resolve(process.cwd(), 'dist/level.json');
    const data = province.map(p => {
      let cData = [...cityData].filter(m => m.province === p.province && /00$/.test(m.code)).map(m => {
        m.children = areaData.filter(a => a.city === m.city && a.province === m.province);
        return m
      });
      if (/^(11|31|12|50)$/.test(p.province) && cData.length === 0) {
        cData = areaData.filter(c => c.province === p.province)
      }
      p.children = cData;
      return p;
    });
    await FS.outputFile(dataPath, JSON.stringify(data, null, 2));
    console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), dataPath));

    const minDataPath = path.resolve(process.cwd(), 'dist/level.min.json');
    const minData = province.map(p => {
      let cData = [...cityData].filter(m => m.province === p.province && /00$/.test(m.code)).map(m => {
        m.children = areaData.filter(a => a.city === m.city && a.province === m.province).map((child) => ({
          c: child.code, n: child.name, p: child.province, d: child.city, a: child.area
        }));
        return { c: m.code, n: m.name, p: m.province, d: m.children };
      });
      if (/^(11|31|12|50)$/.test(p.province) && cData.length === 0) {
        cData = areaData.filter(c => c.province === p.province).map((child) => ({
          c: child.code, n: child.name, p: child.province, d: child.city, a: child.area
        }));
      }
      p.children = cData;
      return { c: p.code, n: p.name, p: p.province, d: p.children };
    });
    await FS.outputFile(minDataPath, JSON.stringify(minData, null, 2));
    console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), minDataPath));

  } catch (error) {
    console.log(error)
    console.log(`\x1b[31;1m ERR:获取<省市区>数据[]\x1b[0m: ${error.massage}`);
  }
})();