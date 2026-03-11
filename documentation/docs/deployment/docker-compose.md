---
title: Orchestration (Docker Compose)
---

# Orchestration with Docker Compose

Docker Compose allows you to run the complete **MilLinks** stack with a single command, orchestrating multiple containers and their respective network settings.

## The Docker Compose Config

The `docker-compose.yml` file defines how the application service is built, configured, and networked.

### Key Concepts

- **`env_file`**: The `.env.local` file is loaded to inject runtime environment variables into the container.
- **`args`**: Build arguments are passed to the `Dockerfile` so that public variables (like `NEXT_PUBLIC_*`) are available during the `next build` step.
- **`--env-file` flag**: When running `docker compose`, you must pass `--env-file .env.local` so that Compose can interpolate variables used in the `args` section.
- **Anonymous Volumes**: `/home/node/node_modules` and `/home/node/.next` are declared as anonymous volumes to prevent the host bind mount from overwriting the container's compiled dependencies and build output.

## Commands

### Starting the Stack

To build and start the entire environment in the background:

```bash
docker compose --env-file .env.local up -d --build
```

- **Web App**: Accessible at `http://localhost:3000`
- **Documentation**: Accessible at `http://localhost:3001`

### Stopping the Stack

To stop and remove the containers:

```bash
docker compose down
```

### Viewing Logs

To monitor the output from all services:

```bash
docker compose logs -f
```

## Local vs. Production

It is recommended to use different compose files (e.g., `docker-compose.yml` and `docker-compose.prod.yml`) to manage the differences between developers' machines and real-world deployment.
