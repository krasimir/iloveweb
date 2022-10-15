ILoveWeb.load({
  lang: 'html',
  tasks: [
    {
      text: 'Create a HTML structure with nested elements.',
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
      }
    },
    {
      text: 'Use &lt;img /&gt; tag. Set "cat.jpg" as a value of the "src" attribute.',
      validator(tree) {
        let success = false;
        (function traverse(el) {
          if (get(el, 'tag') === 'img' && get(el, 'attr.src', '').toLowerCase() === 'cat.jpg') {
            success = true;
            return;
          }
          get(el, 'child', []).forEach(traverse);
        })(tree)
        return success;
      }
    }
  ]
})