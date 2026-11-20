/** @typedef {{cards: {id:number, symbol:string}[], revealed:number[], matched:string[], moves:number}} GameState */
export const symbols = ['✳', '◆', '+', '○', '≈', '▱'];
/** @returns {GameState} */
export function createGame(random = Math.random) {
  const cards = [...symbols, ...symbols].map((symbol, id) => ({ id, symbol }));
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return { cards, revealed: [], matched: [], moves: 0 };
}
/** @param {GameState} state @param {number} id @returns {GameState} */
export function revealCard(state, id) {
  const card = state.cards.find((candidate) => candidate.id === id);
  if (
    !card ||
    state.revealed.length === 2 ||
    state.revealed.includes(id) ||
    state.matched.includes(card.symbol)
  )
    return state;
  const revealed = [...state.revealed, id];
  if (revealed.length < 2) return { ...state, revealed };
  const first = state.cards.find((candidate) => candidate.id === revealed[0]);
  const moves = state.moves + 1;
  if (first.symbol === card.symbol)
    return {
      ...state,
      revealed: [],
      matched: [...state.matched, card.symbol],
      moves,
    };
  return { ...state, revealed, moves };
}
/** @param {GameState} state @returns {GameState} */
export function concealCards(state) {
  return { ...state, revealed: [] };
}
/** @param {GameState} state */
export function isWon(state) {
  return state.matched.length === symbols.length;
}
