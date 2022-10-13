export function render({ content, container, clickEvents, overEvents, onRender }) {
  const $root = container || document.querySelector('#app');
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
        // attaching mouse click event handlers
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
    if (onRender) onRender();
  }, 0);
}