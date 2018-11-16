const { sortProvince } = require('../');
const { data } = require('../data');

const json = sortProvince(data);

console.log('json:', json);
// console.log('json:', json[2].children[0]);