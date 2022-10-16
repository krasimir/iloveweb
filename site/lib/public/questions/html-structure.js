ILoveWeb.load({
  lang: 'html',
  doc: '',
  tasks: [
    {
      text: 'Създай HTML страница заглавието, на която е "daskalo".',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'head') {
            (el.child || []).forEach(headChild => {
              if (headChild.tag === 'title') {
                (headChild.child || []).forEach(titleChild => {
                  success = titleChild.node === 'text' && titleChild.text.match(/daskalo/);
                });
              }
            })
          }
        });
        return success;
      },
      answer: '<head>\n  <title>daskalo</title>\n</head>'
    },
    {
      text: 'На същата страница, добави заглавие (&lt;h1>) и параграф (&lt;p>).',
      validator(tree) {
        let pExists = false;
        let h1Exists = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'body') {
            window.walkHTML(el, (bodyChild) => {
              if (bodyChild.tag === 'p') {
                pExists = true;
              }
              if (bodyChild.tag === 'h1') {
                h1Exists = true;
              }
            });
          }
        });
        return pExists && h1Exists;
      },
      answer: '<body>\n  <h1>Daskalo</h1>\n  <p>text</p>\n</body>'
    },
    {
      text: 'Задай encoding-a на страницата "UTF-16".',
      validator(tree) {
        let metaExists = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'meta' && el.attr && el.attr.charset === 'UTF-16') {
            metaExists = true;
          }
        });
        return metaExists;
      },
      answer: '<meta charset="UTF-16" />'
    }
  ]
});