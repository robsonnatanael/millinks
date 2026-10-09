---
title: Containerization (Docker)
---

# Containerization with Docker

This guide covers how to build and manage the independent Docker images for the **MilLinks** application and documentation.

## Dockerfile Overview

The `Dockerfile` in the root of the project is a **multi-stage build** containing stages for both the application and the documentation:

### App Stages

1.  **app-builder**: Installs dependencies with `yarn --frozen-lockfile` and builds the application. It loads `NEXT_PUBLIC_*` variables as `ARG` during the build.
2.  **app**: The minimal runtime image based on Alpine. It uses the Next.js `standalone` output, sets correct permissions, and uses an `entrypoint.sh` script to load environment variables securely at runtime.

### Docs Stages

1.  **docs-builder**: Installs dependencies and builds the static Docusaurus site.
2.  **docs**: An Nginx-based image serving the generated static files.

## Building the Web App Image

To build the image manually, you pass the required `NEXT_PUBLIC_*` variables as build arguments:

**Production Build:**

```bash
docker build --target app -t my-org/millinks-webapp:latest \
  --build-arg NEXT_PUBLIC_API_BASE_URL=https://api.millinks.com \
  --build-arg NEXT_PUBLIC_API_AUTH_URL=/auth/local \
  .
```

## Running the Web App Container

Pass the corresponding `.env` file at runtime:

**Staging:**

```bash
docker run -dp 3000:3000 --name millinks-stg-webapp --env-file .env.stg my-org/millinks-webapp:staging
```

**Production:**

```bash
docker run -dp 3000:3000 --name millinks-webapp --env-file .env.prod my-org/millinks-webapp:latest
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building and Running the Documentation Image

To build and run the documentation server independently:

```bash
# Build
docker build --target docs -t my-org/millinks-docs .

# Run
docker run -dp 8080:8080 --name millinks-docs my-org/millinks-docs
```

The documentation will be available at [http://localhost:8080](http://localhost:8080).

## .dockerignore

The `.dockerignore` file ensures that unnecessary directories such as `documentation/node_modules`, `.agents/`, `.git/`, `node_modules/`, and `.next/` are excluded from the Docker build context, keeping the image lean and the build fast.
