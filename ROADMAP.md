# ROADMAP: Refactoring the Neurodiversity & Job Search Website

A realistic refactor plan for migrating the legacy site to a modern React application. It is based on an AI-assisted analysis of the legacy site.

> **How to use this file:** tick a box (`- [x]`) when a task is finished and merged. Update the "Status" line of each phase as you go. Review the roadmap at the end of every phase and adjust it if the findings change.

---

## 1. Goal and scope

**Goal:** Deliver an accessible, maintainable React website that explains the advantages and disadvantages of neurodiversity (e.g. ADHD, autism, dyslexia) in the job search, with practical tips for job seekers and employers.

**In scope**
- Rebuilding the legacy pages as React components
- Restructuring and rewriting content (advantages / challenges / tips)
- Accessibility, performance and responsive design
- Basic testing and deployment

**Out of scope (for now)**
- User accounts / logins
- Backend or database (content is static)
- Multi-language support (revisit in Phase 6)

---

## 2. AI analysis of the legacy site

> Fill in or adjust these findings after running the analysis on the real legacy site. The items below are the typical issues to check and should be confirmed against the actual code.

- [ ] Run the AI analysis on the legacy codebase (structure, duplication, dependencies, HTML/CSS quality)
- [ ] Run an accessibility audit (Lighthouse, axe DevTools) and note the score
- [ ] Run a performance audit (Lighthouse, bundle/asset size) and note the score
- [ ] Inventory all pages, content blocks, images and external links
- [ ] Identify duplicated markup/styles that can become reusable components
- [ ] List outdated or unused dependencies and scripts
- [ ] Record the findings in `docs/analysis.md`
- [ ] Prioritise issues: **must fix / should fix / nice to have**

**Status:** Not started

---

## 3. Phases

### Phase 1: Foundation and setup
- [x] Create the React project (Vite recommended)
- [ ] Set up the Git workflow (branches, commit conventions) (partly: branch rule is in AGENTS.md; no commit conventions yet)
- [ ] Configure oxlint and Prettier (partly: oxlint done; Prettier not installed)
- [ ] Define the folder structure (`components/`, `pages/`, `content/`, `styles/`, `assets/`) (partly: all in place except `styles/`; styles are in `src/index.css`)
- [x] Add a README with setup and run instructions
- [ ] Set up CI (lint + build on every push)

**Status:** In progress

### Phase 2: Design system and accessibility baseline
Accessibility is a core requirement for a site about neurodiversity.

- [x] Define design tokens (colours, spacing, typography) with sufficient contrast (WCAG AA minimum)
- [ ] Choose readable, dyslexia-friendly typography and comfortable line length/spacing (partly: system fonts and 68ch line length; not checked for dyslexia-friendliness)
- [ ] Build base components: `Button`, `Card`, `Section`, `Layout`, `Navigation`, `Footer` (partly: `Layout` only; navigation and footer are inside it, cards and sections are CSS classes)
- [x] Support keyboard navigation and visible focus states
- [x] Respect `prefers-reduced-motion` and avoid auto-playing animations
- [x] Provide a calm, low-clutter layout (clear hierarchy, whitespace)
- [ ] Consider optional user settings (dark mode, font size, reduced motion toggle)

**Status:** In progress

### Phase 3: Content migration and structure
- [x] Move content out of components into structured files (`content/*.json` or Markdown)
- [x] Rewrite and structure the content around three main themes:
  - [x] **Advantages**: strengths such as pattern recognition, creativity, hyperfocus, attention to detail
  - [x] **Disadvantages / challenges**: e.g. standard interview formats, sensory overload, unclear job descriptions, stigma
  - [x] **Tips**: for job seekers (preparing, disclosing, asking for adjustments) and for employers (inclusive hiring)
- [ ] Review wording: avoid stereotypes and generalisations; make clear that experiences differ per person (partly: drafted carefully, but not reviewed yet)
- [x] Add reliable sources and references for factual claims (some are press releases or personal advice; labelled on the Bronnen page)
- [x] Use plain language and short paragraphs

**Status:** In progress (wording review open)

### Phase 4: Pages and features
- [x] Home page (purpose of the site, quick navigation)
- [x] "Advantages" page
- [x] "Challenges" page
- [x] "Tips for job seekers" page
- [x] "Tips for employers" page
- [x] Resources / links page
- [x] About / contact page (about is on the Bronnen page; the contact form does not send anything yet)
- [x] Set up routing (React Router) with a proper 404 page
- [x] Add page titles and meta descriptions (SEO)

**Status:** Done

### Phase 5: Quality, testing and performance
- [x] Unit tests for key components (Vitest + React Testing Library)
- [x] End-to-end tests with Playwright: navigation (including the mobile menu), form validation and honeypot, WCAG scan
- [x] Automated accessibility checks (axe-core) (axe-core in Vitest, @axe-core/playwright in the e2e suite)
- [ ] Manual test with a screen reader and keyboard only (partly: keyboard covered by automated tests only)
- [ ] Test on mobile and on multiple browsers (partly: phone width tested in Chromium only)
- [ ] Optimise images (modern formats, lazy loading, alt text) (not applicable yet: the site shows no images; unused template images remain)
- [ ] Reach a Lighthouse score of 90+ for Accessibility, Performance and Best Practices
- [ ] Gather feedback from at least a few people (ideally neurodivergent users) and process it

**Status:** In progress

### Phase 6: Launch and future improvements
- [ ] Deploy to Netlify
- [ ] Set up a custom domain and HTTPS (if applicable)
- [ ] Redirect old legacy URLs to the new pages
- [ ] Add a privacy statement (and cookie notice if analytics is used) (partly: only a short line on the Bronnen page)
- [ ] Do a final comparison against the legacy audit results (before/after)
- [ ] Backlog ideas:
  - [ ] Multi-language support (e.g. NL/EN)
  - [ ] Searchable resources
  - [ ] Self-assessment checklist for interview preparation
  - [ ] Real user stories (with consent)

**Status:** Not started

---

## 4. Risks and mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Scope creep (too many features) | Delays | Stick to the phases; park new ideas in the backlog |
| Content is inaccurate or stereotyping | Credibility, harm to readers | Use reliable sources, review, involve neurodivergent reviewers |
| Accessibility regressions during refactor | Excludes the target audience | Automated checks in CI + manual testing each phase |
| Content lost during migration | Rework | Inventory in Phase 2 and check against it before launch |
| Underestimated time | Missed deadline | Do Phases 1–4 first; Phase 5–6 items can be trimmed |

---

## 5. Definition of done

A task is done when:
- [ ] The code is reviewed and merged into `main`
- [ ] Lint and tests pass in CI
- [ ] It passes the accessibility checks (automated + keyboard check)
- [ ] The relevant checkbox in this roadmap is ticked

---

## 6. Progress log

| Date | Update |
|------|--------|
| 2026-10-30 | Roadmap created |
| 2026-11-02 | Website with Dutch content, sources and unit tests merged to `main` |
| 2026-11-02 | Docs aligned with pnpm, oxlint, TypeScript, axe-core and Netlify |
| 2026-11-02 | Mobile menu, contact page and Playwright e2e suite merged to `main` |