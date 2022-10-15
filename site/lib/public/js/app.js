(()=>{var f={html:g,css:x,javascript:m},h={questions:[],load({lang:e,tasks:t}){t.forEach(o=>{this.questions.push({lang:e,question:o})})},shuffle(){let e=this.questions.length,t;for(;e!=0;)t=Math.floor(Math.random()*e),e--,[this.questions[e],this.questions[t]]=[this.questions[t],this.questions[e]]},check(e,t,o,s){let{lang:n,question:r}=this.questions[t],i=f[n]?f[n]:m;try{r.validator(i(e))&&o()}catch(c){s(j(c.toString().replace(/</gi,"&lt;")))}},html2CodeText(e){return"<code>"+e.replace(/</g,"&lt;").replace(/ /g,"&nbsp;").replace(/\n/g,`
`).replace(/\r/g,"")+"</code>"},matchSelectorToHTML(e,t){let o=document.querySelector("#exerciseFrame");if(!o){console.error("The iframe with id #exerciseFrame is missing.");return}let s=!1,n=o.contentDocument||iframeWin.document,r=`iframeMatching${new Date().getTime()}`;return window[r]=function(i){s=i},n.open(),n.write(t),n.write(`
      <script>
        el = document.querySelector("${e}");
        parent.${r}(el);
      <\/script>
    `),n.close(),delete window[r],s},walkHTML(e,t){t(e),e.child&&e.child.forEach(o=>{window.walkHTML(o,t)})},calculateSpecificity(e){return Number(get(SPECIFICITY.calculate(e),"[0].specificity","").replace(/,/g,""))}};window.ILoveWeb=h;var l=h;function g(e){return html2json(e)}function x(e){var t=new cssparser.Parser;return t.parse(e)}function m(e){return e}function j(e){return e.length>500?`${e.substr(0,500)}...`:e}function a(e){return document.querySelector(e)}function q(e){return document.querySelectorAll(e)}function d({content:e,container:t,clickEvents:o,overEvents:s,onRender:n}){let r=t||a("#app");if(!r){console.warn("Render: DOM element not found.");return}r.innerHTML=e,setTimeout(()=>{[{event:"click",handlers:o},{event:"mouseover",handler:s}].forEach(({event:i,handlers:c})=>{c&&Object.keys(c).forEach(u=>{(r.querySelectorAll(`[data-event="${u}"]`)||[]).forEach(p=>{p&&p.addEventListener(i,y=>c[u](y))})})}),n&&setTimeout(n,0),S()},0)}async function w(e){return new Promise(t=>{let o=document.createElement("script");o.onload=t,o.src=e,document.head.appendChild(o)})}function v(e){let t=a(e),o=t.getBoundingClientRect(),s=window.innerHeight,n=window.innerWidth;t.style.position="absolute",t.style.top=s/2-o.height/2+"px",t.style.left=n/2-o.width/2+"px"}function S(){q(".lottie").forEach(t=>{if(t.lottieDone)return;t.lottieDone=!0;let o=JSON.parse(decodeURIComponent(t.getAttribute("data-options"))),s=lottie.loadAnimation({container:t,renderer:"svg",loop:!0,autoplay:!1,path:t.getAttribute("data-file"),...o})})}var T=["/js/cssparser.min.js","/js/html2json.js","/js/htmlparser.min.js","/js/lodash.min.js","/js/parsel.js","/js/specificity.js","https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js","https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"];async function E(e){let t=0;d({content:`
      <div class="loader w300 mxauto">
        <h1 class="tac tuptup">I <span><small>\u2764\uFE0F</small></span> Web</h1>
        <div class="progress mxauto mt1">
          <div class="value"></div>
        </div>
      </div>
    `}),v(".loader"),await Promise.all(e.map(async o=>{await w(o),t+=1,a(".value").style.width=`width:${Math.ceil(t/e.length*100)}%;`})),gsap.to(".loader",{y:"-100px",opacity:0,ease:"back.in(1.7)",onComplete:()=>{typeof _<"u"&&(window.get=_.get),l.shuffle(),b()}})}function b(){d({content:`
      <div class="editor">
        <section class="question">
          <div class="mxauto maxw400 px2 op0"></div>
        </section>
        <section class="area">
          <textarea rows="10" placeholder="My solution is ..." class="op0"></textarea>
          <div class="console"></div>
        </section>
      </div>
    `,onRender(){let e=0,t=a(".editor .question div"),o=a(".editor textarea"),s=a(".editor .console");function n(){let i=l.questions[e];d({content:i.question.text,container:t}),gsap.fromTo(t,{y:"100px",opacity:0},{y:0,opacity:1})}function r(){o.value="",gsap.fromTo(o,{y:"100px",opacity:0},{y:0,opacity:1,delay:.1})}o.focus(),o.addEventListener("input",()=>{s.innerHTML="",l.check(o.value,e,()=>{console.log("success")},i=>{s.innerHTML=i})}),o.addEventListener("keydown",function(i){i.key=="Tab"&&(i.preventDefault(),o.setRangeText("  ",o.selectionStart,o.selectionStart,"end"))}),n(),r()}})}window.addEventListener("load",()=>{E([...T,...QUESTIONS])});})();
