# Zheta

Monorepo for the Zheta backend, frontend, and shared API contracts.

## Local development

```bash
cp backend/.env.example backend/.env
pnpm install
pnpm dev:backend
pnpm dev:frontend
```

- Backend: http://localhost:3000/api/health
- Frontend: http://localhost:5173
- Shared: Zod schemas and API types in `shared/`

## Docker stack

The stack includes the backend, frontend, LiteLLM, and Piston.

```bash
cp .env.example .env
pnpm docker:build
pnpm docker:up
```

| Service | URL | Purpose |
| --- | --- | --- |
| frontend | http://localhost:8080 | Nginx serving the built SPA |
| backend | http://localhost:3000 | Express API |
| litellm | http://localhost:4000 | OpenAI-compatible model gateway |
| piston | http://localhost:2000 | Code execution API |

The frontend proxies `/api/*` to the backend, so both can be reached through
http://localhost:8080.

Useful commands:

```bash
pnpm docker:logs
pnpm docker:down
docker compose ps
```

### Exporting the images

`pnpm docker:export` saves the backend and frontend images to
`dist/images/zheta-images.tar.gz`:

```bash
pnpm docker:export
docker load -i dist/images/zheta-images.tar.gz
```

The exported images are tagged `zheta-backend:latest` and
`zheta-frontend:latest`.

### LiteLLM

Edit `litellm/config.yaml` to add, remove, or group models under `model_list`.
API keys and the master key are read from the root `.env` file:

```bash
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
GEMINI_API_KEY=...
DEEPSEEK_API_KEY=...
LITELLM_MASTER_KEY=sk-zheta-local
```

After editing either file, restart the gateway:

```bash
docker compose restart litellm
```

Clients use the OpenAI-compatible endpoint at `http://localhost:4000/v1` with
the configured model name:

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Authorization: Bearer $LITELLM_MASTER_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"Hello"}]}'
```

### Piston

Piston starts with the stack, but its runtimes live in a volume and must be
installed once. The `piston-bootstrap` service does this automatically for
`python`, `node`, and `typescript`:

```bash
docker compose logs -f piston-bootstrap
```

To install different or additional packages, set the list in the root `.env`
and recreate the service:

```bash
PISTON_PACKAGES="python node typescript gcc java"
docker compose up -d piston-bootstrap
```

Check the installed runtimes with:

```bash
curl http://localhost:2000/api/v2/runtimes
```
