import { words } from './translations.js';
import { setPaused } from './state.js';

export function createUi(canvas, getState, restart) {
  const byId = (id) => document.getElementById(id);
  let lang =
    new URLSearchParams(window.location.search).get('lang') === 'de'
      ? 'de'
      : 'en';
  let previous = '';
  function render() {
    const state = getState(),
      t = words[lang];
    const signature = JSON.stringify([
      lang,
      state.score,
      state.moves,
      state.paused,
      state.result,
      state.message,
      state.chain,
    ]);
    if (signature === previous) return;
    previous = signature;
    document.documentElement.lang = lang;
    for (const id of [
      'intro',
      'scoreLabel',
      'movesLabel',
      'targetLabel',
      'restart',
      'touchHint',
      'keyHint',
    ])
      byId(id).textContent = t[id];
    byId('language').textContent = lang === 'en' ? 'DE' : 'EN';
    byId('score').textContent = state.score.toLocaleString(lang);
    byId('moves').textContent = state.moves;
    byId('pause').textContent = state.paused ? t.resume : t.pause;
    byId('status').textContent =
      state.message === 'chain' ? t.chain(state.chain) : t[state.message];
    canvas.setAttribute(
      'aria-label',
      lang === 'de'
        ? 'Match-3-Spielfeld. Pfeiltasten und Enter zum Spielen.'
        : 'Match-3 board. Arrow keys and Enter to play.',
    );
    const visible = state.paused || !!state.result;
    byId('overlay').classList.toggle('visible', visible);
    if (!visible) return;
    byId('overlayTitle').textContent = state.paused
      ? t.paused
      : state.result === 'win'
        ? t.win
        : t.lose;
    byId('overlayText').textContent = state.paused
      ? t.pausedText
      : state.result === 'win'
        ? t.winText(state.score)
        : t.loseText(state.score);
    byId('overlayButton').textContent = state.paused ? t.resume : t.play;
  }
  byId('restart').onclick = () => {
    restart();
    canvas.focus({ preventScroll: true });
  };
  byId('pause').onclick = () => setPaused(getState());
  byId('overlayButton').onclick = () => {
    if (getState().paused) setPaused(getState(), false);
    else restart();
    canvas.focus({ preventScroll: true });
  };
  byId('language').onclick = () => {
    lang = lang === 'en' ? 'de' : 'en';
    render();
  };
  return { render };
}
