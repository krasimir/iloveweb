ILoveWeb.load({
  lang: 'html',
  doc: '',
  tasks: [
    {
      text: 'Зареди външен CSS файл с име "my-styles.css".',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'link') {
            if (el.attr && el.attr.href === "my-styles.css" && el.attr.rel === 'stylesheet') {
              success = true;
            }
          }
        });
        return success;
      },
      answer: '<link rel="stylesheet" href="my-styles.css">'
    },
    {
      text: 'Добави видео файл с име "lesson.mp4".',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'video') {
            window.walkHTML(el, (videoChild) => {
              if (videoChild.tag === 'source' && videoChild.attr.src === "lesson.mp4") {
                success = true;
              }
            });
          }
        });
        return success;
      },
      answer: '<video>\n  <source src="lesson.mp4" />\n</video>'
    }
  ]
});