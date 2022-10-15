const express = require('express');
const compression = require('compression');

const home = require('./handlers/home');

const oneWeek = 604800000;
const app = express();

app.use(compression())
app.use(require('sanitize').middleware);
app.use(express.static(__dirname + '/../public', { maxAge: oneWeek }));

// home and default page
app.get('/*', home);
app.get('/', home);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});