const fs = require('fs');

const QUESTIONS_DIR = __dirname + '/../lib/public/questions';
const getNumOfQuestions = (code) => `
  let questions = [];
  const html2CodeText = () => {};
  const ILoveWeb = {
    load({ tasks }) {
      questions = questions.concat(tasks);
    }
  }
  ${code};
  return questions;
`

let questions = [];
fs.readdirSync(QUESTIONS_DIR).forEach(file => {
  if (!file.match(/__all__/)) {
    const code = fs.readFileSync(`${QUESTIONS_DIR}/${file}`).toString('utf-8');
    questions = questions.concat((new Function(getNumOfQuestions(code)))());
  }
});

// checking for duplicated ids
let duplicated = [];
let idsTemp = {};
questions.map(({ id }) => {
  if (idsTemp[id]) { duplicated.push(id) };
  idsTemp[id] = true;
});

// question without id
let withoutId = 0;
questions.map(({ id }) => {
  if (!id) { withoutId += 1; };
});

console.log(`Duplicated ids: ${JSON.stringify(duplicated)}`);
console.log(`With no id: ${withoutId}`);
console.log(`Questions: ${questions.length}`);

if (withoutId !== 0) {
  throw new Error('There is question with no id.');
}
if (duplicated.length > 0) {
  throw new Error('There are questions with same ids.'); 
}