# MilLinks

<div align="center">
  <img src="documentation/static/img/logo.png" alt="MilLinks Logo" width="200" />
  <h3>The Intelligent Link Hub</h3>
  <p>A high-performance, scalable link aggregation platform built with modern web technologies.</p>

[![Version](https://img.shields.io/github/package-json/v/robsonnatanael/millinks)](https://github.com/robsonnatanael/millinks)
[![Stars](https://img.shields.io/github/stars/robsonnatanael/millinks)](https://github.com/robsonnatanael/millinks/stargazers)
[![Issues](https://img.shields.io/github/issues/robsonnatanael/millinks)](https://github.com/robsonnatanael/millinks/issues)

</div>

---

## 🚀 Overview

**MilLinks** is a professional-grade link management system designed to centralize a digital presence into a single, elegant interface. Built on top of **Next.js 16+** and **TypeScript**, it leverages advanced architectural patterns to ensure speed, security, and developer productivity.

The project is designed with a **Screaming Architecture**, prioritizing domain clarity and maintainability.

Perfect for content creators, developers, and organizations looking for a customizable, self-hosted alternative to generic link services.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **UI & Styling**: [Material UI (MUI)](https://mui.com/), [Emotion](https://emotion.sh/)
- **Data Management**: [TanStack Query](https://tanstack.com/query) (v5), [Zod](https://zod.dev/)
- **Architecture**: Modular Feature-based Architecture (Screaming Architecture)
- **Infrastructure**: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)
- **Documentation**: [Docusaurus](https://docusaurus.io/) (Multi-language support)

## 🏗️ Modular Architecture

The project follows a **Feature-based Modular Structure**, separating concerns by domain. This ensures that the codebase remains maintainable as the project scales.

- `src/features`: Domain-specific components, hooks, and logic.
- `src/providers`: Application-wide context providers (MUI, React Query).
- `src/services`: Decoupled API interaction layer.
- `src/lib`: Core utilities (Auth Token Service, API Client).

## 📜 Available Scripts

The project includes several scripts to manage development, building, and documentation:

### Core Application

- `yarn dev`: Starts the Next.js development server.
- `yarn build`: Builds the application for production.
- `yarn start`: Starts the production server after building.
- `yarn lint`: Runs ESLint to check for code issues.
- `yarn release`: Triggers the semantic release process.

### Documentation

- `yarn docs:dev`: Starts the Docusaurus development server (English).
- `yarn docs:dev:pt`: Starts the Docusaurus development server (Portuguese BR).
- `yarn docs:build`: Builds the static documentation site.
- `yarn docs:serve`: Serves the built documentation site locally.

### Automation

- `yarn postinstall`: Automatically installs dependencies for the documentation project after the root dependencies are installed.

## 📖 Documentation

MilLinks includes a professional documentation site built with Docusaurus, supporting **English** and **Portuguese (BR)**.

### Accessing the Docs

To view the documentation locally, ensure you have the dependencies installed and run:

```bash
# Start the English (default) documentation server
yarn docs:dev

# Start the Portuguese documentation server
yarn docs:dev:pt
```

For more detailed guides on installation, architecture, and deployment, visit our **[Full Documentation Site](https://millinks.robsonnatanael.com.br/millinks-doc)**.

## 🐳 Deployment

MilLinks is containerized for seamless deployment using a multi-stage Docker build.

### Using Docker Compose

You can build and run both the web application and the documentation using Docker Compose:

```bash
# Build and start services in background
docker compose --env-file .env.local up -d --build
```

- **Web App**: Accessible at `http://localhost:3000`
- **Documentation**: Accessible at `http://localhost:3001`

### Using Docker Directly

To build the image manually and securely, we use **Docker BuildKit Secrets**. This prevents sensitive information from being stored in the image history.

#### 1. Build the Web App

Build the image passing the corresponding `.env` file as a secret. Use `--build-arg BUILD_ENV` to determine which secret the Dockerfile should load.

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

#### 2. Run the Container

Pass the corresponding `.env` file at runtime:

**Staging:**

```bash
docker run -dp 3000:3000 --name millinks-stg-webapp --env-file .env.stg my-org/millinks-webapp:staging
```

**Production:**

```bash
docker run -dp 3000:3000 --name millinks-webapp --env-file .env.prod my-org/millinks-webapp:latest
```

#### 3. Documentation (Optional)

To build and run the documentation server:

```bash
# Build
docker build --target docs -t my-org/millinks-docs .

# Run
docker run -dp 3001:80 --name millinks-docs my-org/millinks-docs
```

## 🤝 Contributing

We welcome technical contributions. Please read our **[Contributing Guidelines](https://millinks.robsonnatanael.com.br/millinks-doc/docs/contributing/contributing)** before submitting a Pull Request.

---

<p align="center">
  Developed with ❤️ by <a href="https://github.com/robsonnatanael">Robson Natanael</a>
</p>
