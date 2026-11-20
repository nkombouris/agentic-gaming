import '../shared/theme.js';
import { createSession, advance } from './state.js';
import { createRenderer } from './renderer.js';
import { attachInput } from './input.js';
import { createUi } from './ui.js';

const canvas = document.querySelector('#canvas');
let state = createSession(),
  last = 0;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const renderer = createRenderer(canvas);
const ui = createUi(
  canvas,
  () => state,
  () => {
    state = createSession();
  },
);
attachInput(canvas, () => state, reduced);

function frame(time) {
  const dt = Math.min((time - last) / 1000 || 0, 0.05);
  last = time;
  advance(state, dt, reduced);
  renderer.draw(state, state.paused || state.result ? 0 : dt, reduced);
  ui.render();
  window.requestAnimationFrame(frame);
}
ui.render();
window.requestAnimationFrame(frame);
