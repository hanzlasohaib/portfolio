# SEO Strategy

> Version: 1.0.0
>
> Status: Approved
>
> Last Updated: 2026-09-03
>
> Owner: Project Team
>
> Category: Architecture

---

# Goals

- Lighthouse SEO ≥ 90
- Fast indexing
- Rich previews
- Strong metadata

---

# Metadata

Every page must include

- Title
- Description
- Canonical URL
- Open Graph
- Twitter Card

---

# Sitemap

Generate automatically.

Include

- Home
- Projects
- Contact
- Blog (future)
- Journey (future)

---

# robots.txt

Allow search indexing.

Disallow admin routes.

---

# Structured Data

Use JSON-LD.

Include

- Person
- Website
- Portfolio
- Breadcrumb

---

# Images

Provide alt text.

Use optimized Next.js Image.

The tab icon is the **HS** monogram (`src/app/icon.svg`, also served from `public/favicons/icon.svg`). It follows the public nav brand. Dashboard upload of favicons remains out of V1.

---

# Performance

Optimize

- LCP
- CLS
- INP

---

# Future

Dynamic metadata for blog.

---

# Status

Approved