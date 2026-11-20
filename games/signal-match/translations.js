const en = {
  title: 'Find your signal.',
  intro: 'Find the six matching pairs. Take your time.',
  moves: 'MOVES',
  pairs: 'PAIRS',
  restart: 'New game',
  tip: 'Tap two cards. Match their symbols. Repeat.',
  keyboard: 'Keyboard: Tab to a card, Enter or Space to reveal it.',
  hidden: (n) => `Card ${n}, face down`,
  revealed: (n, name) => `Card ${n}: ${name}`,
  matched: (name) => `${name}, matched`,
  names: {
    '✳': 'star',
    '◆': 'diamond',
    '+': 'plus',
    '○': 'circle',
    '≈': 'waves',
    '▱': 'parallelogram',
  },
  match: 'A match! Keep going.',
  miss: 'Different symbols. Try another pair.',
  first: 'One card revealed. Choose another.',
  win: (moves) => `All signals found in ${moves} moves. Nicely played!`,
  ready: 'A fresh board. Find your first pair.',
};
const de = {
  title: 'Finde dein Signal.',
  intro: 'Finde die sechs Paare. Lass dir Zeit.',
  moves: 'ZÜGE',
  pairs: 'PAARE',
  restart: 'Neues Spiel',
  tip: 'Zwei Karten aufdecken. Symbole vergleichen. Wiederholen.',
  keyboard:
    'Tastatur: Mit Tab eine Karte wählen, mit Enter oder Leertaste aufdecken.',
  hidden: (n) => `Karte ${n}, verdeckt`,
  revealed: (n, name) => `Karte ${n}: ${name}`,
  matched: (name) => `${name}, gefunden`,
  names: {
    '✳': 'Stern',
    '◆': 'Raute',
    '+': 'Plus',
    '○': 'Kreis',
    '≈': 'Wellen',
    '▱': 'Parallelogramm',
  },
  match: 'Ein Paar! Weiter so.',
  miss: 'Verschiedene Symbole. Probiere ein anderes Paar.',
  first: 'Eine Karte ist offen. Wähle eine zweite.',
  win: (moves) => `Alle Signale in ${moves} Zügen gefunden. Gut gespielt!`,
  ready: 'Ein neues Spielfeld. Finde dein erstes Paar.',
};
export const locale =
  new URLSearchParams(window.location.search).get('lang') === 'de'
    ? 'de'
    : 'en';
export const t = locale === 'de' ? de : en;
