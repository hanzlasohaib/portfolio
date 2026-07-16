# Naming Conventions

> Version: 1.0.0
>
> Status: Approved
>
> Last Updated: 2026-07-16
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
ProjectStatus
MessageStatus
```

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

Use lowercase.

Examples

```
/
about
/projects
/contact
/login
/dashboard
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

---

## Environment Variables

```md
---

# Environment Variables

Use uppercase snake_case.

Examples

```text
DATABASE_URL
DIRECT_URL
JWT_SECRET
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_GITHUB_URL

---

## API Endpoints

```md
---

# API Endpoints

Use lowercase kebab-case.

Examples

```text
/api/contact
/api/projects
/api/blog
/api/auth/login
/api/dashboard/messages

---

## Server Actions

```md
---

# Server Actions

Suffix with `Action`.

Examples

```text
submitContactAction
loginAction
updateProjectAction
publishBlogAction

---

## Validation Schemas

```md
---

# Validation Schemas

Suffix with `Schema`.

Examples

```text
contactFormSchema
loginSchema
projectSchema

---

## Zod Types

```md
---

# Validation Types

Use descriptive names.

Examples

```text
ContactFormData
LoginFormData
CreateProjectInput
UpdateProjectInput

---

## Interfaces

```md
---

# Interfaces

Do not prefix with `I`.

Good

```ts
Project
ContactMessage
ApiResponse

---

## Reference in Other Documents

At the bottom add:

```md
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