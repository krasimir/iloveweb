ILoveWeb.load({
  lang: 'html',
  doc: '',
  tasks: [
    {
      text: 'Нека предположим, че имаме страница с header и навигация от три &lt;a> таг-а. Напишете семантичен HTML, който да описва такава структура.',
      validator(tree) {
        let numOfLinks = 0;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'header') {
            window.walkHTML(el, (headerChild) => {
              if (headerChild.tag === 'nav') {
                window.walkHTML(headerChild, (navChild) => {
                  if (navChild.tag === 'a') {
                    numOfLinks += 1;
                  }
                });
              }
            });
          }
        });
        return numOfLinks === 3;
      },
      answer: '<header>\n  <nav>\n    <a href="/a">a</a>\n    <a href="/b">b</a>\n    <a href="/c">c</a>\n  </nav>\n</header>'
    }
  ]
});