import { GETParam } from "./utils/helpers";

const parsers = { html: validateHTML, css: validateCSS, javascript: validateJavaScript }

const NUM_OF_QUESTIONS = 10;

const ILoveWeb = {
  mode: 'QUIZ',
  questions: [],
  load({ lang, tasks }) {
    tasks.forEach(task => {
      this.questions.push({ lang, question: task })
    });
  },
  init() {
    const qParam = GETParam('q');
    if (qParam) {
      const singleQuestion = this.questions.find(({ question }) => {
        return question.id === qParam;
      });
      if (singleQuestion) {
        this.mode = 'SINGLE';
        this.questions = [singleQuestion];
      } else {
        console.error(`Question with id "${qParam}" not found.`);
      }
    }
    if (this.mode === 'QUIZ') {
      // shuffle
      let currentIndex = this.questions.length, randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [this.questions[currentIndex], this.questions[randomIndex]] = [
          this.questions[randomIndex], this.questions[currentIndex]
        ];
      }
      // picking the first X
      this.questions = this.questions.slice(0, NUM_OF_QUESTIONS);
      console.log(`Questions in total: ${this.questions.length}`);
    }
  },
  check(code, idx, onSuccess, onLog) {
    const { lang, question } = this.questions[idx];
    const parser = parsers[lang] ? parsers[lang] : validateJavaScript;
    try {
      if (question.validator(parser(code))) {
        onSuccess();
      };
    } catch(err) {
      onLog(trimConsole(err.toString().replace(/</gi, '&lt;')));
    }
  }
}
function validateHTML(code) {
  return html2json(code);
}
function validateCSS(code) {
  var parser = new cssparser.Parser();
  return parser.parse(code);
}
function validateJavaScript(code) {
  return code;
}
function trimConsole(text) {
  if (text.length > 500) {
    return `${text.substr(0, 500)}...`;
  }
  return text;
}

window.ILoveWeb = ILoveWeb;
export default ILoveWeb;