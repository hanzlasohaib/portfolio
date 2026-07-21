/**
 * Feature-local Contact copy (Home Contact section + `/contact` page).
 * Identity fields (email, location, social URLs) stay in
 * `constants/personal.ts` / `constants/social-links.ts` — not duplicated here.
 *
 * Documentation note: `pages.md` § Home lists "Contact CTA" only; Home was
 * intentionally expanded with a frontend-only form. FAQ belongs on `/contact`
 * (not Home). Success messaging + Zod/API submission ship with Phase 3 backend;
 * the form submit control remains "Coming Soon" until then.
 */

export type ContactFaqItem = {
  question: string;
  answer: string;
};

const AVAILABILITY =
  "Open to collaborations and full-stack / AI opportunities" as const;

export const CONTACT_CONTENT = {
  heading: "Contact",
  introduction:
    "Have a project in mind, a collaboration idea, or just want to say hello? Send a message or reach out through any of the channels below.",

  pageHeading: "Get In Touch",
  pageIntroduction:
    "Whether you're hiring, collaborating, or just connecting — I'd love to hear from you. Use the form below or reach me through email and social links.",

  availability: AVAILABILITY,

  formNotice:
    "Message sending is coming soon. You can still reach me by email or social links in the meantime.",
  submitLabel: "Coming Soon",

  homeCtaLabel: "View Contact Page",
  homeCtaHref: "/contact",

  /**
   * FAQ for the dedicated `/contact` page only. Answers stay grounded in
   * known portfolio facts (availability, channels) — location is composed
   * at render time from `PERSONAL` so identity stays single-source.
   */
  faqs: [
    {
      question: "How can I get in touch?",
      answer:
        "Use the contact form on this page, or reach me directly by email, LinkedIn, or GitHub — the channels are listed beside the form.",
    },
    {
      question: "Are you open to new opportunities?",
      answer: AVAILABILITY,
    },
    {
      question: "What kind of work do you focus on?",
      answer:
        "Full-stack web applications and AI-powered solutions — typically with React, Next.js, FastAPI, Python, and related modern tooling.",
    },
  ] satisfies ContactFaqItem[],
} as const;

export type ContactContent = typeof CONTACT_CONTENT;
