const nav = document.querySelector('nav');
const selectSound = new Audio('assets/sounds/menu-select.wav');
const music = new Audio('assets/music/ice-me-down.mp3');
music.loop = true;

const soundToggle = document.querySelector('.sound-toggle');
const volumePanel = document.querySelector('.volume-panel');
const volumeSlider = document.querySelector('#volume-slider');
const volumeOutput = volumePanel.querySelector('output');
const DEFAULT_VOLUME = 50;
// Starts muted every visit: browsers block audio until a click anyway, and surprise music is worse.
let volume = 0;

let lastTarget = null;

const links = () => [...nav.querySelectorAll('a')];
// Ignores the query string so links with tracking params (e.g. ?utm_source=) still highlight the current page.
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
  if (volume === 0) return;

  selectSound.currentTime = 0;
  // Browsers block audio until the visitor has clicked or pressed a key on the page.
  selectSound.play().catch(() => {});
}

function setVolume(percent) {
  volume = percent;
  music.volume = percent / 100;
  // The menu blip is louder than the track at the same level, so keep it a step under the music.
  selectSound.volume = (percent / 100) * 0.7;

  volumeSlider.value = String(percent);
  volumeOutput.textContent = `${percent}%`;
  soundToggle.dataset.muted = String(percent === 0);

  if (percent === 0) {
    music.pause();
  } else if (music.paused) {
    music.play().catch(() => setVolume(0));
  }
}

function setPanelOpen(open) {
  volumePanel.hidden = !open;
  soundToggle.setAttribute('aria-expanded', String(open));
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

soundToggle.addEventListener('click', () => {
  const opening = volumePanel.hidden;
  setPanelOpen(opening);
  if (opening && volume === 0) setVolume(DEFAULT_VOLUME);
});

volumeSlider.addEventListener('input', () => setVolume(Number(volumeSlider.value)));

document.addEventListener('click', (event) => {
  if (!event.target.closest('.volume')) setPanelOpen(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || volumePanel.hidden) return;

  setPanelOpen(false);
  soundToggle.focus();
});

document.addEventListener('content:ready', markCurrent);
window.addEventListener('hashchange', markCurrent);
