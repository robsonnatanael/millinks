---
title: Containerization (Docker)
---

# Containerization with Docker

This guide covers how to build and manage the independent Docker images for the **MilLinks** application and documentation.

## Dockerfile Overview

The `Dockerfile` in the root of the project is a **multi-stage build** containing stages for both the application and the documentation:

### App Stages

1.  **app-builder**: Installs dependencies with `yarn --frozen-lockfile` and builds the application. It uses **Docker BuildKit Secrets** to securely load environment variables during the build without leaving traces in the image history.
2.  **app**: The minimal runtime image based on Alpine. It uses the Next.js `standalone` output, sets correct permissions, and runs the application.

### Docs Stages

1.  **docs-builder**: Installs dependencies and builds the static Docusaurus site.
2.  **docs**: An Nginx-based image serving the generated static files.

## Building the Web App Image

To build the image manually and securely, we use **Docker BuildKit Secrets**. Use `--build-arg BUILD_ENV` to determine which secret the Dockerfile should load.

**Staging:**

```bash
docker build --target app -t my-org/millinks-webapp:staging \
  --build-arg BUILD_ENV=staging \
  --secret id=millinks_stg_webapp_env,src=.env.stg .
```

**Production:**

```bash
docker build --target app -t my-org/millinks-webapp:latest \
  --build-arg BUILD_ENV=production \
  --secret id=millinks_webapp_env,src=.env.prod .
```

## Creating Docker Swarm Secrets (Optional)

If you are deploying to a Docker Swarm cluster, create the secret before running the service:

**Staging:**

```bash
# Creates the secret in the Docker Swarm cluster.
docker secret create millinks_stg_webapp_env .env.stg
```

**Production:**

```bash
# Creates the secret in the Docker Swarm cluster.
docker secret create millinks_webapp_env .env.prod
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

The `.dockerignore` file ensures that unnecessary directories such as `documentation/node_modules`, `skill/`, `.git/`, `node_modules/`, and `.next/` are excluded from the Docker build context, keeping the image lean and the build fast.
