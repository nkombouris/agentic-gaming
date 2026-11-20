import {
  SIZE,
  TARGET,
  MAX_MOVES,
  freshBoard,
  matches,
  adjacent,
  swap,
  refill,
  possibleMove,
} from './engine.js';

/** @typedef {{board:number[], score:number, moves:number, selected:number, cursor:number, paused:boolean, result:string, phase:string, pending:number[], delay:number, chain:number, message:string}} Session */

/** @returns {Session} */
export function createSession() {
  return {
    board: freshBoard(),
    score: 0,
    moves: MAX_MOVES,
    selected: -1,
    cursor: 0,
    paused: false,
    result: '',
    phase: 'idle',
    pending: [],
    delay: 0,
    chain: 1,
    message: 'ready',
  };
}

/** @param {Session} state */
export function canPlay(state) {
  return !state.paused && !state.result && state.phase === 'idle';
}

/** @param {Session} state @param {number} a @param {number} b */
export function attemptSwap(state, a, b, reduced = false) {
  if (
    !canPlay(state) ||
    a >= SIZE * SIZE ||
    b >= SIZE * SIZE ||
    !adjacent(a, b)
  )
    return false;
  swap(state.board, a, b);
  const hit = matches(state.board);
  state.selected = -1;
  if (!hit.length) {
    swap(state.board, a, b);
    state.message = 'invalid';
    return false;
  }
  state.moves--;
  state.chain = 1;
  state.pending = hit;
  state.phase = 'clear';
  state.delay = reduced ? 0.01 : 0.22;
  return true;
}

/** @param {Session} state @param {number} index */
export function choose(state, index, reduced = false) {
  if (!canPlay(state) || index < 0 || index >= SIZE * SIZE) return;
  state.cursor = index;
  if (state.selected === index) state.selected = -1;
  else if (state.selected >= 0 && adjacent(state.selected, index))
    attemptSwap(state, state.selected, index, reduced);
  else state.selected = index;
}

/** @param {Session} state */
function finishTurn(state) {
  if (state.score >= TARGET) state.result = 'win';
  else if (state.moves <= 0) state.result = 'lose';
  else if (!possibleMove(state.board)) {
    state.board = freshBoard();
    state.message = 'shuffle';
  }
}

/** @param {Session} state @param {number} dt */
export function advance(state, dt, reduced = false, random = Math.random) {
  if (state.paused || state.result || state.phase === 'idle') return;
  state.delay -= dt;
  if (state.delay > 0) return;
  if (state.phase === 'clear') {
    for (const index of state.pending) state.board[index] = -1;
    state.score += state.pending.length * 30 * state.chain;
    state.message = 'chain';
    refill(state.board, random);
    state.phase = 'settle';
    state.delay = reduced ? 0.01 : 0.18;
  } else {
    state.pending = matches(state.board);
    if (state.pending.length) {
      state.chain++;
      state.phase = 'clear';
      state.delay = reduced ? 0.01 : 0.2;
    } else {
      state.phase = 'idle';
      finishTurn(state);
    }
  }
}

/** @param {Session} state */
export function setPaused(state, paused = !state.paused) {
  state.selected = -1;
  if (!state.result) state.paused = paused;
}
