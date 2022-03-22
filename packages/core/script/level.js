const path = require('path');
const FS = require('fs-extra');
const city = require('../dist/city.json')
const area = require('../dist/area.json')
const hongkong = require('../dist/hongkong.json')
const macau = require('../dist/macau.json')
const province = require('../dist/province.json')

;(async () => {
  try {
    // =================================================
    // --------存储一个体积大的层级数据----------->
    // =================================================
    console.log(`✅ >\x1b[35;1m <省市区>\x1b[0m层级数据：`);
    const dataPath = path.resolve(process.cwd(), 'dist/level.json');
    const data = province.map(p => {
      let cData = [...city].filter(m => m.province === p.province && /00$/.test(m.code)).map(m => {
        m.children = area.filter(a => a.city === m.city && a.province === m.province);
        return m
      });
      if (/^(11|31|12|50)$/.test(p.province) && cData.length === 0) {
        cData = area.filter(c => c.province === p.province)
      }
      if (/^(81|82)$/.test(p.province) && cData.length === 0) {
        cData = [...hongkong, ...macau].filter(c => c.province === p.province)
      }
      p.children = cData;
      return p;
    });
    await FS.outputFile(dataPath, JSON.stringify(data, null, 2));
    console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), dataPath));

    const minDataPath = path.resolve(process.cwd(), 'dist/level.min.json');
    const minData = province.map(p => {
      let cData = [...city].filter(m => m.province === p.province && /00$/.test(m.code)).map(m => {
        m.children = area.filter(a => a.city === m.city && a.province === m.province).map((child) => ({
          c: child.code, n: child.name, p: child.province, d: child.city, a: child.area
        }));
        return { c: m.code, n: m.name, p: m.province, d: m.children };
      });
      if (/^(11|31|12|50)$/.test(p.province) && cData.length === 0) {
        cData = area.filter(c => c.province === p.province).map((child) => ({
          c: child.code, n: child.name, p: child.province, d: child.city, a: child.area
        }));
      }
      if (/^(81|82)$/.test(p.province) && cData.length === 0) {
        cData = [...hongkong, ...macau].filter(c => c.province === p.province).map((child) => ({
          c: child.code, n: child.name, p: child.province, d: child.city, a: child.area
        }));
      }
      p.children = cData;
      return { c: p.code, n: p.name, p: p.province, d: p.children };
    });
    await FS.outputFile(minDataPath, JSON.stringify(minData));
    console.log('  \x1b[32;1m✔\x1b[0m 数据保存:', path.relative(process.cwd(), minDataPath));
  } catch (error) {
    console.log(error)
    console.log(`\x1b[31;1m ERR:验证<层级数据>数据[]\x1b[0m: ${error.massage}`);
  }
})();