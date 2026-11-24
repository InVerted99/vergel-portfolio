# Vergel Cortez — Portfolio

A motion-rich, accessible personal portfolio built with **Next.js 16 (App Router)**, **JavaScript (JSX)**, **Tailwind CSS v4**, **Framer Motion** (`motion`), **Lenis** and a lazy-loaded **React Three Fiber** hero accent.

Design concept: **"Signal"**, a dark, minimal canvas with one neon "live-wire" accent, inspired by the *Lights Out, Alerts On* capstone.

---

## Quick start

Requires Node.js 20.9+ (tested on Node 22).

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # ESLint (Next + React Compiler rules)
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On [vercel.com/new](https://vercel.com/new), import the repo. No configuration is needed because Vercel detects Next.js.
3. Add these environment variables (Project → Settings → Environment Variables):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your final URL, e.g. `https://vergelcortez.vercel.app`. Used for canonical URLs, sitemap, OG and JSON-LD. |
| `RESEND_API_KEY` | From [resend.com](https://resend.com) (free tier). Enables the contact form. |
| `CONTACT_TO_EMAIL` | Inbox that receives messages (defaults to the email in `data/site.js`). |
| `CONTACT_FROM_EMAIL` | Sender. `Portfolio <onboarding@resend.dev>` works without verifying a domain. |

4. Redeploy. Locally, copy `.env.example` to `.env.local`.

> Without `RESEND_API_KEY`, the form logs messages to the terminal in development. In production it shows a friendly "email me directly" error, so it never silently drops a message.

---

## Folder structure

```
app/
  layout.jsx            Fonts, metadata, JSON-LD Person schema, global chrome
  page.jsx              Home: composes every section
  template.jsx          Page transitions (client navigations only, so LCP stays fast)
  globals.css           DESIGN TOKENS + base styles + utilities
  not-found.jsx         404: "Lights out on this page"
  work/[slug]/page.jsx  Case-study pages (statically generated from data/projects.js)
  api/contact/route.js  Validated contact endpoint (Resend, honeypot, rate limit)
  sitemap.js, robots.js, manifest.js, opengraph-image.jsx, icon.svg
  fonts/                Self-hosted Clash Display + Geist (no Google requests)
components/
  sections/             Hero, HeroScene (R3F), About, Skills, Projects, Experience, Testimonials, Contact
  layout/               Header (+ mobile menu), Footer, ThemeToggle, CommandPalette
  fx/                   Cursor, Spotlight, Magnetic, Reveal, SplitText, Preloader, EasterEgg
  providers/            ThemeProvider (next-themes), SmoothScroll (Lenis)
  ui/                   ProjectCard, SectionHeading, Socials, BrandIcons
data/                   ← ALL CONTENT LIVES HERE
  site.js               Name, tagline, email, socials, about story, stats
  projects.js           Projects + case studies (problem → what I did → outcome)
  experience.js         Timeline + seminars list
  skills.js             Skill groups (marquee + cards)
  testimonials.js       Empty by default; the section appears once you add one
lib/                    scroll, validation (shared client/server), intro, utils
public/
  projects/*.svg        Cover art (swap for real screenshots)
  resume.pdf            Downloadable CV
```

---

## Customizing

### Content
Edit the files in **`data/`**. Nothing else needs to change.
- **New project:** add an object to `projects` in `data/projects.js` (copy an existing entry; every project uses the same fields). A `/work/<slug>` page is generated automatically and added to the sitemap and the ⌘K palette.
- **Cover images:** put a PNG, JPG, WebP or SVG in `public/projects/` and set `cover`. Add an optional `video: "/projects/demo.mp4"` (short, muted loop) to play it on hover.
- **Links:** set `live` and/or `github` on a project. Buttons only render when a URL is set.
- **Socials:** fill in `site.socials` in `data/site.js`. Empty strings stay hidden.
- **Photo:** add `public/images/portrait.jpg` and set `portrait: "/images/portrait.jpg"` in `data/site.js`. It gets the blob mask and a grayscale-to-colour hover.
- **Résumé:** replace `public/resume.pdf`.

### Colors
All colors are CSS variables at the top of **`app/globals.css`**: `:root` for light mode, `.dark` for dark mode.
- `--accent` is the fill color (buttons, dots, glow). `--accent-fg` is the text color placed on it.
- `--accent-ink` is the accent used as *text* on the page background. In light mode it must be a darker shade so it passes WCAG AA (4.5:1). Check it at [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/).
- The 3D orb and OG image hard-code the lime (`#c6f432`) in `components/sections/HeroScene.jsx` and `app/opengraph-image.jsx`. Update those too if you change the accent.

### Fonts
Fonts are self-hosted in `app/fonts/` and wired up in `app/layout.jsx` with `next/font/local`.
- To swap the display font, drop new `.woff2` files in `app/fonts/` and update the `clash` block. The CSS variable `--font-clash` feeds `font-display` everywhere.
- **Optional:** the OG image uses Next's default font. To use Clash Display there, download *Clash Display Semibold* as TTF from [fontshare.com](https://www.fontshare.com/fonts/clash-display) and save it as `assets/ClashDisplay-Semibold.ttf`.

### Motion
- Every animation respects `prefers-reduced-motion`. Lenis, the cursor, the 3D scene, the preloader and transforms all switch off.
- The preloader runs once per browser session (under 1.5s). Press Esc, Enter, Space or click to skip.
- The 3D scene only loads on desktop, after the browser is idle, and pauses when off-screen.

---

## Features checklist

- Asymmetric hero with split-text reveal, magnetic CTAs, interactive 3D orb (reacts to cursor "charge")
- Bento About grid with blob-masked portrait, count-up stats, résumé card
- Dual-direction skills marquee + grouped skill cards
- Projects as alternating rows: number, type badge, one-line summary, three highlights, stack and a clear case-study CTA; case-study pages (problem → what I did → outcome)
- Scroll-driven timeline with live progress line, lighting nodes and category filters
- Testimonials carousel (auto-hidden until populated)
- Contact form: shared client/server validation, inline errors, success/error states, honeypot, rate limit, copy-email
- Footer: live Philippine time, back-to-top, easter eggs (Konami code ↑↑↓↓←→←→BA, or click the big "VC." five times)
- ⌘K / Ctrl+K command palette (navigate, open projects, copy email, toggle theme, download CV)
- Light/dark theme following the system preference, with a toggle
- Custom cursor (fine pointers only), grain texture, mouse-following spotlight
- SEO: metadata, generated OG image, sitemap, robots.txt, manifest, JSON-LD Person
- Accessibility: skip link, landmarks, focus-visible rings, ARIA on menus/dialogs/carousel, works without JS
