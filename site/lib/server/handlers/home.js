const fs = require('fs');

const CSS = fs.readFileSync(__dirname + '/../../public/css/styles.css').toString('utf8');
const JS = fs.readFileSync(__dirname + '/../../public/js/app.js').toString('utf8');

module.exports = function (req, res) {
  res.setHeader('Content-Type', 'text/html');

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
          <script>${JS}</script>
          <script async src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js"></script>
        </body>
      </html>
    `
  );
}