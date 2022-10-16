ILoveWeb.load({
  lang: 'html',
  doc: '',
  tasks: [
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
    }
  ]
});