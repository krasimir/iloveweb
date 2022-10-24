function html2CodeText(html) {
  return '<code>' + html
    .replace(/</g, '&lt;')
    .replace(/ /g, '&nbsp;')
    .replace(/\n/g, '\n')
    .replace(/\r/g, '') + '</code>';
}
function matchSelectorToHTML(selector, html) {
  // #exerciseFrame is just an dummy empty iframe on the page
  const iframe = document.querySelector('#exerciseFrame');
  if (!iframe) {
    console.error('The iframe with id #exerciseFrame is missing.');
    return;
  }
  let result = false;
  const iframeDoc = iframe.contentDocument || iframeWin.document;
  const funcName = `iframeMatching${new Date().getTime()}`;
  window[funcName] = function(r) {
    result = r;
  }
  iframeDoc.open();
  iframeDoc.write(html);
  iframeDoc.write(`
    <script>
      el = document.querySelector("${selector}");
      parent.${funcName}(el);
    </script>
  `);
  iframeDoc.close();
  delete window[funcName];
  return result;
}
function walkHTML(item, cb) {
  cb(item);
  if (item.child) {
    item.child.forEach(i => {
      window.walkHTML(i, cb);
    });
  }
}
function calculateSpecificity(selector) {
  return Number(get(SPECIFICITY.calculate(selector), '[0].specificity', '').replace(/,/g, ''));
}

window.html2CodeText = html2CodeText;
window.matchSelectorToHTML = matchSelectorToHTML;
window.walkHTML = walkHTML;
window.calculateSpecificity = calculateSpecificity;