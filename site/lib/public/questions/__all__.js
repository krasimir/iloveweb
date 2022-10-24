const CSS_SELECTORS_1_HTML=`<section>
  <p>
    <span class="xxx">A</span>
    <span>B</span>
  </p>
</section>`,CSS_VALUES_1_HTML=`<body style="font-size:30px;">
<p style="font-size:2em;">foo</p>
<span>bar</span>
</body>`;ILoveWeb.load({lang:"css",doc:"",tasks:[{id:"l5yMi_gIkU",text:"Write CSS that sets color of a &lt;p> element.",validator(t){t=t.toJSON("simple");let n=!1;return t.value.forEach(({selectors:t,declarations:e})=>{const a=!!e.color;t.forEach(t=>{matchSelectorToHTML(t,"<p>test</p>")&&a&&(n=!0)})}),n},answer:"p {\n  color: red;\n}"},{id:"AqWECKsi2I",text:"Set a color of the second &lt;span> element in the following HTML snippet:"+html2CodeText(CSS_SELECTORS_1_HTML),validator(t){t=t.toJSON("simple");let n=!1;return t.value.forEach(({selectors:t,declarations:e})=>{const a=!!e.color;t.forEach(t=>{t=window.matchSelectorToHTML(t,CSS_SELECTORS_1_HTML);t&&"B"===t.innerText&&a&&(n=!0)})}),n}},{id:"6LGZosTgq9",text:"Write a valid CSS selector with specificity equal to 130.",validator(t){t=t.toJSON("simple");let e=!1;return t.value.forEach(({selectors:t})=>{t.forEach(t=>{130===calculateSpecificity(t)&&(e=!0)})}),e}},{id:"TC0kEUErLD",text:"Write a valid CSS selector with specificity equal to 021.",validator(t){t=t.toJSON("simple");let e=!1;return t.value.forEach(({selectors:t})=>{t.forEach(t=>{21===calculateSpecificity(t)&&(e=!0)})}),e}},{id:"3OFt2JFp4M",text:"Write a valid CSS selector with specificity equal to 201.",validator(t){t=t.toJSON("simple");let e=!1;return t.value.forEach(({selectors:t})=>{t.forEach(t=>{201===calculateSpecificity(t)&&(e=!0)})}),e}},{id:"LS8JL_upW_",text:"Write CSS that sets the font size of the &lt;span> element to be 10px greater than the font size of the paragraph."+html2CodeText(CSS_VALUES_1_HTML),validator(t){t=t.toJSON("simple");let a=!1;return t.value.forEach(({selectors:t,declarations:e})=>{t.forEach(t=>{t=matchSelectorToHTML(t,CSS_VALUES_1_HTML);t&&"bar"===t.innerText&&"70px"===e["font-size"]&&(a=!0)})}),a}},{id:"592fqVTi0v",text:"Set the color of a paragraph to be solid green with 0.5% transparency.",validator(t){t=t.toJSON("simple");let a=!1;return t.value.forEach(({selectors:t,declarations:e})=>{t.forEach(t=>{t=matchSelectorToHTML(t,"<p>text</p>");t&&"text"===t.innerText&&"rgba(0,255,0,0.5)"===e.color&&(a=!0)})}),a}},{id:"HEkRkPaEUr",text:"Set the color of a span to be solid blue with 0.2% transparency.",validator(t){t=t.toJSON("simple");let a=!1;return t.value.forEach(({selectors:t,declarations:e})=>{t.forEach(t=>{t=matchSelectorToHTML(t,"<span>text</span>");t&&"text"===t.innerText&&"rgba(0,0,255,0.2)"===e.color&&(a=!0)})}),a}}]}),ILoveWeb.load({lang:"html",tasks:[{id:"KP4bUO3LGl",text:"Create HTML structure with nested elements.",validator(t){let e=!1;return get(t,"child",[]).forEach(t=>{get(t,"child",[]).forEach(t=>{"element"===get(t,"node")&&(e=!0)})}),e}},{id:"0pqX6RrTrI",text:'Use &lt;img /&gt; tag. Set "cat.jpg" as a value of the "src" attribute.',validator(t){let a=!1;return function t(e){"img"===get(e,"tag")&&"cat.jpg"===get(e,"attr.src","").toLowerCase()?a=!0:get(e,"child",[]).forEach(t)}(t),a}},{id:"dRydZfzcsM",text:"Create a title.",validator(t){let e=!1;return window.walkHTML(t,t=>{["h1","h2","h3","h4","h5","h6"].includes(t.tag)&&(e=!0)}),e}},{id:"IqnhDcdSHv",text:"Create an unordered list.",validator(t){let e=!1;return window.walkHTML(t,t=>{"ul"===t.tag&&window.walkHTML(t,t=>{"li"===t.tag&&(e=!0)})}),e}},{id:"ICU_zTA0Pq",text:"Create an ordered list.",validator(t){let e=!1;return window.walkHTML(t,t=>{"ol"===t.tag&&window.walkHTML(t,t=>{"li"===t.tag&&(e=!0)})}),e}},{id:"ILJdHegpoN",text:"Create a table with 3 rows and 2 columns.",validator(t){let n=!1;return window.walkHTML(t,t=>{if("table"===t.tag){let e=0,a=0;window.walkHTML(t,t=>{"tr"===t.tag&&(e+=1,window.walkHTML(t,t=>{"td"!==t.tag&&"th"!==t.tag||(a+=1)}))}),3===e&&6===a&&(n=!0)}}),n}},{id:"vPviSmh9Ky",text:"Combine correctly &lt;span> and &lt;p> element, so the inline element to be nested inside the block element.",validator(t){let e=!1;return window.walkHTML(t,t=>{"p"===t.tag&&(t.child||[]).forEach(t=>{"span"===t.tag&&(e=!0)})}),e},answer:"<p><span></span></p>"},{id:"1r-TCCexRs",text:'Add a HTML tag that loads a file with name "my-styles.css".',validator(t){let e=!1;return window.walkHTML(t,t=>{"link"===t.tag&&t.attr&&t.attr.href.match(new RegExp("my-styles.css"))&&"stylesheet"===t.attr.rel&&(e=!0)}),e}},{id:"R4hcIa4lar",text:'Add a video to your HTML page. The filename is "lesson.mp4".',validator(t){let e=!1;return window.walkHTML(t,t=>{"video"===t.tag&&window.walkHTML(t,t=>{"source"===t.tag&&t.attr.src.match(new RegExp("lesson.mp4"))&&(e=!0)})}),e}},{id:"UURSUuiKiG",text:"Add a HTML element that allows the user to pick a color.",validator(t){let e=!1;return window.walkHTML(t,t=>{"input"===t.tag&&t.attr&&"color"===t.attr.type&&(e=!0)}),e}},{id:"2Pfcgq6PCP",text:"Add a HTML element that allows the user to pick a date.",validator(t){let e=!1;return window.walkHTML(t,t=>{"input"===t.tag&&t.attr&&"date"===t.attr.type&&(e=!0)}),e}},{id:"B2OvNGkEip",text:"Add a HTML element that allows the user to type a password.",validator(t){let e=!1;return window.walkHTML(t,t=>{"input"===t.tag&&t.attr&&"password"===t.attr.type&&(e=!0)}),e}},{id:"uE1e7cgAc1",text:"Create HTML input elements that answer a one-of-many question.",validator(t){let e=!1,a={};return window.walkHTML(t,t=>{"input"===t.tag&&t.attr&&"radio"===t.attr.type&&t.attr.name&&(a[t.attr.name]=a[t.attr.name]?a[t.attr.name]+1:1)}),Object.keys(a).forEach(t=>{1<a[t]&&(e=!0)}),e}},{id:"ek0P54NIO1",text:"Create HTML that shows a drop-down menu.",validator(t){let e=!1;return window.walkHTML(t,t=>{"select"===t.tag&&window.walkHTML(t,t=>{"option"===t.tag&&(e=!0)})}),e}},{id:"aKRbL070WQ",text:"Let's say that we have a page with header and navigation containing 3 &lt;a> tags. Write a semantically correct HTML.",validator(t){let e=0;return window.walkHTML(t,t=>{"header"===t.tag&&window.walkHTML(t,t=>{"nav"===t.tag&&window.walkHTML(t,t=>{"a"===t.tag&&(e+=1)})})}),3===e}},{id:"_6CIl4FDa8",text:'Create HTML page that has a title "iloveweb".',validator(t){let e=!1;return window.walkHTML(t,t=>{"head"===t.tag&&(t.child||[]).forEach(t=>{"title"===t.tag&&(t.child||[]).forEach(t=>{e="text"===t.node&&t.text.match(/iloveweb/)})})}),e}},{id:"Hv714OPVvU",text:'Set the encoding of a HTML page to "UTF-16".',validator(t){let e=!1;return window.walkHTML(t,t=>{"meta"===t.tag&&t.attr&&"UTF-16"===t.attr.charset&&(e=!0)}),e}},{id:"KjgUtt9xer",text:'Set the encoding of a HTML page to "UTF-8".',validator(t){let e=!1;return window.walkHTML(t,t=>{"meta"===t.tag&&t.attr&&"UTF-8"===t.attr.charset&&(e=!0)}),e}},{id:"N0OWPDwnOW",text:"Set an inline style of a &lt;section> element.",validator(t){let e=!1;return window.walkHTML(t,t=>{"section"===t.tag&&1<_.get(t,"attr.style","").length&&(e=!0)}),e}},{id:"197W-Rnv-6",text:'Write an iframe that loads "banner.html" in 300x300 area.',validator(t){let e=!1;return window.walkHTML(t,t=>{"iframe"===t.tag&&_.get(t,"attr.src","").match(/banner\.html/)&&"300"===_.get(t,"attr.width","")&&"300"===_.get(t,"attr.height","")&&(e=!0)}),e}},{id:"BUd6AXJm2K",text:"Write code that results in 3 HTML tags and 1 HTML elements.",validator(t){const e=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"];let a=0,n=0;if(window.walkHTML(t,t=>{"element"===t.node&&(e.includes(t.tag)?a+=1:(a+=2,n+=1))}),3===a&&1===n)return!0;throw new Error(`At the moment you have - 
tags: ${a}, elements: `+n)}},{id:"dlnjBX9IR6",text:"Write code that results in 4 HTML tags and 2 HTML elements.",validator(t){const e=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"];let a=0,n=0;if(window.walkHTML(t,t=>{"element"===t.node&&(e.includes(t.tag)?a+=1:(a+=2,n+=1))}),4===a&&2===n)return!0;throw new Error(`At the moment you have: tags(${a}), elements(${n})`)}}]}),ILoveWeb.load({lang:"js",doc:"",tasks:[{id:"um8GoUGZxX",text:'Write a JavaScript object with a method "iloveweb" that returns the string "yes".',validator(t){return new Function(`
          const obj = ${t};
          if (obj.iloveweb() === 'yes') {
            return true;
          } else {
            throw new Error("\\"iloveweb\\" doesn't return \\"yes\\".");
          }
        `)()}},{id:"m7iWnsI2EZ",text:`You have the following global object:<code>const&nbsp;API&nbsp;=&nbsp;{
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
        `)()}},{id:"86RbsBn6sG",text:'Write a JavaScript function with name "test" that returns "iloveweb".',validator(t){return"iloveweb"===new Function(`
          ${t};
          return test();
        `)()}},{id:"FkNiJCnMGt",text:'Write a JavaScript function called "calculate". It will receive the array:<code>[10, 2, 89]</code>Your function should calculate the sum of all the numbers and return it.',validator(t){return 101===new Function(`
          ${t};
          return calculate([10, 2, 89]);
        `)()}},{id:"aVkqmsw0Ow",text:'Write a JavaScript function "render" that updates the HTML content of the following tag:<code>&lt;div id="app">&lt;/div></code>',validator(t){return void 0!==new Function(`
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
        `)().innerHTML}},{id:"RM1xMgPtv0",text:`Think that you have a global object "API" and a global function "iloveweb".<code>const&nbsp;API&nbsp;=&nbsp;{
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
        `)()}},{id:"w0Hh9HqUXH",text:'There is an item in the local storage with key "data". Read it from there and print it to the console.',validator(t){return new Function(`
          let success = false;
          const localStorage = {
            getItem(key) {
              if (key === "data") {
                return 'iloveweb';
              }
            },
            setItem() {}
          }
          const console = {
            log(value) {
              if (value === 'iloveweb') {
                success = true;
              }
            },
            warn(){},
            error(){}
          }
          ${t}
          return success;
        `)()}},{id:"-qafO04RLE",text:`Write code that will be placed on the "!!!" marker. The result of the function "getFullname" should be "John Doe".<code>const&nbsp;User&nbsp;=&nbsp;{
&nbsp;&nbsp;firstName:&nbsp;'John',
&nbsp;&nbsp;lastName:&nbsp;'Doe'
}
function&nbsp;getFullname(userData)&nbsp;{
&nbsp;&nbsp;!!!
&nbsp;&nbsp;return&nbsp;firstName&nbsp;+&nbsp;'&nbsp;'&nbsp;+&nbsp;lastName;
}
getFullName(User);</code>`,validator(t){return"John Doe"===new Function(`
          const User = {
            firstName: 'John',
            lastName: 'Doe'
          }
          function getFullname(userData) {
            ${t}
            return firstName + ' ' + lastName;
          }
          return getFullname(User);
        `)()}},{id:"RxZCIL3ggi",text:`Write some code that will replace "{your code here}" text so the result of this script is "John Doe is 37 years old".<code>async&nbsp;function&nbsp;loadName()&nbsp;{
&nbsp;&nbsp;return&nbsp;'John&nbsp;Doe';
}
async&nbsp;function&nbsp;loadAge()&nbsp;{
&nbsp;&nbsp;return&nbsp;37
}
{your&nbsp;code&nbsp;here}.then(([name,&nbsp;age])&nbsp;=>&nbsp;{
&nbsp;&nbsp;console.log(name&nbsp;+&nbsp;'&nbsp;is&nbsp;'&nbsp;+&nbsp;age&nbsp;+&nbsp;'&nbsp;years&nbsp;old');
});</code>`,validator(t){return"John Doe is 37 years old"===new Function(`
const logic = (data) => ({
  then: (cb) => cb(data)
});
const Promise = { all: logic, allSettled: logic }
function loadName() {
  return 'John Doe';
}
function loadAge() {
  return 37
}
let res;
try {
  res = ${t}.then(([name, age]) => {
    return name + ' is ' + age + ' years old';
  });
} catch(err) {}
return res;
        `)()}}]});