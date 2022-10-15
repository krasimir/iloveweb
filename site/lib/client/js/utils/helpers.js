export function $(sel) {
  return document.querySelector(sel);
}
export function $$(sel) {
  return document.querySelectorAll(sel);
}
export function render({ content, container, clickEvents, overEvents, onRender }) {
  const $root = container || $('#app');
  if (!$root) {
    console.warn(`Render: DOM element not found.`)
    return;
  }
  $root.innerHTML = content;

  setTimeout(() => {
    [
      { event: 'click', handlers: clickEvents },
      { event: 'mouseover', handler: overEvents }
    ].forEach(({ event, handlers }) => {
      if (handlers) {
        Object.keys(handlers).forEach(eventName => {
          const els = $root.querySelectorAll(`[data-event="${eventName}"]`);
          (els || []).forEach(el => {
            if (el) {
              el.addEventListener(event, (e) => handlers[eventName](e));
            }
          })
        });
      }
    });
    if (onRender) {
      setTimeout(onRender, 0)
    }
  }, 0);
}
export function LottieImage(file, cls, options = {}) {
  const attrs = {
    class: `lottie ${cls}`,
    'data-file': file,
    'data-options': encodeURIComponent(JSON.stringify(options))
  }
  return `<div ${Object.keys(attrs).map(name => `${name}="${attrs[name]}"`).join(' ')}></div>`;
}
export async function loadJS(file) {
  return new Promise(done => {
    const script = document.createElement('script');
    script.onload = done;
    script.src = file;
    document.head.appendChild(script); 
  });
}
export function center(sel) {
  const el = $(sel);
  const rect = el.getBoundingClientRect();
  const height = window.innerHeight;
  const width = window.innerWidth;
  el.style.position = 'absolute';
  el.style.top = ((height / 2) - (rect.height / 2)) + 'px';
  el.style.left = ((width / 2) - (rect.width / 2)) + 'px';
}
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
function padTo3Digits(num) {
  return num.toString().padStart(3, '0');
}
export function convertMsToHM(milliseconds) {
  let mill = milliseconds % 1000;
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  minutes = seconds >= 30 ? minutes + 1 : minutes;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}