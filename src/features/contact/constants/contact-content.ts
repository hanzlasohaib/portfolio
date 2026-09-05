/**
 * Feature-local Contact copy (Home Contact section + `/contact` page).
 * Identity fields (email, location, availability, social URLs) stay in
 * `SiteProfile` and are read through `getSiteProfileForUi()` — not duplicated
 * here. `availability` below is the fallback for that field.
 *
 * Documentation note: `pages.md` § Home lists "Contact CTA" only; Home was
 * intentionally expanded with a form. FAQ belongs on `/contact` (not Home).
 * The form submits to `POST /api/contact` with Zod validation and success /
 * error messaging (shipped in Phase 3). The submit control is live — not
 * “Coming Soon”.
 */

export type ContactFaqItem = {
  /** Stable key; `availability` is answered from SiteProfile at render. */
  id: string;
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

  /** Fallback only — runtime reads `SiteProfile.availability`. */
  availability: AVAILABILITY,

  formNotice:
    "I typically reply within a few days.",
  submitLabel: "Send Message",

  homeCtaLabel: "View Contact Page",
  homeCtaHref: "/contact",

  /**
   * FAQ for the dedicated `/contact` page only. Answers stay grounded in
   * known portfolio facts (availability, channels). The `availability` and
   * `location` answers are composed at render time from SiteProfile so
   * identity stays single-source; the text below is the fallback.
   */
  faqs: [
    {
      id: "channels",
      question: "How can I get in touch?",
      answer:
        "Use the contact form on this page, or reach me directly by email, LinkedIn, or GitHub — the channels are listed beside the form.",
    },
    {
      id: "availability",
      question: "Are you open to new opportunities?",
      answer: AVAILABILITY,
    },
    {
      id: "focus",
      question: "What kind of work do you focus on?",
      answer:
        "Full-stack web applications and AI-powered solutions — typically with React, Next.js, FastAPI, Python, and related modern tooling.",
    },
  ] satisfies ContactFaqItem[],
} as const;

export type ContactContent = typeof CONTACT_CONTENT;
