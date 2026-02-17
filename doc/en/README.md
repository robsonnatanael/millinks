# Technical Documentation - MilLinks

[Leia em Português](../pt-br/README.md) | [Back to Home](../../README.md)

This document contains the installation, configuration, and execution instructions for the MilLinks project.

## Prerequisites

Before starting, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Version specified in Dockerfile or package.json)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (Optional, for containerized execution)

---

## Installation

To run this on your machine, follow the steps below:

```bash
# Clone the repository
$ git clone https://github.com/robsonnatanael/millinks

# Enter the repository
$ cd millinks

# Install dependencies
$ yarn install

# Run the application in development mode
$ yarn dev

# Open http://localhost:3000 in your browser
```

---

## Docker Execution

You can run the application using Docker in two ways:

### 1. Using Docker Compose

```bash
# Navigate to the docker folder
$ cd .docker

# Start the container
$ docker-compose up -d --build
```

### 2. Using Docker CLI

To build the image manually from the project root:

```bash
# Build the image
$ docker build -f .docker/Dockerfile -t millinks-app .

# Run the container
$ docker run -d -p 3000:3000 --name millinks-container --env-file .env.local millinks-app
```

> **Note:** Ensure your `.env.local` file is configured in the project root before starting.

---

## Architecture and Services

- **[TokenService](./TokenService.md)**: Detailed documentation on the JWT authentication service for M2M communication.
