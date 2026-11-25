# AGENTS.md

## Stack

- pnpm workspace with four projects: `backend`, `frontend`, `shared`, and the root.
- Backend: Node.js + Express 5 + TypeScript (ESM), `tsx` for development, `tsup` for builds.
- Frontend: React 19 + Vite + TypeScript.
- Shared: Zod schemas and API contracts consumed by both sides.
- Zod is pinned to **4.6.7** through the pnpm catalog. The backend, frontend, and shared packages must always resolve to the same Zod version.
- TypeScript is strict. Do not use `any`; prefer `unknown` plus narrowing.

## Commands

Run commands from the repository root.

```bash
pnpm install
pnpm dev:backend
pnpm dev:frontend
pnpm typecheck
pnpm build
```

Package-specific commands:

```bash
pnpm --filter @zheta/backend dev
pnpm --filter @zheta/backend typecheck
pnpm --filter @zheta/backend build
pnpm --filter @zheta/shared typecheck
```

- Use pnpm only. Do not add `package-lock.json`, `yarn.lock`, or install packages with npm/yarn.
- Never update Zod in only one package. Change the version in the root `pnpm-workspace.yaml` catalog and run `pnpm install`.

## Repository layout

```
backend/src/
  config/         # environment and app configuration
  controllers/    # HTTP layer
  services/       # business logic
  routes/         # Express route wiring
  middleware/     # cross-cutting request/error handling
  utils/          # small reusable helpers
  types/          # backend-only types
  templates/      # copy-paste templates, never compiled
  index.ts        # app + HTTP server bootstrap

shared/src/
  schemas/        # Zod schemas and z.infer types
  api/            # request/response contracts and response helpers

frontend/src/     # React application
```

### Request flow

```
route -> middleware -> controller -> service -> (other services / data access)
```

- Routes only wire methods, paths, and middleware to controllers.
- Controllers are thin: validate input, call services, return a shared response.
- Services contain business logic and never receive or return Express `Request`/`Response` objects.
- Middleware handles cross-cutting concerns and forwards errors.
- `config/env.ts` validates environment variables at startup.
- Cross-boundary types and schemas belong in `shared`, not in `backend/src/types`.

## Domain folder rule

Controllers and services are grouped by category/domain:

```
backend/src/controllers/<category>/<file>.ts
backend/src/services/<category>/<service>.ts
```

- Category names are singular, lowercase, and camelCase when multiword: `health`, `user`, `studyPlan`.
- **Small domain:** keep one controller file and one `service.ts` per category.
  - `controllers/health/healthController.ts`
  - `services/health/service.ts`
- **God file:** if a file has multiple unrelated actions, exceeds roughly 150-200 lines, or mixes responsibilities, split it by action or responsibility.
  - `controllers/user/createUser.ts`, `controllers/user/updateUser.ts`
  - `services/user/createUser.ts`, `services/user/getUser.ts`
- If a domain is small and a single file cleanly uses all its services/controllers, keep it as one file. Do not create empty layers or one-line files without a reason.
- A shared `service.ts` is acceptable for a small domain; split only when it stops being cohesive.

## Templates

`backend/src/templates/` contains copy-paste starting points:

- `controller.template.ts`
- `service.template.ts`
- `route.template.ts`

Rules:

- Templates are **stale examples**, not application code.
- They are excluded from TypeScript checking via `backend/tsconfig.json` (`exclude: ["src/templates"]`) and are not `tsup` entry points.
- Never import from `src/templates`, and never register template routes in the app.
- Copy a template into its destination, rename it using the project naming rules, and replace all placeholder types/imports.
- Do not "fix" templates to match a specific category; keep them generic.

## Imports and aliases

- Backend and frontend can import the shared package directly through the `@shared` alias:
  - `@shared` -> `shared/src/index.ts`
  - `@shared/*` -> `shared/src/*`
- Prefer:
  ```ts
  import { healthQuerySchema, success, type HealthResponse } from "@shared";
  import { healthQuerySchema } from "@shared/schemas/health.schema";
  ```
- The backend alias is configured in `backend/tsconfig.json`; the frontend alias is configured in `frontend/tsconfig.app.json` and `frontend/vite.config.ts`.
- Use `import type` for type-only imports (`verbatimModuleSyntax` is enabled).
- Use relative imports inside a package, and never reach into another package's internals with `../../shared/...`; use `@shared`.
- Prefix Node built-ins with `node:` (e.g. `node:http`).

## Shared response contract

Every JSON response, including controller responses and errors, must follow:

```ts
{
  status: "success" | "error" | "not_found",
  data: T | JSON
}
```

Use the helpers from `@shared`:

```ts
success(data)          // { status: "success", data }
error(data)            // { status: "error", data }
notFound(data)         // { status: "not_found", data }
custom(status, data)   // custom status value
```

- Controllers must return `success(...)` through a typed `Response<ApiResponse<T>>`.
- The central error middleware returns `error(...)`.
- The 404 middleware returns `notFound(...)`.
- Set the HTTP status with `res.status(...)`; the envelope `status` field is separate from the HTTP status code.
- Do not return bare objects, raw `{ message }` payloads, or provider-specific error shapes.
- Error payload shape is `{ message: string, details?: unknown }`.

## Schemas and API contracts

- Zod schemas live in `shared/src/schemas/<category>.schema.ts`.
- Request types and response types live in `shared/src/api/<category>.api.ts`.
- Request types must be inferred from Zod schemas:

  ```ts
  export type HealthRequest = z.infer<typeof healthQuerySchema>;
  ```

- Response types must use the shared envelope:

  ```ts
  export type HealthResponse = ApiResponse<HealthData>;
  ```

- Export new schemas/types from the relevant `index.ts` barrels.
- Validate all external input (body, query, params) with the shared schemas before using it. Do not trust `req.body`, `req.query`, or `req.params`.
- Use `HttpError` (or `next(error)`) for expected HTTP failures. Express 5 forwards rejected promises to the error middleware automatically.

## Naming convention (Airbnb-based)

- `camelCase`: variables, functions, parameters, object properties, local constants, schema identifiers.
- `PascalCase`: classes, type aliases, interfaces, enums, React components.
- `UPPER_SNAKE_CASE`: exported immutable constants and module-level constant maps (e.g. `STATUS`, `SERVICE_NAME`).
- Boolean names read as predicates: `isReady`, `hasAccess`, `shouldRetry`, `canEdit`.
- No leading/trailing underscores and no dunder names. Avoid single-letter names except short loop indices.
- Names must be descriptive and pronounceable; do not abbreviate domain terms inconsistently.
- File names are camelCase with a role suffix: `healthController.ts`, `healthRoutes.ts`, `httpError.ts`, `requestLoggerMiddleware.ts`.
- Domain folders are singular and lowercase: `controllers/health/`, `services/health/`.
- Schema identifiers use a `Schema` suffix: `healthQuerySchema`. Inferred types drop it and use PascalCase: `HealthQuery`.
- Tool configuration files keep their required names (`tsup.config.ts`, `vite.config.ts`, `eslint.config.js`).
- Template files use the `.template.ts` suffix because they are not part of the build.
- API paths use kebab-case; use plural nouns for resource collections.

## Other constraints

- Backend modules use named exports. Do not add default exports unless a tool requires one.
- Keep one responsibility per file. Split files before they become god files.
- Do not duplicate response wrappers, schema shapes, or status strings; import them from `@shared`.
- Do not commit `.env`. Keep `backend/.env.example` updated with every required variable.
- Backend output goes to `backend/dist` and is built by `tsup`; never edit generated files.
- `shared` is consumed as TypeScript source. Do not add a build step or import from `shared/dist`.
- Keep comments useful and sparse. Explain why, not what.
- Before finishing a change, run `pnpm typecheck` (and `pnpm build` when changing build/runtime wiring).
