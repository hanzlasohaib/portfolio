# Caching Strategy

> Version: 2.0.0
>
> Status: Approved
>
> Last Updated: 2026-07-16
>
> Owner: Project Team
>
> Category: Architecture

---

# Purpose

This document defines the caching and rendering strategy for the Portfolio application.

The objectives are:

- Improve performance
- Reduce unnecessary database queries
- Optimize user experience
- Keep the architecture simple while remaining scalable
- Design the application to support a distributed cache (e.g., Redis) in the future without architectural changes

---

# Guiding Principles

1. Prefer built-in Next.js caching mechanisms before introducing external infrastructure.
2. Cache should be an implementation detail, not a business requirement.
3. Services coordinate caching; repositories never interact with caches.
4. Introduce Redis only when profiling demonstrates a measurable performance benefit.

---

# Rendering Strategy

## Landing Page

Rendering

- Static Site Generation (SSG)

Caching

- Static assets served through Vercel CDN.

---

## Projects

Public project listing and detail pages use ISR / tag revalidation.

Rendering

- Static

Caching

- Cached using Next.js Data Cache.
- Revalidated after project updates.

---

## Contact Page

Rendering

- Static

Caching

- Static page.
- Form submissions are never cached.

---

## Admin Dashboard

Rendering

- Dynamic

Caching

- No caching of authenticated or user-specific data.

---

## Authentication

Rendering

- Dynamic

Caching

- Never cache authentication responses.

---

## Future Blog

Rendering

- Incremental Static Regeneration (ISR)

Caching

- Data Cache
- Tag-based revalidation

---

## Future Journey Timeline

Rendering

- ISR

Caching

- Tag-based revalidation

---

# Next.js Caching Strategy

The application will primarily rely on Next.js built-in caching capabilities.

Preferred APIs:

- `unstable_cache()`
- `revalidateTag()`
- `revalidatePath()`

These provide efficient caching with significantly lower operational complexity than introducing a distributed cache for this application's expected scale.

---

# Cache Revalidation

Use tag-based invalidation whenever possible.

Examples

```
Projects Updated

↓

revalidateTag("projects")
```

```
Blog Updated

↓

revalidateTag("blog")
```

```
Projects Updated

↓

revalidateTag("projects")
revalidatePath("/")
```

Benefits

- Fine-grained invalidation
- Better cache utilization
- Reduced unnecessary rebuilds

---

# Fetch Cache Strategy

## Static Data

Use

```
force-cache
```

Examples

- Site / about information
- Skills
- Journey
- Public projects

---

## Frequently Updated Data

Use

```
revalidate
```

Examples

- Blog
- Journey
- Public content

---

## User-Specific Data

Use

```
no-store
```

Examples

- Dashboard
- Authentication
- Admin settings

---

# Cache Ownership

Caching responsibilities belong to the Service Layer.

```
Route Handler

↓

Service

↓

Cache (Current: Next.js)

↓

Repository

↓

Prisma

↓

Supabase
```

Repositories must never implement caching logic.

---

# Future Redis Integration

The architecture is intentionally designed to support Redis without changing business logic.

Future architecture

```
Route Handler

↓

Service

↓

Cache Provider

↓

Redis (Optional)

↓

Repository

↓

Prisma

↓

Supabase
```

The Service Layer should interact with a cache abstraction rather than a concrete Redis implementation.

---

# Redis Adoption Criteria

Redis should only be introduced when performance profiling indicates that built-in Next.js caching is insufficient.

Potential use cases include:

- Login rate limiting
- API rate limiting
- Analytics aggregation
- Frequently accessed dashboard statistics
- Expensive reporting queries
- External API response caching
- Background job coordination
- Queue management

Redis should **not** be added solely because it is available.

---

# Current Decision

Redis is intentionally excluded from Version 1.

Reasons

- Low expected traffic
- PostgreSQL performance is sufficient
- Reduced operational complexity
- Fewer deployment dependencies
- Simpler maintenance
- Faster development

The current architecture remains fully compatible with future Redis integration.

---

# Cache Invalidation Principles

Always invalidate after successful mutations.

Examples

- Updating portfolio information
- Publishing a blog post
- Editing projects
- Updating journey entries

Prefer:

- `revalidateTag()`

Use:

- `revalidatePath()`

only when page-level invalidation is required.

---

# Monitoring

Future cache metrics may include:

- Cache hit ratio
- Cache miss ratio
- Revalidation frequency
- Slow query detection
- Database query count

These metrics will guide the decision of whether Redis becomes necessary.

---

# Summary

Current Implementation

- Next.js Data Cache
- Static Rendering
- ISR
- unstable_cache()
- revalidateTag()
- revalidatePath()

Future Ready

- Redis
- Cache abstraction
- Distributed caching
- Advanced rate limiting
- Analytics caching

---

# Status

Approved