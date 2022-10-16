ILoveWeb.load({
  lang: 'html',
  doc: '',
  tasks: [
    {
      text: 'Add a HTML tag that loads a file with name "my-styles.css".',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'link') {
            if (el.attr && el.attr.href.match(new RegExp('my-styles\.css')) && el.attr.rel === 'stylesheet') {
              success = true;
            }
          }
        });
        return success;
      }
    },
    {
      text: 'Add a video file to your HTML page. The filename is "lesson.mp4".',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'video') {
            window.walkHTML(el, (videoChild) => {
              if (videoChild.tag === 'source' && videoChild.attr.src.match(new RegExp('lesson\.mp4'))) {
                success = true;
              }
            });
          }
        });
        return success;
      }
    }
  ]
});