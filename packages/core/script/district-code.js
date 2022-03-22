/**
 * 数据来源：http://www.gov.cn/gzdt/2010-01/15/content_1511043.htm
 * ⚠️ 保存下来的 excel 复制文本解析。
 */

const fs = require('fs-extra');
const data = fs.readFileSync('./script/district-code.txt').toString().split('\n').filter(m => !!m.trim().replace(/[^0-9]/ig,""));

;(async () => {
  try {
    const result = data.map(m => {
      const arr = m.trim().split(' ').filter(Boolean);
      if (arr && arr.length == 2) {
        return { name: arr[0], code: arr[1] }
      } else {
        console.log(`  🚸 数据错误，请检查错误数据 ❌`, arr);
      }
    })
    await fs.writeFile('./dist/district-code.json', JSON.stringify(result, null, 2));
    console.log('  \x1b[32;1m✔\x1b[0m 获取 <长途电话区号> 数据: ./dist/district-code.json');
  } catch (error) {
    console.log(`ERR:获取<长途电话区号>数据[]:`, error);
  }
})();