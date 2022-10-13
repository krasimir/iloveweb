import { render } from './utils/helpers';

const DEPS = [
  '/js/cssparser.min.js',
  '/js/html2json.js',
  '/js/htmlparser.min.js',
  '/js/lodash.min.js',
  '/js/parsel.js',
  '/js/specificity.js'
]

window.addEventListener('load', () => {
  render({
    content: 'hello'
  })
});