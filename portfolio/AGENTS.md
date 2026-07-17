<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


Implementation must follow the current phase defined in
docs/implementation-roadmap.md.

Do not implement work from future phases unless explicitly instructed.


Configuration Rules

Never hardcode credentials, secrets, API keys, tokens, database URLs, or other sensitive configuration in source code.

All configuration values must be loaded from environment variables.

If a required environment variable is missing, report it instead of inventing or hardcoding a value.

The canonical list of environment variables is defined in:
- `.env.example`
- `docs/architecture/backend-architecture.md`


Priority of Truth

1. AGENTS.md
2. docs/project-design/project-scope.md
3. docs/database/prisma-schema-planning.md
4. docs/architecture/routing-strategy.md
5. docs/implementation-roadmap.md

If two docs conflict:

Never merge.

Always follow the higher priority document.

Report the conflict.

Do not invent hybrid behavior.