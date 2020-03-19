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
      item.children = area.filter(a => a.city === item.city && a.province === item.province);
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