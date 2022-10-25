const puppeteer = require("puppeteer");
const path = require('path');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const { getAllQuestions } = require("./utils");

// const HOST = 'https://iloveweb.dev';
const HOST = 'http://localhost:8080';
const RES = [600, 600];
const PUBLIC = path.normalize(__dirname + '/../lib/public/imgs/');
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36";

let browser, page;
const questions = getAllQuestions();

async function setup(viewport) {
  browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: {
      width: viewport ? viewport[0] : RES[0],
      height: viewport ? viewport[1] : RES[1]
    }
  });
  page = await browser.newPage();
  await page.setUserAgent(USER_AGENT);
}

async function createScreenshot(id) {
  await setup();
  const filename = `question_${id}.png`;
  const url =`${HOST}/preview?q=${id}`;
  const screenshot = path.normalize(PUBLIC + filename);
  const response = await page.goto(url, { waitUntil: "networkidle2" });
  const status = response.status ? response.status() : 'unknown';
  if (status !== 200) {
    throw new Error(`${url} is not available`);
  }
  await page.screenshot({ path: screenshot });
  await imagemin([screenshot], {
    destination: PUBLIC,
    plugins: [
      // imageminJpegtran(),
      // imageminPngquant({
      //   quality: [0.6, 0.8]
      // })
    ]
  });
  await page.close();
  await browser.close();
  console.log(`${screenshot} is created`);
}

(async () => {
  for(let i=0; i<questions.length; i++) {
    console.log(`${i+1} out of ${questions.length}`);
    const question = questions[i];
    await delay(500);
    await createScreenshot(question.id);
  }
  process.exit(0);
})();

async function delay(time) {
  return new Promise(done => {
    setTimeout(done, time);
  });
}