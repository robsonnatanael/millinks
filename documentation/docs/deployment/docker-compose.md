---
title: Orchestration (Docker Compose)
---

# Orchestration with Docker Compose

Docker Compose allows you to run the complete **MilLinks** stack with a single command, orchestrating multiple containers and their respective network settings.

## The Docker Compose Config

The `docker-compose.yml` file defines how the application and its dependencies (like a database or a reverse proxy) interact.

## Commands

### Starting the Stack

To start the entire environment in the background:

```bash
docker-compose up -d
```

### Stopping the Stack

To stop and remove the containers:

```bash
docker-compose down
```

### Viewing Logs

To monitor the output from all services:

```bash
docker-compose logs -f
```

## Local vs. Production

It is recommended to use different compose files (e.g., `docker-compose.yml` and `docker-compose.prod.yml`) to manage the differences between developers' machines and real-world deployment.
