const path = require('path');
const fs = require('fs-extra');

;(() => {
  const corePath = path.join(process.cwd(), 'packages', 'core');

  fs.copy(path.join(process.cwd(), 'README.md'), path.join(corePath, 'README.md'), { overwrite: true });

  fs.copy(path.join(corePath, 'index.js'), path.join(process.cwd(), 'packages', 'utils', 'index.js'), { overwrite: true });
  fs.copy(path.join(corePath, 'data.js'), path.join(process.cwd(), 'packages', 'utils', 'data.js'), { overwrite: true });
  
  fs.copy(path.join(corePath, 'dist', 'area.json'), path.join(process.cwd(), 'packages', 'area', 'area.json'), { overwrite: true });
  fs.copy(path.join(corePath, 'dist', 'area.csv'), path.join(process.cwd(), 'packages', 'area', 'area.csv'), { overwrite: true });
  fs.copy(path.join(corePath, 'dist', 'area.min.json'), path.join(process.cwd(), 'packages', 'area', 'area.min.json'), { overwrite: true });

  fs.copy(path.join(corePath, 'dist', 'city.json'), path.join(process.cwd(), 'packages', 'city', 'city.json'), { overwrite: true });
  fs.copy(path.join(corePath, 'dist', 'city.csv'), path.join(process.cwd(), 'packages', 'city', 'city.csv'), { overwrite: true });
  fs.copy(path.join(corePath, 'dist', 'city.min.json'), path.join(process.cwd(), 'packages', 'city', 'city.min.json'), { overwrite: true });

  fs.copy(path.join(corePath, 'dist', 'country.json'), path.join(process.cwd(), 'packages', 'country', 'country.json'), { overwrite: true });
  fs.copy(path.join(corePath, 'dist', 'country.csv'), path.join(process.cwd(), 'packages', 'country', 'country.csv'), { overwrite: true });
  fs.copy(path.join(corePath, 'dist', 'country.min.json'), path.join(process.cwd(), 'packages', 'country', 'country.min.json'), { overwrite: true });

  fs.copy(path.join(corePath, 'dist', 'data.json'), path.join(process.cwd(), 'packages', 'data', 'data.json'), { overwrite: true });
  fs.copy(path.join(corePath, 'dist', 'data.csv'), path.join(process.cwd(), 'packages', 'data', 'data.csv'), { overwrite: true });
  fs.copy(path.join(corePath, 'dist', 'data.min.json'), path.join(process.cwd(), 'packages', 'data', 'data.min.json'), { overwrite: true });

  fs.copy(path.join(corePath, 'dist', 'level.json'), path.join(process.cwd(), 'packages', 'level', 'level.json'), { overwrite: true });
  fs.copy(path.join(corePath, 'dist', 'level.min.json'), path.join(process.cwd(), 'packages', 'level', 'level.min.json'), { overwrite: true });

  fs.copy(path.join(corePath, 'dist', 'province.json'), path.join(process.cwd(), 'packages', 'province', 'province.json'), { overwrite: true });
  fs.copy(path.join(corePath, 'dist', 'province.csv'), path.join(process.cwd(), 'packages', 'province', 'province.csv'), { overwrite: true });
  fs.copy(path.join(corePath, 'dist', 'province.min.json'), path.join(process.cwd(), 'packages', 'province', 'province.min.json'), { overwrite: true });

  fs.copy(path.join(corePath, 'dist', 'town.json'), path.join(process.cwd(), 'packages', 'town', 'town.json'), { overwrite: true });
  fs.copy(path.join(corePath, 'dist', 'town.csv'), path.join(process.cwd(), 'packages', 'town', 'town.csv'), { overwrite: true });
  fs.copy(path.join(corePath, 'dist', 'town.min.json'), path.join(process.cwd(), 'packages', 'town', 'town.min.json'), { overwrite: true });


})();