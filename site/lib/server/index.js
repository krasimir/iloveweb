const express = require('express');
const compression = require('compression');

const handler = require('./handlers/handler');

const oneWeek = 604800000;
const app = express();

app.use(compression())
app.use(require('sanitize').middleware);
app.use(express.static(__dirname + '/../public', { maxAge: oneWeek }));

// home and default page
app.get('/*', handler);
app.get('/', handler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});