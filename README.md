# The Whole You 🌱

A calm, practical **whole-body health** website built around six everyday pillars. It's a static site — pure HTML, CSS and JavaScript, no build step, no dependencies — designed to be hosted on **GitHub Pages** at `https://harryarul.github.io/health/`.

The landing page introduces the pillars; each pillar links to its own short guide with practical steps and a small interactive tool. The **Heart** pillar is the flagship — a deep, richly-designed guide ("The Whole Heart") that lives in its own subfolder.

---

## 📁 Structure

```
health/                     ← repo root = the landing page
├── index.html              # "The Whole You" landing (pillar grid)
├── styles/
│   └── health.css          # Shared design system for all general pages
├── scripts/
│   └── health.js           # Shared interactions (scroll reveals, checklists)
├── assets/                 # Brand favicons + social card
│   ├── favicon.svg / .ico / favicon-16.png / favicon-32.png
│   ├── apple-touch-icon.png / icon-192.png / icon-512.png / icon-maskable-512.png
│   └── og-image.png        # Open Graph share image (1200×630)
│
├── nutrition/index.html    # 🥗 pillar guide  + plants tracker
├── movement/index.html     # 🏃 pillar guide  + weekly planner
├── sleep/index.html        # 😴 pillar guide  + bedtime calculator
├── mind/index.html         # 🧠 pillar guide  + box-breathing tool
├── hydration/index.html    # 💧 pillar guide  + water target estimator
│
├── heart/                  # ❤️ FLAGSHIP — "The Whole Heart" (self-contained)
│   ├── index.html
│   ├── css/styles.css
│   ├── js/main.js
│   ├── assets/…            # heart-specific favicons + og-image
│   └── site.webmanifest
│
├── 404.html                # Branded not-found page
├── site.webmanifest        # PWA metadata for the general site
├── robots.txt
├── sitemap.xml
└── .nojekyll               # Tells GitHub Pages to serve files as-is
```

Every internal link is **relative** (`heart/`, `../sleep/`, `../styles/health.css`), so the whole thing works correctly under the `/health/` base path that GitHub Pages uses for project sites.

---

## 🚀 Deploy to GitHub Pages

1. Put these files at the **root** of your `harryarul/health` repository and push to the `main` branch.
2. On GitHub: **Settings → Pages**.
3. **Source:** *Deploy from a branch* → Branch: `main` → Folder: `/ (root)` → **Save**.
4. Wait ~1 minute. Your site is live at:
   - **`https://harryarul.github.io/health/`** (landing)
   - `https://harryarul.github.io/health/heart/` (and `/nutrition/`, `/movement/`, `/sleep/`, `/mind/`, `/hydration/`)

The included `.nojekyll` file ensures GitHub serves every folder as-is.

> **Note on robots/sitemap:** GitHub project sites serve `robots.txt` at `…/health/robots.txt`, but crawlers look for it at the domain root (`harryarul.github.io/robots.txt`), which you don't control on a project page. The files are still valid and useful — for full SEO control you'd submit the sitemap directly in Google Search Console, or move to a custom domain (below).

---

## 👀 Preview locally

Because pages load `styles/` and `scripts/` as separate files, use a tiny local server instead of double-clicking:

```bash
cd health
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## 🌐 Using a custom domain later

If you point a custom domain at the repo, the base path becomes `/` instead of `/health/`. Update:

- the absolute URLs in each `<head>` (`canonical`, `og:url`, `og:image`) and in `sitemap.xml` / `robots.txt` — swap `harryarul.github.io/health` for `your-domain.com`;
- the home link in `404.html` (`/health/` → `/`);
- add a `CNAME` file containing your domain, and set the domain under **Settings → Pages**.

Relative links between pages need no changes.

---

## ➕ Add another pillar

1. Duplicate any topic folder (e.g. copy `sleep/` to `stress/`) and edit its `index.html` — title, accent colours (the small `<style>` block in the `<head>`), copy and tool.
2. Add a card for it in `index.html` (the `topic-grid` section) and a cross-link entry on the sibling pages.
3. Add its URL to `sitemap.xml`.

---

## ♿ & ⚕️ Notes

- Responsive, keyboard-navigable, with reduced-motion support; fonts (Bricolage Grotesque + Figtree) load from Google Fonts.
- All content is **educational, not medical advice.** Each page carries a disclaimer; the mind page also points to professional support. Please keep those intact if you publish this.

---

## 📄 Credits

Typography: [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) & [Figtree](https://fonts.google.com/specimen/Figtree) for the general site; Fraunces & Hanken Grotesk inside the heart guide (all OFL, via Google Fonts). All illustrations are inline SVG.
