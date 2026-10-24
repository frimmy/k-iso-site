const THEME_KEY = 'k-iso:theme';
const THEMES = ['system', 'light', 'dark'];
const PALETTES = ['original', 'slate', 'navy', 'dusk'];

const root = document.documentElement;
const params = new URLSearchParams(location.search);

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

function applyPalette(palette) {
  root.dataset.palette = PALETTES.includes(palette) ? palette : 'slate';
}

let currentTheme = savedTheme();
applyTheme(currentTheme);
applyPalette(params.get('palette'));

function buildPalettePicker() {
  const picker = document.createElement('div');
  picker.className = 'palette-picker';
  picker.setAttribute('role', 'group');
  picker.setAttribute('aria-label', 'Background palette (demo)');

  PALETTES.forEach((palette) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = palette;
    button.setAttribute('aria-pressed', String(root.dataset.palette === palette));
    button.addEventListener('click', () => {
      applyPalette(palette);
      params.set('palette', palette);
      history.replaceState(null, '', `?${params}${location.hash}`);
      picker.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    });
    picker.append(button);
  });

  document.body.append(picker);
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);

  document.querySelector('.theme-toggle').addEventListener('click', () => {
    currentTheme = THEMES[(THEMES.indexOf(currentTheme) + 1) % THEMES.length];
    try {
      localStorage.setItem(THEME_KEY, currentTheme);
    } catch {}
    applyTheme(currentTheme);
  });

  if (params.has('demo')) buildPalettePicker();
});
