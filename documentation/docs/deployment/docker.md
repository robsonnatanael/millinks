---
title: Containerization (Docker)
---

# Containerization with Docker

This guide covers how to build and manage the independent Docker image for the **MilLinks** application.

## Dockerfile Overview

The `Dockerfile` in the root of the project is a **multi-stage build** with three stages:

1.  **Builder**: Installs dependencies with `yarn --frozen-lockfile`, copies the source code, and runs `next build` to compile the production application. Public environment variables (`NEXT_PUBLIC_*`) are injected as `ARG`/`ENV` at this stage so they are embedded into the client bundle.
2.  **App Bundle**: An intermediate stage that cherry-picks only the essential build artifacts (`.next/`, `node_modules/`, `public/`, `package.json`, etc.) to create a clean bundle.
3.  **Runner**: The final, minimal runtime image. It copies the bundle, sets the timezone, configures permissions, and starts the application with `yarn start`.

## Building the Image

To build the image manually, you need to pass the required build arguments:

```bash
docker build \
  --build-arg API_CLIENT_ID=your_id \
  --build-arg API_CLIENT_SECRET=your_secret \
  --build-arg NEXT_PUBLIC_API_BASE_URL=https://your-api.com \
  --build-arg NEXT_PUBLIC_API_AUTH_URL=/auth/local \
  -t millinks .
```

## Running the Container Alone

If you want to test the container individually without other services:

```bash
docker run -p 3000:3000 millinks
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## .dockerignore

The `.dockerignore` file ensures that unnecessary directories such as `documentation/`, `skill/`, `.git/`, `node_modules/`, and `.next/` are excluded from the Docker build context, keeping the image lean and the build fast.
