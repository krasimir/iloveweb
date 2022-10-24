const fs = require('fs');
const UglifyJS = require("uglify-js");

const { compileCSS, compileJS } = require('./utils');

const PKG_FILE = __dirname + '/../package.json';
const QUESTIONS_PATH = __dirname + '/../lib/public/questions';

const pkg = require(PKG_FILE);
const version = pkg.version.split('.').map(n => Number(n));
version[2] += 1;
pkg.version = version.join('.');

pkg.lastUpdate = new Date().toISOString();

fs.writeFileSync(PKG_FILE, JSON.stringify(pkg, null, 2));
console.log('Version bumped to ' + pkg.version);

const allQuesitons = [];
fs.readdirSync(QUESTIONS_PATH).forEach(qFile => {
  if (!qFile.match(/__all__/)) {
    allQuesitons.push(fs.readFileSync(`${QUESTIONS_PATH}/${qFile}`).toString('utf8'));
  }
});

fs.writeFileSync(`${QUESTIONS_PATH}/__all__.js`, UglifyJS.minify(allQuesitons.join('\n')).code);
console.log(`${allQuesitons.length} question files merged into __all__.js`);

compileCSS();
compileJS(() => {
  console.log('build done');
});