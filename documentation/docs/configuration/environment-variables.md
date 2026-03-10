---
title: Environment Variables
---

# Configuration & Environment Variables

The **MilLinks** project utilizes environment variables to manage configurations across different environments (development, staging, production).

## Configuration File

Create an `.env.local` file in the root of the project to store your local settings.

```bash
# Template for .env.local
NEXT_PUBLIC_APP_NAME=Millinks
NEXT_PUBLIC_BASE_URL=http://localhost:3000
API_BASE_URL=https://api.example.com
API_AUTH_URL=/auth/local
API_CLIENT_ID=your_client_id
API_CLIENT_SECRET=your_client_secret
```

## Variable Categories

### Frontend Variables (Next.js Public)

Variables prefixed with `NEXT_PUBLIC_` are accessible from the browser.

- `NEXT_PUBLIC_APP_NAME`: The name of the application displayed in titles and branding.
- `NEXT_PUBLIC_BASE_URL`: The base URL of the application for generating links.

### Server-Side Variables (Secure)

These variables are only accessible from the Node.js server side.

- `API_BASE_URL`: The root URL of the backend API.
- `API_AUTH_URL`: The specific endpoint for M2M authentication.
- `API_CLIENT_ID`: The unique identifier for internal service authentication.
- `API_CLIENT_SECRET`: The secret key for internal service authentication (**Keep this secure!**).

## Best Practices

- **Never Commit Secrets**: Ensure `.env.local`, `.env.production`, and other secret-containing files are listed in your `.gitignore`.
- **Environment Separation**: Use `.env.development` for local work and `.env.production` for deployment settings.
- **Validation**: The application uses **Zod** (in `src/env.mjs` or equivalent) to validate that all required variables are present before the application starts.
