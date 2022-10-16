ILoveWeb.load({
  lang: 'js',
  doc: '',
  tasks: [
    {
      text: 'Write a JavaScript function with name "test" that returns "iloveweb".',
      validator(code) {
        const f = new Function(`
          ${code};
          return test();
        `);
        return f() === 'iloveweb';
      }
    },
    {
      text: 'Write a JavaScript function called "calculate" that receives the following array:<code>[10, 2, 89]</code>Your function should calculate the sum of all the numbers in the passed array.',
      validator(code) {
        const f = new Function(`
          ${code};
          return calculate([10, 2, 89]);
        `);
        return f() === 101;
      }
    },
    {
      text: 'Write a JavaScript function "render" that updates the HTML content of the following tag:<code>&lt;div id="app">&lt;/div></code>',
      validator(code) {
        const f = new Function(`
          let domEl = {};
          const document = {
            querySelector(sel) {
              return sel === '#app' ? domEl : null;
            },
            querySelectorAll(sel) {
              return sel === '#app' ? [domEl] : [];
            },
            getElementById(sel) {
              return sel === 'app' ? domEl : null;
            }
          }
          ${code};
          render();
          return domEl;
        `);
        return typeof f().innerHTML !== 'undefined';
      }
    },
     {
      text: `Think that you have a global object "API" and a global function "iloveweb".<code>const&nbsp;API&nbsp;=&nbsp;{\n&nbsp;&nbsp;hey()&nbsp;{&nbsp;return&nbsp;'Hello!';&nbsp;}\n}\nfunction&nbsp;iloveweb()&nbsp;{\n&nbsp;&nbsp;return&nbsp;this.hey();\n}</code>Call the function so it runs with no error.`,
      validator(code) {
        const f = new Function(`
          const API = {
            hey() { return 'Hello!'; }
          }
          function iloveweb() {
            return this.hey();
          }
          return ${code} === 'Hello!';
        `);
        return f();
      }
    },
  ]
});