ILoveWeb.load({
  lang: 'html',
  doc: '',
  tasks: [
    {
      text: 'Create HTML page that has a title "iloveweb".',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'head') {
            (el.child || []).forEach(headChild => {
              if (headChild.tag === 'title') {
                (headChild.child || []).forEach(titleChild => {
                  success = titleChild.node === 'text' && titleChild.text.match(/iloveweb/);
                });
              }
            })
          }
        });
        return success;
      }
    },
    {
      text: 'Set the encoding of a HTML page to "UTF-16".',
      validator(tree) {
        let metaExists = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'meta' && el.attr && el.attr.charset === 'UTF-16') {
            metaExists = true;
          }
        });
        return metaExists;
      }
    }
  ]
});