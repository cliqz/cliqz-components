'use strict';

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

(async function () {
  const [version] = process.argv.slice(2);
  if (!version) {
    console.error('Pass version as first argument of update script');
    process.exit(1);
  }
  const url = `https://cdn.cliqz.com/brands-database/database/${version}/data/database.json`;
  const database = await (await fetch(url)).text();
  console.log(database);

  fs.writeFileSync(path.resolve('src/db.json'), database);
})();
