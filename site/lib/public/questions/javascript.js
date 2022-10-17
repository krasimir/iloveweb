ILoveWeb.load({
  lang: 'js',
  doc: '',
  tasks: [
    {
      text: 'Write a JavaScript object with a method "iloveweb" that returns the string "yes".',
      validator(code) {
        const f = new Function(`
          const obj = ${code};
          if (obj.iloveweb() === 'yes') {
            return true;
          } else {
            throw new Error("\\"iloveweb\\" doesn't return \\"yes\\".");
          }
        `);
        return f();
      }
    },
    {
      text: `You have the following global object:<code>const&nbsp;API&nbsp;=&nbsp;{\n&nbsp;&nbsp;questions:&nbsp;['a',&nbsp;'b',&nbsp;'c'],\n&nbsp;&nbsp;print()&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;\n&nbsp;&nbsp;}&nbsp;\n}</code>Write code that will be placed inside the print method and will make the function returns the string "abc".`,
      validator(code) {
        const f = new Function(`
          const API = {
            questions: ['a', 'b', 'c'],
            print() {
              ${code}
            } 
          }
          if (API.print() === undefined) {
            throw new Error("The \\"print\\" method returns nothing at the moment.");
          }
          return API.print() === 'abc';
        `);
        return f();
      }
    },
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