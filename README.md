# K ISO

A single-page site with a pixel-art look.

## Editing the text

All of the page's text and links are in **`content.json`**. To change them:

1. Open `content.json` on GitHub and click the pencil icon.
2. Change only the text inside the quotes. Keep the quotes, commas and brackets as they are.
3. Click **Commit changes**. The site updates within a minute or two.

To swap the hero image, replace `assets/hero.gif` with a new file that has the same name. The same goes for the menu hover sound (`assets/sounds/menu-select.wav`) and the music (`assets/music/ice-me-down.mp3`).

## Previewing locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` directly from disk shows a blank page, because browsers won't load `content.json` from a `file://` page.

## Comparing background palettes

Add `?demo` to the URL to show a palette switcher in the corner. A specific palette can be linked directly, e.g. `?palette=navy`. The choices are `original`, `slate` (the default), `navy` and `dusk`.

## Hosting

The site is hosted on GitHub Pages: **Settings → Pages → Deploy from branch → `main` / root**.

## Credits

- Menu select sound: clipped from "8-Bit Powerup Sound Effects (Copyright Free)". License not yet verified.
- Music: Jim Lang, "Ice Me Down" (vinyl rip). Rights not yet verified.
