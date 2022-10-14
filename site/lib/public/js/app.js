(()=>{function s(t){return document.querySelector(t)}function v(t){return document.querySelectorAll(t)}function a({content:t,container:e,clickEvents:o,overEvents:n,onRender:i}){let r=e||s("#app");if(!r){console.warn("Render: DOM element not found.");return}r.innerHTML=t,setTimeout(()=>{[{event:"click",handlers:o},{event:"mouseover",handler:n}].forEach(({event:m,handlers:c})=>{c&&Object.keys(c).forEach(l=>{(r.querySelectorAll(`[data-event="${l}"]`)||[]).forEach(d=>{d&&d.addEventListener(m,f=>c[l](f))})})}),i&&i(),y()},0)}async function p(t){return new Promise(e=>{let o=document.createElement("script");o.onload=e,o.src=t,document.head.appendChild(o)})}function u(t){let e=s(t),o=e.getBoundingClientRect(),n=window.innerHeight,i=window.innerWidth;e.style.position="absolute",e.style.top=n/2-o.height/2+"px",e.style.left=i/2-o.width/2+"px"}function y(){v(".lottie").forEach(e=>{if(e.lottieDone)return;e.lottieDone=!0;let o=JSON.parse(decodeURIComponent(e.getAttribute("data-options"))),n=lottie.loadAnimation({container:e,renderer:"svg",loop:!0,autoplay:!1,path:e.getAttribute("data-file"),...o})})}var g="    ";function h(){a({content:`
      <div class="editor">
        <section class="question">
          <div>A question here</div>
        </section>
        <section class="area">
          <textarea rows="1"></textarea>
        </section>
      </div>
    `,onRender(){let t=s(".editor textarea");function e(){t.style.height="auto",t.style.height=this.scrollHeight+"px";let o=t.getBoundingClientRect();t.style.marginTop=(window.innerHeight-o.height)/2+"px"}t.focus(),t.addEventListener("input",e),t.addEventListener("keydown",function(o){if(o.key=="Tab"){o.preventDefault();let n=this.selectionStart,i=this.selectionEnd;this.value=this.value.substring(0,n)+g+this.value.substring(i),this.selectionStart=this.selectionEnd=n+1}}),e(),gsap.fromTo(t,{y:"100px",opacity:0},{y:0,opacity:1})}})}var w=["/js/cssparser.min.js","/js/html2json.js","/js/htmlparser.min.js","/js/lodash.min.js","/js/parsel.js","/js/specificity.js","https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js","https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"];async function j(t){let e=0;a({content:`
      <div class="loader w300 mxauto">
        <h1 class="tac tuptup">I <span><small>\u2764\uFE0F</small></span> Web</h1>
        <div class="progress mxauto mt1">
          <div class="value"></div>
        </div>
      </div>
    `}),u(".loader"),await Promise.all(t.map(async o=>{await p(o),e+=1,s(".value").style.width=`width:${Math.ceil(e/t.length*100)}%;`})),gsap.to(".loader",{y:"-100px",opacity:0,ease:"back.in(1.7)",onComplete:h})}window.ILoveWeb=ILoveWeb={questions:[],load(t){this.questions.push(t)}};window.addEventListener("load",()=>{j([...w,...QUESTIONS])});})();
