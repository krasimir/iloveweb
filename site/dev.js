const chokidar = require("chokidar");

const { runServer, compileCSS, compileJS } = require('./sdk/utils');

runServer(`${__dirname}/lib`, `node ./lib/server/index.js`);

chokidar.watch(`${__dirname}/lib/client/css/*.css`).on("all", compileCSS);
chokidar.watch(`${__dirname}/lib/client/js/**/*.js`, { ignoreInitial: true }).on("all", () => {
  compileJS();
});