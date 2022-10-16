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
  ]
});