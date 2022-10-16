const parsers = { html: validateHTML, css: validateCSS, javascript: validateJavaScript }

const NUM_OF_QUESTIONS = 10;

const ILoveWeb = {
  questions: [],
  load({ lang, tasks }) {
    tasks.forEach(task => {
      this.questions.push({ lang, question: task })
    });
  },
  initQuestions() {
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
  },
  html2CodeText(html) {
    return '<code>' + html
      .replace(/</g, '&lt;')
      .replace(/ /g, '&nbsp;')
      .replace(/\n/g, '\n')
      .replace(/\r/g, '') + '</code>';
  },
  matchSelectorToHTML(selector, html) {
    // #exerciseFrame is just an dummy empty iframe on the page
    const iframe = document.querySelector('#exerciseFrame');
    if (!iframe) {
      console.error('The iframe with id #exerciseFrame is missing.');
      return;
    }
    let result = false;
    const iframeDoc = iframe.contentDocument || iframeWin.document;
    const funcName = `iframeMatching${new Date().getTime()}`;
    window[funcName] = function(r) {
      result = r;
    }
    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.write(`
      <script>
        el = document.querySelector("${selector}");
        parent.${funcName}(el);
      </script>
    `);
    iframeDoc.close();
    delete window[funcName];
    return result;
  },
  walkHTML(item, cb) {
    cb(item);
    if (item.child) {
      item.child.forEach(i => {
        window.walkHTML(i, cb);
      });
    }
  },
  calculateSpecificity(selector) {
    return Number(get(SPECIFICITY.calculate(selector), '[0].specificity', '').replace(/,/g, ''));
  }
}

window.ILoveWeb = ILoveWeb;

export default ILoveWeb;

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