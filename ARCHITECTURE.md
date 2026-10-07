# Express app structure

The starter intentionally contains infrastructure and health endpoints only. Add business behavior when its requirements are known; do not keep placeholder authentication, data-access, or domain code in the starter.

```text
src/
├── config/          # Parse and validate environment variables
├── lib/             # Shared infrastructure such as logging and application errors
├── middleware/      # Express middleware shared across routes
├── routes/          # Route modules and top-level route registration
├── app.ts           # Build an Express app without listening
└── index.ts         # Start the HTTP server
```

## Adding a feature

Group feature code by domain under `src/modules/<feature>/`. Keep HTTP concerns in route/controller files, request schemas close to the route that uses them, and business logic in a service only when there is meaningful logic to separate. Add a repository only when the feature needs data persistence.

Use Zod to validate external input and derive TypeScript types from the same schemas. Keep `strict` TypeScript checks enabled; avoid `any`, unchecked request casts, and duplicate handwritten input types. Propagate async route errors to the central error handler (Express 5 forwards rejected handler promises automatically).

Register new routers in `src/routes/index.ts`. Keep `createApp()` free of process startup so it can be exercised directly in tests; server lifecycle belongs in `src/index.ts`.
