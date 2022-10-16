const fs = require('fs');

const CSS = fs.readFileSync(__dirname + '/../../public/css/styles.css').toString('utf8');
const JS = fs.readFileSync(__dirname + '/../../public/js/app.js').toString('utf8');
const PATH_TO_QUESTIONS = `${__dirname}/../../public/questions`;

module.exports = function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  
  let questionsFile = '/questions/__all__.js';
  if (req.queryString('q')) {
    const file = req.queryString('q');
    if (fs.existsSync(`${PATH_TO_QUESTIONS}/${file}`)) {
      questionsFile = `/questions/${file}`
    } else {
      console.log(`${PATH_TO_QUESTIONS}/${file} doesn't exists.`);
    }
  }

  const details = {
    title: 'I love the Web platform',
    description: 'Test your knowledge on the fundamentals in Web - HTML, CSS and JavaScript.',
    url: 'https://iloveweb.dev',
    ogImage: '/imgs/ogimage.png'
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
          <link rel="icon" href="/imgs/heart.svg" type="image/svg+xml">

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
          <script>const QUESTIONS_FILE = "${questionsFile}";</script>
          <script>${JS}</script>
          <iframe id="exerciseFrame"></iframe>
        </body>
      </html>
    `
  );
}