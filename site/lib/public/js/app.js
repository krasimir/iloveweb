(()=>{function C(e){return"<code>"+e.replace(/</g,"&lt;").replace(/ /g,"&nbsp;").replace(/\n/g,`
`).replace(/\r/g,"")+"</code>"}function U(e,t){let o=document.querySelector("#exerciseFrame");if(!o){console.error("The iframe with id #exerciseFrame is missing.");return}let s=!1,r=o.contentDocument||iframeWin.document,a=`iframeMatching${new Date().getTime()}`;return window[a]=function(i){s=i},r.open(),r.write(t),r.write(`
    <script>
      el = document.querySelector("${e}");
      parent.${a}(el);
    <\/script>
  `),r.close(),delete window[a],s}function H(e,t){t(e),e.child&&e.child.forEach(o=>{window.walkHTML(o,t)})}function P(e){return Number(get(SPECIFICITY.calculate(e),"[0].specificity","").replace(/,/g,""))}window.html2CodeText=C;window.matchSelectorToHTML=U;window.walkHTML=H;window.calculateSpecificity=P;function c(e){return document.querySelector(e)}function m({content:e,container:t,clickEvents:o,overEvents:s,onRender:r}){let a=t||c("#app");if(!a){console.warn("Render: DOM element not found.");return}a.innerHTML=e,setTimeout(()=>{[{event:"click",handlers:o},{event:"mouseover",handler:s}].forEach(({event:i,handlers:u})=>{u&&Object.keys(u).forEach(d=>{(a.querySelectorAll(`[data-event="${d}"]`)||[]).forEach(f=>{f&&f.addEventListener(i,g=>u[d](g))})})}),r&&setTimeout(r,0)},0)}async function $(e){return new Promise(t=>{if(e.match(/\.js$/)){let o=document.createElement("script");o.onload=t,o.src=e+`?v=${VERSION}`,document.head.appendChild(o)}else fetch(e+`?v=${VERSION}`).then(t)})}function b(e){let t=c(e),o=t.getBoundingClientRect(),s=window.innerHeight,r=window.innerWidth;t.style.position="absolute",t.style.top=s/2-o.height/2+"px",t.style.left=r/2-o.width/2+"px"}function y(e){return e.toString().padStart(2,"0")}function h(e){let t=Math.floor(e/1e3),o=Math.floor(t/60),s=Math.floor(o/60);return t=t%60,o=t>=30?o+1:o,o=o%60,s=s%24,`${y(s)}:${y(o)}:${y(t)}`}function x(e){if(n.mode==="QUIZ"){let t=n.questions.length;return encodeURIComponent(`I \u2764\uFE0F the Web platform and I tested my knowledge at https://iloveweb.dev. I just nailed ${t} dev question${t===1?"":"s"} for ${e} time. What about you? Do you know your base?

#iloveweb #web #platform`)}else{let t=(n.questions[0].lang||"").toUpperCase();return encodeURIComponent(`I \u2764\uFE0F the Web platform and I tested my knowledge at https://iloveweb.dev. I just nailed a question about ${t}. What about you? Do you know your base?

#iloveweb #web #platform`)}}function I(e){try{return new URL(location.href).searchParams.get(e)}catch(t){console.log(t)}}var T={html:W,css:D,javascript:S},R=10,j={mode:"QUIZ",questions:[],load({lang:e,tasks:t}){t.forEach(o=>{this.questions.push({lang:e,question:o})})},init(){let e=I("q");if(e){let t=this.questions.find(({question:o})=>o.id===e);t?(this.mode="SINGLE",this.questions=[t]):console.error(`Question with id "${e}" not found.`)}if(this.mode==="QUIZ"){let t=this.questions.length,o;for(;t!=0;)o=Math.floor(Math.random()*t),t--,[this.questions[t],this.questions[o]]=[this.questions[o],this.questions[t]];this.questions=this.questions.slice(0,R),console.log(`Questions in total: ${this.questions.length}`)}},check(e,t,o,s){let{lang:r,question:a}=this.questions[t],i=T[r]?T[r]:S;try{a.validator(i(e))&&o()}catch(u){s(N(u.toString().replace(/</gi,"&lt;")))}}};function W(e){return html2json(e)}function D(e){var t=new cssparser.Parser;return t.parse(e)}function S(e){return e}function N(e){return e.length>500?`${e.substr(0,500)}...`:e}window.ILoveWeb=j;var n=j;var O=["/js/cssparser.min.js","/js/html2json.js","/js/htmlparser.min.js","/js/lodash.min.js","/js/parsel.js","/js/specificity.js","https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js","https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js","/imgs/Cycle_custom_icon.json","/questions/css.js","/questions/html.js","/questions/javascript.js"];async function Q(e,t){let o=0;m({content:`
      <div class="loader w300 mxauto">
        <h1 class="tac tuptup">I <span><small>\u2764\uFE0F</small></span> Web</h1>
        <div class="progress mxauto mt1">
          <div class="value"></div>
        </div>
      </div>
    `}),b(".loader"),await Promise.all(e.map(async s=>{await $(s),o+=1,c(".value").style.width=`width:${Math.ceil(o/e.length*100)}%;`})),gsap.to(".loader",{y:"-100px",opacity:0,ease:"back.in(1.7)",onComplete:()=>{typeof _<"u"&&(window.get=_.get),t()}})}function F(){m({content:`
      ${n.mode==="QUIZ"?`<div class="game-progress mxauto">
        <div class="line-progress">
          <div class="animation">
            <div class="timer"></div>
            <div class="lottie"></div>
          </div>
        </div>
        <div class="heart">\u2764\uFE0F</div>
      </div>`:'<h1 class="tac my2">I \u2764\uFE0F Web</h1>'}
      <div class="editor">
        <section class="question"></section>
        <section class="area">
          <textarea rows="10" placeholder="My solution is ..." class="op0"></textarea>
          <div class="console"></div>
        </section>
      </div>
      <footer class="tac">
        Build by <a href="https://twitter.com/KrasimirTsonev" target="_blank">@krasimirtsonev</a>. Contribute with more questions <a href="https://github.com/krasimir/iloveweb" target="_blank">here</a>.
      </footer>
    `,onRender(){let e=0,t,o=0,s,r=c(".editor"),a=c(".editor .question"),i=c(".editor textarea"),u=c(".editor .console"),d=c(".timer");function v(){let l=n.questions[e];m({content:`<div class="z2">${l.lang.toUpperCase()}: ${l.question.text}</div>`,container:a}),gsap.fromTo(a,{y:"100px",opacity:0},{y:0,opacity:1})}function f(){t&&t.stop(),clearInterval(s),r.style.display="block",d&&(d.innerHTML=`${n.questions.length}/${n.questions.length} \xB7 ${h(o)}`);let l=n.questions.length,p=`
          <br /><br />
          <a href="https://twitter.com/intent/tweet?text=${x(h(o))}">
            <img src="/imgs/twitter.svg" width="20"/>
            Share
          </a>
        `,w=n.mode==="QUIZ"?`
          <p class="tac mt1">
            You just nailed ${l} dev question${l===1?"":"s"} for ${h(o)} time.
            ${p}
          </p>
          `:`
          <p class="tac mt1">
            Did you like this one? Solve more puzzles <a href="/">here</a>.
            ${p}
          </p>
          `;m({container:r,content:`
            <section class="w500 mxauto">
              <h1 class="tac">Congratulations!</h1>
              <small class="block tac">You really \u2764\uFE0F the web.</small>
              ${w}
            </section>
          `}),gsap.fromTo(r,{y:"100px",opacity:0},{y:0,opacity:1,ease:"back.out(1.7)",duration:1.4})}function g(){i.value="",gsap.fromTo(i,{y:"100px",opacity:0,background:"#1c1d1f",color:"#e9e9e9"},{y:0,opacity:1,delay:.1})}i.focus(),i.addEventListener("input",()=>{u.innerHTML="",n.check(i.value,e,()=>{gsap.to(i,{backgroundColor:"#FF7E7E",color:"#000",duration:.1,onComplete:()=>{gsap.to(i,{opacity:0,delay:.1}),gsap.to(a,{opacity:0,delay:.1,onComplete:()=>{e+=1,q(),n.questions[e]?(v(),g()):f()}})}})},l=>{u.innerHTML=l})}),i.addEventListener("keydown",function(l){l.key=="Tab"&&(l.preventDefault(),i.setRangeText("  ",i.selectionStart,i.selectionStart,"end"))});function E(){n.mode!=="SINGLE"&&(t=lottie.loadAnimation({container:c(".game-progress .animation .lottie"),renderer:"svg",loop:!0,autoplay:!0,path:"/imgs/Cycle_custom_icon.json"}),gsap.fromTo(c(".game-progress"),{x:"-100px",opacity:0},{x:0,opacity:1}))}function L(){n.mode!=="SINGLE"&&(clearInterval(s),s=setInterval(()=>{o+=1e3,d.innerHTML=`${e}/${n.questions.length} \xB7 ${h(o)}`},1e3))}function q(){if(n.mode==="SINGLE")return;let l=c(".line-progress"),p=[.2,8],w=Math.ceil(e/n.questions.length*100),k=p[0]+w/100*(p[1]-p[0]);l.style.width=`${w}%`,t.setSpeed(k)}function M(){gsap.fromTo(c("footer"),{y:"100px",opacity:0},{y:0,opacity:.4,delay:.3,duration:.8})}v(),g(),M(),E(),q(),L()}})}window.addEventListener("load",()=>{Q(O,()=>{n.init(),F()})});})();
