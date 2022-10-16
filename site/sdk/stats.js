const fs = require('fs');

const QUESTIONS_DIR = __dirname + '/../lib/public/questions';
const getNumOfQuestions = (code) => `
  let questions = 0;
  const html2CodeText = () => {};
  const ILoveWeb = {
    load({ tasks }) {
      questions = tasks.length;
    }
  }
  ${code};
  return questions;
`

let n = 0;
fs.readdirSync(QUESTIONS_DIR).forEach(file => {
  if (!file.match(/__all__/)) {
    const code = fs.readFileSync(`${QUESTIONS_DIR}/${file}`).toString('utf-8');
    n += (new Function(getNumOfQuestions(code)))();
  }
});
console.log(`Questions: ${n}`);