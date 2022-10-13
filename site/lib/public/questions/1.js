ILoveWeb.load({
  lang: 'html',
  question: {
    text: 'Create HTML structure with nested elements',
    validator(tree) {
      let success = false;
      get(tree, 'child', []).forEach(el => {
        get(el, 'child', []).forEach(el => {
          if (get(el, 'node') === 'element') {
            success = true;
          }
        });
      });
      return success;
    },
    answer: `<p><span>text</span></p>`
  }
});