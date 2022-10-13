import { render, center, loadJS, $ } from './utils/helpers';

export function showEditor() {
  render({
    content: `
      <div class="editor w500">
        <div class="area mxauto" contenteditable="true"></div>
      </div>
    `,
    onRender() {
      const area = $('.editor .area');
      area.innerHTML = '&nbsp;'
      area.focus();
      area.addEventListener('keydown', (e) => {
        if (area.innerText === '') {
          area.innerHTML = '&nbsp;';
        }
        // e.preventDefault();
        // e.stopPropagation();
      });
    }
  });
  center('.editor');
}