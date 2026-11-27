

# expressjs-boilerplate

A production-oriented **Express.js 5 + TypeScript** backend boilerplate. It unifies the conventions,
tooling and lessons learned from the most widely used Node/Express starter kits into a single,
strict, no-nonsense project skeleton: layered architecture, Zod validation, Prisma 7 on
PostgreSQL, OpenAPI docs, and an aggressive set of quality gates that run before every commit.

> Not a framework and not a generator — a reference structure you clone, rename and grow.

---

## Why this exists

There are dozens of Express boilerplates, and each one gets a few things right:

| Reference project                                                                                                                                                                                                                                                                                       | What it does well                                                  | Borrowed here                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| [`hagopj13/node-express-boilerplate`](https://github.com/hagopj13/node-express-boilerplate)                                                                                                                                                                                                             | Layered structure, pagination, centralized errors, API docs        | Controller / service / repository split, Swagger, pagination shape |
| [`danielfsousa/express-rest-boilerplate`](https://github.com/danielfsousa/express-rest-boilerplate)                                                                                                                                                                                                     | REST conventions, Docker, gzip, lint/test/coverage separation      | Script naming (`lint:*`, `db:*`), Docker multi-stage build         |
| [`tajbinkhan/express-authentication-boilerplate`](https://github.com/tajbinkhan/express-authentication-boilerplate)                                                                                                                                                                                     | Env var schema, secure cookies, rate limiting, RBAC readiness      | Zod-validated `env`, security var groupings in `.env.example`      |
| [`tjuandev/node-joker`](https://github.com/tjuandev/node-joker)                                                                                                                                                                                                                                         | Colocated code, modern tooling, testing-first                      | Colocated schemas per resource, Vitest-ready `tests/` dir, Biome   |
| [`bhavyajshah/nodejs-expressjs-boilerplate`](https://github.com/bhavyajshah/nodejs-expressjs-boilerplate)                                                                                                                                                                                               | Health checks, request IDs, structured error codes                 | Request-id + JSON error envelope, health-check contract            |
| [`shariarSultanFahim/fullstack-turborepo-starter-kit`](https://github.com/shariarSultanFahim/fullstack-turborepo-starter-kit)                                                                                                                                                                           | OpenAPI generated from schemas, strict TypeScript                  | Swagger served from route annotations, strict `tsconfig`           |
| [`GausAlMunirTushar/nodejs-boilerplate`](https://github.com/GausAlMunirTushar/nodejs-boilerplate)                                                                                                                                                                                                       | Husky-style hooks, commitlint, issue templates                     | Git hooks + conventional commits + branch lint                     |
| [`stressGC/ExpressJS-TypeScript-Starter-Kit`](https://github.com/stressGC/ExpressJS-TypeScript-Starter-Kit)                                                                                                                                                                                             | Express + TypeScript minimalism, winston/morgan                    | Logging middleware, `src/` layout                                  |
| [`madhums/node-express-mongoose`](https://github.com/madhums/node-express-mongoose), [`maitraysuthar/rest-api-nodejs-mongodb`](https://github.com/maitraysuthar/rest-api-nodejs-mongodb), [`kunalkapadia/express-mongoose-es6-rest-api`](https://github.com/kunalkapadia/express-mongoose-es6-rest-api) | Classic Express + MongoDB API shapes, JWT auth                     | Resource CRUD shape, JWT/throttle env slots reserved               |
| [`zoom2ashish/typescript-express-tsed-starter`](https://github.com/zoom2ashish/typescript-express-tsed-starter)                                                                                                                                                                                         | Decorator-based routing as an alternative                          | — (kept as an optional pattern, not adopted)                       |
| [Webdock — Node.js boilerplate TS/Express/Prisma](https://docs.webdock.io/how-guides/javascript-guides/nodejs-boilerplate-typescript-express-prisma/)                                                                                                                                                   | `app.ts` / `server.ts` separation, Prisma setup, validation helper | Exact `app.ts` + `server.ts` split                                 |
| [`mdfaisal.com`](https://www.mdfaisal.com/blog/create-express-typescript-boilerplate)                                                                                                                                                                                                                   | Bare-minimum Express + TS + body parser walkthrough                | Middleware bootstrap order                                         |

Everything else in this README describes **this repository as it actually is**, not the roadmap.

---

## Tech stack

| Concern                               | Choice                                                         |
| ------------------------------------- | -------------------------------------------------------------- |
| Runtime                               | Node.js `v24.21.0` (`.nvmrc`), ESM (`"type": "module"`)        |
| Framework                             | Express.js `^5.2.1`                                            |
| Language                              | TypeScript `^7`, strict + `erasableSyntaxOnly`                 |
| Database                              | PostgreSQL via Prisma `7.10` with `@prisma/adapter-pg`         |
| Validation                            | Zod `^4` (env, request body/query/params)                      |
| Documentation                         | OpenAPI 3.0 via `swagger-jsdoc` + `swagger-ui-express`         |
| Linting/formatting                    | Biome `2.5`                                                    |
| Dead-code / file-name / branch checks | Knip, ls-lint, branch-name-lint                                |
| Git hooks                             | `simple-git-hooks` + `lint-staged` + `commitlint`              |
| Packaging                             | Multi-stage Dockerfile (Node 24 Alpine) + `docker-compose.yml` |

---

## Requirements

- Node.js `v24.21.0` (or newer) — `nvm use` reads `.nvmrc`
- npm
- A PostgreSQL instance (local or Docker)

Optional: Docker + Docker Compose if you want the bundled Postgres/Redis stack.

---

## Quick start

```bash
git clone https://github.com/o01011/expressjs-boilerplate.git
cd expressjs-boilerplate
nvm use
npm install
cp .env.example .env          # fill in the values
npm run docker:compose:up     # starts Postgres (+ Redis) — optional if you have your own DB
npm run db:generate           # generate the Prisma client
npm run db:migrate:dev        # create the schema + migrations
npm run db:seed               # optional: 50 fake tasks + 10 tags
npm run start:dev             # http://localhost:3000
```

Once running:

- API base: `http://localhost:3000/api/v1`
- Interactive docs: `http://localhost:3000/api/docs`

`npm install` installs the git hooks through the `prepare` script. Run `npm run git:hook:init` if you need to write them again.

---

## Scripts

### Development

| Command              | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| `npm run start:dev`  | Run the server with `tsx watch` (hot reload)                |
| `npm run start:prod` | Run the compiled server from `dist/`                        |
| `npm run build`      | Type-check + emit to `dist/` (`tsc -p tsconfig.build.json`) |

### Database

| Command                     | Description                                              |
| --------------------------- | -------------------------------------------------------- |
| `npm run db:generate`       | Generate the Prisma client into `src/prisma/generated/`  |
| `npm run db:validate`       | Validate the Prisma schema (`POSTGRES_URL` must be set)  |
| `npm run db:migrate:dev`    | Create/apply a dev migration (interactive)               |
| `npm run db:migrate:deploy` | Apply migrations in production (runs on container start) |
| `npm run db:migrate:reset`  | Drop, re-migrate and re-seed the dev database            |
| `npm run db:push`           | Push the schema without creating a migration file        |
| `npm run db:pull`           | Introspect the database into the schema                  |
| `npm run db:seed`           | Run `src/prisma/seed.ts` (Faker-powered)                 |
| `npm run db:studio`         | Open Prisma Studio                                       |

### Quality gates

| Command                      | Description                                              |
| ---------------------------- | -------------------------------------------------------- |
| `npm run check`             | File names, Biome, types, Knip, Prisma schema, then build |
| `npm run lint:check`         | Biome lint and format check                              |
| `npm run lint:fix`           | Biome lint and format, writing safe fixes                |
| `npm run lint:types:check`   | `tsc --noEmit` for `src/` and root TypeScript configs    |
| `npm run lint:clean:check`   | Knip — unused files/exports/dependencies                 |
| `npm run lint:fs:check`      | ls-lint — kebab-case file and directory names            |
| `npm run lint:branch:check`  | branch-name-lint — enforce `feat/...`, `fix/...`, ...    |
| `npm run git:hook:init`      | Install `simple-git-hooks` from `.simple-git-hooks.json` |
| `npm run git:hook:precommit` | Branch check, then Biome on staged files                 |

### Docker

| Command                        | Description                                       |
| ------------------------------ | ------------------------------------------------- |
| `npm run docker:build`         | Build the image (`expressjs-boilerplate`)         |
| `npm run docker:compose:up`    | Start Postgres + Redis detached, waits for health |
| `npm run docker:compose:start` | Start existing containers                         |
| `npm run docker:compose:stop`  | Stop containers (10s grace)                       |
| `npm run docker:compose:down`  | Stop and remove containers                        |
| `npm run docker:compose:reset` | Stop and remove containers and named volumes      |

The image entrypoint runs `npm run db:migrate:deploy && npm run start:prod`. Its
`HEALTHCHECK` probes `GET /api/v1/health-checks`.

---

## Environment variables

`.env.example` is the single source of truth for what the app expects. `src/config/config.ts`
parses it with Zod at boot and **exits with a field-level error report** if anything is missing
or malformed — no silent defaults for credentials.

| Group                                   | Variables                                                                                                                                                                                                                                                                                             |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| App                                     | `NODE_ENV`, `APP_PORT`, `APP_HOST`, `APP_REQUEST_TIMEOUT`, `APP_NAME`, `APP_DESCRIPTION`, `APP_LOG_LEVEL`                                                                                                                                                                                             |
| Postgres                                | `POSTGRES_URL`, `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`                                                                                                                                                                                                 |
| Redis                                   | `REDIS_URL`, `REDIS_PORT`, `REDIS_HOST`, `REDIS_DATABASES`, `REDIS_PASSWORD`                                                                                                                                                                                                                          |
| Redis Insight                           | `RI_PORT`, `RI_DISABLE_ENCRYPTION`                                                                                                                                                                                                                                                                    |
| Kafka (optional, compose commented out) | `KAFKA_NODE_ID`, `KAFKA_PORT`, `KAFKA_CONTROLLER_PORT`, `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR`, `KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR`, `KAFKA_TRANSACTION_STATE_LOG_MIN_ISR`, `KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS`, `KAFKA_NUM_PARTITIONS`, `KAFKA_UI_PORT`, `KAFKA_CLUSTERS_0_NAME` |
| Auth                                    | `JWT_SECRET`, `JWT_EXPIRES_IN`                                                                                                                                                                                                                                                                        |
| Throttling                              | `THROTTLE_TTL`, `THROTTLE_LIMIT`                                                                                                                                                                                                                                                                      |
| AWS / S3                                | `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET_NAME`                                                                                                                                                                                                                      |

`.env`, `.env.prod` and all `*.local` variants are gitignored.

---

## Project structure

```
.
├── src/
│   ├── app.ts                  # Express app: middleware + routes (no listen)
│   ├── server.ts               # Bootstrap, port binding, graceful shutdown
│   ├── config/
│   │   ├── config.ts           # Zod-validated env
│   │   └── swagger.ts          # OpenAPI definition + swagger-jsdoc
│   ├── db/
│   │   └── db.ts               # PrismaClient + PrismaPg adapter
│   ├── prisma/
│   │   ├── schema.prisma       # Generator + datasource (models live in ./models)
│   │   ├── models/             # tasks.prisma, tags.prisma (split schema)
│   │   ├── migrations/         # SQL migrations
│   │   ├── generated/          # Generated client (gitignored)
│   │   └── seed.ts             # Faker seeder
│   ├── routes/                 # Express routers + @openapi annotations
│   ├── controllers/            # HTTP layer: parse → call service → shape response
│   ├── services/               # Business rules, conflict/not-found detection
│   ├── repositories/           # Prisma queries, P2025 → null mapping
│   ├── dtos/                   # Zod request schemas + inferred types
│   ├── rdos/                   # Zod response schemas
│   ├── middlewares/
│   │   ├── validation.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── not-found.middleware.ts
│   │   ├── request-id.middleware.ts
│   │   └── logger.middleware.ts
│   └── utils/
│       └── errors.util.ts      # AppError / NotFoundError / ConflictError
├── tests/                      # (reserved) unit + integration tests
├── docker-compose.yml          # Postgres 17 + Redis 8 (+ commented Kafka/RedisInsight)
├── Dockerfile                  # deps → builder → runner (non-root)
├── prisma.config.ts            # Prisma 7 config (schema dir, migrations, seed)
├── tsconfig.json               # Strict base config
├── tsconfig.build.json         # Emit config
├── tsconfig.tools.json         # Typecheck src plus root configs
├── biome.json                  # Lint + format
├── knip.config.ts              # Dead code detection
├── lint-staged.config.ts       # Pre-commit tasks
├── commitlint.config.ts        # Conventional commit rules
├── branch-name-lint.config.json
├── .simple-git-hooks.json
└── .github/workflows/check.yml # CI: generate client, npm run check, PR commit/branch lint
```

### Request lifecycle

```
HTTP request
  → express.json / urlencoded
  → requestIdMiddleware        (x-request-id: incoming or new UUID, echoed in response)
  → loggerMiddleware           (JSON access log on finish)
  → router (/api/v1/tasks)
      → validateMiddleware     (Zod: body + query + params → res.locals.validated)
      → controller             (reads validated data, calls service, shapes response)
          → service            (business rules, conflict checks)
              → repository     (Prisma)
  → notFoundHandlerMiddleware  (404 for unmatched routes)
  → errorMiddleware            (uniform error envelope)
```

`app.ts` exports a configured Express instance and `server.ts` owns the listening socket — the
app can be imported and exercised in tests without binding a port.

---

## API

Base URL: `/api/v1`

### Health

| Method | Endpoint         | Description                          |
| ------ | ---------------- | ------------------------------------ |
| `GET`  | `/health-checks` | Liveness probe. Returns `{ "data": { "status": "ok" } }` |

### Tasks

| Method   | Endpoint     | Description                                                                                                                                              |
| -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/tasks`     | List tasks. Query: `status`, `priority`, `page`, `limit` (≤100), `sortBy` (`createdAt` \| `title` \| `priority` \| `dueDate`), `order` (`asc` \| `desc`) |
| `GET`    | `/tasks/:id` | Get a task by UUID                                                                                                                                       |
| `POST`   | `/tasks`     | Create a task (unique title)                                                                                                                             |
| `PUT`    | `/tasks/:id` | Update a task                                                                                                                                            |
| `DELETE` | `/tasks/:id` | Delete a task (returns `204`)                                                                                                                            |

#### Create a task

```http
POST /api/v1/tasks
Content-Type: application/json
```

```json
{
  "title": "Write the README",
  "description": "Document the whole boilerplate",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "dueDate": "2026-11-20T09:00:00.000Z",
  "tags": ["docs", "backend"]
}
```

#### List response

```json
{
  "data": [
    {
      "id": "…",
      "title": "…",
      "status": "TODO",
      "priority": "MEDIUM",
      "tags": [{ "id": "…", "name": "backend" }]
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 50, "totalPages": 3 }
}
```

### Data model

- **Task**: `id` (uuid), `title` (varchar 255), `description?`, `status` (`TODO`/`IN_PROGRESS`/`DONE`, default `TODO`), `priority` (`LOW`/`MEDIUM`/`HIGH`, default `MEDIUM`), `dueDate?`, `createdAt`, `updatedAt`, many-to-many `tags`.
- **Tag**: `id` (uuid), `name` (unique, varchar 50), many-to-many `tasks`.
- Indexes on `status`, `priority`, `createdAt`.

Tags are `connectOrCreate`d by name on create, and fully replaced (`set: []` + connect) on update.

---

## Error handling

All errors funnel through one middleware and share one envelope:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "detals": {
      "body.title": ["Too small: expected string to have >=1 characters"]
    },
    "requestId": "b6c8…"
  }
}
```

| Situation              | Status | `code`                                                      |
| ---------------------- | ------ | ----------------------------------------------------------- |
| Zod validation failure | `400`  | `VALIDATION_ERROR` (with per-field `detals`)                |
| Route not matched      | `404`  | `NOT_FOUND`                                                 |
| Resource missing       | `404`  | `NOT_FOUND`                                                 |
| Duplicate title        | `400`  | `CONFLICT`                                                  |
| Anything unhandled     | `500`  | `INTERNAL_ERROR` (message masked, stack logged server-side) |

> **Note:** the details key is intentionally spelled `detals` in the current implementation
> (`src/middlewares/error.middleware.ts`). It is documented here as-is; renaming it is a breaking
> change for API consumers, so it should be decided deliberately.

`NotFoundError` / `ConflictError` live in `src/utils/errors.util.ts`. A `ValidationError` class is
present but currently commented out — validation errors are produced by the middleware instead.

---

## Security posture

Shipped today:

- Zod-validated configuration — the process refuses to boot on missing/invalid env.
- Request IDs (`x-request-id`) propagated into logs and error responses.
- Parameterized queries only (Prisma) — no string-built SQL.
- JSON body size limit (`10mb`) and strict TypeScript (`strict`, `noUncheckedIndexedAccess`, `erasableSyntaxOnly`).
- Secrets never committed (`.env*` gitignored; the Prisma `output` dir is gitignored).
- Docker image runs as a non-root user and installs production dependencies only.

Reserved in `.env.example` and wired for future middleware:

- `JWT_SECRET` / `JWT_EXPIRES_IN` — JWT auth (env present, middleware not yet implemented).
- `THROTTLE_TTL` / `THROTTLE_LIMIT` — rate limiting.
- `AWS_*` — S3 uploads.
- Redis + Kafka services in `docker-compose.yml` (Kafka/RedisInsight currently commented out).

Not included: `helmet`, CORS and rate-limit middleware are **not yet mounted** — add them in
`src/app.ts` when the first consumer needs them.

---

## Code quality & conventions

- **Biome** handles linting and formatting (tabs, LF, line width 150); it is the single formatter
  — Prettier is intentionally absent.
- **Strict TypeScript**: `strict`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`,
  `noPropertyAccessFromIndexSignature`, `verbatimModuleSyntax`, `erasableSyntaxOnly`.
- **Explicit `.ts` extensions** in imports (`allowImportingTsExtensions` +
  `rewriteRelativeImportExtensions`) so the same source runs under `tsx` and under `tsc` emit.
- **Kebab-case** files and folders, enforced by ls-lint (Prisma generated/migrations exempt).
- **Conventional commits**, enforced by commitlint: types `build`, `chore`, `ci`, `docs`, `feat`,
  `fix`, `perf`, `refactor`, `revert`, `test`. Scope is required and one of `api`, `config`, `db`,
  `deps`, `docker`, `scripts`. Subject and header are lowercase. A body is allowed.
- **Git-flow branches**, enforced by branch-name-lint (`feat/…`, `fix/…`, `chore/…`, `ci/…`, …).
  `main` is skipped so the default branch can be committed. `master`, `develop`, and `staging`
  are rejected.
- **Hooks** (`.simple-git-hooks.json`, installed by `prepare`): pre-commit runs the branch check
  and Biome on staged files, commit-msg runs commitlint, pre-push runs `npm run check`.
- **CI** (`.github/workflows/check.yml`) runs Prisma generate and `npm run check` on pull requests
  and on `main`. Pull requests also run branch-name-lint and commitlint. `npm run check` does not
  include the branch check, because that job also runs on `main`.

---

## Docker

`docker-compose.yml` ships Postgres 17 (Alpine) and Redis 8 with healthchecks and persistent
named volumes, plus a shared bridge network. Kafka broker/UI and RedisInsight blocks are included
but commented out.

`Dockerfile` is a three-stage build:

1. `deps` — `npm ci --ignore-scripts`
2. `builder` — generate the Prisma client, compile TypeScript
3. `runner` — production `npm ci --omit=dev`, non-root `expressjs` user, `dist/` + generated client

The container entrypoint applies migrations (`db:migrate:deploy`) and starts the compiled server.

---

## Testing

The `tests/` directory is reserved and the structure is deliberately colocated-by-resource
(in the spirit of `node-joker`). There is no test runner installed yet — the recommended setup when
you start is **Vitest + Supertest**, with `APP_REQUEST_TIMEOUT`, `POSTGRES_*` and a separate test
database configured via `.env.test`.

---

## Adding a new resource

The boilerplate is intentionally repetitive so the pattern is obvious:

1. `src/prisma/models/<name>.prisma` — model + enums, then `npm run db:generate && npm run db:migrate:dev`.
2. `src/dtos/<name>.dto.ts` — Zod schemas for create/update/get/list, export inferred types.
3. `src/rdos/<name>.rdo.ts` — Zod schemas for the response body.
4. `src/repositories/<name>.repository.ts` — Prisma calls, map `P2025` to `null`.
5. `src/services/<name>.service.ts` — business rules, throw `NotFoundError` / `ConflictError`.
6. `src/controllers/<name>.controller.ts` — read `getValidatedData(res)`, return `{ data, pagination? }`.
7. `src/routes/<name>.route.ts` — router + OpenAPI registration, mount in `src/app.ts`.

File names must stay kebab-case (ls-lint).

---

## Scripts you will actually run

```bash
npm run start:dev  # day-to-day development
npm run lint:fix   # format and lint the working tree
npm run check      # the same gates the pre-push hook runs
```

---

## Refs

- <https://github.com/shariarSultanFahim/fullstack-turborepo-starter-kit>
- <https://github.com/tajbinkhan/express-authentication-boilerplate>
- <https://github.com/zoom2ashish/typescript-express-tsed-starter>
- <https://github.com/GausAlMunirTushar/nodejs-boilerplate>
- <https://github.com/tjuandev/node-joker>
- <https://github.com/stressGC/ExpressJS-TypeScript-Starter-Kit>
- <https://github.com/hagopj13/node-express-boilerplate>
- <https://github.com/danielfsousa/express-rest-boilerplate>
- <https://github.com/madhums/node-express-mongoose>
- <https://github.com/maitraysuthar/rest-api-nodejs-mongodb>
- <https://github.com/kunalkapadia/express-mongoose-es6-rest-api>
- <https://docs.webdock.io/how-guides/javascript-guides/nodejs-boilerplate-typescript-express-prisma/>
- <https://www.mdfaisal.com/blog/create-express-typescript-boilerplate>
- <https://github.com/bhavyajshah/nodejs-expressjs-boilerplate>

https://github.com/shariarSultanFahim/fullstack-turborepo-starter-kit
https://github.com/tajbinkhan/express-authentication-boilerplate
https://github.com/zoom2ashish/typescript-express-tsed-starter
https://github.com/GausAlMunirTushar/nodejs-boilerplate
https://github.com/tjuandev/node-joker
https://github.com/stressGC/ExpressJS-TypeScript-Starter-Kit
https://github.com/hagopj13/node-express-boilerplate
https://github.com/danielfsousa/express-rest-boilerplate
https://github.com/madhums/node-express-mongoose
https://github.com/maitraysuthar/rest-api-nodejs-mongodb
https://github.com/kunalkapadia/express-mongoose-es6-rest-api
https://docs.webdock.io/how-guides/javascript-guides/nodejs-boilerplate-typescript-express-prisma
https://www.mdfaisal.com/blog/create-express-typescript-boilerplate
https://github.com/bhavyajshah/nodejs-expressjs-boilerplate

---

## License

[MIT](./LICENSE)
