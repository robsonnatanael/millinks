---
title: Containerization (Docker)
---

# Containerization with Docker

This guide covers how to build and manage the independent Docker image for the **MilLinks** application.

## Dockerfile Overview

The `Dockerfile` in the root of the project is a multi-stage build that:
1.  **Install dependencies**: Environment set up with Node.js.
2.  **Build**: Compiles the Next.js application for production.
3.  **Runner**: Creates a minimal runtime image for security and speed.

## Building the Image

To build the image manually:

```bash
docker build -t millinks .
```

## Running the Container Alone

If you want to test the container individually without other services:

```bash
docker run -p 3000:3000 millinks
```

The application will be available at [http://localhost:3000](http://localhost:3000).
