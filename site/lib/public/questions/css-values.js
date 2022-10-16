const CSS_VALUES_1_HTML = `<body style="font-size:30px;">
<p style="font-size:2em;">foo</p>
<span>bar</span>
</body>`;

ILoveWeb.load({
  lang: 'css',
  doc: '',
  tasks: [
    {
      text: `Write CSS that sets the font size of the &lt;span> element to be 10px greater than the font size of the paragraph.`,
      validator(ast) {
        const tree = ast.toJSON('simple');
        let success = false;
        tree.value.forEach(({ type, selectors, declarations }) => {
          selectors.forEach((selector) => {
            const element = matchSelectorToHTML(selector, CSS_VALUES_1_HTML);
            if (!!element && element.innerText === 'bar') {
              if (declarations['font-size'] === '70px') {
                success = true;
              }
            }
          });
        });
        return success;
      }
    },
    {
      text: `Set the color of the paragraph to be solid green with 0.5% transparency.`,
      validator(ast) {
        const tree = ast.toJSON('simple');
        let success = false;
        tree.value.forEach(({ type, selectors, declarations }) => {
          selectors.forEach((selector) => {
            const element = matchSelectorToHTML(selector, '<p>text</p>');
            if (!!element && element.innerText === 'text') {
              console.log(declarations);
              if (declarations['color'] === 'rgba(0,255,0,0.5)') {
                success = true;
              }
            }
          });
        });
        return success;
      }
    }
  ]
});