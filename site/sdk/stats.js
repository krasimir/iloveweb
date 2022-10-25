const fs = require('fs');
const { getAllQuestions } = require('./utils');

const questions = getAllQuestions();

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