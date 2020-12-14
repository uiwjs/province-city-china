const path = require('path');
const { compress, save } = require('./utils');


async function handleData(filename, format = {}) {
  const dataPath = path.join(process.cwd(), 'dist', `${filename}.json`);
  const data = require(dataPath);
  const resultData = compress(data, { ...format });
  await save(`${filename}.min.json`, JSON.stringify(resultData));
}

;(async () => {
  try {
    await handleData('data', { code: 'c', name: 'n', province: 'p', city: 'y', area: 'a', town: 't' });
    await handleData('area', { code: 'c', name: 'n', province: 'p', city: 'y', area: 'a' });
    await handleData('city', { code: 'c', name: 'n', province: 'p', city: 'y' });
    await handleData('cityNotFoundTown', { code: 'c', name: 'n', province: 'p', city: 'y', area: "a", town: 't' });
    await handleData('country', { id: 'i', cnname: 'c', name: 'n', fullname: 'f', alpha2: 'a2', alpha3: 'a3', numeric: 'r' });
    await handleData('province', { code: 'c', name: 'n', province: 'p' });
    await handleData('town', { code: 'c', name: 'n', province: 'p', city: 'y', area: 'a', town: 't' });
    await handleData('level', { code: 'c', name: 'n', province: 'p', city: 'y', area: 'a', children: 'd' });

  } catch (error) {
    console.log('error:', error);
  }

})();