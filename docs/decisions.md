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

- **Style:** 90s/early-00s game aesthetic. Press Start 2P for UI, VT323 for body text, and a black-box dialog like the one in the GIF. The direction is toward more minimalism.
- **Background:** subdued, mature takes on the GIF's blue. Three candidates can be compared with `?demo` (see below), and one gets picked after feedback.
- **Theme:** dark, light and system modes, switched from the header.
- **Nav:** in the header. Small text, with the current page highlighted.
- **Audio:**
  - One header toggle controls all sound. It's off on every visit.
  - Turning it on plays the music (Jim Lang, "Ice Me Down", looping) and turns on the 8-bit menu sound for hovering over or tabbing to a link.
  - Browsers block audio until the visitor clicks, which is one reason sound starts off.
- **To check:** the rights to the Jim Lang track (a vinyl rip) and to the "copyright free" 8-bit pack before launch.
