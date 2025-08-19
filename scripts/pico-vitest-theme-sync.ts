export default function syncPicoTheme() {
  // Sync Pico CSS theme with VitePress color mode.
  // VitePress toggles `html.dark` for dark mode.
  // Pico conditional CSS reads `html[data-theme="dark|light|auto"]`.
  if (typeof window !== 'undefined') {
    const html = document.documentElement;
    const syncPicoTheme = () => {
      const isDark = html.classList.contains('dark');
      html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', syncPicoTheme, { once: true });
    } else {
      syncPicoTheme();
    }

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          syncPicoTheme();
        }
      }
    });
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  }
}
