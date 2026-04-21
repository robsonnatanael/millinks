# Project Structure

The project follows a modular and scalable structure, utilizing the Next.js App Router.

```shell
millinks/
│
├── public/             # Static assets (images, icons, etc.)
├── src/
│ ├── app/              # Next.js App Router (Routes and Pages)
│ ├── components/       # Global/Shared React components
│ ├── features/         # Business-labeled modules
│ ├── lib/              # Core utilities and service initializations
│ ├── providers/        # Context Providers (React Query, Theme, etc.)
│ ├── services/         # API and External Service layers
│ ├── shared/           # Shared types, constants, and hooks
│ ├── theme/            # Styling theme (Material UI)
│ └── proxy.ts          # Middleware/Proxy logic
│
├── documentation/      # Docusaurus documentation
├── Dockerfile          # Multi-stage Docker build
├── docker-compose.yml  # Service orchestration
├── package.json
└── next.config.ts
```

## Folder Description

**app**

Contains the routes, layouts, and pages using the Next.js App Router convention.

**features**

Organizes the code by domain or feature (e.g., auth, links). Each feature can have its own components, hooks, and services.

**lib**

Standard library or core logic, such as authentication token management and API client setup.

**providers**

Wraps the application with necessary contexts like TanStack Query and Material UI Theme.

**services**

Handles communication with external APIs.
