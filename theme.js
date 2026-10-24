const THEME_KEY = 'k-iso:theme';
const THEMES = ['system', 'light', 'dark'];

const root = document.documentElement;

// Storage can throw in private windows or with site data blocked; fall back to the system theme.
function savedTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'system';
  } catch {
    return 'system';
  }
}

function applyTheme(theme) {
  if (theme === 'system') {
    delete root.dataset.theme;
  } else {
    root.dataset.theme = theme;
  }

  const button = document.querySelector('.theme-toggle');
  if (button) {
    button.dataset.mode = theme;
    button.setAttribute('aria-label', `Theme: ${theme}`);
  }
}

let currentTheme = savedTheme();
applyTheme(currentTheme);

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);

  document.querySelector('.theme-toggle').addEventListener('click', () => {
    currentTheme = THEMES[(THEMES.indexOf(currentTheme) + 1) % THEMES.length];
    try {
      localStorage.setItem(THEME_KEY, currentTheme);
    } catch {}
    applyTheme(currentTheme);
  });
});
