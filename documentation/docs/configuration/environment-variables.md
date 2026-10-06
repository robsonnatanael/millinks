---
title: Environment Variables
---

# Configuration & Environment Variables

The **MilLinks** project utilizes environment variables to manage configurations across different environments (development, staging, production).

## Configuration File

Create an `.env.local` file in the root of the project to store your local settings. You can use `.env.example` as a starting point:

```bash
# Template for .env.local
TIME_ZONE="America/Fortaleza"
API_CLIENT_ID="your_client_id"
API_CLIENT_SECRET="your_client_secret"
NEXT_PUBLIC_API_AUTH_URL="/auth/local"
NEXT_PUBLIC_API_BASE_URL="https://your-api-url.com/api"
```

## Variable Categories

### Frontend Variables (Next.js Public)

Variables prefixed with `NEXT_PUBLIC_` are accessible from the browser. They are embedded into the JavaScript bundle at **build time**.

- `NEXT_PUBLIC_API_BASE_URL`: The root URL of the backend API, exposed to the client.
- `NEXT_PUBLIC_API_AUTH_URL`: The specific authentication endpoint, exposed to the client.

### Server-Side Variables (Secure)

These variables are only accessible from the Node.js server side and are **never** exposed to the browser.

- `API_CLIENT_ID`: The unique identifier for internal service authentication.
- `API_CLIENT_SECRET`: The secret key for internal service authentication (**Keep this secure!**).
- `TIME_ZONE`: The timezone used by the application (e.g., `America/Fortaleza`).

## How Variables Are Used

### In `next.config.ts`

The `next.config.ts` maps the `NEXT_PUBLIC_*` variables into the `env` property, making them accessible via `process.env` on both client and server:

```typescript
env: {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  API_AUTH_URL: process.env.NEXT_PUBLIC_API_AUTH_URL,
},
```

### In Docker

When building with Docker, the `NEXT_PUBLIC_*` variables must be passed as **build arguments** (`ARG`) because Next.js embeds them into the client bundle during `next build`. Runtime-only variables (like `API_CLIENT_ID`) are injected via the `env_file` directive in `docker-compose.yml`.

For details, see the [Docker Compose](../deployment/docker-compose.md) documentation.

## Best Practices

- **Never Commit Secrets**: Ensure `.env.local`, `.env.production`, and other secret-containing files are listed in your `.gitignore`.
- **Environment Separation**: Use `.env.local` for local work and `.env.production` for deployment settings.
- **Use `--env-file`**: When running `docker compose`, always pass `--env-file .env.local` so that Compose can interpolate variable references (e.g., `${API_CLIENT_ID}`) in `docker-compose.yml`.
