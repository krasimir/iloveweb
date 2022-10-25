const fs = require('fs');
const CleanCSS = require('clean-css');
const chalk = require('chalk');
const spawn = require("child_process").spawn;
const cssbun = require('cssbun')

const chokidar = require("chokidar");

const inputCSS = `${__dirname}/../lib/client/css/index.css`;
const outputCSS = `${__dirname}/../lib/public/css/styles.css`;
const inputJS = `${__dirname}/../lib/client/js/index.js`;
const outputJS = `${__dirname}/../lib/public/js/app.js`;
const exitCallbacks = [];
const ROOT = process.cwd();
let serverProcess;
let restart = false;
let processes = [];

function compileCSS() {
  const minifiedCSS = new CleanCSS().minify(cssbun(inputCSS));
  fs.writeFileSync(outputCSS, minifiedCSS.styles);
  console.log(chalk.green('CSS saved'));
}
function compileJS(callback = () => {}) {
  command(
    `./node_modules/.bin/esbuild ${inputJS} --bundle --minify --outfile=${outputJS} --metafile=esbuild.json`,
    ROOT,
    callback
  );
}

function command(cmd, cwd, onExit = () => {}) {
  const proc = spawn(cmd, {
    shell: true,
    cwd,
    stdio: "inherit",
  });

  proc.on("exit", (code) => onExit(code));
  proc.on("error", (error) => {
    console.error(
      `"${cmd}" errored with error = ${error.toString()}`
    );
  });
  processes.push(proc);
  return proc;
};

function runServer(folderToWatch, commandToExecute) {
  const run = () => {
    serverProcess = command(commandToExecute, ROOT, (code) => {
      serverProcess = null;
      if (code === null && restart) {
        run();
      }
    });
  }
  run();
  chokidar
    .watch(folderToWatch, { ignoreInitial: true })
    .on("all", () => {
      restart = true;
      if (serverProcess) {
        serverProcess.kill();
      } else {
        run();
      }
    });
}

onExit(() => {
  if (serverProcess) {
    restart = false;
    serverProcess.close ? serverProcess.close() : serverProcess.kill();
  }
  processes.forEach(p => p.close ? p.close() : p.kill());
  process.exit(0);
});

function onExit(callback) {
  exitCallbacks.push(callback);
}
function exitHandler(err) {
  if (err) {
    console.log(err);
  }
  exitCallbacks.forEach((c) => c());
}
function getAllQuestions() {
  const QUESTIONS_DIR = __dirname + '/../lib/public/questions';
  const getQuestion = (code) => `
    let questions = [];
    function html2CodeText(html) {
      return '<code>' + html
        .replace(/</g, '&lt;')
        .replace(/ /g, '&nbsp;') + '</code>';
    }
    const ILoveWeb = {
      load({ tasks }) {
        questions = questions.concat(tasks);
      }
    }
    ${code};
    return questions;
  `;
  let questions = [];
  fs.readdirSync(QUESTIONS_DIR).forEach(file => {
    const code = fs.readFileSync(`${QUESTIONS_DIR}/${file}`).toString('utf-8');
    questions = questions.concat((new Function(getQuestion(code)))());
  });
  return questions;
}

// do something when app is closing
process.on("exit", exitHandler);
// catches ctrl+c event
process.on("SIGINT", exitHandler);
// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", exitHandler);
process.on("SIGUSR2", exitHandler);
// catches uncaught exceptions
process.on("uncaughtException", exitHandler);

module.exports = {
  runServer,
  inputCSS,
  compileCSS,
  compileJS,
  getAllQuestions
}