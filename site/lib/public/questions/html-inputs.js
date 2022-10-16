ILoveWeb.load({
  lang: 'html',
  doc: '',
  tasks: [
    {
      text: 'And a HTML element that allows the user to pick a color.',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'input' && el.attr && el.attr.type === "color") {
            success = true;
          }
        });
        return success;
      }
    },
    {
      text: 'And a HTML element that allows the user to pick a date.',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'input' && el.attr && el.attr.type === "date") {
            success = true;
          }
        });
        return success;
      }
    },
    {
      text: 'Create HTML input elements that answer on one-of-many question.',
      validator(tree) {
        let success = false;
        let groups = {};
        window.walkHTML(tree, (el) => {
          if (el.tag === 'input' && el.attr && el.attr.type === "radio" && el.attr.name) {
            groups[el.attr.name] = groups[el.attr.name] ? groups[el.attr.name] + 1 : 1;
          }
        });
        Object.keys(groups).forEach(name => {
          if (groups[name] > 1) {
            success = true;
          }
        })
        return success;
      }
    },
    {
      text: 'Create HTML that shows a drop-down menu.',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'select') {
            window.walkHTML(el, (selectItem) => {
              if (selectItem.tag === 'option') {
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