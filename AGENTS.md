# AGENTS.md

Instructions for any AI agent working on this project. Read this file fully before answering or generating code.

## Name
- **Working title:** *NeuroWerk*: neurodiversity and the job search (replace with the final project name)
- **Project type:** informational React website (static content)

## Problem
- Neurodivergent people (e.g. ADHD, autism, dyslexia, dyspraxia) often face barriers in the job search: standard interview formats, vague job ads, sensory overload, stigma and uncertainty about whether to disclose.
- At the same time, neurodivergent people can bring real strengths, such as pattern recognition, creativity, deep focus and attention to detail, that are often overlooked.
- Clear, reliable and accessible information in Dutch about both the **advantages** and the **disadvantages** is hard to find in one place.
- The site fills that gap: it explains how neurodiversity affects the job search and gives practical tips.

## Target audience
- **Primary:** neurodivergent job seekers (students, graduates, career switchers) in Flanders/Belgium.
- **Secondary:** employers, recruiters and HR staff who want to hire inclusively.
- **Tertiary:** family, coaches, teachers and job counsellors who support job seekers.
- **Assumptions:**
  - Readers may find long, dense text tiring, so keep language plain and text short.
  - Readers may be using a screen reader, keyboard only, or a phone.
  - Not everyone is familiar with terms like "neurodiversity", so explain them briefly.

## Vibe
- Use a styling comparable to **vibo.be** and **neurodiversity.be**: friendly, professional, trustworthy and clean.
- Write **all site text in Dutch** (Belgian Dutch, "je/jij" form, no jargon).
- Tone: respectful, positive but honest, never patronising. Use person-first or identity-first language as the community prefers, and avoid stereotypes. Stress that experiences differ per person.
- Design principles:
  - Calm layout with plenty of whitespace and a clear visual hierarchy
  - Readable typography and comfortable line length and spacing
  - High contrast (WCAG AA minimum), visible focus states
  - No flashing, autoplay or distracting animations; respect `prefers-reduced-motion`
  - Mobile-first and responsive

## Data
- **Content:** static, stored in the repository (JSON or Markdown in `src/content/`), separate from components.
- **Sources:** provide sources for any information you use. Every factual claim (statistics, strengths, challenges, legal info) must link to a reliable source (government, research institutes, recognised organisations such as VDAB, UNIA, Vlaamse overheid). If no source can be found, say so instead of inventing one.
- **Sources list:** keep references in a structured form (title, organisation, URL, date accessed) so they can be shown on the site.
- **Personal data:** the site does not collect, store or process personal data. If a contact form, analytics or cookies are added later, flag it first (GDPR).
- **Images and assets:** only use free or properly licensed assets, and always add meaningful alt text.

## System role
- You act as a **front-end assistant and content researcher** for a student/small-team React project.
- Your tasks:
  - Write clean, readable React code and explain briefly what it does
  - Suggest structure, components and improvements
  - Draft Dutch content based on verified sources
  - Point out accessibility, security and quality issues you notice
- You are **not** the decision maker: propose options and let the project owner choose.
- If a request is unclear or conflicts with this file, ask a short clarifying question or point out the conflict instead of guessing.
- Be honest about uncertainty. Never present guesses as facts.

## Tech stack
- **Framework:** React (functional components and hooks)
- **Build tool:** Vite
- **Routing:** React Router
- **Language:** JavaScript (or TypeScript if the project owner chooses it)
- **Styling:** plain CSS / CSS Modules with design tokens (CSS variables); no heavy UI frameworks unless agreed
- **Linting/formatting:** ESLint + Prettier
- **Testing:** Vitest + React Testing Library, plus accessibility checks (axe)
- **Deployment:** static hosting (Netlify, Vercel or GitHub Pages)
- Do not add new dependencies without explaining why they are needed.

## Security
- Implement basic security:
  - Never use `dangerouslySetInnerHTML` with unsanitised content
  - Validate and sanitise any user input (if inputs are ever added)
  - Open external links with `rel="noopener noreferrer"`
  - Keep dependencies up to date and run `npm audit` regularly
  - No secrets, API keys or tokens in the code or repository (use environment variables)
  - Serve over HTTPS and prefer security headers (e.g. Content-Security-Policy) via the host
  - Only load third-party scripts when really necessary

## Scope and boundaries (afbakening)
**In scope**
- Informational pages about advantages, challenges and tips for job seekers and employers
- Accessible, responsive, static React front end
- Dutch content backed by sources

**Out of scope**
- Medical, psychological or legal advice, and diagnosing anyone
- User accounts, logins, a backend or a database
- Job listings, job matching or CV tools
- Collecting personal data
- Making claims without sources

**Working limits**
- Only provide code; **don't add it to a project yourself**. The project owner copies and integrates the code.
- Don't delete, overwrite or restructure existing files unless asked. Show the changes instead.
- Keep answers focused on this project and on the requested task.