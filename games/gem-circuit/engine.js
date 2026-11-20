export const SIZE = 8,
  TYPES = 6,
  TARGET = 1200,
  MAX_MOVES = 24;
/** @param {number[]} board @returns {number[]} */
export function matches(board) {
  const found = new Set();
  for (let y = 0; y < SIZE; y++)
    for (let x = 0; x < SIZE; x++) {
      const i = y * SIZE + x,
        v = board[i];
      if (v < 0) continue;
      if (x <= SIZE - 3 && board[i + 1] === v && board[i + 2] === v) {
        let k = x;
        while (k < SIZE && board[y * SIZE + k] === v) found.add(y * SIZE + k++);
      }
      if (y <= SIZE - 3 && board[i + SIZE] === v && board[i + SIZE * 2] === v) {
        let k = y;
        while (k < SIZE && board[k * SIZE + x] === v) found.add(k++ * SIZE + x);
      }
    }
  return [...found];
}
export function adjacent(a, b) {
  return (
    a >= 0 &&
    b >= 0 &&
    Math.abs((a % SIZE) - (b % SIZE)) +
      Math.abs(Math.floor(a / SIZE) - Math.floor(b / SIZE)) ===
      1
  );
}
export function swap(board, a, b) {
  [board[a], board[b]] = [board[b], board[a]];
}
export function possibleMove(board) {
  for (let i = 0; i < board.length; i++)
    for (const j of [i + 1, i + SIZE]) {
      if (j >= board.length || !adjacent(i, j)) continue;
      swap(board, i, j);
      const valid = matches(board).length > 0;
      swap(board, i, j);
      if (valid) return [i, j];
    }
  return null;
}
/** @returns {number[]} */
export function freshBoard(random = Math.random) {
  let b;
  do {
    b = [];
    for (let i = 0; i < SIZE * SIZE; i++) {
      let v;
      do {
        v = Math.floor(random() * TYPES);
      } while (
        (i % SIZE >= 2 && b[i - 1] === v && b[i - 2] === v) ||
        (i >= SIZE * 2 && b[i - SIZE] === v && b[i - SIZE * 2] === v)
      );
      b.push(v);
    }
  } while (!possibleMove(b));
  return b;
}
export function refill(board, random = Math.random) {
  for (let x = 0; x < SIZE; x++) {
    const column = [];
    for (let y = SIZE - 1; y >= 0; y--)
      if (board[y * SIZE + x] >= 0) column.push(board[y * SIZE + x]);
    for (let y = SIZE - 1; y >= 0; y--)
      board[y * SIZE + x] =
        column[SIZE - 1 - y] ?? Math.floor(random() * TYPES);
  }
}
