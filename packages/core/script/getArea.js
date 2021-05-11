const { getTown } = require('./utils');

// 获取几个数据未获取的问题
// `node script/getArea.js`
;(async () => {
  try {
    const zhongshan = await getTown({ "code": "4420", "name": "中山市", "province": "44", "city": 0 });
    console.log(`  \x1b[32;1m✔\x1b[0m <中山市>数据生成完成！${zhongshan.length}`, 'http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2020/44/4420.html');
    console.log(zhongshan)
    const dongguan = await getTown({ "code": "4419", "name": "东莞市", "province": "44", "city": 0 });
    console.log(`  \x1b[32;1m✔\x1b[0m <东莞市>数据生成完成！${dongguan.length}`, 'http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2020/44/4419.html');
    console.log(dongguan)
    const danzhou = await getTown({ "code": "4604", "name": "儋州市", "province": "46", "city": 0 });
    console.log(`  \x1b[32;1m✔\x1b[0m <儋州市>数据生成完成！${danzhou.length}`, 'http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2020/46/4604.html');
    console.log(danzhou)
    // 数据空，拥有`镇` -> `村委会/居委会`
    const sansha = await getTown({ "code": "4603", "name": "三沙市", "province": "46", "city": 0 });
    console.log(`  \x1b[32;1m✔\x1b[0m <三沙市>数据生成完成！${sansha.length}`, 'http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2020/46/4603.html');
    // 市辖区
    const jiayuguan = await getTown({ "code": "6202", "name": "嘉峪关市", "province": "62", "city": 0 });
    console.log(`  \x1b[32;1m✔\x1b[0m <嘉峪关市>数据生成完成！${jiayuguan.length}`, 'http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2020/62/6202.html');
  } catch (error) {
    console.log('error:', error);
  }
})();