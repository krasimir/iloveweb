const fs = require('fs');
const { getAllQuestions } = require('../../../sdk/utils');

const CSS = fs.readFileSync(__dirname + '/../../public/css/styles.css').toString('utf8');
const questions = getAllQuestions();

module.exports = function (req, res) {
  const question = questions.find(({ id }) => id === req.query.q);

  if (!question) {
    res.send(`Missing question with id ${req.query.q}.`);
    return;
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
          <meta name="apple-mobile-web-app-title" content="I love web" />
          <meta name="application-name" content="I love web" />
          <link rel="icon" href="/imgs/heart.svg" type="image/svg+xml">

          <title>I love web</title>
          <style>${CSS}</style>
          <style>
            .preview {
              width: 600px;
              height: 600px;
              border: solid 20px var(--bg-color-lighter);
              padding: 2em;
              display: flex;
              align-items: center;
              justify-content: center;
              background-image: linear-gradient(to right bottom, #6b3737, #532e3e, #362839, #20212a, #151617);
            }
            .preview section {
              margin-top: 2em;
              border: solid 2px rgba(255, 255, 255, 0.2);
              padding: 1em;
            }
            .preview .url {
              float: right;
            }
            .preview h1 {
              margin: 0;
              padding: 0;
            }
            .preview > div {
              width: 100%;
            }
            .preview code {
              width: 100%;
              word-break: break-word;
              font-size: 0.8em;
              line-height: 1.2em;
            }
          </style>
        </head>
        <body>
          <div class="preview">
            <div>
              <span class="url">iloveweb.dev</span>
              <h1 class="">I<small>❤️</small>Web</h1>
              <small class="block">daily challenge</small>
              <section class="question">
                ${question.text}
              </section>
            </div>
          </div>
        </body>
      </html>
    `
  );
}