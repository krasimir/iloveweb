ILoveWeb.load({
  lang: 'js',
  doc: '',
  tasks: [
    {
      id: 'um8GoUGZxX',
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
      id: 'm7iWnsI2EZ',
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
      id: '86RbsBn6sG',
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
      id: 'FkNiJCnMGt',
      text: 'Write a JavaScript function called "calculate". It will receive the array:<code>[10, 2, 89]</code>Your function should calculate the sum of all the numbers and return it.',
      validator(code) {
        const f = new Function(`
          ${code};
          return calculate([10, 2, 89]);
        `);
        return f() === 101;
      }
    },
    {
      id: 'aVkqmsw0Ow',
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
      id: 'RM1xMgPtv0',
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
    {
      id: 'w0Hh9HqUXH',
      text: `There is an item in the local storage with key "data". Read it from there and print it to the console.`,
      validator(code) {
        const f = new Function(`
          let success = false;
          const localStorage = {
            getItem(key) {
              if (key === "data") {
                return 'iloveweb';
              }
            },
            setItem() {}
          }
          const console = {
            log(value) {
              if (value === 'iloveweb') {
                success = true;
              }
            },
            warn(){},
            error(){}
          }
          ${code}
          return success;
        `);
        return f();
      }
    },
    {
      id: '-qafO04RLE',
      text: `Write code that will be placed on the "!!!" marker. The result of the function "getFullname" should be "John Doe".<code>const&nbsp;User&nbsp;=&nbsp;{\n&nbsp;&nbsp;firstName:&nbsp;'John',\n&nbsp;&nbsp;lastName:&nbsp;'Doe'\n}\nfunction&nbsp;getFullname(userData)&nbsp;{\n&nbsp;&nbsp;!!!\n&nbsp;&nbsp;return&nbsp;firstName&nbsp;+&nbsp;'&nbsp;'&nbsp;+&nbsp;lastName;\n}\ngetFullName(User);</code>`,
      validator(code) {
        const f = new Function(`
          const User = {
            firstName: 'John',
            lastName: 'Doe'
          }
          function getFullname(userData) {
            ${code}
            return firstName + ' ' + lastName;
          }
          return getFullname(User);
        `);
        return f() === 'John Doe';
      }
    },
    {
      id: 'RxZCIL3ggi',
      text: `Write some code that will replace "{your code here}" text so the result of this script is "John Doe is 37 years old".<code>async&nbsp;function&nbsp;loadName()&nbsp;{\n&nbsp;&nbsp;return&nbsp;'John&nbsp;Doe';\n}\nasync&nbsp;function&nbsp;loadAge()&nbsp;{\n&nbsp;&nbsp;return&nbsp;37\n}\n{your&nbsp;code&nbsp;here}.then(([name,&nbsp;age])&nbsp;=>&nbsp;{\n&nbsp;&nbsp;console.log(name&nbsp;+&nbsp;'&nbsp;is&nbsp;'&nbsp;+&nbsp;age&nbsp;+&nbsp;'&nbsp;years&nbsp;old');\n});</code>`,
      validator(code) {
        const f = new Function(`
const logic = (data) => ({
  then: (cb) => cb(data)
});
const Promise = { all: logic, allSettled: logic }
function loadName() {
  return 'John Doe';
}
function loadAge() {
  return 37
}
let res;
try {
  res = ${code}.then(([name, age]) => {
    return name + ' is ' + age + ' years old';
  });
} catch(err) {}
return res;
        `);
        return f() === 'John Doe is 37 years old';
      }
    }
  ]
});