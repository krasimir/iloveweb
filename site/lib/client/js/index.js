import { render, center, loadJS, $ } from './utils/helpers';
import { showEditor } from './editor';

const APP_DEPS = [
  '/js/cssparser.min.js',
  '/js/html2json.js',
  '/js/htmlparser.min.js',
  '/js/lodash.min.js',
  '/js/parsel.js',
  '/js/specificity.js',
  'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js'
];

async function loadDependencies(deps) {
  let done = 0;
  render({
    content: `
      <div class="loader w300 mxauto">
        <h1 class="tac tuptup">I <span><small>❤️</small></span> Web</h1>
        <div class="progress mxauto mt1">
          <div class="value"></div>
        </div>
      </div>
    `
  });
  center('.loader');
  await Promise.all(deps.map(async (dep) => {
    await loadJS(dep);
    done += 1;
    $('.value').style.width = `width:${Math.ceil(done / deps.length * 100)}%;`
  }));
  $('.loader').style.opacity = 0;
  setTimeout(showEditor, 600);
}

window.ILoveWeb = ILoveWeb = {
  questions: [],
  load(question) {
    this.questions.push(question);
  }
}

window.addEventListener('load', () => {
  loadDependencies([...APP_DEPS, ...QUESTIONS]);
});