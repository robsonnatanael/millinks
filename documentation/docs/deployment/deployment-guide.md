---
id: deployment-guide
title: Deployment Guide
---

# Deployment Guide

The **MilLinks** project is designed to be easily deployable using modern containerization standards.

## Deployment Strategy

The recommended way to deploy is using **Docker**. This ensures that the application environment is identical across development and production, minimizing "it works on my machine" issues.

## Containerization vs. Orchestration

We separate the concerns of _building_ the application and _running_ it in a multi-service environment.

1.  **[Containerization (Docker)](./docker.md)**: Individual service images and build process.
2.  **[Orchestration (Docker Compose)](./docker-compose.md)**: Running the full stack (web, database, proxy) together.

## Best Practices for Production

- **Environment Isolation**: Always use a dedicated `.env.production` file.
- **Reverse Proxy**: It is highly recommended to use **Nginx** or **Traefik** as a reverse proxy to handle SSL (HTTPS) and load balancing.
- **Port Management**: The application defaults to port **3000** within the container.
