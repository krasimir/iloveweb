import ILoveWeb from './api';
import { render, center, loadFile, $, convertMsToHM, getTwitterShareURL } from './utils/helpers';

const APP_DEPS = [
  '/js/cssparser.min.js',
  '/js/html2json.js',
  '/js/htmlparser.min.js',
  '/js/lodash.min.js',
  '/js/parsel.js',
  '/js/specificity.js',
  'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js',
  '/imgs/Cycle_custom_icon.json'
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
    await loadFile(dep);
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
        ILoveWeb.initQuestions();
        showContent();
      }
    }
  )
}
export function showContent() {
  render({
    content: `
      <div class="game-progress mxauto">
        <div class="line-progress">
          <div class="animation">
            <div class="timer"></div>
            <div class="lottie"></div>
          </div>
        </div>
        <div class="heart">❤️</div>
      </div>
      <div class="editor">
        <section class="question"></section>
        <section class="area">
          <textarea rows="10" placeholder="My solution is ..." class="op0"></textarea>
          <div class="console"></div>
        </section>
      </div>
      <footer class="tac">
        Build by <a href="https://twitter.com/KrasimirTsonev" target="_blank">@krasimirtsonev</a>. Contribute with more questions <a href="https://github.com/krasimir/iloveweb" target="_blank">here</a>.
      </footer>
    `,
    onRender() {
      let questionIdx = 0;
      let player;
      let time = 0;
      let timeInterval;
      const editorEl = $('.editor');
      const questionEl = $('.editor .question');
      const textareaEl = $('.editor textarea');
      const consoleEl = $('.editor .console');
      const timeEl = $('.timer');

      // ------------------------------------------------------------------------------ question
      function showQuestion() {
        const question = ILoveWeb.questions[questionIdx];
        if (!question) {
          win();
          return;
        }
        render({
          content: question.question.text,
          container: questionEl
        });
        gsap.fromTo(questionEl, { y: '100px', opacity: 0 }, { y: 0, opacity: 1 });
      }
      function win() {
        if (player) { player.stop(); }
        clearInterval(timeInterval);
        editorEl.style.display = 'block';
        const numOfquestions = ILoveWeb.questions.length;
        render({
          container: editorEl,
          content: `
            <section class="w500 mxauto">
              <h1 class="tac">Congratulations!</h1>
              <small class="block tac">You really ❤️ the web.</small>
              <p class="tac mt1">
                You just nailed ${numOfquestions} dev question${numOfquestions === 1 ? '' : 's'} for ${convertMsToHM(time)} time.
                <br /><br />
                <a href="https://twitter.com/intent/tweet?text=${getTwitterShareURL(convertMsToHM(time))}">
                  <img src="/imgs/twitter.svg" width="20"/>
                  Share
                </a>
              </p>
            </section>
          `
        });
        gsap.fromTo(editorEl, { y: '100px', opacity: 0 }, { y: 0, opacity: 1, ease: 'back.out(1.7)', duration: 1.4 });
      }

      // ------------------------------------------------------------------------------ textarea
      function showTextarea() {
        textareaEl.value = '';
        gsap.fromTo(textareaEl, { y: '100px', opacity: 0, background: '#1c1d1f', color: '#e9e9e9' }, { y: 0, opacity: 1, delay: 0.1 });
      }
      textareaEl.focus();
      textareaEl.addEventListener('input', () => {
        consoleEl.innerHTML = '';
        ILoveWeb.check(
          textareaEl.value,
          questionIdx,
          () => {
            questionIdx += 1;
            updateProgress();
            gsap.to(textareaEl, { backgroundColor: '#FF7E7E', color: '#000', duration: 0.1, onComplete: () => {
              gsap.to(textareaEl, { opacity: 0, delay: 0.1 });
              gsap.to(questionEl, { opacity: 0, delay: 0.1, onComplete: () => {
                showQuestion();
                showTextarea();
              }});
            }});
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
      // ------------------------------------------------------------------------------ progress
      function initProgresS() {
        player = lottie.loadAnimation({
          container: $('.game-progress .animation .lottie'),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/imgs/Cycle_custom_icon.json'
        });
        gsap.fromTo($('.game-progress'), { x: '-100px', opacity: 0 }, { x: 0, opacity: 1 });
      }
      function setTimer() {
        timeInterval = setInterval(() => {
          time += 1000;
          timeEl.innerHTML = `${questionIdx}/${ILoveWeb.questions.length} · ${convertMsToHM(time)}`;
        }, 1000);
      }
      function updateProgress() {
        const line = $('.line-progress');
        const speedRange = [0.2, 8]
        const percentage = Math.ceil(questionIdx / ILoveWeb.questions.length * 100);
        const speed = speedRange[0] + ((percentage/100) * (speedRange[1] - speedRange[0]));
        line.style.width = `${percentage}%`;
        player.setSpeed(speed);
      }
      // ------------------------------------------------------------------------------ footer
      function showFooter() {
        gsap.fromTo($('footer'), { y: '100px', opacity: 0 }, { y: 0, opacity: 0.4, delay: 0.3, duration: 0.8 });
      }

      showQuestion();
      showTextarea();
      initProgresS();
      updateProgress();
      setTimer();
      showFooter();
    }
  });
}

window.addEventListener('load', () => {
  const deps = [...APP_DEPS, QUESTIONS_FILE];
  console.log(JSON.stringify(deps, null, 2));
  loadDependencies(deps);
});