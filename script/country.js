const { csv } = require('csvtojson');
const path = require('path');
const { save } = require('./utils');

;(async () => {
  try {
    const svgPath = path.join(process.cwd(), 'dist', 'country.csv');
    console.log()
    const json = (await csv().subscribe((jsonObj,index)=>{
      jsonObj.id = Number(jsonObj.id);
      jsonObj.numeric = Number(jsonObj.numeric);
    }).fromFile(svgPath));
    
    await save('country.json', JSON.stringify(json, null, 2));
    console.log(`  \x1b[32;1m✔\x1b[0m <国家和地区代码列表>数据生成完成！`);
  } catch (error) {
    console.log('error:', error);
  }
})();