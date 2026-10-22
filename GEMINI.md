# GEMINI.md — Project Instructions

Instructions for any AI assistant working in this repository (Gemini CLI, Antigravity, or similar).
Read this file completely at the start of every session, before touching any file.

**Precedence:** the owner's explicit instruction in the current chat → this file → your own defaults.
If the owner's request conflicts with this file, follow the owner and propose an update to this file.

---

## 0. Operating protocol

1. **Sync before you work.** The owner edits this repository from several tools and pushes often. Run `git fetch origin`, then `git log --oneline -10 origin/main` and `git status` before any change. If the remote has commits you have not seen, read them first (`git diff HEAD origin/main --stat`). Never assume the files on disk are current.
2. **Never overwrite the owner's work.** No force-push, no `git reset --hard` on unpushed work without saving it to a branch first, no history rewrites.
3. **Language.** Talk to the owner in **Egyptian Arabic** (casual, short, direct). Everything that goes into the repository is in **English**: code, comments, commit messages, page copy, this file.
4. **Ask before you invent.** If a request needs facts you do not have (numbers, dates, roles, links, screenshots, a CV), ask for them. Section 3 lists what you may and may not write.
5. **Do exactly what was asked.** Do not redesign, rename, reorder or "improve" things outside the request. Suggest them in the reply instead.
6. **Keep this file true.** If your change alters the layout, design tokens, dependencies, sections or the roadmap, update this file in the same commit.

---

## 1. Project overview

| | |
|---|---|
| **What** | Personal portfolio of a Flutter developer: one static page |
| **Owner** | Ahmed Elzaher |
| **Audience** | Recruiters, hiring managers and engineers who spend under a minute on the page |
| **Goal** | Show real, verifiable mobile work and make it easy to get in touch or request the CV |
| **Live site** | https://ahmed-elzaher.github.io/ |
| **Repository** | https://github.com/Ahmed-Elzaher/Ahmed-Elzaher.github.io |
| **Hosting** | GitHub Pages, branch `main`, root folder. A push to `main` is published in about 1–2 minutes |

---

## 2. Owner facts (single source of truth)

Use these exactly. Do not paraphrase them into something stronger.

- **Name:** Ahmed Elzaher
- **Title:** Flutter Developer / Mobile Application Developer
- **Bio line:** Mobile Application Developer building high-performance, cross-platform apps with Flutter and Dart, with a focus on clean, scalable code and a smooth user experience.
- **Education:** Communication and Computer Engineering (CCE), Mansoura University. Graduated June 2026, grade Very Good.
- **Email:** zaskizaski13@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/ahmed-elzaher13/
- **GitHub:** https://github.com/Ahmed-Elzaher
- **Core stack:** Flutter, Dart, Clean Architecture, MVVM, SOLID, BLoC / Cubit, GetIt, Dio, RESTful APIs, Firebase, Git, GitHub.

### Projects (verified from the repositories and the owner)

**MatchIn (SkillMatch)** — https://github.com/Team-2-Skill-Project/Flutter
- Team project: an AI-powered career and recruitment mobile app (CV parsing, job matching with scores, career roadmap, AI mentor).
- **Owner's role: Flutter Developer.** Owner built: **Auth** (login, registration, OTP, password reset, Google sign-in) and **Saved** (bookmarked jobs, application status tracking).
- Do **not** claim the owner built the matching engine, roadmap, chatbot, CV extraction, backend or the whole app.
- The repository README lists other names as lead developers. Never write "lead" for MatchIn.

**Engipedia** — https://github.com/Ahmed-Elzaher/engipedia
- Study hub for CCE students: lectures, notes and exams organized by course, smart search, progress tracking, PDF viewer.
- **Owner's role: Lead Mobile App Developer** (Figma to Flutter UI, Clean Architecture + MVVM, search, progress tracking, PDF viewing).
- **UI/UX design credit: Zeyad Khaled Mohamed.** This credit must stay on the page.

Other repositories exist on the owner's GitHub (`nota`, `serv5-day-i`, and more). They are not featured. Do not add them without asking.

---

## 3. Content integrity rules

This is the most important section. A portfolio that exaggerates is worse than a short one.

- **Never invent** metrics, percentages, user counts, client names, employers, job titles, dates, awards, certificates, testimonials or download numbers.
- **Never present placeholders as real.** No fake store links, no "coming soon" buttons that look live, no sample screenshots passed off as the real app. A placeholder must be visibly a placeholder or hidden.
- **Team work is labeled as team work**, and the owner's contribution is stated precisely (see Section 2).
- **Verify before you write a claim.** Check the repository README or ask the owner. If you cannot verify it, leave it out and say so.
- **Use verifiable figures only** (for example, "2 featured apps" is checkable; "5+ projects delivered" is not unless the owner confirms the count).
- **Availability** ("open to roles") is the owner's statement and can be shown. Keep it consistent across the page.
- Keep credits and attribution that already exist. Never remove them.
- If you find an existing claim on the page that you cannot verify, **do not silently change it and do not silently keep it**: report it to the owner in your reply.

---

## 4. Technology and constraints

- **Current stack:** a static site, plain HTML + CSS + JavaScript in a single `index.html`, no build step, no package manager.
- **Any technology is allowed** when it is clearly better for the task (a framework, a bundler, split files, a static-site generator). Rules for doing so:
  1. Default to the simplest thing that works. Do not add tooling for its own sake.
  2. State the reason in one line to the owner before starting.
  3. GitHub Pages must keep working. Either commit the built output to the published folder, or add a GitHub Actions workflow that deploys it. `index.html` must stay reachable at the site root.
  4. Existing behavior, content and visuals must not regress.
  5. Update Sections 5, 6 and 12 of this file in the same change.
- **Runtime dependencies:** keep them minimal. Currently: Google Fonts (CSS link) and **three.js r128, self-hosted** as `three.min.js` (not loaded from a CDN, so the page works offline and cannot break from a CDN outage).
- **No secrets, API keys or tracking scripts** in the repository. No analytics unless the owner asks.
- **No contact form backend.** Contact is by email, LinkedIn and GitHub only.

---

## 5. Repository layout (current)

| Path | Purpose | Notes |
|---|---|---|
| `index.html` | The entire site (markup, CSS in `<style>`, JS in `<script>`) | ~2,000 lines. Edit in place; keep the existing comment banners (`<!-- ===== Section ===== -->`) |
| `photo.jpg` | Portrait used in the hero | 640×640, ~48 KB |
| `favicon.svg` | Browser tab icon (circular portrait) | ~65 KB, embeds the image |
| `three.min.js` | three.js r128, self-hosted | Loaded lazily, only when the 3D section nears the viewport |
| `config.js` | **Legacy.** Loaded by `index.html` but nothing reads `window.SITE` anymore | See Section 12. Do not rely on it |
| `favicon.ico`, `favicon.png` | **Legacy** "AE" logo icons, currently unreferenced | Do not delete without asking |
| `README.md` | Public project README | Keep it consistent with the page (projects, roles, links) |
| `GEMINI.md` | This file | |

Planned folder for real screenshots: `screens/` (create it when the first image arrives).

---

## 6. Page architecture

Order of the page, top to bottom. Section ids are used by CSS and JS; do not rename them casually.

1. **Preloader** (`#preloader`): full-screen splash, the word "Elzaher" drawn as a handwritten signature (SVG text, `Caveat` font, `drawSignature` / `fillSignature` keyframes). Hidden **3 seconds** after `window.load` (owner's explicit choice), 600 ms fade, with a safety fallback at 3.8 s. Do not change the timing, the word or the style without being asked.
2. **Top bar** (`header.top-bar`): brand "Ahmed Elzaher / Flutter Dev", GitHub and LinkedIn icon buttons, and the CV button (`#downloadCvBtn`). There are no in-page nav links.
3. **Hero** (`.hero`): two columns. Left: label line, headline "FLUTTER / DEVELOPER" (solid + outline words), bio, three stat cards. Right: circular portrait (`photo.jpg`) with an availability badge. Below it: two feature cards.
4. **Technical Arsenal** (`#skills`): filter pills + `#arsenalGrid` of `.arsenal-card` items. Filters: `all`, `mobile`, `architecture`, `tools` (matched against each card's `data-category`). Currently 12 cards (3 architecture, 3 mobile, 6 tools).
5. **Interactive phone** (`#interactive-phone`): a three.js 3D phone on `canvas#phone3d` inside `#stage`. Two buttons (`.showcase-btn[data-proj]`) switch the project on the screen. The screen artwork is drawn from the `DATA` object in the script (name, tagline, stack chips, role). Drag or arrow keys rotate it. It idles with a gentle sway, pauses when off-screen, respects `prefers-reduced-motion`, and shows `#stage-fallback` text if WebGL or the script is unavailable.
6. **Featured Projects** (`#projects`): one `article.project-card` per project. Left column: tags, title, description, "My Key Contributions" list, tech chips, GitHub button. Right column: `.project-phones-3d` with three `.phone-device` mockups. **These mockups currently show icons and captions, not real screenshots.**
7. **Contact** (`#contact`): CTA card with the email shown as text, a Copy button (`#copyBtn`, copies the visible email text; it has no error handling yet, so keep the email visible as plain text) and a "Send Direct Message" mailto button.
8. **Footer:** copyright line and university.

Scripts at the bottom of `index.html`: (a) preloader dismissal, filter pills, copy-email; (b) the lazy three.js loader and 3D phone controller.

---

## 7. Design system

**Direction:** dark, technical, restrained. One accent color. Big stacked headings where one word is solid and the next is outlined (`.solid` / `.outline` spans). Cards on slightly lighter surfaces with hairline borders.

**Theme:** dark only, by design. There is no light theme. Do not add one unless the owner asks.

**Tokens** (defined on `:root` in `index.html`; always use the variable, never a raw hex in a component rule):

| Token | Value | Use |
|---|---|---|
| `--bg` | `#070b12` | Page background |
| `--surface` | `#0d1420` | Sections, panels |
| `--surface-card` | `#121b2b` | Cards |
| `--surface-hover` | `#18253b` | Hover state |
| `--line` / `--line-strong` | `rgba(255,255,255,.08)` / `.16` | Borders |
| `--fg` | `#f1f5f9` | Main text |
| `--muted` | `#94a3b8` | Secondary text |
| `--dim` | `#64748b` | Tertiary text, captions |
| `--accent` | `#38bdf8` | The one accent (sky blue) |
| `--accent-glow` | `rgba(56,189,248,.25)` | Glows, focus halos |
| `--accent-ink` | `#031525` | Text on accent buttons |
| `--green` / `--green-glow` | `#22c55e` / `.35` | **Availability status only** |

**Typography:**
- `--font-main`: **Plus Jakarta Sans** for everything.
- `--font-mono`: **JetBrains Mono** for labels, tags, code-like details.
- `--font-sig`: **Caveat**, used **only** for the preloader signature.
- Do not add more font families.

**Breakpoints:** `max-width: 860px` (tablet, columns stack) and `max-width: 540px` (phone, the CV button collapses to its icon).

**Rules:**
- No new accent hues. Green is reserved for "available".
- No emoji as UI icons; use inline SVG.
- No purple/blue gradient heroes, no stock illustrations, no decorative noise.
- Keep the two signature moments (preloader, 3D phone) and do not add a third.
- New components copy the look of existing ones (card radius, border, padding, hover) instead of inventing a new style.
- Spacing and sizing follow the patterns already in the stylesheet; look at a similar existing component first.

---

## 8. Playbooks for common tasks

**Add a project**
1. Copy an existing `article.project-card` inside `#projects`.
2. Fill: tag row, title, one-paragraph description, "My Key Contributions" (only what the owner actually built), tech chips, GitHub link (`target="_blank" rel="noopener"`).
3. Add an entry to the `DATA` object of the 3D phone and a matching `.showcase-btn[data-proj]` button.
4. Add it to `README.md`.
5. Ask the owner for the role, contributions, links and screenshots first.

**Add or change a skill**
Copy an `.arsenal-card`, set `data-category` to `mobile`, `architecture` or `tools`, set the icon (inline SVG), name and badge. Only list skills the owner confirms.

**Add real screenshots**
1. Put images in `screens/` (create it). Use `.webp` or optimized `.jpg`/`.png`, each **under 200 KB**, with consistent aspect ratio (about 9:19).
2. In the `.phone-device`, replace the `.phone-inner-content` placeholder with `<img src="screens/…" alt="…" width="…" height="…" loading="lazy">` inside `.phone-screen`. Keep the notch bar and footer label (update the label to the real screen name).
3. To show a screenshot on the 3D phone screen, the `drawScreen` function must be extended to draw an image instead of the generated card. Draw the image with `object-fit: cover` logic and keep the generated card as the fallback.
4. Test the 3D phone over HTTP (see Section 9). Canvas textures from images fail on `file://`.

**Set the CV**
Add the PDF to the repository root (for example `Ahmed-Elzaher-CV.pdf`). Change `#downloadCvBtn` from the `mailto:` link to `href="Ahmed-Elzaher-CV.pdf"` with the `download` attribute, and keep the label "Download CV". Until then the button opens an email request, which is intentional.

**Add an Experience / Training section**
Only when the owner provides real data. Add a section after `#skills` or before `#projects` using the existing `.section` + `.section-head` + `.sec-title` pattern. Timeline rows: period, title, place, one or two factual sentences. Add it to Section 6 here.

**Change contact details**
Update the email in all places: header CV mailto, contact card text, mailto buttons, `README.md`, and this file.

**Change the 3D phone**
Keep the lazy loader, the WebGL fallback message, reduced-motion handling, pause-when-hidden and keyboard rotation. Test with the headless method in Section 9.

---

## 9. Definition of done (check before saying a task is finished)

Run these checks yourself. Do not hand work back unchecked.

**How to test:** serve the folder over HTTP (`python -m http.server 3000`, then open `http://localhost:3000`). Use a headless Chromium with software WebGL: launch args `--use-gl=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`. Take screenshots at **1280×800** and **390×844**. If fonts fail to load in the test environment, that is not a bug in the page.

- [ ] No JavaScript errors in the console (a failed Google Fonts request in an offline test is acceptable).
- [ ] No horizontal scroll at 390 px width (`document.documentElement.scrollWidth <= clientWidth`).
- [ ] The preloader appears, then disappears within about 3.8 s, and the page is scrollable afterwards.
- [ ] The 3D phone renders, rotates on drag, switches projects, and shows the fallback text when WebGL is blocked.
- [ ] Every external link has `target="_blank" rel="noopener"` and a working URL. No placeholder links (`#`, `placeholder.com`).
- [ ] Every image has `alt`, `width` and `height`.
- [ ] Text contrast is at least 4.5:1 against its background; touch targets at least 44 px.
- [ ] Keyboard: every control is reachable and shows a visible focus style.
- [ ] Any new animation is wrapped for `prefers-reduced-motion: reduce`.
- [ ] Content follows Section 3. No new claims that the owner did not confirm.
- [ ] Only the files you meant to change are modified (`git status`, `git diff --stat`).
- [ ] `README.md` and this file are updated if facts, structure or the roadmap changed.

---

## 10. Performance, accessibility and SEO

**Performance**
- Keep the page light: each image under 200 KB, no video autoplay, no new libraries without a clear need.
- three.js stays lazy-loaded; do not move it into the critical path.
- Fonts use `display=swap`. Do not add more families or weights than needed.
- Avoid layout shift: give images and media explicit dimensions.

**Accessibility**
- Use semantic landmarks (`header`, `main`, `section`, `footer`) and a logical heading order (one `h1`).
- Icon-only buttons need `aria-label` (existing ones have it).
- Interactive 3D content needs a keyboard path and a text fallback (existing).
- Motion: respect `prefers-reduced-motion` for every animation, including CSS keyframes.

**SEO and sharing**
- Keep a unique `<title>` and `<meta name="description">`.
- Social preview tags (`og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`, `theme-color`) are **currently missing** (see Section 12). When added, `og:image` must be an absolute URL on the live domain.

---

## 11. Git and delivery workflow

- **Commit, do not push.** After finishing a task, make a focused local commit. **Do not run `git push` unless the owner tells you to** in the current chat. Tell the owner what is committed and wait.
- **Before every commit:** `git fetch origin` and check whether `origin/main` moved. If it did, stop, review the new commits, and tell the owner before continuing.
- **Commit messages:** Conventional Commits, in English, imperative mood, matching the existing history: `feat: …`, `fix: …`, `docs: …`, `chore: …`, `refactor: …`. One logical change per commit. Explain the why in the body when it is not obvious.
- **Branches:** work on `main` for small changes. Use a branch for risky or large changes (redesigns, framework migration) and say so.
- **Never commit:** secrets, `.env` files, `node_modules`, personal documents, files over 1 MB without asking (three.js is the one known exception).
- **After a push:** GitHub Pages needs 1–2 minutes. Tell the owner to hard refresh (`Ctrl+Shift+R`) because browsers cache the tab icon and assets.
- **Deleting files:** ask first, even for files that look unused.

---

## 12. Roadmap and known gaps

Living list. Update the status when something is done or the owner decides otherwise. Items marked **needs owner** cannot be done without data.

**High priority**
- [ ] **Real screenshots** for MatchIn and Engipedia in the phone mockups and on the 3D phone. *Needs owner.* MatchIn images exist in the team repository under `screens/`; Engipedia images are linked from its README.
- [ ] **Real CV PDF** and wire `#downloadCvBtn` to it. *Needs owner.*
- [ ] **Unverified stat:** the hero shows "5+ Projects Delivered". Replace it with a verifiable figure (or remove it) after the owner confirms.
- [ ] **Social preview meta tags** (Open Graph, Twitter card, `theme-color`) were lost in the last redesign. Add them back.

**Medium priority**
- [ ] **`config.js` is orphaned.** It is still loaded but nothing reads `window.SITE`, so its CV / status / experience / screenshot hooks do nothing. Decide with the owner: rewire it, or delete the file and its `<script>` tag.
- [ ] **Reduced motion:** the preloader and CSS keyframes ignore `prefers-reduced-motion`; only the 3D phone respects it.
- [ ] **Focus styles:** no `:focus-visible` rules exist. Add a visible focus ring using `--accent`.
- [ ] **Experience / training section** when the owner has real entries. *Needs owner.*
- [ ] **Demo links:** APK on GitHub Releases or a short screen recording per app. *Needs owner.*
- [ ] **Repository hygiene:** descriptions and topics (`flutter`, `dart`, `clean-architecture`) on the featured repositories. The MatchIn README shows App Store / Google Play buttons that point to placeholders. *Owner action on external repos.*

**Low priority / ideas**
- [ ] Deep-dive page per project (problem, architecture, challenges).
- [ ] A third, solo project to balance the team project.
- [ ] Remove or reuse the legacy `favicon.ico` / `favicon.png`; add an `apple-touch-icon`.
- [ ] Arabic version with a language toggle.

**Decided: do not do**
- A light theme, a contact form with a backend, analytics, cookie banners, chat widgets, stock imagery.

---

## 13. Decisions already made (do not re-open without being asked)

- Single page, English only, dark only.
- One accent color (`#38bdf8`); green only for availability.
- Preloader: signature "Elzaher", exactly 3 seconds.
- Portrait is circular; the tab icon is the circular portrait.
- Hero headline is "FLUTTER DEVELOPER" in the solid + outline style.
- The CV button opens an email request until a PDF exists.
- Featured projects: MatchIn (team, Flutter Developer) and Engipedia (lead, with the UI/UX credit to Zeyad Khaled Mohamed).
- The 3D phone shows a generated project card on its screen (screenshots are a future upgrade).

---

## 14. When to stop and ask the owner

Ask before you proceed if the task would:
- add or change any factual claim, number, role, date or link;
- change the look of an existing section, the preloader timing, colors or fonts;
- add a dependency, build tool or framework;
- delete or rename files, or change section ids;
- need an asset you do not have (screenshots, CV, logos, copy);
- touch anything outside this repository.

Keep questions short and give a recommended default so the owner can answer with one word.
