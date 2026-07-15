# ADR-009: Cache Strategy and Redis Adoption

**Status:** Accepted

**Date:** 2026-07-15

---

# Context

The Portfolio application requires an efficient caching strategy to improve performance while maintaining a simple and maintainable architecture.

Several caching approaches were evaluated:

- Next.js built-in Data Cache
- ISR (Incremental Static Regeneration)
- unstable_cache()
- revalidateTag()
- revalidatePath()
- Redis (Distributed Cache)

Although Redis is a common production solution for distributed caching, introducing it at the beginning of this project would increase operational complexity without providing significant practical benefits.

The application is expected to have relatively low traffic during Version 1 and will primarily serve static portfolio content with a small authenticated administration area.

---

# Decision

The project will use **Next.js built-in caching capabilities** for Version 1.

These include:

- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- `unstable_cache()`
- `revalidateTag()`
- `revalidatePath()`

Redis will **not** be introduced during Version 1.

Instead, the backend architecture will remain **cache-provider ready**, allowing Redis to be integrated later without changing business logic or repository implementations.

Business services must depend on a cache abstraction rather than a concrete cache implementation.

---

# Rationale

This decision provides several advantages:

- Reduced infrastructure complexity
- Faster development
- Simpler deployment
- Fewer environment variables
- Lower operational cost
- Easier debugging
- Sufficient performance for expected traffic

The architecture remains extensible while avoiding premature optimization.

---

# Architectural Principles

Caching is considered an implementation detail.

Business logic must never depend on Redis directly.

Repositories must never perform caching.

The Service Layer coordinates caching responsibilities.

Current architecture:

```
Route Handler
        │
        ▼
Service Layer
        │
        ▼
Next.js Cache
        │
        ▼
Repository
        │
        ▼
Prisma
        │
        ▼
Supabase PostgreSQL
```

Future architecture:

```
Route Handler
        │
        ▼
Service Layer
        │
        ▼
Cache Provider Interface
        │
        ├──────────────┐
        ▼              ▼
Next.js Cache      Redis
        │              │
        └──────┬───────┘
               ▼
          Repository
               ▼
             Prisma
               ▼
        Supabase PostgreSQL
```

---

# When Redis Should Be Introduced

Redis should only be adopted after performance profiling demonstrates a measurable benefit.

Potential scenarios include:

- Authentication rate limiting
- API rate limiting
- Analytics aggregation
- Frequently accessed dashboard statistics
- Expensive reporting queries
- External API response caching
- Background job queues
- Scheduled tasks
- Distributed caching across multiple application instances

Redis should not be introduced solely because it is available.

---

# Consequences

## Positive

- Lower operational complexity
- Simpler architecture
- Easier onboarding
- Faster development
- Reduced maintenance
- Architecture remains extensible

## Negative

- Cache is limited to Next.js capabilities
- No distributed cache
- No centralized cache invalidation
- Advanced caching features are deferred until required

---

# Future Implementation Plan

If Redis becomes necessary:

1. Create a `CacheProvider` interface.
2. Implement a Redis cache provider.
3. Register the provider through dependency injection or a factory.
4. Update service implementations to use the abstraction.
5. No changes should be required in:
   - UI Components
   - Route Handlers
   - Repositories
   - Database layer

---

# Alternatives Considered

## Redis from Day One

Rejected.

Reason:

- Premature optimization
- Additional infrastructure
- Increased deployment complexity
- Little measurable benefit for expected workload

---

## No Caching

Rejected.

Reason:

- Next.js provides efficient built-in caching with minimal complexity.

---

# Related Documents

- docs/architecture/caching-strategy.md
- docs/architecture/backend-architecture.md
- docs/architecture/system-architecture.md
- docs/architecture/dependency-graph.md
- docs/architecture/data-flow.md

---

# Status

Accepted