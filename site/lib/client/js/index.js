import ILoveWeb from './api';
import { render, center, loadJS, $ } from './utils/helpers';

const APP_DEPS = [
  '/js/cssparser.min.js',
  '/js/html2json.js',
  '/js/htmlparser.min.js',
  '/js/lodash.min.js',
  '/js/parsel.js',
  '/js/specificity.js',
  'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js'
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
    $('.value').style.width = `width:${Math.ceil(done / deps.length * 100)}%;`;
  }));
  gsap.to(
    '.loader',
    {
      y: '-100px',
      opacity: 0,
      ease: "back.in(1.7)",
      onComplete: () => {
        if (typeof _ !== 'undefined') {
          window.get = _.get;
        }
        ILoveWeb.shuffle();
        showEditor();
      }
    }
  )
}
export function showEditor() {
  render({
    content: `
      <div class="editor">
        <section class="question">
          <div class="mxauto maxw400 px2 op0"></div>
        </section>
        <section class="area">
          <textarea rows="10" placeholder="My solution is ..." class="op0"></textarea>
          <div class="console"></div>
        </section>
      </div>
    `,
    onRender() {
      let questionIdx = 0;
      const questionEl = $('.editor .question div');
      const textareaEl = $('.editor textarea');
      const consoleEl = $('.editor .console');

      // ------------------------------------------------------------------------------ question
      function showQuestion() {
        const question = ILoveWeb.questions[questionIdx];
        render({
          content: question.question.text,
          container: questionEl
        });
        gsap.fromTo(questionEl, { y: '100px', opacity: 0 }, { y: 0, opacity: 1 });
      }

      // ------------------------------------------------------------------------------ textarea
      function showTextarea() {
        textareaEl.value = '';
        gsap.fromTo(textareaEl, { y: '100px', opacity: 0 }, { y: 0, opacity: 1, delay: 0.1 });
      }
      textareaEl.focus();
      textareaEl.addEventListener('input', () => {
        consoleEl.innerHTML = '';
        ILoveWeb.check(
          textareaEl.value,
          questionIdx,
          () => {
            console.log('success');
          },
          (log) => {
            consoleEl.innerHTML = log;
          }
        );
      });
      textareaEl.addEventListener('keydown', function (e) {
        if (e.key == 'Tab') {
          e.preventDefault();
          textareaEl.setRangeText(
            '  ',
            textareaEl.selectionStart,
            textareaEl.selectionStart,
            'end'
          )
        }
      });

      showQuestion();
      showTextarea();
    }
  });
}

window.addEventListener('load', () => {
  loadDependencies([...APP_DEPS, ...QUESTIONS]);
});