const THEME_KEY = 'k-iso:theme';
const THEMES = ['system', 'light', 'dark'];
const PALETTES = ['original', 'slate', 'navy', 'dusk'];
const FONTS = ['vt323', 'plex', 'dm-mono', 'pixelify'];

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

// Temporary demo controls for comparing backgrounds and body fonts; remove once both are picked.
let currentPalette = 'slate';
let currentFont = 'vt323';

function applyPalette(palette) {
  currentPalette = palette;
  root.dataset.palette = palette;

  const button = document.querySelector('.palette-button');
  if (button) button.textContent = `BG: ${palette}`;
}

function applyFont(font) {
  currentFont = font;
  root.dataset.font = font;

  const button = document.querySelector('.font-button');
  if (button) button.textContent = `Font: ${font}`;
}

let currentTheme = savedTheme();
applyTheme(currentTheme);
applyPalette(currentPalette);
applyFont(currentFont);

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  applyPalette(currentPalette);
  applyFont(currentFont);

  document.querySelector('.font-button').addEventListener('click', () => {
    applyFont(FONTS[(FONTS.indexOf(currentFont) + 1) % FONTS.length]);
  });

  document.querySelector('.palette-button').addEventListener('click', () => {
    applyPalette(PALETTES[(PALETTES.indexOf(currentPalette) + 1) % PALETTES.length]);
  });

  document.querySelector('.theme-toggle').addEventListener('click', () => {
    currentTheme = THEMES[(THEMES.indexOf(currentTheme) + 1) % THEMES.length];
    try {
      localStorage.setItem(THEME_KEY, currentTheme);
    } catch {}
    applyTheme(currentTheme);
  });
});
