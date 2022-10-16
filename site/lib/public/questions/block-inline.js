ILoveWeb.load({
  lang: 'html',
  doc: '',
  tasks: [
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