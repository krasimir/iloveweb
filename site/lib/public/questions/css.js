const CSS_SELECTORS_1_HTML = `<section>
  <p>
    <span class="xxx">A</span>
    <span>B</span>
  </p>
</section>`;

const CSS_VALUES_1_HTML = `<body style="font-size:30px;">
<p style="font-size:2em;">foo</p>
<span>bar</span>
</body>`;

ILoveWeb.load({
  lang: 'css',
  doc: '',
  tasks: [
    {
      text: 'Write CSS that sets color of a &lt;p> element.',
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
    },
    {
      text: `Set a color of the second &lt;span> element in the following HTML snippet:${html2CodeText(CSS_SELECTORS_1_HTML)}`,
      validator(ast) {
        const tree = ast.toJSON('simple');
        let success = false;
        tree.value.forEach(({ type, selectors, declarations }) => {
          const isThereColor = !!declarations.color;
          selectors.forEach((selector) => {
            const element = window.matchSelectorToHTML(selector, CSS_SELECTORS_1_HTML);
            if (!!element && element.innerText === 'B' && isThereColor) {
              success = true;
            }
          });
        });
        return success;
      }
    },
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
      }
    },
    {
      text: `Write a valid CSS selector with specificity equal to 021.`,
      validator(ast) {
        const tree = ast.toJSON('simple');
        let success = false;
        tree.value.forEach(({ type, selectors, declarations }) => {
          selectors.forEach((selector) => {
            if (calculateSpecificity(selector) === 21) {
              success = true;
            }
          });
        });
        return success;
      }
    },
    {
      text: `Write a valid CSS selector with specificity equal to 201.`,
      validator(ast) {
        const tree = ast.toJSON('simple');
        let success = false;
        tree.value.forEach(({ type, selectors, declarations }) => {
          selectors.forEach((selector) => {
            if (calculateSpecificity(selector) === 201) {
              success = true;
            }
          });
        });
        return success;
      }
    },
    {
      text: `Write CSS that sets the font size of the &lt;span> element to be 10px greater than the font size of the paragraph.${html2CodeText(CSS_VALUES_1_HTML)}`,
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
      text: `Set the color of a paragraph to be solid green with 0.5% transparency.`,
      validator(ast) {
        const tree = ast.toJSON('simple');
        let success = false;
        tree.value.forEach(({ type, selectors, declarations }) => {
          selectors.forEach((selector) => {
            const element = matchSelectorToHTML(selector, '<p>text</p>');
            if (!!element && element.innerText === 'text') {
              if (declarations['color'] === 'rgba(0,255,0,0.5)') {
                success = true;
              }
            }
          });
        });
        return success;
      }
    },
    {
      text: `Set the color of a span to be solid blue with 0.2% transparency.`,
      validator(ast) {
        const tree = ast.toJSON('simple');
        let success = false;
        tree.value.forEach(({ type, selectors, declarations }) => {
          selectors.forEach((selector) => {
            const element = matchSelectorToHTML(selector, '<span>text</span>');
            if (!!element && element.innerText === 'text') {
              if (declarations['color'] === 'rgba(0,0,255,0.2)') {
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