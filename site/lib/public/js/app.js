(()=>{var w={html:I,css:L,javascript:T},E=10,x={questions:[],load({lang:e,tasks:t}){t.forEach(o=>{this.questions.push({lang:e,question:o})})},initQuestions(){let e=this.questions.length,t;for(;e!=0;)t=Math.floor(Math.random()*e),e--,[this.questions[e],this.questions[t]]=[this.questions[t],this.questions[e]];this.questions=this.questions.slice(0,E)},check(e,t,o,i){let{lang:s,question:r}=this.questions[t],n=w[s]?w[s]:T;try{r.validator(n(e))&&o()}catch(l){i(k(l.toString().replace(/</gi,"&lt;")))}},html2CodeText(e){return"<code>"+e.replace(/</g,"&lt;").replace(/ /g,"&nbsp;").replace(/\n/g,`
`).replace(/\r/g,"")+"</code>"},matchSelectorToHTML(e,t){let o=document.querySelector("#exerciseFrame");if(!o){console.error("The iframe with id #exerciseFrame is missing.");return}let i=!1,s=o.contentDocument||iframeWin.document,r=`iframeMatching${new Date().getTime()}`;return window[r]=function(n){i=n},s.open(),s.write(t),s.write(`
      <script>
        el = document.querySelector("${e}");
        parent.${r}(el);
      <\/script>
    `),s.close(),delete window[r],i},walkHTML(e,t){t(e),e.child&&e.child.forEach(o=>{window.walkHTML(o,t)})},calculateSpecificity(e){return Number(get(SPECIFICITY.calculate(e),"[0].specificity","").replace(/,/g,""))}};window.ILoveWeb=x;var u=x;function I(e){return html2json(e)}function L(e){var t=new cssparser.Parser;return t.parse(e)}function T(e){return e}function k(e){return e.length>500?`${e.substr(0,500)}...`:e}function a(e){return document.querySelector(e)}function d({content:e,container:t,clickEvents:o,overEvents:i,onRender:s}){let r=t||a("#app");if(!r){console.warn("Render: DOM element not found.");return}r.innerHTML=e,setTimeout(()=>{[{event:"click",handlers:o},{event:"mouseover",handler:i}].forEach(({event:n,handlers:l})=>{l&&Object.keys(l).forEach(p=>{(r.querySelectorAll(`[data-event="${p}"]`)||[]).forEach(m=>{m&&m.addEventListener(n,h=>l[p](h))})})}),s&&setTimeout(s,0)},0)}async function b(e){return new Promise(t=>{if(e.match(/\.js$/)){let o=document.createElement("script");o.onload=t,o.src=e,document.head.appendChild(o)}else fetch(e).then(t)})}function j(e){let t=a(e),o=t.getBoundingClientRect(),i=window.innerHeight,s=window.innerWidth;t.style.position="absolute",t.style.top=i/2-o.height/2+"px",t.style.left=s/2-o.width/2+"px"}function v(e){return e.toString().padStart(2,"0")}function f(e){let t=Math.floor(e/1e3),o=Math.floor(t/60),i=Math.floor(o/60);return t=t%60,o=t>=30?o+1:o,o=o%60,i=i%24,`${v(i)}:${v(o)}:${v(t)}`}function q(e){let t=u.questions.length;return encodeURIComponent(`I \u2764\uFE0F the Web platform and I just tested my knowledge at https://iloveweb.dev. I just nailed ${t} dev question${t===1?"":"s"} for ${e} time. What about you? Do you know your base?

#iloveweb #web #platform`)}var C=["/js/cssparser.min.js","/js/html2json.js","/js/htmlparser.min.js","/js/lodash.min.js","/js/parsel.js","/js/specificity.js","https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js","https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js","/imgs/Cycle_custom_icon.json"];async function H(e){let t=0;d({content:`
      <div class="loader w300 mxauto">
        <h1 class="tac tuptup">I <span><small>\u2764\uFE0F</small></span> Web</h1>
        <div class="progress mxauto mt1">
          <div class="value"></div>
        </div>
      </div>
    `}),j(".loader"),await Promise.all(e.map(async o=>{await b(o),t+=1,a(".value").style.width=`width:${Math.ceil(t/e.length*100)}%;`})),gsap.to(".loader",{y:"-100px",opacity:0,ease:"back.in(1.7)",onComplete:()=>{typeof _<"u"&&(window.get=_.get),u.initQuestions(),D()}})}function D(){d({content:`
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
    `,onRender(){let e=0,t,o=0,i,s=a(".editor"),r=a(".editor .question"),n=a(".editor textarea"),l=a(".editor .console"),p=a(".timer");function g(){let c=u.questions[e];if(!c){m();return}d({content:c.question.text,container:r}),gsap.fromTo(r,{y:"100px",opacity:0},{y:0,opacity:1})}function m(){t&&t.stop(),clearInterval(i),s.style.display="block",d({container:s,content:`
            <section class="w500 mxauto">
              <h1 class="tac">Congratulations!</h1>
              <small class="block tac">You really \u2764\uFE0F the web.</small>
              <p class="tac mt1">
                Your result: ${f(o)}
                <br /><br />
                <a href="https://twitter.com/intent/tweet?text=${q(f(o))}">
                  <img src="/imgs/twitter.svg" width="20"/>
                  Share
                </a>
              </p>
            </section>
          `}),gsap.fromTo(s,{y:"100px",opacity:0},{y:0,opacity:1,ease:"back.out(1.7)",duration:1.4})}function h(){n.value="",gsap.fromTo(n,{y:"100px",opacity:0,background:"#1c1d1f",color:"#e9e9e9"},{y:0,opacity:1,delay:.1})}n.focus(),n.addEventListener("input",()=>{l.innerHTML="",u.check(n.value,e,()=>{e+=1,y(),gsap.to(n,{backgroundColor:"#FF7E7E",color:"#000",duration:.1,onComplete:()=>{gsap.to(n,{opacity:0,delay:.1}),gsap.to(r,{opacity:0,delay:.1,onComplete:()=>{g(),h()}})}})},c=>{l.innerHTML=c})}),n.addEventListener("keydown",function(c){c.key=="Tab"&&(c.preventDefault(),n.setRangeText("  ",n.selectionStart,n.selectionStart,"end"))});function S(){t=lottie.loadAnimation({container:a(".game-progress .animation .lottie"),renderer:"svg",loop:!0,autoplay:!0,path:"/imgs/Cycle_custom_icon.json"}),gsap.fromTo(a(".game-progress"),{x:"-100px",opacity:0},{x:0,opacity:1})}function $(){i=setInterval(()=>{o+=1e3,p.innerHTML=f(o)},1e3)}function y(){let c=a(".line-progress"),M=Math.ceil(e/u.questions.length*100);c.style.width=`${M}%`,t.setSpeed(.2+e/u.questions.length)}g(),h(),S(),y(),$()}})}window.addEventListener("load",()=>{H([...C,...QUESTIONS])});})();
