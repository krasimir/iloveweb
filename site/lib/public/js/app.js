(()=>{var T={html:I,css:E,javascript:x},k=10,d={questions:[],load({lang:e,tasks:t}){t.forEach(o=>{this.questions.push({lang:e,question:o})})},initQuestions(){let e=this.questions.length,t;for(;e!=0;)t=Math.floor(Math.random()*e),e--,[this.questions[e],this.questions[t]]=[this.questions[t],this.questions[e]];this.questions=this.questions.slice(0,k)},check(e,t,o,s){let{lang:i,question:r}=this.questions[t],n=T[i]?T[i]:x;try{r.validator(n(e))&&o()}catch(l){s(C(l.toString().replace(/</gi,"&lt;")))}},html2CodeText(e){return"<code>"+e.replace(/</g,"&lt;").replace(/ /g,"&nbsp;").replace(/\n/g,`
`).replace(/\r/g,"")+"</code>"},matchSelectorToHTML(e,t){let o=document.querySelector("#exerciseFrame");if(!o){console.error("The iframe with id #exerciseFrame is missing.");return}let s=!1,i=o.contentDocument||iframeWin.document,r=`iframeMatching${new Date().getTime()}`;return window[r]=function(n){s=n},i.open(),i.write(t),i.write(`
      <script>
        el = document.querySelector("${e}");
        parent.${r}(el);
      <\/script>
    `),i.close(),delete window[r],s},walkHTML(e,t){t(e),e.child&&e.child.forEach(o=>{window.walkHTML(o,t)})},calculateSpecificity(e){return Number(get(SPECIFICITY.calculate(e),"[0].specificity","").replace(/,/g,""))}};window.ILoveWeb=d;window.html2CodeText=html2CodeText=d.html2CodeText;window.matchSelectorToHTML=matchSelectorToHTML=d.matchSelectorToHTML;window.walkHTML=walkHTML=d.walkHTML;window.calculateSpecificity=calculateSpecificity=d.calculateSpecificity;var u=d;function I(e){return html2json(e)}function E(e){var t=new cssparser.Parser;return t.parse(e)}function x(e){return e}function C(e){return e.length>500?`${e.substr(0,500)}...`:e}function a(e){return document.querySelector(e)}function p({content:e,container:t,clickEvents:o,overEvents:s,onRender:i}){let r=t||a("#app");if(!r){console.warn("Render: DOM element not found.");return}r.innerHTML=e,setTimeout(()=>{[{event:"click",handlers:o},{event:"mouseover",handler:s}].forEach(({event:n,handlers:l})=>{l&&Object.keys(l).forEach(m=>{(r.querySelectorAll(`[data-event="${m}"]`)||[]).forEach(h=>{h&&h.addEventListener(n,f=>l[m](f))})})}),i&&setTimeout(i,0)},0)}async function b(e){return new Promise(t=>{if(e.match(/\.js$/)){let o=document.createElement("script");o.onload=t,o.src=e,document.head.appendChild(o)}else fetch(e).then(t)})}function S(e){let t=a(e),o=t.getBoundingClientRect(),s=window.innerHeight,i=window.innerWidth;t.style.position="absolute",t.style.top=s/2-o.height/2+"px",t.style.left=i/2-o.width/2+"px"}function y(e){return e.toString().padStart(2,"0")}function g(e){let t=Math.floor(e/1e3),o=Math.floor(t/60),s=Math.floor(o/60);return t=t%60,o=t>=30?o+1:o,o=o%60,s=s%24,`${y(s)}:${y(o)}:${y(t)}`}function q(e){let t=u.questions.length;return encodeURIComponent(`I \u2764\uFE0F the Web platform and I just tested my knowledge at https://iloveweb.dev. I just nailed ${t} dev question${t===1?"":"s"} for ${e} time. What about you? Do you know your base?

#iloveweb #web #platform`)}var H=["/js/cssparser.min.js","/js/html2json.js","/js/htmlparser.min.js","/js/lodash.min.js","/js/parsel.js","/js/specificity.js","https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js","https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js","/imgs/Cycle_custom_icon.json"];async function F(e){let t=0;p({content:`
      <div class="loader w300 mxauto">
        <h1 class="tac tuptup">I <span><small>\u2764\uFE0F</small></span> Web</h1>
        <div class="progress mxauto mt1">
          <div class="value"></div>
        </div>
      </div>
    `}),S(".loader"),await Promise.all(e.map(async o=>{await b(o),t+=1,a(".value").style.width=`width:${Math.ceil(t/e.length*100)}%;`})),gsap.to(".loader",{y:"-100px",opacity:0,ease:"back.in(1.7)",onComplete:()=>{typeof _<"u"&&(window.get=_.get),u.initQuestions(),D()}})}function D(){p({content:`
      <div class="game-progress mxauto">
        <div class="line-progress">
          <div class="animation">
            <div class="timer"></div>
            <div class="lottie"></div>
          </div>
        </div>
        <div class="heart">\u2764\uFE0F</div>
      </div>
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
    `,onRender(){let e=0,t,o=0,s,i=a(".editor"),r=a(".editor .question"),n=a(".editor textarea"),l=a(".editor .console"),m=a(".timer");function w(){let c=u.questions[e];if(!c){h();return}p({content:c.question.text,container:r}),gsap.fromTo(r,{y:"100px",opacity:0},{y:0,opacity:1})}function h(){t&&t.stop(),clearInterval(s),i.style.display="block",p({container:i,content:`
            <section class="w500 mxauto">
              <h1 class="tac">Congratulations!</h1>
              <small class="block tac">You really \u2764\uFE0F the web.</small>
              <p class="tac mt1">
                Your result: ${g(o)}
                <br /><br />
                <a href="https://twitter.com/intent/tweet?text=${q(g(o))}">
                  <img src="/imgs/twitter.svg" width="20"/>
                  Share
                </a>
              </p>
            </section>
          `}),gsap.fromTo(i,{y:"100px",opacity:0},{y:0,opacity:1,ease:"back.out(1.7)",duration:1.4})}function f(){n.value="",gsap.fromTo(n,{y:"100px",opacity:0,background:"#1c1d1f",color:"#e9e9e9"},{y:0,opacity:1,delay:.1})}n.focus(),n.addEventListener("input",()=>{l.innerHTML="",u.check(n.value,e,()=>{e+=1,v(),gsap.to(n,{backgroundColor:"#FF7E7E",color:"#000",duration:.1,onComplete:()=>{gsap.to(n,{opacity:0,delay:.1}),gsap.to(r,{opacity:0,delay:.1,onComplete:()=>{w(),f()}})}})},c=>{l.innerHTML=c})}),n.addEventListener("keydown",function(c){c.key=="Tab"&&(c.preventDefault(),n.setRangeText("  ",n.selectionStart,n.selectionStart,"end"))});function j(){t=lottie.loadAnimation({container:a(".game-progress .animation .lottie"),renderer:"svg",loop:!0,autoplay:!0,path:"/imgs/Cycle_custom_icon.json"}),gsap.fromTo(a(".game-progress"),{x:"-100px",opacity:0},{x:0,opacity:1})}function M(){s=setInterval(()=>{o+=1e3,m.innerHTML=g(o)},1e3)}function v(){let c=a(".line-progress"),$=Math.ceil(e/u.questions.length*100);c.style.width=`${$}%`,t.setSpeed(.2+e/u.questions.length)}function L(){gsap.fromTo(a("footer"),{y:"100px",opacity:0},{y:0,opacity:.4,delay:.3,duration:.8})}w(),f(),j(),v(),M(),L()}})}window.addEventListener("load",()=>{let e=[...H,QUESTIONS_FILE];console.log(JSON.stringify(e,null,2)),F(e)});})();
