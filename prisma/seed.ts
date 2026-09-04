import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

import { SEO_DEFAULTS } from "../src/constants/seo";
import { ABOUT_CONTENT } from "../src/features/about/constants/about-content";
import { CONTACT_CONTENT } from "../src/features/contact/constants/contact-content";

/**
 * Seed — Test Admin + demo portfolio content.
 * Creates (or skips) the admin User in the database pointed at by DATABASE_URL.
 * That same admin can sign in on Vercel when production uses this database.
 *
 * Refuses to run when NODE_ENV=production (run seed locally against the DB).
 *
 * Required env (local .env for the seed script — not needed as Vercel runtime):
 * - SEED_ADMIN_EMAIL
 * - SEED_ADMIN_PASSWORD
 * Optional: SEED_ADMIN_NAME (default "Test Admin")
 */

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;
  const fullName = process.env.SEED_ADMIN_NAME?.trim() || "Test Admin";

  if (!email || !password) {
    throw new Error(
      "SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are required to seed the Test Admin.",
    );
  }

  if (password.length < 8) {
    throw new Error("SEED_ADMIN_PASSWORD must be at least 8 characters.");
  }

  const passwordHash = await hash(password, 12);

  // Projects, journey, skills, site profile, and messages are not owned by
  // User — they stay in place. Only MFA codes cascade off the old User row.

  const user = await prisma.$transaction(async (tx) => {
    const existingWithEmail = await tx.user.findUnique({ where: { email } });
    const previousAdmins = await tx.user.findMany({
      where: existingWithEmail
        ? { role: "ADMIN", id: { not: existingWithEmail.id } }
        : { role: "ADMIN" },
      select: { id: true, email: true },
    });

    const nextUser = existingWithEmail
      ? await tx.user.update({
          where: { id: existingWithEmail.id },
          data: {
            fullName,
            passwordHash,
            role: "ADMIN",
            isActive: true,
          },
        })
      : await tx.user.create({
          data: {
            fullName,
            email,
            passwordHash,
            role: "ADMIN",
            isActive: true,
          },
        });

    if (previousAdmins.length > 0) {
      await tx.user.deleteMany({
        where: { id: { in: previousAdmins.map((admin) => admin.id) } },
      });
    }

    return { nextUser, created: !existingWithEmail, previousAdmins };
  });

  if (user.created) {
    console.log(`Created admin: ${email}`);
  } else {
    console.log(`Updated admin credentials for: ${email}`);
  }

  if (user.previousAdmins.length > 0) {
    console.log(
      `Removed previous admin(s): ${user.previousAdmins.map((admin) => admin.email).join(", ")}`,
    );
  }

  return user.nextUser;
}

async function seedTechnologiesAndProjects() {
  const techNames = [
    "React",
    "Node.js",
    "Next.js",
    "MongoDB",
    "FastAPI",
    "PostgreSQL",
    "Python",
  ];

  const technologies = await Promise.all(
    techNames.map(async (name) =>
      prisma.technology.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  const byName = Object.fromEntries(technologies.map((t) => [t.name, t.id]));

  const projects = [
    {
      slug: "travel-booking-system",
      title: "Travel Booking System",
      shortDescription:
        "A full-stack travel booking platform for browsing and booking trips.",
      description:
        "A full-stack travel booking platform for browsing and booking trips.",
      liveUrl: "https://rhombix-technologies-task-3.vercel.app/",
      thumbnail: "/projects/travel-booking-system/thumbnail.webp",
      featured: true,
      published: true,
      displayOrder: 0,
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      slug: "coride-finder",
      title: "CoRide Finder",
      shortDescription: "A full-stack ride-sharing platform.",
      description: "A full-stack ride-sharing platform.",
      liveUrl: "https://corider-finder.vercel.app/",
      thumbnail: "/projects/coride-finder/thumbnail.webp",
      featured: true,
      published: true,
      displayOrder: 1,
      tech: ["React", "FastAPI", "PostgreSQL"],
    },
    {
      slug: "numl-ms",
      title: "NUML Management System (FYP)",
      shortDescription:
        "A responsive, backend-heavy Learning Management System with a local database for user data and course materials.",
      description:
        "A responsive, backend-heavy Learning Management System with a local database for user data and course materials.",
      thumbnail: "/projects/numl-ms/thumbnail.webp",
      featured: true,
      published: true,
      displayOrder: 2,
      tech: ["FastAPI", "Python", "Next.js", "PostgreSQL"],
    },
  ] as const;

  for (const project of projects) {
    const existing = await prisma.project.findUnique({
      where: { slug: project.slug },
    });
    if (existing) {
      // Backfill when unset. Do not overwrite a dashboard-managed https URL.
      const canReplaceThumbnail =
        !existing.thumbnail || existing.thumbnail.startsWith("/projects/");

      if (canReplaceThumbnail && existing.thumbnail !== project.thumbnail) {
        await prisma.project.update({
          where: { id: existing.id },
          data: { thumbnail: project.thumbnail },
        });
        console.log(`Updated thumbnail for: ${project.slug}`);
      } else {
        console.log(`Project exists: ${project.slug} — skipping.`);
      }
      continue;
    }

    await prisma.project.create({
      data: {
        slug: project.slug,
        title: project.title,
        shortDescription: project.shortDescription,
        description: project.description,
        liveUrl: "liveUrl" in project ? project.liveUrl : null,
        thumbnail: project.thumbnail,
        preview: null,
        featured: project.featured,
        published: project.published,
        displayOrder: project.displayOrder,
        technologies: {
          create: project.tech.map((name) => ({
            technologyId: byName[name],
          })),
        },
      },
    });
    console.log(`Created project: ${project.slug}`);
  }
}

async function seedJourney() {
  const entries = [
    {
      title: "MERN Stack Developer Intern",
      organization: "Dafi Labs",
      location: "Remote",
      description:
        "Developing full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js) — working with REST APIs, Git/GitHub, authentication, debugging, testing, deployment, and collaborative software development workflows.",
      startDate: new Date("2026-07-01"),
      endDate: null as Date | null,
      displayOrder: 0,
    },
    {
      title: "Software Development Intern",
      organization: "Rhombix Technologies",
      location: "Remote",
      description:
        "Contributed to full-stack web application development, REST API integration, debugging, testing, and feature implementation while collaborating with the development team using modern development tools and practices.",
      startDate: new Date("2025-08-01"),
      endDate: new Date("2025-10-31"),
      displayOrder: 1,
    },
  ];

  const count = await prisma.journey.count();
  if (count > 0) {
    console.log("Journey entries already exist — skipping.");
    return;
  }

  for (const entry of entries) {
    await prisma.journey.create({ data: entry });
    console.log(`Created journey: ${entry.title}`);
  }
}

async function seedSiteProfile() {
  const educationLabel =
    ABOUT_CONTENT.atAGlance.find((item) => item.label === "Education")?.value ??
    ABOUT_CONTENT.education.degree;
  const narrative = {
    biography: ABOUT_CONTENT.biography,
    professionalSummary: ABOUT_CONTENT.professionalSummary,
    educationDegree: ABOUT_CONTENT.education.degree,
    educationInstitution: ABOUT_CONTENT.education.institution,
    educationPeriod: ABOUT_CONTENT.education.period,
    educationLabel,
    whatIDo: ABOUT_CONTENT.whatIDo.map((item) => ({
      title: item.title,
      description: item.description,
    })),
    currentlyLearning: [...ABOUT_CONTENT.currentlyLearning],
  };

  const seoAndAvailability = {
    availability: CONTACT_CONTENT.availability,
    metaDescription: SEO_DEFAULTS.description,
    metaKeywords: [...SEO_DEFAULTS.keywords],
  };

  const existing = await prisma.siteProfile.findFirst();
  if (existing) {
    const backfill = {
      ...(existing.biography ? {} : narrative),
      ...(existing.availability
        ? {}
        : { availability: seoAndAvailability.availability }),
      ...(existing.metaDescription
        ? {}
        : { metaDescription: seoAndAvailability.metaDescription }),
      ...(existing.metaKeywords
        ? {}
        : { metaKeywords: seoAndAvailability.metaKeywords }),
    };

    if (Object.keys(backfill).length > 0) {
      await prisma.siteProfile.update({
        where: { id: existing.id },
        data: backfill,
      });
      console.log(
        `Backfilled site profile columns: ${Object.keys(backfill).join(", ")}.`,
      );
      return;
    }

    console.log("Site profile already exists — skipping.");
    return;
  }

  await prisma.siteProfile.create({
    data: {
      name: "Hanzla Sohaib",
      role: "Full Stack Software Engineer • AI Engineer",
      tagline:
        "Building scalable full-stack web applications with React, Next.js, FastAPI, Python, and AI-powered solutions.",
      email: "hanzlamaan125@gmail.com",
      location: "Lahore, Pakistan",
      resumeUrl: "/resume/Hanzla_Sohaib_Software_Engineer_Resume.pdf",
      githubUrl: "https://github.com/hanzlasohaib",
      linkedinUrl: "https://www.linkedin.com/in/hanzlasohaib",
      ...seoAndAvailability,
      ...narrative,
    },
  });
  console.log("Seeded site profile.");
}

async function seedSkills() {
  const count = await prisma.skill.count();
  if (count > 0) {
    console.log("Skills already exist — skipping.");
    return;
  }

  const groups: { category: string; names: string[] }[] = [
    { category: "Languages", names: ["Python", "JavaScript"] },
    {
      category: "Frontend",
      names: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Figma"],
    },
    {
      category: "Backend & APIs",
      names: [
        "Node.js",
        "Express.js",
        "FastAPI",
        "REST APIs",
        "JWT Authentication",
        "OAuth",
      ],
    },
    {
      category: "Databases",
      names: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
    },
    {
      category: "Tools & DevOps",
      names: [
        "Git",
        "GitHub",
        "CI/CD",
        "Postman",
        "Vercel",
        "Firebase",
        "Linux",
      ],
    },
  ];

  let order = 0;
  for (const group of groups) {
    for (const name of group.names) {
      await prisma.skill.create({
        data: {
          name,
          category: group.category,
          displayOrder: order++,
        },
      });
    }
  }
  console.log("Seeded skills.");
}

async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Refusing to run prisma seed in production. Create a real admin account outside the demo seed.",
    );
  }

  console.log("Seeding development data…");
  await seedAdmin();
  await seedTechnologiesAndProjects();
  await seedJourney();
  await seedSkills();
  await seedSiteProfile();
  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
