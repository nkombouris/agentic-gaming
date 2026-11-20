import { isTheme } from '../../src/features/theme/options';
function applyGameTheme(value) {
  document.documentElement.dataset.theme = isTheme(value) ? value : 'light';
}
if (import.meta.env.DEV) {
  applyGameTheme(new URLSearchParams(window.location.search).get('theme'));
  window.addEventListener('message', (event) => {
    if (
      event.source === window.parent &&
      event.data?.type === 'agentic-theme' &&
      isTheme(event.data.theme)
    )
      applyGameTheme(event.data.theme);
  });
}
