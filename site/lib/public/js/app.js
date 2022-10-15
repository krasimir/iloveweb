(()=>{var w={html:M,css:E,javascript:T},x={questions:[],load({lang:e,tasks:t}){t.forEach(o=>{this.questions.push({lang:e,question:o})})},shuffle(){let e=this.questions.length,t;for(;e!=0;)t=Math.floor(Math.random()*e),e--,[this.questions[e],this.questions[t]]=[this.questions[t],this.questions[e]]},check(e,t,o,s){let{lang:n,question:r}=this.questions[t],i=w[n]?w[n]:T;try{r.validator(i(e))&&o()}catch(l){s($(l.toString().replace(/</gi,"&lt;")))}},html2CodeText(e){return"<code>"+e.replace(/</g,"&lt;").replace(/ /g,"&nbsp;").replace(/\n/g,`
`).replace(/\r/g,"")+"</code>"},matchSelectorToHTML(e,t){let o=document.querySelector("#exerciseFrame");if(!o){console.error("The iframe with id #exerciseFrame is missing.");return}let s=!1,n=o.contentDocument||iframeWin.document,r=`iframeMatching${new Date().getTime()}`;return window[r]=function(i){s=i},n.open(),n.write(t),n.write(`
      <script>
        el = document.querySelector("${e}");
        parent.${r}(el);
      <\/script>
    `),n.close(),delete window[r],s},walkHTML(e,t){t(e),e.child&&e.child.forEach(o=>{window.walkHTML(o,t)})},calculateSpecificity(e){return Number(get(SPECIFICITY.calculate(e),"[0].specificity","").replace(/,/g,""))}};window.ILoveWeb=x;var d=x;function M(e){return html2json(e)}function E(e){var t=new cssparser.Parser;return t.parse(e)}function T(e){return e}function $(e){return e.length>500?`${e.substr(0,500)}...`:e}function a(e){return document.querySelector(e)}function p({content:e,container:t,clickEvents:o,overEvents:s,onRender:n}){let r=t||a("#app");if(!r){console.warn("Render: DOM element not found.");return}r.innerHTML=e,setTimeout(()=>{[{event:"click",handlers:o},{event:"mouseover",handler:s}].forEach(({event:i,handlers:l})=>{l&&Object.keys(l).forEach(m=>{(r.querySelectorAll(`[data-event="${m}"]`)||[]).forEach(u=>{u&&u.addEventListener(i,h=>l[m](h))})})}),n&&setTimeout(n,0)},0)}async function S(e){return new Promise(t=>{let o=document.createElement("script");o.onload=t,o.src=e,document.head.appendChild(o)})}function j(e){let t=a(e),o=t.getBoundingClientRect(),s=window.innerHeight,n=window.innerWidth;t.style.position="absolute",t.style.top=s/2-o.height/2+"px",t.style.left=n/2-o.width/2+"px"}function g(e){return e.toString().padStart(2,"0")}function v(e){let t=e%1e3,o=Math.floor(e/1e3),s=Math.floor(o/60),n=Math.floor(s/60);return o=o%60,s=o>=30?s+1:s,s=s%60,n=n%24,`${g(n)}:${g(s)}:${g(o)}`}var I=["/js/cssparser.min.js","/js/html2json.js","/js/htmlparser.min.js","/js/lodash.min.js","/js/parsel.js","/js/specificity.js","https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js","https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"];async function L(e){let t=0;p({content:`
      <div class="loader w300 mxauto">
        <h1 class="tac tuptup">I <span><small>\u2764\uFE0F</small></span> Web</h1>
        <div class="progress mxauto mt1">
          <div class="value"></div>
        </div>
      </div>
    `}),j(".loader"),await Promise.all(e.map(async o=>{await S(o),t+=1,a(".value").style.width=`width:${Math.ceil(t/e.length*100)}%;`})),gsap.to(".loader",{y:"-100px",opacity:0,ease:"back.in(1.7)",onComplete:()=>{typeof _<"u"&&(window.get=_.get),d.shuffle(),k()}})}function k(){p({content:`
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
        <section class="question">
          <div class="mxauto maxw400 px2 op0"></div>
        </section>
        <section class="area">
          <textarea rows="10" placeholder="My solution is ..." class="op0"></textarea>
          <div class="console"></div>
        </section>
      </div>
    `,onRender(){let e=0,t,o=0,s,n=a(".editor"),r=a(".editor .question div"),i=a(".editor textarea"),l=a(".editor .console"),m=a(".timer");function f(){let c=d.questions[e];if(!c){t&&t.stop(),clearInterval(s),n.style.display="block",p({container:n,content:`
              <section class="w500 mxauto">
                <h1 class="tac">Congratulations!</h1>
                <small class="block tac">You really \u2764\uFE0F the web.</small>
                <p class="tac mt1">
                  Your result: ${v(o)}
                  <br /><br />
                  <a href="">Share</a>
                </p>
              </section>
            `}),gsap.fromTo(n,{y:"100px",opacity:0},{y:0,opacity:1,ease:"back.out(1.7)",duration:1.4});return}p({content:c.question.text,container:r}),gsap.fromTo(r,{y:"100px",opacity:0},{y:0,opacity:1})}function u(){i.value="",gsap.fromTo(i,{y:"100px",opacity:0,background:"#1c1d1f",color:"#e9e9e9"},{y:0,opacity:1,delay:.1})}i.focus(),i.addEventListener("input",()=>{l.innerHTML="",d.check(i.value,e,()=>{e+=1,y(),gsap.to(i,{backgroundColor:"#FF7E7E",color:"#000",duration:.1,onComplete:()=>{gsap.to(i,{opacity:0,delay:.1}),gsap.to(r,{opacity:0,delay:.1,onComplete:()=>{f(),u()}})}})},c=>{l.innerHTML=c})}),i.addEventListener("keydown",function(c){c.key=="Tab"&&(c.preventDefault(),i.setRangeText("  ",i.selectionStart,i.selectionStart,"end"))});function h(){t=lottie.loadAnimation({container:a(".game-progress .animation .lottie"),renderer:"svg",loop:!0,autoplay:!0,path:"/imgs/Cycle_custom_icon.json"}),gsap.fromTo(a(".game-progress"),{x:"-100px",opacity:0},{x:0,opacity:1})}function q(){s=setInterval(()=>{o+=1e3,m.innerHTML=v(o)},1e3)}function y(){let c=a(".line-progress"),b=Math.ceil(e/d.questions.length*100);c.style.width=`${b}%`,t.setSpeed(.2+e/d.questions.length)}f(),u(),h(),y(),q()}})}window.addEventListener("load",()=>{L([...I,...QUESTIONS])});})();
