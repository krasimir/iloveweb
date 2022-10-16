ILoveWeb.load({
  lang: 'css',
  doc: '',
  tasks: [
    {
      text: `Write a valid CSS selector with specificity equal to 130.`,
      validator(ast) {
        const tree = ast.toJSON('simple');
        let success = false;
        tree.value.forEach(({ type, selectors, declarations }) => {
          selectors.forEach((selector) => {
            if (calculateSpecificity(selector) === 130) {
              success = true;
            }
          });
        });
        return success;
      },
      answer: '#about .a .b .c {\n  font-size: 10px;\n}'
    }
  ]
});