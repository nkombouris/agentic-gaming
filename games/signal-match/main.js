import '../shared/theme.js';
import { createGame, revealCard, concealCards, isWon } from './engine.js';
import { t, locale } from './translations.js';
const board = document.querySelector('#board');
const moves = document.querySelector('#moves');
const pairs = document.querySelector('#pairs');
const status = document.querySelector('#status');
const restart = document.querySelector('#restart');
let game = createGame();
let timer;
document.documentElement.lang = locale;
for (const element of document.querySelectorAll('[data-text]'))
  element.textContent = t[element.dataset.text];
function render() {
  moves.textContent = String(game.moves).padStart(2, '0');
  pairs.textContent = `${String(game.matched.length).padStart(2, '0')} / 06`;
  for (const button of board.querySelectorAll('button')) {
    const id = Number(button.dataset.id);
    const card = game.cards.find((candidate) => candidate.id === id);
    const matched = game.matched.includes(card.symbol);
    const visible = matched || game.revealed.includes(id);
    button.classList.toggle('flipped', visible);
    button.classList.toggle('matched', matched);
    button.setAttribute('aria-pressed', String(visible));
    button.setAttribute('aria-disabled', String(matched));
    button.setAttribute(
      'aria-label',
      matched
        ? t.matched(t.names[card.symbol])
        : visible
          ? t.revealed(id + 1, t.names[card.symbol])
          : t.hidden(id + 1),
    );
    button.querySelector('.symbol').textContent = visible ? card.symbol : '+';
  }
}
function choose(id) {
  const previous = game;
  game = revealCard(game, id);
  if (previous === game) return;
  render();
  if (isWon(game)) {
    status.textContent = t.win(game.moves);
    board.classList.add('won');
  } else if (game.matched.length > previous.matched.length)
    status.textContent = t.match;
  else if (game.revealed.length === 2) {
    status.textContent = t.miss;
    timer = window.setTimeout(() => {
      game = concealCards(game);
      render();
    }, 950);
  } else status.textContent = t.first;
}
function newGame(focus = false) {
  window.clearTimeout(timer);
  game = createGame();
  board.classList.remove('won');
  board.replaceChildren();
  for (const card of game.cards) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.id = String(card.id);
    button.className = `card tone-${card.id % 3}`;
    const symbol = document.createElement('span');
    symbol.className = 'symbol';
    symbol.setAttribute('aria-hidden', 'true');
    button.append(symbol);
    button.addEventListener('click', () => choose(card.id));
    board.append(button);
  }
  status.textContent = t.ready;
  render();
  if (focus) board.querySelector('button').focus();
}
restart.addEventListener('click', () => newGame(true));
newGame();
