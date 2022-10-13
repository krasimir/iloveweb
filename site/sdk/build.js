const fs = require('fs');

const { compileCSS, compileJS } = require('./utils');

const PKG_FILE = __dirname + '/../package.json';

const pkg = require(PKG_FILE);
const version = pkg.version.split('.').map(n => Number(n));
version[2] += 1;
pkg.version = version.join('.');

pkg.lastUpdate = new Date().toISOString();

fs.writeFileSync(PKG_FILE, JSON.stringify(pkg, null, 2));
console.log('Version bumped to ' + pkg.version);

compileCSS();
compileJS(() => {
  console.log('build done');
});