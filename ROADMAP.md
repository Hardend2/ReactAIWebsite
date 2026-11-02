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
- [ ] Create the React project (Vite recommended)
- [ ] Set up the Git workflow (branches, commit conventions)
- [ ] Configure oxlint and Prettier
- [ ] Define the folder structure (`components/`, `pages/`, `content/`, `styles/`, `assets/`)
- [ ] Add a README with setup and run instructions
- [ ] Set up CI (lint + build on every push)

**Status:** Not started

### Phase 2: Design system and accessibility baseline
Accessibility is a core requirement for a site about neurodiversity.

- [ ] Define design tokens (colours, spacing, typography) with sufficient contrast (WCAG AA minimum)
- [ ] Choose readable, dyslexia-friendly typography and comfortable line length/spacing
- [ ] Build base components: `Button`, `Card`, `Section`, `Layout`, `Navigation`, `Footer`
- [ ] Support keyboard navigation and visible focus states
- [ ] Respect `prefers-reduced-motion` and avoid auto-playing animations
- [ ] Provide a calm, low-clutter layout (clear hierarchy, whitespace)
- [ ] Consider optional user settings (dark mode, font size, reduced motion toggle)

**Status:** Not started

### Phase 3: Content migration and structure
- [ ] Move content out of components into structured files (`content/*.json` or Markdown)
- [ ] Rewrite and structure the content around three main themes:
  - [ ] **Advantages**: strengths such as pattern recognition, creativity, hyperfocus, attention to detail
  - [ ] **Disadvantages / challenges**: e.g. standard interview formats, sensory overload, unclear job descriptions, stigma
  - [ ] **Tips**: for job seekers (preparing, disclosing, asking for adjustments) and for employers (inclusive hiring)
- [ ] Review wording: avoid stereotypes and generalisations; make clear that experiences differ per person
- [ ] Add reliable sources and references for factual claims
- [ ] Use plain language and short paragraphs

**Status:** Not started

### Phase 4: Pages and features
- [ ] Home page (purpose of the site, quick navigation)
- [ ] "Advantages" page
- [ ] "Challenges" page
- [ ] "Tips for job seekers" page
- [ ] "Tips for employers" page
- [ ] Resources / links page
- [ ] About / contact page
- [ ] Set up routing (React Router) with a proper 404 page
- [ ] Add page titles and meta descriptions (SEO)

**Status:** Not started

### Phase 5: Quality, testing and performance
- [ ] Unit tests for key components (Vitest + React Testing Library)
- [ ] Automated accessibility checks (axe-core)
- [ ] Manual test with a screen reader and keyboard only
- [ ] Test on mobile and on multiple browsers
- [ ] Optimise images (modern formats, lazy loading, alt text)
- [ ] Reach a Lighthouse score of 90+ for Accessibility, Performance and Best Practices
- [ ] Gather feedback from at least a few people (ideally neurodivergent users) and process it

**Status:** Not started

### Phase 6: Launch and future improvements
- [ ] Deploy to Netlify
- [ ] Set up a custom domain and HTTPS (if applicable)
- [ ] Redirect old legacy URLs to the new pages
- [ ] Add a privacy statement (and cookie notice if analytics is used)
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