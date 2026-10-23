const nav = document.querySelector('nav');
const selectSound = new Audio('assets/sounds/menu-select.mp3');
selectSound.volume = 0.5;

const soundToggle = document.querySelector('.sound-toggle');
const SOUND_PREF_KEY = 'k-iso:sound';
let soundOn = true;

let lastTarget = null;

const links = () => [...nav.querySelectorAll('a')];
const normalize = (url) => url.replace(/index\.html(?=#|$)/, '');

function markCurrent() {
  const here = normalize(location.href);
  links().forEach((link) => {
    if (normalize(link.href) === here) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// mouseover and focusin both fire when a hovered link is clicked; only sound once per link.
function select(event) {
  const link = event.target.closest('a');
  if (!link || link === lastTarget) return;

  lastTarget = link;
  if (link.hasAttribute('aria-current')) return;

  playSelect();
}

function playSelect() {
  if (!soundOn) return;

  selectSound.currentTime = 0;
  // Browsers block audio until the visitor has clicked or pressed a key on the page.
  selectSound.play().catch(() => {});
}

function setSound(on) {
  soundOn = on;
  soundToggle.setAttribute('aria-pressed', String(on));
}

function moveFocus(event) {
  const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
  if (!step) return;

  event.preventDefault();
  const all = links();
  const index = all.indexOf(document.activeElement);
  all[(index + step + all.length) % all.length].focus();
}

nav.addEventListener('mouseover', select);
nav.addEventListener('focusin', select);
nav.addEventListener('mouseleave', () => { lastTarget = null; });
nav.addEventListener('focusout', (event) => {
  if (!nav.contains(event.relatedTarget)) lastTarget = null;
});
nav.addEventListener('keydown', moveFocus);

// Storage can throw in private windows or with site data blocked; the toggle still works per visit.
try {
  setSound(localStorage.getItem(SOUND_PREF_KEY) !== 'off');
} catch {}

soundToggle.addEventListener('click', () => {
  setSound(!soundOn);
  playSelect();
  try {
    localStorage.setItem(SOUND_PREF_KEY, soundOn ? 'on' : 'off');
  } catch {}
});

document.addEventListener('content:ready', markCurrent);
window.addEventListener('hashchange', markCurrent);
