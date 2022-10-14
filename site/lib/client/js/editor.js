import { render, center, loadJS, $ } from './utils/helpers';

const indent = '    ';

export function showEditor() {
  render({
    content: `
      <div class="editor">
        <section class="question">
          <div>A question here</div>
        </section>
        <section class="area">
          <textarea rows="1"></textarea>
        </section>
      </div>
    `,
    onRender() {
      const textarea = $('.editor textarea');

      function resizeAndPosition() {
        textarea.style.height = 'auto';
        textarea.style.height = this.scrollHeight + 'px';
        const rect = textarea.getBoundingClientRect();
        textarea.style.marginTop = ((window.innerHeight - rect.height) / 2) + 'px'
      }

      textarea.focus();
      textarea.addEventListener('input', resizeAndPosition);
      textarea.addEventListener('keydown', function (e) {
        if (e.key == 'Tab') {
          e.preventDefault();
          const start = this.selectionStart;
          const end = this.selectionEnd;
          this.value = this.value.substring(0, start) + indent + this.value.substring(end);
          this.selectionStart = this.selectionEnd = start + 1;
        }
      });

      resizeAndPosition();
      gsap.fromTo(textarea, { y: '100px', opacity: 0 }, { y: 0, opacity: 1 });
    }
  });
}