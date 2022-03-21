/**
 * 1. 获<街道>数据
 */
 const FS = require('fs-extra');
 const { getTown } = require('./utils');

 ;(async () => {
  try {
    await FS.remove('dist/town.json')
    await FS.remove('dist/town.csv')
    getTown();
  } catch (error) {
    console.log(`ERR:获取<街道>数据[]: ${error}`);
  }
})();