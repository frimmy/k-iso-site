const nav = document.querySelector('nav');
const selectSound = new Audio('assets/sounds/menu-select.wav');
selectSound.volume = 0.4;

const music = new Audio('assets/music/ice-me-down.mp3');
music.loop = true;
music.volume = 0.6;

const soundToggle = document.querySelector('.sound-toggle');
// Starts off every visit: browsers block audio until a click anyway, and surprise music is worse.
let soundOn = false;

let lastTarget = null;

const links = () => [...nav.querySelectorAll('a')];
// Ignores the query string so demo links like ?palette=navy still highlight the current page.
const pageKey = ({ pathname, hash }) => pathname.replace(/index\.html$/, '') + hash;

function markCurrent() {
  const here = pageKey(location);
  links().forEach((link) => {
    if (pageKey(link) === here) {
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

  if (on) {
    music.play().catch(() => setSound(false));
  } else {
    music.pause();
  }
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

soundToggle.addEventListener('click', () => setSound(!soundOn));

document.addEventListener('content:ready', markCurrent);
window.addEventListener('hashchange', markCurrent);
