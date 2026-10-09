---
title: Environment Variables
---

# Configuration & Environment Variables

The **MilLinks** project utilizes environment variables to manage configurations across different environments (development, staging, production).

## Configuration File

Create an `.env.local` file in the root of the project to store your local settings. You can use `.env.example` as a starting point:

```bash
# Template for .env.local
NEXT_PUBLIC_API_AUTH_URL="/auth/local"
NEXT_PUBLIC_API_BASE_URL="https://your-api-url.com/api"
NEXT_PUBLIC_BASE_PATH=""
NEXT_PUBLIC_FARO_ENVIRONMENT_NAME="development"
NEXT_PUBLIC_FARO_APP_NAME="millinks"
NEXT_PUBLIC_FARO_COLLECTOR_URL="http://localhost:12345/collect"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

API_CLIENT_ID="your_client_id"
API_CLIENT_SECRET="your_client_secret"
```

## Variable Categories

### Frontend Variables (Next.js Public)

Variables prefixed with `NEXT_PUBLIC_` are accessible from the browser. They are embedded into the JavaScript bundle at **build time**.

- `NEXT_PUBLIC_API_BASE_URL`: The root URL of the backend API, exposed to the client.
- `NEXT_PUBLIC_API_AUTH_URL`: The specific authentication endpoint, exposed to the client.
- `NEXT_PUBLIC_BASE_PATH`: Base path for the Next.js application router.
- `NEXT_PUBLIC_FARO_ENVIRONMENT_NAME`: Observability environment name.
- `NEXT_PUBLIC_FARO_APP_NAME`: Observability application name.
- `NEXT_PUBLIC_FARO_COLLECTOR_URL`: Faro collector endpoint URL.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Google Analytics measurement ID.

### Server-Side Variables (Secure)

These variables are only accessible from the Node.js server side and are **never** exposed to the browser.

- `API_CLIENT_ID`: The unique identifier for internal service authentication.
- `API_CLIENT_SECRET`: The secret key for internal service authentication (**Keep this secure!**).

## How Variables Are Used

### In Docker

When building with Docker, the `NEXT_PUBLIC_*` variables must be passed as **build arguments** (`ARG`) because Next.js embeds them into the client bundle during `next build`. Runtime-only variables (like `API_CLIENT_ID`) are injected at runtime via an `entrypoint.sh` script or environment files.

For details, see the [Docker Compose](../deployment/docker-compose.md) documentation.

## Best Practices

- **Never Commit Secrets**: Ensure `.env.local`, `.env.production`, and other secret-containing files are listed in your `.gitignore`.
- **Environment Separation**: Use `.env.local` for local work and `.env.production` for deployment settings.
- **Use `--env-file`**: When running `docker compose`, always pass `--env-file .env.local` so that Compose can interpolate variable references (e.g., `${API_CLIENT_ID}`) in `docker-compose.yml`.
