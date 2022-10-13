(()=>{function n(t){return document.querySelector(t)}function v(t){return document.querySelectorAll(t)}function r({content:t,container:e,clickEvents:o,overEvents:i,onRender:s}){let c=e||n("#app");if(!c){console.warn("Render: DOM element not found.");return}c.innerHTML=t,setTimeout(()=>{[{event:"click",handlers:o},{event:"mouseover",handler:i}].forEach(({event:f,handlers:d})=>{d&&Object.keys(d).forEach(l=>{(c.querySelectorAll(`[data-event="${l}"]`)||[]).forEach(p=>{p&&p.addEventListener(f,h=>d[l](h))})})}),s&&s(),w()},0)}async function u(t){return new Promise(e=>{let o=document.createElement("script");o.onload=e,o.src=t,document.head.appendChild(o)})}function a(t){let e=n(t),o=e.getBoundingClientRect(),i=window.innerHeight,s=window.innerWidth;e.style.position="absolute",e.style.top=i/2-o.height/2+"px",e.style.left=s/2-o.width/2+"px"}function w(){v(".lottie").forEach(e=>{if(e.lottieDone)return;e.lottieDone=!0;let o=JSON.parse(decodeURIComponent(e.getAttribute("data-options"))),i=lottie.loadAnimation({container:e,renderer:"svg",loop:!0,autoplay:!1,path:e.getAttribute("data-file"),...o})})}function m(){r({content:`
      <div class="editor w500">
        <div class="area mxauto" contenteditable="true"></div>
      </div>
    `,onRender(){let t=n(".editor .area");t.innerHTML="&nbsp;",t.focus(),t.addEventListener("keydown",e=>{t.innerText===""&&(t.innerHTML="&nbsp;")})}}),a(".editor")}var j=["/js/cssparser.min.js","/js/html2json.js","/js/htmlparser.min.js","/js/lodash.min.js","/js/parsel.js","/js/specificity.js","https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js"];async function y(t){let e=0;r({content:`
      <div class="loader w300 mxauto">
        <h1 class="tac tuptup">I <span><small>\u2764\uFE0F</small></span> Web</h1>
        <div class="progress mxauto mt1">
          <div class="value"></div>
        </div>
      </div>
    `}),a(".loader"),await Promise.all(t.map(async o=>{await u(o),e+=1,n(".value").style.width=`width:${Math.ceil(e/t.length*100)}%;`})),n(".loader").style.opacity=0,setTimeout(m,600)}window.ILoveWeb=ILoveWeb={questions:[],load(t){this.questions.push(t)}};window.addEventListener("load",()=>{y([...j,...QUESTIONS])});})();
