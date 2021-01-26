const path = require('path');
const fs = require('fs-extra');

const corePath = path.join(process.cwd(), 'packages', 'core');

function copyToDir(source, filename, src = 'dist') {
  const srcPath = path.join(corePath, src || '', filename);
  const sourcePath = path.join(process.cwd(), 'packages', source, filename);
  fs.copy(srcPath, sourcePath, { overwrite: true });
  console.log(`copy \x1b[34;1m ${srcPath.replace(process.cwd(), '')}\x1b[0m => \x1b[32;1m${sourcePath.replace(process.cwd(), '')}\x1b[0m file.`);
}

;(() => {

  fs.copy(path.join(process.cwd(), 'README.md'), path.join(corePath, 'README.md'), { overwrite: true });

  copyToDir('utils', 'index.js', '');

  copyToDir('area', 'area.json');
  copyToDir('area', 'area.csv');
  copyToDir('area', 'area.min.json');

  copyToDir('city', 'city.json');
  copyToDir('city', 'city.csv');
  copyToDir('city', 'city.min.json');

  copyToDir('country', 'country.json');
  copyToDir('country', 'country.csv');
  copyToDir('country', 'country.min.json');

  copyToDir('data', 'data.json');
  copyToDir('data', 'data.csv');
  copyToDir('data', 'data.min.json');

  copyToDir('level', 'level.json');
  copyToDir('level', 'level.min.json');

  copyToDir('province', 'province.json');
  copyToDir('province', 'province.csv');
  copyToDir('province', 'province.min.json');

  copyToDir('town', 'town.json');
  copyToDir('town', 'town.csv');
  copyToDir('town', 'town.min.json');
})();