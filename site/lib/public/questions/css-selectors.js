const CSS_SELECTORS_1_HTML = `<section>
  <p>
    <span class="xxx">A</span>
    <span>B</span>
  </p>
</section>`;

ILoveWeb.load({
  lang: 'css',
  tasks: [
    {
      text: `Set a color of the second &lt;span> element in the following HTML snippet:${ILoveWeb.html2CodeText(CSS_SELECTORS_1_HTML)}`,
      validator(ast) {
        const tree = ast.toJSON('simple');
        let success = false;
        tree.value.forEach(({ type, selectors, declarations }) => {
          const isThereColor = !!declarations.color;
          selectors.forEach((selector) => {
            const element = matchSelectorToHTML(selector, CSS_SELECTORS_1_HTML);
            if (!!element && element.innerText === 'B' && isThereColor) {
              success = true;
            }
          });
        });
        return success;
      }
    }
  ]
})