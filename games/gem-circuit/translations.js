export const words = {
  en: {
    intro:
      'Swap adjacent gems. Match three or more. Reach 1,200 points in 24 moves.',
    scoreLabel: 'SCORE',
    movesLabel: 'MOVES',
    targetLabel: 'TARGET',
    restart: 'New game',
    pause: 'Pause',
    resume: 'Resume',
    touchHint: 'Tap two neighboring gems, or swipe a gem toward its neighbor.',
    keyHint:
      'Keyboard: arrow keys move the cursor; Enter selects; Escape cancels.',
    ready: 'Choose a gem to begin.',
    invalid: 'That swap makes no match. No move used.',
    chain: (n) => (n > 1 ? 'Cascade ×' + n + '!' : 'Match!'),
    shuffle: 'No moves available. Board reshuffled.',
    paused: 'Paused',
    pausedText: 'The game pauses when you leave the window.',
    win: 'Target reached!',
    winText: (s) => 'You scored ' + s + ' points. Play again?',
    lose: 'Out of moves',
    loseText: (s) => 'You scored ' + s + ' of 1,200 points. Try a fresh board.',
    play: 'Play again',
  },
  de: {
    intro:
      'Tausche benachbarte Edelsteine. Kombiniere mindestens drei. Erreiche 1.200 Punkte in 24 Zügen.',
    scoreLabel: 'PUNKTE',
    movesLabel: 'ZÜGE',
    targetLabel: 'ZIEL',
    restart: 'Neues Spiel',
    pause: 'Pause',
    resume: 'Weiter',
    touchHint:
      'Tippe auf zwei benachbarte Steine oder wische einen Stein zum Nachbarn.',
    keyHint:
      'Tastatur: Pfeiltasten bewegen den Cursor, Enter wählt aus, Escape bricht ab.',
    ready: 'Wähle einen Stein.',
    invalid: 'Kein Treffer. Der Zug zählt nicht.',
    chain: (n) => (n > 1 ? 'Kaskade ×' + n + '!' : 'Treffer!'),
    shuffle: 'Keine Züge mehr. Spielfeld neu gemischt.',
    paused: 'Pause',
    pausedText: 'Beim Verlassen des Fensters pausiert das Spiel.',
    win: 'Ziel erreicht!',
    winText: (s) => 'Du hast ' + s + ' Punkte. Noch eine Runde?',
    lose: 'Keine Züge mehr',
    loseText: (s) =>
      s + ' von 1.200 Punkten erreicht. Versuche ein neues Spielfeld.',
    play: 'Noch einmal',
  },
};
