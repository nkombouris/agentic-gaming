import { SIZE, adjacent } from './engine.js';
import { choose, attemptSwap, setPaused, canPlay } from './state.js';

export function attachInput(canvas, getState, reduced) {
  let pointerStart = null;
  function cellAt(event) {
    const rect = canvas.getBoundingClientRect(),
      cell = (rect.width - 20) / SIZE;
    const x = Math.floor((event.clientX - rect.left - 10) / cell),
      y = Math.floor((event.clientY - rect.top - 10) / cell);
    return x >= 0 && x < SIZE && y >= 0 && y < SIZE ? y * SIZE + x : -1;
  }
  canvas.addEventListener('pointerdown', (event) => {
    const index = cellAt(event);
    if (index < 0 || !canPlay(getState())) return;
    event.preventDefault();
    canvas.focus({ preventScroll: true });
    pointerStart = { index, x: event.clientX, y: event.clientY };
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointerup', (event) => {
    if (!pointerStart) return;
    const from = pointerStart;
    pointerStart = null;
    const dx = event.clientX - from.x,
      dy = event.clientY - from.y;
    if (Math.hypot(dx, dy) > 15) {
      const next =
        from.index +
        (Math.abs(dx) > Math.abs(dy)
          ? dx > 0
            ? 1
            : -1
          : dy > 0
            ? SIZE
            : -SIZE);
      if (next >= 0 && next < SIZE * SIZE && adjacent(from.index, next))
        attemptSwap(getState(), from.index, next, reduced);
    } else {
      const index = cellAt(event);
      if (index >= 0) choose(getState(), index, reduced);
    }
  });
  canvas.addEventListener('pointercancel', () => {
    pointerStart = null;
  });
  canvas.addEventListener('keydown', (event) => {
    const state = getState();
    if (!canPlay(state)) return;
    const map = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -SIZE,
      ArrowDown: SIZE,
    };
    if (event.key in map) {
      event.preventDefault();
      const next = state.cursor + map[event.key];
      if (next >= 0 && next < SIZE * SIZE && adjacent(state.cursor, next))
        state.cursor = next;
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!event.repeat) choose(state, state.cursor, reduced);
    } else if (event.key === 'Escape') state.selected = -1;
  });
  function pause() {
    pointerStart = null;
    setPaused(getState(), true);
  }
  window.addEventListener('blur', pause);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
  });
}
