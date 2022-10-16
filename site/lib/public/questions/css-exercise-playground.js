/*
  cssparser: https://www.npmjs.com/package/cssparser
  parsel: https://projects.verou.me/parsel
  matchSelectorToHTML: a global function defined in homework.js

  Example:
  validator(ast) {
    const tree = ast.toJSON('simple'); // simple, deep, atomic
    let success = false;
    tree.value.forEach(({ type, selectors, declarations }) => {
      const isThereColor = !!declarations.color;
      selectors.forEach((selector) => {
        const selectorTokens = parsel.tokenize(selector);
        // analyze the "selector" directly or its parts
      })
    });
    return success;
  }
*/
ILoveWeb.load({
  lang: 'css',
  doc: '',
  tasks: [
    {
      text: 'Напиши CSS, който да зададе цвят на &lt;p> таг.',
      validator(ast) {
        const tree = ast.toJSON('simple'); // simple, deep, atomic
        let success = false;
        tree.value.forEach(({ type, selectors, declarations }) => {
          const isThereColor = !!declarations.color;
          selectors.forEach((selector) => {
            const isSelectorMatching = matchSelectorToHTML(selector, '<p>test</p>');
            if (isSelectorMatching && isThereColor) {
              success = true;
            }
          });
        });
        return success;
      }
    }
  ]
});