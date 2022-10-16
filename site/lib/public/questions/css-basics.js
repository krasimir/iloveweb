ILoveWeb.load({
  lang: 'css',
  doc: '',
  tasks: [
    {
      text: 'Напиши CSS, който да зададе цвят на &lt;p> таг.',
      validator(ast) {
        const tree = ast.toJSON('simple');
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
      },
      answer: 'p {\n  color: red;\n}'
    }
  ]
});