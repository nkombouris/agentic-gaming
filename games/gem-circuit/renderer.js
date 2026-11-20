import { SIZE } from './engine.js';

const colors = [
  '#75c5ed',
  '#eaa2c7',
  '#b6d584',
  '#bca4ec',
  '#efb37c',
  '#7bc5af',
];

function gem(ctx, x, y, radius, type) {
  ctx.save();
  ctx.translate(x, y);
  const sides = [4, 6, 3, 5, 8, 4][type];
  const rotation = type === 0 ? Math.PI / 4 : type === 5 ? 0 : -Math.PI / 2;
  const gradient = ctx.createLinearGradient(-radius, -radius, radius, radius);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.25, colors[type]);
  gradient.addColorStop(1, colors[type] + '9a');
  ctx.fillStyle = gradient;
  ctx.strokeStyle = colors[type];
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const angle = rotation + (i * Math.PI * 2) / sides;
    const px = Math.cos(angle) * radius,
      py = Math.sin(angle) * radius;
    if (i) ctx.lineTo(px, py);
    else ctx.moveTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-radius * 0.38, -radius * 0.2);
  ctx.lineTo(0, -radius * 0.55);
  ctx.lineTo(radius * 0.3, -radius * 0.1);
  ctx.stroke();
  ctx.restore();
}

export function createRenderer(canvas) {
  const ctx = canvas.getContext('2d');
  let size = 0,
    pulse = 0,
    previousTheme = '',
    palette;
  function resize() {
    size = canvas.getBoundingClientRect().width;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function draw(state, dt, reduced) {
    const theme = document.documentElement.dataset.theme;
    if (theme !== previousTheme || !palette) {
      const style = getComputedStyle(canvas);
      palette = {
        cell: style.getPropertyValue('--cell').trim(),
        alternate: style.getPropertyValue('--cell-alternate').trim(),
        accent: style.getPropertyValue('--accent').trim(),
        text: style.getPropertyValue('--text').trim(),
      };
      previousTheme = theme;
    }
    const cell = (size - 20) / SIZE;
    ctx.clearRect(0, 0, size, size);
    pulse += dt;
    for (let i = 0; i < state.board.length; i++) {
      const x = 10 + (i % SIZE) * cell,
        y = 10 + Math.floor(i / SIZE) * cell;
      ctx.fillStyle =
        (i + Math.floor(i / SIZE)) % 2 ? palette.cell : palette.alternate;
      ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2);
      const hit = state.phase === 'clear' && state.pending.includes(i);
      if (i === state.selected || hit) {
        ctx.strokeStyle = palette.accent;
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 3, y + 3, cell - 6, cell - 6);
      }
      if (state.board[i] >= 0) {
        const scale = hit && !reduced ? 0.85 + 0.1 * Math.sin(pulse * 20) : 1;
        gem(
          ctx,
          x + cell / 2,
          y + cell / 2,
          cell * 0.33 * scale,
          state.board[i],
        );
      }
      if (i === state.cursor && document.activeElement === canvas) {
        ctx.strokeStyle = palette.text;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.strokeRect(x + 5, y + 5, cell - 10, cell - 10);
        ctx.setLineDash([]);
      }
    }
  }
  resize();
  window.addEventListener('resize', resize);
  return { draw };
}
