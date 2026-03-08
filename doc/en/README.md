# Technical Documentation - MilLinks

[Leia em Português](../pt-br/README.md) | [Back to Home](../../README.md)

This document contains the installation, configuration, and execution instructions for the MilLinks project.

## Prerequisites

Before starting, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v24.13.0 or higher)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (Optional, for containerized execution)

---

## Installation

To run this project on your local machine, follow the steps below:

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

## Configuration

Before running the application, create a `.env.local` file in the root directory and configure the following environment variables:

```env
API_BASE_URL=https://api.example.com
API_AUTH_URL=/auth/local
```

---

## Docker Execution

Before starting your services, ensure the required external network has been created. If not, run the following command:

```bash
$ docker network create --driver overlay --attachable traefik_traefik_proxy
```

You can run the application using Docker in two ways:

### 1. Using Docker Compose

To start the application:

```bash
# Navigate to the docker directory
$ cd .docker

# Initialize services
$ docker-compose up -d --build
```

### 2. Using Docker CLI

To build the image manually from the project root:

```bash
# Build the image
$ docker build -f .docker/Dockerfile -t robsonnatanael/millinks-webapp:dev .

# Run the container
$ docker run -d -p 3000:3000 --name millinks_webapp --env-file .env.local --network traefik_traefik_proxy robsonnatanael/millinks-webapp:dev
```

> **Note:** Ensure your `.env.local` file is configured in the project root before starting.

---

## Architecture and Features

- **Authentication**: Complete login flow using JWT, React Hook Form, and Zod. ([See Documentation](./UserAuthentication.md))
- **Route Protection**: Middleware-based redirection for protected routes like `/dashboard`.
- **State Management**: TanStack Query (React Query) for efficient data fetching and caching.
- **API Client**: Axios-based client for consistent service communication.
- **[TokenService](./TokenService.md)**: Detailed documentation on the JWT authentication service for M2M communication.

