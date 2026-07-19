# Naming Conventions

> Version: 1.1.0
>
> Status: Approved
>
> Last Updated: 2026-07-17
>
> Owner: Project Team
>
> Category: Database

---

# Purpose

This document defines the naming conventions used throughout the project to ensure consistency across the codebase, documentation, and generated code.

---

# General Principles

- Use descriptive names.
- Avoid abbreviations unless universally understood.
- Use consistent terminology across documentation and implementation.
- One concept must have one name only.

---

# Folder Naming

Use lowercase.

Examples

```
features
shared
components
authentication
dashboard
```

---

# File Naming

Use kebab-case.

Examples

```
project-card.tsx
hero-section.tsx
contact-form.tsx
login-form.tsx
```

---

# React Components

Use PascalCase.

Examples

```
ProjectCard
HeroSection
Navbar
Footer
ContactForm
SkillCard
TimelineItem
BlogCard
ThemeToggle
```

---

# Hooks

Prefix with `use`.

Examples

```
useProjects
useTheme
useContactForm
useScrollProgress
```

---

# Services

Suffix with `Service`.

Examples

```
AuthService
EmailService
ProjectService
ContactService
```

---

# Repository Classes

Suffix with `Repository`.

Examples

```
ProjectRepository
BlogRepository
ContactRepository
```

---

# Types

Suffix with descriptive names.

Examples

```
Project
ProjectDto
ProjectResponse
ContactFormData
BlogPost
```

---

# Enums

Use PascalCase.

Examples

```
UserRole
ContactStatus
```

(`ProjectStatus` / `MessageStatus` are not V1 enums. Use `ContactStatus` for contact messages.)

---

# Database

Tables

```
snake_case
```

Examples

```
users
projects
contact_messages
blog_posts
```

Columns

```
snake_case
```

Examples

```
created_at
updated_at
display_order
repository_url
```

Prisma Models

```
PascalCase
```

Examples

```
User
Project
Blog
Journey
Contact
```

Prisma Fields

```
camelCase
```

Examples

```
createdAt
updatedAt
displayOrder
repositoryUrl
```

---

# Routes

Use lowercase with a leading slash.

Authoritative V1 inventory: `docs/project-design/project-scope.md`

Examples

```text
/
/about
/projects
/projects/[slug]
/journey
/contact
/login
/dashboard
/dashboard/projects
/dashboard/journey
/dashboard/messages
/dashboard/settings
```

---

# Constants

Use camelCase file names.

Examples

```text
navigation.ts
routes.ts
personal.ts
seo.ts
site.ts
theme.ts
```

---

# Environment Variables

Use uppercase snake_case.

**Authoritative catalog:** `docs/architecture/backend-architecture.md` § Environment Configuration

V1 examples:

```text
DATABASE_URL
DIRECT_URL
JWT_SECRET
NEXT_PUBLIC_SITE_URL
NODE_ENV
```

Do not invent additional required V1 variables here.

---

# API Endpoints

Use lowercase kebab-case.

V1 examples:

```text
/api/contact
/api/auth/login
```

Future examples (not V1):

```text
/api/blog
/api/projects
```

---

# Server Actions

Suffix with `Action`.

Examples

```text
submitContactAction
loginAction
updateProjectAction
createJourneyAction
```

---

# Validation Schemas

Suffix with `Schema`.

Examples

```text
contactFormSchema
loginSchema
projectSchema
```

---

# Validation Types

Use descriptive names.

Examples

```text
ContactFormData
LoginFormData
CreateProjectInput
UpdateProjectInput
```

---

# Interfaces

Do not prefix with `I`.

Good

```ts
Project
ContactMessage
ApiResponse
```

---

# Related Documents

This document is the single source of truth for naming conventions.

Other documentation should reference this file rather than redefining naming rules.

Examples:

- architecture/component-architecture.md
- architecture/conventions.md
- architecture/database-design.md
- ui-ux/component-guidelines.md

---

# Component Names

Always use the following names consistently.

```
HeroSection
AboutSection
JourneySection
ProjectsSection
SkillsSection
ContactSection

ProjectCard
SkillCard
JourneyCard
BlogCard

Navbar
Footer
Button
Input
Textarea
Badge
Card
Container
SectionHeading

ThemeToggle
ScrollProgressBar
```

Do not introduce aliases such as:

```
PortfolioCard
↓
ProjectCard
```

There is no Portfolio entity. Use `ProjectCard` for showcase items.

Also prefer `JourneyTimeline` / `JourneyCard` — never `ExperienceTimeline` / `ExperienceCard`.

```
HeroBanner
↓
HeroSection
```

```
TopNavigation
↓

Navbar
```

---

# Status

Approved