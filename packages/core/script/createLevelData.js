/**
 * 根据省市区数据生成层级数据
 */
const { save } = require('./utils');
const province = require('../dist/province.json');
const city = require('../dist/city.json');
const area = require('../dist/area.json');

;(async () => {
  console.log(`> <省市区>层级数据：`);
  const data = province.map(p => {
    // 获取省下面的市的数据
    let cityData = city.filter(c => c.province === p.province).map(item => {
      /**
       * 湖北有四个市，不知道是放到 `省直辖县级行政区划` 下面还是直接放到 `湖北省` 下面，
       * - 最后参考高德地图，放到 `湖北省` 下面
       * - https://github.com/uiwjs/province-city-china/issues/18
       * - `省直辖县级行政区划`比较特殊，下面没有区，直接是街道
       */
      if (item.city === '90' && item.province === '42') {
        item.children = []
      } else {
        item.children = area.filter(a => a.city === item.city && a.province === item.province);
      }

      return item;
    });
    // 如果没有市数据，获取区的数据 如：北京，上海
    if (cityData.length === 0) {
      cityData = area.filter(c => c.province === p.province);
    }
    p.children = cityData;
    return p;
  });
  await save('level.json', JSON.stringify(data, null, 2));
  console.log(`  ✔ <省市区>层级数据生成完成！`);

})();