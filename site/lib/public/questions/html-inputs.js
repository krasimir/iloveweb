ILoveWeb.load({
  lang: 'html',
  doc: '',
  tasks: [
    {
      text: 'Добавете поле за избор на цвят.',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'input' && el.attr && el.attr.type === "color") {
            success = true;
          }
        });
        return success;
      },
      answer: '<input type="color" />'
    },
    {
      text: 'Добавете поле за избор на дата.',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'input' && el.attr && el.attr.type === "date") {
            success = true;
          }
        });
        return success;
      },
      answer: '<input type="date" />'
    },
    {
      text: 'Създайте група от полета за избор "един от много".',
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
      },
      answer: '<input type="radio" name="setting" value="a" />\n<input type="radio" name="setting" value="b" />'
    },
    {
      text: 'Създайте падащо меню (select елемент).',
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
      },
      answer: '<select>\n  <option>a</option>\n  <option>b</option>\n</select>'
    }
  ]
});