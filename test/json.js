const { sortProvince } = require('../');
const data = require('../dist/data.json');

const json = sortProvince(data);

// console.log('json:', json);
console.log('json:-->', json);
// console.log('json:', json[2].children[0]);