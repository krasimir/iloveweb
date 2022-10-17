ILoveWeb.load({
  lang: 'html',
  tasks: [
    {
      text: 'Create HTML structure with nested elements.',
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
      text: 'Create an unordered list.',
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
      text: 'Create an ordered list.',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'ol') {
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
      text: 'Combine correctly &lt;span> and &lt;p> element, so the inline element to be nested inside the block element.',
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
    },
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
      text: 'Add a video to your HTML page. The filename is "lesson.mp4".',
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
    },
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
      text: 'And a HTML element that allows the user to type a password.',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'input' && el.attr && el.attr.type === "password") {
            success = true;
          }
        });
        return success;
      }
    },
    {
      text: 'Create HTML input elements that answer a one-of-many question.',
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
    },
    {
      text: 'Let\'s say that we have a page with header and navigation containing 3 &lt;a> tags. Write a semantically correct HTML.',
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
      }
    },
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
    },
    {
      text: 'Set the encoding of a HTML page to "UTF-8".',
      validator(tree) {
        let metaExists = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'meta' && el.attr && el.attr.charset === 'UTF-8') {
            metaExists = true;
          }
        });
        return metaExists;
      }
    },
    {
      text: 'Set an inline style of a &lt;section> element.',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (el.tag === 'section' && _.get(el, 'attr.style', '').length > 1) {
            success = true;
          }
        });
        return success;
      }
    },
    {
      text: 'Write an iframe that loads "banner.html" in 300x300 area.',
      validator(tree) {
        let success = false;
        window.walkHTML(tree, (el) => {
          if (
            el.tag === 'iframe' &&
            _.get(el, 'attr.src', '').match(/banner\.html/) &&
            _.get(el, 'attr.width', '') === '300' &&
            _.get(el, 'attr.height', '') === '300'
          ) {
            success = true;
          }
        });
        return success;
      }
    },
    {
      text: 'Write code that results in 3 HTML tags and 1 HTML elements.',
      validator(tree) {
        const oneTagElements = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
        let nOfTags = 0;
        let nOfEls = 0;
        window.walkHTML(tree, (el) => {
          if (el.node === 'element') {
            if (oneTagElements.includes(el.tag)) {
              nOfTags += 1;
            } else {
              nOfTags += 2;
              nOfEls += 1;
            }
          }
        });
        const result = nOfTags === 3 && nOfEls === 1;
        if (result) {
          return true;
        }
        throw new Error(`At the moment you have - \ntags: ${nOfTags}, elements: ${nOfEls}`);
      }
    },
    {
      text: 'Write code that results in 4 HTML tags and 2 HTML elements.',
      validator(tree) {
        const oneTagElements = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
        let nOfTags = 0;
        let nOfEls = 0;
        window.walkHTML(tree, (el) => {
          if (el.node === 'element') {
            if (oneTagElements.includes(el.tag)) {
              nOfTags += 1;
            } else {
              nOfTags += 2;
              nOfEls += 1;
            }
          }
        });
        let result = nOfTags === 4 && nOfEls === 2;
        if (result) {
          return true;
        }
        throw new Error(`At the moment you have: tags(${nOfTags}), elements(${nOfEls})`);
      }
    }
  ]
})