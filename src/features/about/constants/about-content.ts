/**
 * Static About content (Phase 2 — Home "About Preview" + dedicated `/about`
 * page; docs/project-design/pages.md § Home / § About).
 *
 * Feature-local constants (docs/architecture/feature-template.md) — scoped
 * to the `about` feature. Cross-cutting identity fields (name, role,
 * tagline, email, location, resume) live in `src/constants/personal.ts`
 * and are reused rather than duplicated here.
 *
 * Documentation note: `pages.md` § About lists Interests and does not list
 * What I Do / Currently Working With / Currently Learning / At a Glance /
 * CTA. This module intentionally extends that outline for brand reasons
 * and omits Interests until real content exists. `pages.md` should be
 * updated later to match.
 *
 * Preview fields (`biography`, `strengths`, `currentFocus`, `education`)
 * are sourced from `public/resume/Hanzla-Sohaib-Resume.pdf`. Page-only
 * fields (`whatIDo`, `currentlyWorkingWith`, `currentlyLearning`,
 * `atAGlance`, `cta`, `professionalSummary`) are owner-supplied copy —
 * not inferred filler (AGENTS.md).
 */

export type AboutWhatIDoItem = {
  title: string;
  description: string;
};

export type AboutAtAGlanceItem = {
  label: string;
  value: string;
};

export type AboutCta = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export const ABOUT_CONTENT = {
  biography:
    "I'm a final-year Computer Science student at NUML, Lahore, with a passion for full-stack software engineering and AI. I've built a strong foundation in frontend development, backend integration, REST APIs, authentication systems, and database management.",

  /**
   * Assembled from existing documented biography, strengths, and current
   * focus — no new employers, roles, or claims.
   */
  professionalSummary:
    "I'm a final-year Computer Science student at NUML, Lahore, building at the intersection of full-stack software engineering and AI. My work centers on full-stack web development, REST API design and integration, authentication and security (JWT, OAuth), and SQL & NoSQL database management. I'm currently a MERN Stack Developer Intern at Dafi Labs, building full-stack web applications with MongoDB, Express.js, React.js, and Node.js — with hands-on focus on REST APIs, authentication, debugging, testing, and deployment.",

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

  /**
   * Recruiter-facing snapshot. Location is composed at render time from
   * `PERSONAL.location` so identity stays single-source
   * (`src/constants/personal.ts`).
   */
  atAGlance: [
    {
      label: "Education",
      value: "BS Computer Science (NUML)",
    },
    {
      label: "Experience",
      value: "Software Development Intern",
    },
    {
      label: "Projects",
      value: "15+ Projects",
    },
  ] satisfies AboutAtAGlanceItem[],

  whatIDo: [
    {
      title: "Full-Stack Web Development",
      description:
        "Build responsive, scalable web applications using React, Next.js, FastAPI, Node.js, PostgreSQL, and modern development practices.",
    },
    {
      title: "AI Engineering",
      description:
        "Develop AI-powered applications, intelligent automation workflows, computer vision solutions, and machine learning integrations that solve practical problems.",
    },
    {
      title: "Backend & System Design",
      description:
        "Design clean APIs, authentication systems, database architectures, and maintainable backend services with a focus on performance and scalability.",
    },
  ] satisfies AboutWhatIDoItem[],

  currentlyWorkingWith: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "FastAPI",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Git & GitHub",
    "AI APIs",
    "OpenAI SDK",
  ] as string[],

  currentlyLearning: [
    "Docker & Containerization",
    "Cloud Deployment",
    "AWS Fundamentals",
    "System Design",
    "Large Language Models (LLMs)",
    "AI Agents & Automation",
    "CI/CD Pipelines",
    "Kubernetes (later stage)",
  ] as string[],

  cta: {
    title: "Let's Build Something Meaningful",
    description:
      "I'm always interested in collaborating on impactful software projects, AI-powered solutions, and innovative web applications. Whether you're looking for a developer, collaborator, or simply want to connect, I'd be happy to hear from you.",
    primaryLabel: "View Projects",
    primaryHref: "/projects",
    secondaryLabel: "Contact Me",
    secondaryHref: "/contact",
  } satisfies AboutCta,
} as const;

export type AboutContent = typeof ABOUT_CONTENT;
