# Backend Standards

**Applies only if this project has a backend.** Check CLAUDE.md's Stack
Declaration first — a frontend-only project should never need this file.

Read this before writing any backend code. Defaults below assume FastAPI +
SQLAlchemy, matching the sibling researchpulse project — swap the stack
specifics if this project's actual backend differs; the conventions are
what's reusable, not the exact framework.

## Stack
- FastAPI + SQLAlchemy + PostgreSQL (swap for the actual stack if different)
- Pydantic for request/response schemas and settings

## Conventions
- Routers stay thin — all logic goes in services
- Never write raw SQL — use the ORM
- Route handlers and service methods should be async where the framework
  supports it
- A schema library (e.g. Pydantic) defines all request/response shapes
- External API calls go through services — never call them from routers
- Environment variables loaded via a settings/config layer, never
  hardcoded

## Testability Is a Design Constraint

Keep decision/business logic in services as pure functions of their
inputs, separate from the DB session and external HTTP calls that feed
them. A service method that interleaves "decide what to do" with
"fetch from the DB" and "call a third-party API" in one block can usually
only be tested by mocking the ORM or a live external call — slow,
brittle, and easy to get wrong. Prefer: pull the data first (or accept it
as an argument), then run the actual decision logic as something callable
and assertable on its own, with the DB/HTTP calls as thin wrappers around
it. This isn't a hard rule for every function — but if you're about to
write a test that only works by mocking three layers deep, that's a
signal the logic and the I/O should have been split before the test was
needed. Flag it to the developer rather than writing a brittle mock to
work around it.
