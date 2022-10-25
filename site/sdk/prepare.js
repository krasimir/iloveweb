const fs = require('fs');
const path = require('path');
const { getAllQuestions } = require('./utils');

const questions = getAllQuestions();
const DEST = '/Users/krasimir/Desktop/ILoveWeb';

const text = [];
let shuffled = questions
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

shuffled.forEach((q, i) => {
  const idx = i+1;
  text.push(`I ❤️ Web challenge #${idx}\n\nLet's go back to the fundamentals of the Web - HTML, CSS and JavaScript. Jump here https://iloveweb.dev/?q=${q.id} and do the task.`);
  const fileFrom = path.normalize(`${__dirname}/../lib/public/imgs/question_${q.id}.png`);
  const fileTo = path.normalize(`${DEST}/${formatNumber(idx)}_${q.id}.png`);
  fs.copyFileSync(fileFrom, fileTo);
});

fs.writeFileSync(`${DEST}/copy.txt`, text.join('\n\n\n'));

function formatNumber(i) {
  if (i < 10) return '0' + i;
  return i;
}