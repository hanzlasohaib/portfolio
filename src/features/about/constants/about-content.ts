/**
 * Static About Preview content (Phase 2 / Sprint 2 task scope;
 * docs/project-design/pages.md § Home lists "About Preview" as a Home
 * section).
 *
 * Feature-local constants (docs/architecture/feature-template.md) — scoped
 * to the `about` feature. Cross-cutting identity fields (name, role,
 * tagline, email, location, resume) already live in
 * `src/constants/personal.ts` and are reused as-is by `AboutSection`
 * rather than duplicated here.
 *
 * Sourced from `public/resume/Hanzla-Sohaib-Resume.pdf` (About Me,
 * Experience, Education, and Skills sections) — existing project
 * information, not invented.
 */
export const ABOUT_CONTENT = {
  biography:
    "I'm a final-year Computer Science student at NUML, Lahore, with a passion for full-stack software engineering and AI. I've built a strong foundation in frontend development, backend integration, REST APIs, authentication systems, and database management.",
  strengths: [
    "Full-Stack Web Development",
    "REST API Design & Integration",
    "Authentication & Security (JWT, OAuth)",
    "SQL & NoSQL Database Management",
  ] as string[],
  currentFocus:
    "Currently working as a MERN Stack Developer Intern at Dafi Labs, building full-stack web applications with MongoDB, Express.js, React.js, and Node.js — with hands-on focus on REST APIs, authentication, debugging, testing, and deployment.",
  education: {
    degree: "BSCS (Bachelor of Science in Computer Science)",
    institution: "National University of Modern Languages (NUML), Lahore",
    period: "2023 – 2027",
  },
} as const;

export type AboutContent = typeof ABOUT_CONTENT;
