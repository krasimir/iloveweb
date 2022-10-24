const nanoid = require('nanoid');

module.exports = function (req, res) {
  const ids = [
    nanoid.nanoid(10),
    nanoid.nanoid(10),
    nanoid.nanoid(10),
    nanoid.nanoid(10),
    nanoid.nanoid(10),
    nanoid.nanoid(10),
    nanoid.nanoid(10),
    nanoid.nanoid(10),
    nanoid.nanoid(10),
    nanoid.nanoid(10),
    nanoid.nanoid(10),
    nanoid.nanoid(10),
    nanoid.nanoid(10)
  ];
  res.send(ids.join('<br />'));
}