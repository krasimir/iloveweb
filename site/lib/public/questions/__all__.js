ILoveWeb.load({lang:"html",doc:"",tasks:[{text:"Create a title.",validator(t){let e=!1;return window.walkHTML(t,t=>{["h1","h2","h3","h4","h5","h6"].includes(t.tag)&&(e=!0)}),e}},{text:"Create a unordered list.",validator(t){let e=!1;return window.walkHTML(t,t=>{"ul"===t.tag&&window.walkHTML(t,t=>{"li"===t.tag&&(e=!0)})}),e}},{text:"Create a table with 3 rows and 2 columns.",validator(t){let n=!1;return window.walkHTML(t,t=>{if("table"===t.tag){let e=0,a=0;window.walkHTML(t,t=>{"tr"===t.tag&&(e+=1,window.walkHTML(t,t=>{"td"!==t.tag&&"th"!==t.tag||(a+=1)}))}),3===e&&6===a&&(n=!0)}}),n}}]}),ILoveWeb.load({lang:"html",doc:"",tasks:[{text:"Combine correctly &lt;span> and &lt;p> elements, so the inline element to be nested inside the block element.",validator(t){let e=!1;return window.walkHTML(t,t=>{"p"===t.tag&&(t.child||[]).forEach(t=>{"span"===t.tag&&(e=!0)})}),e},answer:"<p><span></span></p>"}]}),ILoveWeb.load({lang:"css",doc:"",tasks:[{text:"Write CSS that sets color of a &lt;p> element.",validator(t){t=t.toJSON("simple");let n=!1;return t.value.forEach(({selectors:t,declarations:e})=>{const a=!!e.color;t.forEach(t=>{matchSelectorToHTML(t,"<p>test</p>")&&a&&(n=!0)})}),n},answer:"p {\n  color: red;\n}"}]});const CSS_SELECTORS_1_HTML=`<section>
  <p>
    <span class="xxx">A</span>
    <span>B</span>
  </p>
</section>`,CSS_VALUES_1_HTML=(ILoveWeb.load({lang:"css",tasks:[{text:"Set a color of the second &lt;span> element in the following HTML snippet:"+html2CodeText(CSS_SELECTORS_1_HTML),validator(t){t=t.toJSON("simple");let n=!1;return t.value.forEach(({selectors:t,declarations:e})=>{const a=!!e.color;t.forEach(t=>{t=window.matchSelectorToHTML(t,CSS_SELECTORS_1_HTML);t&&"B"===t.innerText&&a&&(n=!0)})}),n}}]}),ILoveWeb.load({lang:"css",doc:"",tasks:[{text:"Write a valid CSS selector with specificity equal to 130.",validator(t){t=t.toJSON("simple");let e=!1;return t.value.forEach(({selectors:t})=>{t.forEach(t=>{130===calculateSpecificity(t)&&(e=!0)})}),e},answer:"#about .a .b .c {\n  font-size: 10px;\n}"}]}),`<body style="font-size:30px;">
<p style="font-size:2em;">foo</p>
<span>bar</span>
</body>`);ILoveWeb.load({lang:"css",doc:"",tasks:[{text:"Write CSS that sets the font size of the &lt;span> element to be 10px greater than the font size of the paragraph."+html2CodeText(CSS_VALUES_1_HTML),validator(t){t=t.toJSON("simple");let a=!1;return t.value.forEach(({selectors:t,declarations:e})=>{t.forEach(t=>{t=matchSelectorToHTML(t,CSS_VALUES_1_HTML);t&&"bar"===t.innerText&&"70px"===e["font-size"]&&(a=!0)})}),a}},{text:"Set the color of a paragraph to be solid green with 0.5% transparency.",validator(t){t=t.toJSON("simple");let a=!1;return t.value.forEach(({selectors:t,declarations:e})=>{t.forEach(t=>{t=matchSelectorToHTML(t,"<p>text</p>");t&&"text"===t.innerText&&(console.log(e),"rgba(0,255,0,0.5)"===e.color&&(a=!0))})}),a}}]}),ILoveWeb.load({lang:"html",tasks:[{text:"Create a HTML structure with nested elements.",validator(t){let e=!1;return get(t,"child",[]).forEach(t=>{get(t,"child",[]).forEach(t=>{"element"===get(t,"node")&&(e=!0)})}),e}},{text:'Use &lt;img /&gt; tag. Set "cat.jpg" as a value of the "src" attribute.',validator(t){let a=!1;return function t(e){"img"===get(e,"tag")&&"cat.jpg"===get(e,"attr.src","").toLowerCase()?a=!0:get(e,"child",[]).forEach(t)}(t),a}}]}),ILoveWeb.load({lang:"html",doc:"",tasks:[{text:'Add a HTML tag that loads a file with name "my-styles.css".',validator(t){let e=!1;return window.walkHTML(t,t=>{"link"===t.tag&&t.attr&&t.attr.href.match(new RegExp("my-styles.css"))&&"stylesheet"===t.attr.rel&&(e=!0)}),e}},{text:'Add a video file to your HTML page. The filename is "lesson.mp4".',validator(t){let e=!1;return window.walkHTML(t,t=>{"video"===t.tag&&window.walkHTML(t,t=>{"source"===t.tag&&t.attr.src.match(new RegExp("lesson.mp4"))&&(e=!0)})}),e}}]}),ILoveWeb.load({lang:"html",doc:"",tasks:[{text:"And a HTML element that allows the user to pick a color.",validator(t){let e=!1;return window.walkHTML(t,t=>{"input"===t.tag&&t.attr&&"color"===t.attr.type&&(e=!0)}),e}},{text:"And a HTML element that allows the user to pick a date.",validator(t){let e=!1;return window.walkHTML(t,t=>{"input"===t.tag&&t.attr&&"date"===t.attr.type&&(e=!0)}),e}},{text:"Create HTML input elements that answer on one-of-many question.",validator(t){let e=!1,a={};return window.walkHTML(t,t=>{"input"===t.tag&&t.attr&&"radio"===t.attr.type&&t.attr.name&&(a[t.attr.name]=a[t.attr.name]?a[t.attr.name]+1:1)}),Object.keys(a).forEach(t=>{1<a[t]&&(e=!0)}),e}},{text:"Create HTML that shows a drop-down menu.",validator(t){let e=!1;return window.walkHTML(t,t=>{"select"===t.tag&&window.walkHTML(t,t=>{"option"===t.tag&&(e=!0)})}),e}}]}),ILoveWeb.load({lang:"html",doc:"",tasks:[{text:"Let's say that we have a page with header and navigation containing 3 &lt;a> tags. Write a semantically correct HTML for that structure.",validator(t){let e=0;return window.walkHTML(t,t=>{"header"===t.tag&&window.walkHTML(t,t=>{"nav"===t.tag&&window.walkHTML(t,t=>{"a"===t.tag&&(e+=1)})})}),3===e},answer:'<header>\n  <nav>\n    <a href="/a">a</a>\n    <a href="/b">b</a>\n    <a href="/c">c</a>\n  </nav>\n</header>'}]}),ILoveWeb.load({lang:"html",doc:"",tasks:[{text:'Create HTML page that has a title "iloveweb".',validator(t){let e=!1;return window.walkHTML(t,t=>{"head"===t.tag&&(t.child||[]).forEach(t=>{"title"===t.tag&&(t.child||[]).forEach(t=>{e="text"===t.node&&t.text.match(/iloveweb/)})})}),e}},{text:'Set the encoding of a HTML page to "UTF-16".',validator(t){let e=!1;return window.walkHTML(t,t=>{"meta"===t.tag&&t.attr&&"UTF-16"===t.attr.charset&&(e=!0)}),e}}]}),ILoveWeb.load({lang:"js",doc:"",tasks:[{text:'Write a JavaScript function with name "test" that returns "iloveweb".',validator(t){return"iloveweb"===new Function(`
          ${t};
          return test();
        `)()}},{text:'Write a JavaScript function called "calculate" that receives the following array:<code>[10, 2, 89]</code>Your function should calculate the sum of all the numbers in the passed array.',validator(t){return 101===new Function(`
          ${t};
          return calculate([10, 2, 89]);
        `)()}},{text:'Write a JavaScript function "render" that updates the HTML content of the following tag:<code>&lt;div id="app">&lt;/div></code>',validator(t){return void 0!==new Function(`
          let domEl = {};
          const document = {
            querySelector(sel) {
              return sel === '#app' ? domEl : null;
            },
            querySelectorAll(sel) {
              return sel === '#app' ? [domEl] : [];
            },
            getElementById(sel) {
              return sel === 'app' ? domEl : null;
            }
          }
          ${t};
          render();
          return domEl;
        `)().innerHTML}},{text:`Think that you have a global object "API" and a global function "iloveweb".<code>const&nbsp;API&nbsp;=&nbsp;{
&nbsp;&nbsp;hey()&nbsp;{&nbsp;return&nbsp;'Hello!';&nbsp;}
}
function&nbsp;iloveweb()&nbsp;{
&nbsp;&nbsp;return&nbsp;this.hey();
}</code>Call the function so it runs with no error.`,validator(t){return new Function(`
          const API = {
            hey() { return 'Hello!'; }
          }
          function iloveweb() {
            return this.hey();
          }
          return ${t} === 'Hello!';
        `)()}}]}),ILoveWeb.load({lang:"js",doc:"",tasks:[{text:'Write a JavaScript object with a method "iloveweb" that returns the string "yes".',validator(t){return new Function(`
          const obj = ${t};
          if (obj.iloveweb() === 'yes') {
            return true;
          } else {
            throw new Error("\\"iloveweb\\" doesn't return \\"yes\\".");
          }
        `)()}},{text:`You have the following global object:<code>const&nbsp;API&nbsp;=&nbsp;{
&nbsp;&nbsp;questions:&nbsp;['a',&nbsp;'b',&nbsp;'c'],
&nbsp;&nbsp;print()&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;}&nbsp;
}</code>Write code that will be placed inside the print method and will make the function returns the string "abc".`,validator(t){return new Function(`
          const API = {
            questions: ['a', 'b', 'c'],
            print() {
              ${t}
            } 
          }
          if (API.print() === undefined) {
            throw new Error("The \\"print\\" method returns nothing at the moment.");
          }
          return API.print() === 'abc';
        `)()}}]});