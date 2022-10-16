const CSS_VALUES_1_HTML = `<body style="font-size:30px;">
<p style="font-size:2em;">foo</p>
<span>bar</span>
</body>`;

ILoveWeb.load({
  lang: 'css',
  doc: '',
  tasks: [
    {
      text: `Напишете CSS така, че размера на шрифта в параграфа да е с 10px по-голям от този в span елемента.${html2CodeText(CSS_VALUES_1_HTML)}`,
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
      },
      answer: 'span {\n  font-size: 70px;\n}'
    },
    {
      text: `Задайте на &lt;p> елемент плътен зелен цвят с прозрачност 0.5.`,
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
      },
      answer: 'p {\n  color: rgba(0, 255, 0, 0.5);\n}'
    }
  ]
});