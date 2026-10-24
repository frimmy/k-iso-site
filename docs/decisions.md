# Decisions

## Product

- **Purpose:** a marketing and promo site for Kevin's work. Shows, booking and any store are links out, with no on-site commerce.
- **Single page.** The nav links (Home, Shows, Projects, Contact) are placeholders until those sections exist.

## Hosting and editing

- **Hosting:** Cloudflare (Workers static assets). The site stays on GitHub Pages until the move. The code stays on GitHub either way.
- **Domain:** Kevin already owns one. Its DNS moves to Cloudflare as part of the hosting move.
- **Editing:** Pages CMS. Kevin is invited by email and doesn't need a GitHub account. It edits `content.json`, and each save redeploys the site.
- **Update cadence:** up to weekly, so expect a structured "shows" list in `content.json`.
- Full option comparison and sources: `~/Downloads/k-iso-hosting-options.md`.

## Contact form (paused)

- An on-page web form styled like the rest of the site. It submits to a backend; the page doesn't link out to a hosted form.
- **Backend:** a non-Google one is preferred.
  - Leading option: a Cloudflare Worker that emails Kevin, with Turnstile for spam.
  - Fallback: Formspree (free plan is 50 submissions/month).
- **Still open:** email only, or email plus stored submissions? Which fields?

## Look and sound

- **Style:** 90s/early-00s game aesthetic. Press Start 2P for the UI and headings, and a dialog box inspired by the one in the GIF. It's a raised Dusk panel (`#33324d`, with a thin `#4a4770` border) rather than black, and the title uses Dusk tints instead of yellow and orange. The volume panel uses the same panel style. The direction is toward more minimalism.
- **Body font:** DM Mono, picked over VT323 (too busy), IBM Plex Mono and Pixelify Sans.
- **Background:** Dusk, a subdued blue-violet that echoes the GIF's purple tones: `#26263a` → `#1c1c2c` in dark mode, `#efeef4` → `#e3e2ec` in light. Picked over slate, navy and the original indigo.
- **Theme:** dark, light and system modes, switched from the header.
- **Nav:** in the header. Small text, with the current page highlighted.
- **Layout:** a 3×3 grid under the header, up to 1200px wide. The dialog and body copy fill the top-left 2×2. The GIF (max 450px) sits in the bottom-right cell. On screens under 800px it stacks, with the text first and then the image.
- **Audio:**
  - The header speaker opens a volume slider that controls the music and the menu sound together. Every visit starts muted, and opening the slider while muted starts the music at 50%. Setting it to 0 mutes.
  - Turning it on plays the music (Jim Lang, "Ice Me Down", looping) and turns on the 8-bit menu sound for hovering over or tabbing to a link.
  - Browsers block audio until the visitor clicks, which is one reason sound starts off.
- **To check:** the rights to the Jim Lang track (a vinyl rip) and to the "copyright free" 8-bit pack before launch.
