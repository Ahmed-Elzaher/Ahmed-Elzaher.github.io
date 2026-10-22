# GEMINI.md — Project Instructions

Instructions for any AI assistant working in this repository (Gemini CLI, Antigravity, or similar).
Read this file completely at the start of every session, before touching any file.

**Precedence:** the owner's explicit instruction in the current chat → this file → your own defaults.
If the owner's request conflicts with this file, follow the owner and propose an update to this file.

**Your role:** act as a senior front-end engineer who owns the quality of this codebase. Correct, readable, maintainable code matters as much as the page looking good. Section 8 defines the engineering bar.

---

## 0. Operating protocol

1. **Sync before you work.** The owner edits this repository from several tools and pushes often (the layout changed twice in one day). Run `git fetch origin`, then `git log --oneline -10 origin/main` and `git status` before any change. If the remote has commits you have not seen, read them first (`git diff HEAD origin/main --stat`). Never assume the files on disk, or the descriptions in this file, are current. If they disagree with the code, trust the code and fix this file.
2. **Never overwrite the owner's work.** No force-push, no `git reset --hard` on unpushed work without saving it to a branch first, no history rewrites.
3. **Language.** Talk to the owner in **Egyptian Arabic** (casual, short, direct). Everything that goes into the repository is in **English**: code, comments, commit messages, page copy, this file.
4. **Ask before you invent.** If a request needs facts you do not have (numbers, dates, roles, links, screenshots, a CV), ask for them. Section 3 lists what you may and may not write.
5. **Do exactly what was asked.** Do not redesign, rename, reorder or "improve" things outside the request. Suggest them in the reply instead. The one exception is the scoped cleanup rule in Section 8.1.
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

- **Current stack:** a static site. `index.html` holds the markup, `css/style.css` the styles, `js/*.js` the behavior (classic scripts today). No bundler, no framework, no runtime package manager.
- **Chosen direction (owner's decision):** separate CSS and JS files, with JavaScript as **ES modules**, and **no build step**. GitHub Pages serves the files as they are. See Section 5 for the target layout and Section 14 for the migration steps.
- **Any technology is allowed** when it is clearly better for the task. Rules for introducing something new:
  1. Default to the simplest thing that works. Do not add tooling for its own sake.
  2. State the reason in one line to the owner before starting.
  3. GitHub Pages must keep working. Either commit the built output to the published folder, or add a GitHub Actions workflow that deploys it. `index.html` must stay reachable at the site root.
  4. Existing behavior, content and visuals must not regress.
  5. Update Sections 5, 6, 8 and 14 of this file in the same change.
- **Runtime dependencies:** keep them minimal. Currently: Google Fonts (CSS link) and **three.js r128, self-hosted** as `three.min.js` (not loaded from a CDN, so the page works offline and cannot break from a CDN outage).
- **Dev-only tooling** (ESLint, Stylelint, Prettier, EditorConfig, `package.json`) exists for the maintainer and the AI. It is never loaded by the page and never affects deployment. See Section 9.
- **No secrets, API keys or tracking scripts** in the repository. No analytics unless the owner asks.
- **No contact form backend.** Contact is by email, LinkedIn and GitHub only.
- **Serve over HTTP when developing.** ES modules and canvas textures from images do not work reliably from `file://`. Use `npm start` (see Section 9).

---

## 5. Repository layout

### Current

| Path | Purpose | Notes |
|---|---|---|
| `index.html` | Page markup (~540 lines) | Still has 5 inline `style=""` attributes (legacy, see Section 14) |
| `css/style.css` | All styles (~1,100 lines): tokens, base, every component | Single file; split target below |
| `js/main.js` | Preloader dismissal, arsenal filter, copy-email | Classic script, `var` and callbacks (legacy) |
| `js/three-phone.js` | Lazy-loaded 3D phone (~290 lines, one IIFE) | Classic script; contains the `DATA` object for the phone screens |
| `three.min.js` | three.js r128, self-hosted | Loaded lazily by `js/three-phone.js` |
| `config.js` | **Legacy.** Still loaded by `index.html`, but nothing reads `window.SITE` | See Section 14 |
| `photo.jpg` | Portrait used in the hero | 640×640, ~48 KB |
| `favicon.ico`, `favicon.png`, `favicon.svg` | Tab icons, linked with a `?v=2` cache-buster | Bump the number when the icon changes |
| `favicon_original.png` | Backup of the earlier "AE" logo icon | Unreferenced. Do not delete without asking |
| `README.md` | Public project README | Keep it consistent with the page (projects, roles, links) |
| `GEMINI.md` | This file | |
| `package.json`, `eslint.config.js`, `.stylelintrc.json`, `.prettierrc.json`, `.prettierignore`, `.editorconfig`, `.gitignore` | Dev-only tooling and editor settings | Section 9 |

### Target (new files must follow it; legacy files move only as described in Section 8.1)

```
/
├─ index.html                  markup only: semantic HTML, no inline style, no inline handlers
├─ css/
│  ├─ tokens.css               :root custom properties only
│  ├─ base.css                 reset, typography, layout primitives
│  └─ components/              one file per component (preloader.css, arsenal.css, project-card.css, phone-stage.css, ...)
├─ js/
│  ├─ main.js                  the only entry point, <script type="module">; wires features together
│  ├─ features/                one module per feature: preloader.js, arsenal-filter.js, copy-email.js, ...
│  ├─ phone/                   the 3D phone split by concern: data.js, scene.js, screen-texture.js, controls.js, index.js
│  └─ lib/                     tiny shared helpers (dom.js, timing.js)
├─ vendor/three.min.js         third-party code, untouched, loaded as a classic script (exposes THREE)
├─ screens/                    real app screenshots (.webp or optimized .jpg, under 200 KB each)
└─ assets/                     portrait, icons, other static images
```

`<link rel="stylesheet">` tags in `index.html` list the CSS files in cascade order (tokens, base, components). Do not chain `@import` (it serializes downloads).

---

## 6. Page architecture

Order of the page, top to bottom. Section ids are used by CSS and JS; do not rename them casually.

1. **Preloader** (`#preloader`): full-screen splash, the word "Elzaher" drawn as a handwritten signature (SVG text, `Caveat` font, `drawSignature` / `fillSignature` keyframes). Hidden **3 seconds** after `window.load` (owner's explicit choice), 600 ms fade, with a safety fallback at 3.8 s. Logic in `js/main.js`. Do not change the timing, the word or the style without being asked.
2. **Top bar** (`header.top-bar`): brand "Ahmed Elzaher / Flutter Dev", GitHub and LinkedIn icon buttons, and the CV button (`#downloadCvBtn`). There are no in-page nav links.
3. **Hero** (`.hero`): two columns. Left: label line, headline "FLUTTER / DEVELOPER" (solid + outline words), bio, three stat cards. Right: circular portrait (`photo.jpg`) with an availability badge. Below it: two feature cards.
4. **Technical Arsenal** (`#skills`): filter pills + `#arsenalGrid` of `.arsenal-card` items. Filters: `all`, `mobile`, `architecture`, `tools` (matched against each card's `data-category`). Currently 12 cards (3 architecture, 3 mobile, 6 tools). Logic in `js/main.js`.
5. **Interactive phone** (`#interactive-phone`): a three.js 3D phone on `canvas#phone3d` inside `#stage`. Two buttons (`.showcase-btn[data-proj]`) switch the project on the screen. The screen artwork is drawn from the `DATA` object in `js/three-phone.js` (name, tagline, stack chips, role). Drag or arrow keys rotate it. It idles with a gentle sway, pauses when off-screen, respects `prefers-reduced-motion`, and shows `#stage-fallback` text if WebGL or the library is unavailable. three.js is loaded only when the section nears the viewport.
6. **Featured Projects** (`#projects`): one `article.project-card` per project. Left column: tags, title, description, "My Key Contributions" list, tech chips, GitHub button. Right column: `.project-phones-3d` with three `.phone-device` mockups. **These mockups currently show icons and captions, not real screenshots.**
7. **Contact** (`#contact`): CTA card with the email shown as text, a Copy button (`#copyBtn`, copies the visible email text; it has no error handling yet, so keep the email visible as plain text) and a "Send Direct Message" mailto button.
8. **Footer:** copyright line and university.

---

## 7. Design system

**Direction:** dark, technical, restrained. One accent color. Big stacked headings where one word is solid and the next is outlined (`.solid` / `.outline` spans). Cards on slightly lighter surfaces with hairline borders.

**Theme:** dark only, by design. There is no light theme. Do not add one unless the owner asks.

**Tokens** (defined on `:root` in `css/style.css`; always use the variable, never a raw hex in a component rule):

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

## 8. Engineering standards

The bar is a senior front-end engineer's: simple, readable, predictable code that the next person can change safely. When a rule here conflicts with speed, the rule wins.

### 8.1 Principles and the cleanup rule

- **Readability beats cleverness.** Write the obvious version. Another developer should understand a function without running it.
- **One responsibility per unit.** A function does one thing; a module owns one feature; a CSS file styles one component.
- **Do not repeat yourself, but do not abstract early.** Extract on the third repetition, not the second. A wrong abstraction costs more than duplication.
- **YAGNI.** Build what the task needs. No speculative options, flags or layers.
- **Explicit over implicit.** Named constants instead of magic numbers, named functions instead of long inline callbacks, clear data flow instead of hidden globals.
- **Fail gracefully.** The page must stay usable when JavaScript, WebGL, fonts or the clipboard are unavailable.
- **Progressive enhancement.** All content is readable from the HTML alone. JavaScript only adds behavior (filtering, copy button, 3D phone, preloader fade).
- **Small diffs.** One logical change per commit. Do not mix a feature, a refactor and a reformat.

**Cleanup rule (owner's decision: "clean what you touch").** The legacy code does not meet this section yet, and you must **not** start a large refactor on your own. Instead:
- When your task modifies a unit (a function, a CSS rule block, an HTML section), bring **that unit** up to these standards in the same commit: `var` → `const`/`let`, remove its inline styles, add missing error handling, fix its names, move it into the target structure if that is a small, safe move.
- Do **not** reformat, rename or restructure code you did not need to touch. No whole-file Prettier runs on legacy files.
- **Never increase the legacy lint baseline** (Section 9). New and changed code is lint-clean.
- If a larger cleanup would help, describe it to the owner and add it to Section 14 instead of doing it.
- New files always follow the target structure (Section 5), even while legacy files stay where they are.

### 8.2 Structure and architecture

- **Separation of concerns:** markup in HTML, presentation in CSS, behavior in JS. No inline `style=""`, no inline `on*` handlers, no `<style>` or large `<script>` blocks in `index.html`.
- **One entry point.** `js/main.js` is the only script `index.html` loads (as `type="module"`, which is deferred by default). It imports and initializes feature modules. Feature modules never run code on import except defining things.
- **Feature modules** export an `init…` function (for example `initArsenalFilter()`), take the elements or options they need as arguments, and return nothing or a `destroy` function when they hold resources.
- **No new globals.** The only allowed global is `THREE`, provided by the vendored classic script. Do not write to `window`.
- **Content and logic stay separate.** Facts that appear in more than one place (project names, roles, stacks) must not be copy-pasted. Today the 3D phone's `DATA` repeats facts from the project cards. If you change one, change the other in the same commit and leave a comment pointing to the twin, or derive one from the other.
- **Dependencies point one way:** `main.js` → features → `lib`. A `lib` helper never imports a feature.
- **Third-party code stays untouched** in `vendor/`. Never edit it, never lint or format it.

### 8.3 HTML

- Semantic elements (`header`, `nav`, `main`, `section`, `article`, `footer`, `button`, `a`). Exactly one `h1`; headings never skip a level.
- Use `button` for actions and `a` for navigation. Never a clickable `div`.
- JS hooks use `data-*` attributes (the existing `data-filter`, `data-category`, `data-proj` pattern), not styling classes. Ids only for unique anchors and landmarks.
- Every image has `alt`, `width` and `height`. Decorative images use `alt=""`. Icon-only controls have `aria-label`.
- Every `target="_blank"` link has `rel="noopener"`.
- Two-space indentation, lowercase tags and attributes, double quotes.
- ARIA only when native semantics are not enough. Do not add `role` to elements that already have the right one.

### 8.4 CSS

- **Tokens only.** Colors, fonts and repeated sizes come from `:root` custom properties. If a value is used three or more times, make it a token.
- **Naming:** lowercase kebab-case, block-prefixed: `.project-card`, `.project-card-title`. State classes use an `is-` prefix (`.is-active`, `.is-hidden`). Do not rename legacy classes (`.active`, `.hide`, `.show`) unless you are touching them anyway.
- **Low specificity.** No ids and no `!important` in selectors (stylelint enforces both). At most three compound selectors and two levels of nesting. Never style by structure (`div > div > span`).
- **Layout:** flexbox and grid with `gap`. Avoid margin hacks and negative margins. Do not fix heights on text containers. Use `rem` for type and spacing, `px` for borders and hairlines.
- **Responsive:** reuse the two existing breakpoints (860px, 540px). Custom properties cannot be used in media queries, so repeat the literal values and keep them identical. Verify at 390px and 1280px.
- **Order inside a rule:** layout (display, position, grid/flex) → box (size, margin, padding) → typography → visual (color, background, border, shadow) → misc (transition, cursor). Keep related declarations together.
- **Animation:** animate `transform` and `opacity` only. Keep `@keyframes` next to the component that uses them. Every animation has a `prefers-reduced-motion: reduce` override.
- **Comments:** a short banner per component and a comment for any non-obvious hack. No commented-out CSS.

### 8.5 JavaScript

- **Language level:** ES2022 modules. `const` by default, `let` when reassigned, never `var`. Strict equality only. Arrow functions for callbacks, named `function` declarations for exported units.
- **Functions:** short (about 40 lines at most; lint warns above), one level of abstraction, early returns instead of deep nesting, at most three parameters (use an options object beyond that), no hidden side effects. Prefer pure functions for logic and keep DOM access at the edges.
- **Naming:** functions are verbs (`initArsenalFilter`, `drawScreen`), data and elements are nouns (`filterButtons`, `activeProject`), booleans read as questions (`isHidden`, `hasWebGL`), constants are `UPPER_SNAKE_CASE` (`PRELOADER_MS = 3000`). No abbreviations, no single-letter names outside tiny loops or math.
- **Constants:** magic numbers and strings (timings, colors, sizes, selectors) live in named constants at the top of the module or in a `config` object, never inline.
- **DOM:** query once and cache. Use event delegation for lists. Use `event.currentTarget`, not `this`. Write text with `textContent`, never `innerHTML` with dynamic strings. Toggle classes instead of setting inline styles. Batch DOM writes; never read layout and write in an interleaved loop.
- **Errors:** feature-detect before use (`'IntersectionObserver' in window`, WebGL context). Wrap APIs that can throw or reject (clipboard, WebGL, image loading) in `try/catch` or `.catch()`. **No empty `catch` blocks**: handle it, show a fallback, or log with `console.error`. A broken feature must degrade, never break the page.
- **Async:** `async`/`await` or Promises. No callback pyramids, no `setTimeout` chains for sequencing (use a Promise-based `wait()` helper).
- **Animation and resources:** drive animation with `requestAnimationFrame`, pause it when the element is off-screen, and respect `prefers-reduced-motion`. For three.js, dispose of geometries, materials, textures and the renderer when tearing down. Use `{ passive: true }` on scroll and touch listeners that do not call `preventDefault()`.
- **Comments:** explain **why**, not what. Keep a one-line JSDoc on exported functions (purpose, params, return). No commented-out code, no `TODO` without an owner-visible entry in Section 14.
- **Security:** no `eval`, no `new Function`, no inline scripts, no dynamic script URLs from user input. No third-party scripts beyond the vendored three.js.

### 8.6 Accessibility, performance and resilience (apply to every change)

- Keyboard reachable, visible focus, logical tab order, contrast of at least 4.5:1, touch targets of at least 44px.
- No layout shift: reserve space for images and the 3D stage. Keep the first load light (Section 12).
- A failure in an optional feature (3D phone, copy button) never blocks the rest of the page. The preloader must always dismiss, even if scripts fail (a safety timeout already exists; keep it).

### 8.7 Review checklist before every commit

Re-read your own diff as a reviewer:
- Does every changed unit meet 8.2 to 8.6, and is the diff limited to what the task needed?
- Any duplicated logic or facts, dead code, debug output, or commented-out code?
- Are names clear enough to read without the comments?
- Did the lint numbers stay the same or go down (Section 9)?
- Did I update `README.md` and this file if facts or structure changed?

---

## 9. Dev tooling (not deployed)

Configuration lives in the repository root. Install once with `npm install`. The folder `node_modules/` is git-ignored. The page never loads any of this.

| Command | What it does |
|---|---|
| `npm start` | Serves the site at http://localhost:3000 (Python static server) |
| `npm run lint` | ESLint on `js/**/*.js` and Stylelint on `css/**/*.css` |
| `npm run lint:js` / `npm run lint:css` | One of the two |
| `npm run format:check` | Prettier check (does not write) |
| `npm run format` | Prettier write. **Run it only on files you created or fully own, never on the whole project** |

For a single file, run the tool directly: `npx eslint js/main.js`, `npx stylelint css/style.css`, `npx prettier --write js/features/new-file.js`.

**What is configured**
- **ESLint** (`eslint.config.js`): recommended rules plus `no-var`, `prefer-const`, `eqeqeq`, `curly`, `no-eval`, `no-empty` (empty `catch` included), `no-shadow`, `no-param-reassign`, `no-unused-vars`, and warnings for `no-console`, more than 3 parameters, functions over 40 lines, and complexity over 10. `THREE` is a known read-only global.
- **Stylelint** (`.stylelintrc.json`): `stylelint-config-standard`, plus no ids in selectors, no named colors, warnings for `!important`, deep nesting and long selector chains.
- **Prettier** (`.prettierrc.json`): single quotes, semicolons, 100 columns, ES5 trailing commas. `.prettierignore` skips `index.html` (until its inline blocks are gone), `vendor/`, `three.min.js`, `favicon.svg`, the lockfile and Markdown.
- **EditorConfig** (`.editorconfig`): UTF-8, LF, two spaces, final newline, trimmed trailing whitespace.

**Legacy baseline (measured when the tooling was added).** The existing code predates these rules, so `npm run lint` is not clean yet:
- ESLint on `js/`: **90 problems** (85 errors, 5 warnings)
- Stylelint on `css/`: **77 problems**
- Prettier: 4 files differ (`config.js`, `css/style.css`, `js/main.js`, `js/three-phone.js`)

Rule: these numbers may only go down. Do not "fix" lint in code you are not otherwise changing. When you finish a task, lint the files you touched and compare. Update the baseline numbers here when they change.

**Security note.** `npm audit` reports advisories in transitive dev dependencies (`braces`, `micromatch`, `fast-glob`). They never ship to the site. Do not run `npm audit fix --force`; update the tools normally when the owner asks.

---

## 10. Playbooks for common tasks

**Add a project**
1. Copy an existing `article.project-card` inside `#projects`.
2. Fill: tag row, title, one-paragraph description, "My Key Contributions" (only what the owner actually built), tech chips, GitHub link (`target="_blank" rel="noopener"`).
3. Add an entry to the `DATA` object of the 3D phone (`js/three-phone.js`) and a matching `.showcase-btn[data-proj]` button.
4. Add it to `README.md`.
5. Ask the owner for the role, contributions, links and screenshots first.

**Add or change a skill**
Copy an `.arsenal-card`, set `data-category` to `mobile`, `architecture` or `tools`, set the icon (inline SVG), name and badge. Only list skills the owner confirms.

**Add real screenshots**
1. Put images in `screens/` (create it). Use `.webp` or optimized `.jpg`/`.png`, each **under 200 KB**, with a consistent aspect ratio (about 9:19).
2. In the `.phone-device`, replace the `.phone-inner-content` placeholder with `<img src="screens/…" alt="…" width="…" height="…" loading="lazy">` inside `.phone-screen`. Keep the notch bar and footer label (update the label to the real screen name).
3. To show a screenshot on the 3D phone screen, the `drawScreen` function in `js/three-phone.js` must be extended to draw an image instead of the generated card. Use `cover` sizing and keep the generated card as the fallback. Handle image load errors.
4. Test the 3D phone over HTTP (Section 11). Canvas textures from images fail on `file://`.

**Set the CV**
Add the PDF to the repository root (for example `Ahmed-Elzaher-CV.pdf`). Change `#downloadCvBtn` from the `mailto:` link to `href="Ahmed-Elzaher-CV.pdf"` with the `download` attribute, and keep the label "Download CV". Until then the button opens an email request, which is intentional.

**Add an Experience / Training section**
Only when the owner provides real data. Add a section after `#skills` or before `#projects` using the existing `.section` + `.section-head` + `.sec-title` pattern. Timeline rows: period, title, place, one or two factual sentences. Put its CSS in its own file under `css/components/` and add it to Section 6 here.

**Add a new interactive feature**
Create `js/features/<name>.js` exporting `init<Name>()`, call it from `js/main.js`, put its styles in `css/components/<name>.css`, follow Section 8, and make it degrade when unsupported.

**Change contact details**
Update the email in all places: header CV mailto, contact card text, mailto buttons, `README.md`, and this file.

**Change the 3D phone**
Keep the lazy loader, the WebGL fallback message, reduced-motion handling, pause-when-hidden and keyboard rotation. Test with the headless method in Section 11.

---

## 11. Definition of done (check before saying a task is finished)

Run these checks yourself. Do not hand work back unchecked.

**How to test:** serve the folder over HTTP (`npm start`, then open `http://localhost:3000`). Use a headless Chromium with software WebGL: launch args `--use-gl=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`. Take screenshots at **1280×800** and **390×844**. If fonts fail to load in the test environment, that is not a bug in the page.

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
- [ ] Code follows Section 8, and the lint numbers in Section 9 did not go up. Touched files pass `npx eslint` / `npx stylelint`.
- [ ] Only the files you meant to change are modified (`git status`, `git diff --stat`).
- [ ] `README.md` and this file are updated if facts, structure or the roadmap changed.

---

## 12. Performance, accessibility and SEO

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
- Social preview tags (`og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`, `theme-color`) are **currently missing** (see Section 14). When added, `og:image` must be an absolute URL on the live domain.

---

## 13. Git and delivery workflow

- **Commit, do not push.** After finishing a task, make a focused local commit. **Do not run `git push` unless the owner tells you to** in the current chat. Tell the owner what is committed and wait.
- **Before every commit:** `git fetch origin` and check whether `origin/main` moved. If it did, stop, review the new commits, and tell the owner before continuing.
- **Commit messages:** Conventional Commits, in English, imperative mood, matching the existing history: `feat: …`, `fix: …`, `docs: …`, `chore: …`, `refactor: …`. One logical change per commit; keep refactors, features and formatting in separate commits. Explain the why in the body when it is not obvious.
- **Branches:** work on `main` for small changes. Use a branch for risky or large changes (redesigns, framework migration) and say so.
- **Never commit:** secrets, `.env` files, `node_modules`, personal documents, files over 1 MB without asking (three.js is the one known exception).
- **After a push:** GitHub Pages needs 1–2 minutes. Tell the owner to hard refresh (`Ctrl+Shift+R`) because browsers cache the tab icon and assets. When the icon changes, also bump the `?v=` number on the favicon links.
- **Deleting files:** ask first, even for files that look unused.

---

## 14. Roadmap and known gaps

Living list. Update the status when something is done or the owner decides otherwise. Items marked **needs owner** cannot be done without data.

**High priority**
- [ ] **Real screenshots** for MatchIn and Engipedia in the phone mockups and on the 3D phone. *Needs owner.* MatchIn images exist in the team repository under `screens/`; Engipedia images are linked from its README.
- [ ] **Real CV PDF** and wire `#downloadCvBtn` to it. *Needs owner.*
- [ ] **Unverified stat:** the hero shows "5+ Projects Delivered". Replace it with a verifiable figure (or remove it) after the owner confirms.
- [ ] **Social preview meta tags** (Open Graph, Twitter card, `theme-color`) are missing. Add them.

**Code quality (only when the owner asks, or as part of touching that code, see Section 8.1)**
Suggested order, one commit per step, no behavior change, visual check after each:
- [ ] 1. Replace the 5 inline `style=""` attributes in `index.html` with classes.
- [ ] 2. Convert `js/main.js` into an ES module entry and split it into `js/features/` (preloader, arsenal filter, copy email). Fix `var`, `this`, the missing clipboard error handling and the empty `catch`.
- [ ] 3. Split `js/three-phone.js` (one 290-line IIFE, 63 lines using `var`) into `js/phone/` modules; move `three.min.js` to `vendor/`. Keep lazy loading and all fallbacks.
- [ ] 4. Split `css/style.css` (~1,100 lines) into `css/tokens.css`, `css/base.css` and `css/components/*.css`.
- [ ] 5. Remove the orphaned `config.js` and its `<script>` tag (or rewire it, owner's call).
- [ ] 6. Drop `index.html` from `.prettierignore` once step 1 is done, then format it.
- [ ] Legacy lint baseline: ESLint 90, Stylelint 77. Burn it down as units are touched; update Section 9.

**Medium priority**
- [ ] **Reduced motion:** the preloader and CSS keyframes ignore `prefers-reduced-motion`; only the 3D phone respects it.
- [ ] **Focus styles:** no `:focus-visible` rules exist. Add a visible focus ring using `--accent`.
- [ ] **Smoke test:** a small headless-browser script (page loads, no console errors, no horizontal scroll, preloader dismisses, 3D renders) so the checks in Section 11 can run in one command. *Dev-only; ask before adding Playwright.*
- [ ] **Experience / training section** when the owner has real entries. *Needs owner.*
- [ ] **Demo links:** APK on GitHub Releases or a short screen recording per app. *Needs owner.*
- [ ] **Repository hygiene:** descriptions and topics (`flutter`, `dart`, `clean-architecture`) on the featured repositories. The MatchIn README shows App Store / Google Play buttons that point to placeholders. *Owner action on external repos.*

**Low priority / ideas**
- [ ] Deep-dive page per project (problem, architecture, challenges).
- [ ] A third, solo project to balance the team project.
- [ ] Remove or reuse `favicon_original.png`; add an `apple-touch-icon`.
- [ ] Arabic version with a language toggle.

**Decided: do not do**
- A light theme, a contact form with a backend, analytics, cookie banners, chat widgets, stock imagery.

---

## 15. Decisions already made (do not re-open without being asked)

- Single page, English only, dark only.
- One accent color (`#38bdf8`); green only for availability.
- Preloader: signature "Elzaher", exactly 3 seconds.
- Portrait is circular; the tab icon is the circular portrait (linked as ico, png and svg with a `?v=` cache-buster).
- Hero headline is "FLUTTER DEVELOPER" in the solid + outline style.
- The CV button opens an email request until a PDF exists.
- Featured projects: MatchIn (team, Flutter Developer) and Engipedia (lead, with the UI/UX credit to Zeyad Khaled Mohamed).
- The 3D phone shows a generated project card on its screen (screenshots are a future upgrade).
- **Architecture:** separate CSS and JS files, JavaScript as ES modules, no bundler, no framework (Section 5).
- **Refactor policy:** clean only what you touch; no unrequested large refactors (Section 8.1).
- **Tooling:** ESLint, Stylelint, Prettier and EditorConfig, dev-only (Section 9).
- **Git:** commit locally, push only when the owner says so (Section 13).

---

## 16. When to stop and ask the owner

Ask before you proceed if the task would:
- add or change any factual claim, number, role, date or link;
- change the look of an existing section, the preloader timing, colors or fonts;
- add a dependency, build tool or framework, or start a refactor beyond the unit you are changing;
- delete or rename files, or change section ids;
- need an asset you do not have (screenshots, CV, logos, copy);
- touch anything outside this repository.

Keep questions short and give a recommended default so the owner can answer with one word.
