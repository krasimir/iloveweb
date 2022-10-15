const fs = require('fs');

const CSS = fs.readFileSync(__dirname + '/../../public/css/styles.css').toString('utf8');
const JS = fs.readFileSync(__dirname + '/../../public/js/app.js').toString('utf8');
const PATH_TO_QUESTIONS = `${__dirname}/../../public/questions`;

let questions = fs.readdirSync(PATH_TO_QUESTIONS).map(file => `/questions/${file}`);

module.exports = function (req, res) {
  res.setHeader('Content-Type', 'text/html');

  if (req.queryString('q')) {
    const file = req.queryString('q');
    if (fs.existsSync(`${PATH_TO_QUESTIONS}/${file}`)) {
      questions = [`/questions/${file}`]
    }
  }

  const details = {
    title: 'I ❤️ Web',
    description: 'I ❤️ Web',
    url: 'https://iloveweb.dev',
    ogImage: ''
  }

  res.send(
    `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="imagetoolbar" content="no" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
          <meta name="author" content="Krasimir Tsonev" />
          <meta name="copyright" content="Daskalo" />
          <meta name="robots" content="follow,index" />
          <meta name="apple-mobile-web-app-title" content="${details.title}" />
          <meta name="application-name" content="${details.title}" />

          <title>${details.title}</title>
          <meta name="description" content="${details.description}">

          <meta property="og:url" content="${details.url}">
          <meta property="og:type" content="website">
          <meta property="og:title" content="${details.title}">
          <meta property="og:description" content="${details.description}">
          <meta property="og:image" content="${details.ogImage}">
          <meta name="twitter:card" content="summary_large_image">
          <meta property="twitter:domain" content="iloveweb.dev">        
          <style>${CSS}</style>
        </head>
        <body>
          <div id="app"></div>
          <script>const QUESTIONS = ${JSON.stringify(questions)}</script>
          <script>${JS}</script>
          <script async src=""></script>
          <iframe id="exerciseFrame"></iframe>
        </body>
      </html>
    `
  );
}