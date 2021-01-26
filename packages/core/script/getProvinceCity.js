/**
 * 获取省市区数据
 */
const fs = require('fs-extra');
const path = require('path');
const { getProvinceCity, filterValue, save, JSON2CSV } = require('./utils');

;(async() => {
  try {
    const data = await getProvinceCity();

    /**
     * 湖北有四个市，不知道是放到 `省直辖县级行政区划` 下面还是直接放到 `湖北省` 下面，
     * - https://github.com/uiwjs/province-city-china/issues/18
     * - `省直辖县级行政区划` 比较特殊
     * - 最后参考小程序和官方数据，放入 `省直辖县级行政区划`
     */
    data.push({
      "code": "429000",
      "name": "省直辖县级行政区划",
      "province": "42",
      "city": "90",
      "area": 0,
      "town": 0
    });
    console.log(`> <省市区>数据：${data.length}`);
    await save('data.json', JSON.stringify(data, null, 2));
    await fs.outputFile(path.join(process.cwd(), '.cache', 'data.json'), JSON.stringify(data, null, 2));
  
    const province = filterValue(data.filter(m => m.city === 0), ['city', 'area', 'town']);
    console.log(`> <省>数据：${province.length}`);
    await save('province.json', JSON.stringify(province, null, 2));
    await save('province.csv', JSON2CSV(province));
  
    const city = filterValue(data.filter(m => m.city !== 0 && m.area === 0 && m.town === 0), ['area', 'town']).filter(m => m.city !== 0);
    console.log(`> <市>数据：${city.length}`);
    await save('city.json', JSON.stringify(city, null, 2));
    await save('city.csv', JSON2CSV(city));
  
    const area = filterValue(data.filter(m => m.city !== 0 && m.area !== 0 && m.town === 0), ['town']).filter(m => m.area !== 0);
    console.log(`> <区>数据：${area.length}`);
    await save('area.json', JSON.stringify(area, null, 2));
    await save('area.csv', JSON2CSV(area));
    console.log('> \x1b[32;1m✔\x1b[0m 省市区:数据生成完成！');

    const cachePath = path.join(process.cwd(), '.cache', 'data.json');
    // 获取乡级(乡镇/街)数据，过滤，市，区代码为 0 的数据
    await fs.outputFile(cachePath, JSON.stringify(data.filter(m => m.area !== 0), null, 2));
    await fs.remove(path.join(process.cwd(), 'dist', 'town.json'));
    await fs.remove(path.join(process.cwd(), 'dist', 'town.csv'));
  } catch (error) {
    console.log('error:', error);
  }
})();