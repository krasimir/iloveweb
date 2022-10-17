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
    },
    {
      text: 'Create a title.',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(el.tag)) {
            success = true;
          }
        });
        return success;
      }
    },
    {
      text: 'Create a unordered list.',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'ul') {
            window.walkHTML(el, (bodyChild) => {
              if (bodyChild.tag === 'li') {
                success = true;
              }
            });
          }
        });
        return success;
      }
    },
    {
      text: 'Create a table with 3 rows and 2 columns.',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'table') {
            let rows = 0;
            let cols = 0;
            window.walkHTML(el, (tableChild) => {
              if (tableChild.tag === 'tr') {
                rows += 1;
                window.walkHTML(tableChild, (rowChild) => {
                  if (rowChild.tag === 'td' || rowChild.tag === 'th') {
                    cols += 1;
                  }
                });
              }
            });
            if (rows === 3 && cols === 6) {
              success = true;
            }
          }
        });
        return success;
      }
    },
    {
      text: 'Combine correctly &lt;span> and &lt;p> elements, so the inline element to be nested inside the block element.',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'p') {
            (el.child || []).forEach(headChild => {
              if (headChild.tag === 'span') {
                success = true;
              }
            })
          }
        });
        return success;
      },
      answer: '<p><span></span></p>'
    }
  ]
})