---
name: Documentation Management
description: Guidelines for building and maintaining professional, multilingual MilLinks documentation following Separation of Concerns (SoC) and Screaming Architecture.
---

# 📚 Documentation Management Skill

This skill provides a comprehensive framework for AI agents to maintain, extend, and internationalize the **MilLinks** documentation.

## 📍 Documentation Location

The **entire documentation** for the MilLinks project lives inside the main repository at:

```
<project-root>/documentation/
```

Where `<project-root>` is the root of the `millinks` workspace. This is a **Docusaurus** project with multi-language support (English and Portuguese).

> **IMPORTANT**: When the user asks to "update the documentation", this is the directory you must look at. It is NOT a separate repository — it is a subdirectory inside the main Next.js project.

## 📂 Directory Structure

```text
documentation/
├── docs/                         # English (Original Source)
│   ├── architecture/             # Architecture overview and project structure
│   ├── configuration/            # Environment variables, AI agents config
│   ├── contributing/             # How to contribute and localize
│   ├── core-services/            # Token service, authentication docs
│   ├── deployment/               # Docker, Docker Compose, deployment guide
│   ├── getting-started/          # Installation and running locally
│   ├── skills/                   # Skills documentation
│   ├── intro.md                  # Main introduction page
│   └── project-info.md           # Project information
├── i18n/pt-br/                   # Portuguese (Translation)
│   ├── code.json                 # UI string translations
│   ├── docusaurus-plugin-content-docs/
│   │   ├── current/              # Translated MD files (mirrors docs/ structure)
│   │   └── current.json          # Sidebar label translations
│   └── docusaurus-theme-classic/ # Theme translations
├── src/
│   ├── components/               # React components (e.g., HomepageFeatures)
│   └── css/                      # Global styles (custom.css)
├── static/img/                   # Optimized assets (logo.png, feature-images.png)
├── docusaurus.config.ts          # Main configuration
├── sidebars.ts                   # Navigation structure
├── package.json                  # Docusaurus dependencies (separate from main app)
└── tsconfig.json                 # TypeScript config for Docusaurus
```

### Key Files to Know

| Purpose | English (Source) | Portuguese (Translation) |
| :--- | :--- | :--- |
| Docker | `docs/deployment/docker.md` | `i18n/pt-br/.../current/deployment/docker.md` |
| Docker Compose | `docs/deployment/docker-compose.md` | `i18n/pt-br/.../current/deployment/docker-compose.md` |
| Deployment Guide | `docs/deployment/deployment-guide.md` | `i18n/pt-br/.../current/deployment/deployment-guide.md` |
| Env Variables | `docs/configuration/environment-variables.md` | `i18n/pt-br/.../current/configuration/environment-variables.md` |
| Project Structure | `docs/architecture/project-structure.md` | `i18n/pt-br/.../current/architecture/project-structure.md` |
| Agents Config | `docs/configuration/agents.md` | `i18n/pt-br/.../current/configuration/agents.md` |
| Installation | `docs/getting-started/installation.md` | `i18n/pt-br/.../current/getting-started/installation.md` |
| Running Locally | `docs/getting-started/running-locally.md` | `i18n/pt-br/.../current/getting-started/running-locally.md` |

> The `i18n/pt-br/...` path abbreviates `i18n/pt-br/docusaurus-plugin-content-docs/`.

## 🏛 Architecture & Design Principles

The documentation MUST reflect the project's high technical quality.

1.  **Separation of Concerns (SoC)**: 
    *   **Strategic Guides**: Files like `overview.md` or `deployment-guide.md` should focus on "Why" and "What" (concepts, patterns).
    *   **Technical Guides**: Files like `docker.md` or `installation.md` should focus on "How" (commands, configurations).
2.  **Screaming Architecture**: Folder structures must reflect features (e.g., `core-services/`, `architecture/`).
3.  **Language Parity**: Every document in English (`docs/`) MUST have a corresponding version in Portuguese (`i18n/pt-br/...`).
4.  **Premium Aesthetics**:
    *   Colors: Blue (#0077b6) and Cyan (#00b4d8).
    *   Images: Use modern, high-tech AI-generated illustrations (PNG) for features.

## ⚠️ Important: Isolation from Next.js

The `documentation/` and `skill/` directories are **excluded** from the Next.js build pipeline:

- **`tsconfig.json`** (root): Both `documentation` and `skill` are listed in the `exclude` array to prevent the Next.js TypeScript compiler from trying to validate Docusaurus files.
- **`.dockerignore`**: Both directories are excluded from the Docker build context to keep images lean and avoid build errors.

If new top-level directories with `.ts`/`.tsx` files are added in the future, they must also be excluded from these files.

## 🔄 Lifecycle Workflows

### 1. Adding New Content
1.  Add the English Markdown file in `documentation/docs/<domain>/<filename>.md`.
2.  Add the Portuguese translation in `documentation/i18n/pt-br/docusaurus-plugin-content-docs/current/<domain>/<filename>.md`.
3.  Ensure BOTH files have consistent **id**, **title**, and **slug** in the frontmatter.
4.  Update `documentation/sidebars.ts` to include the new path.
5.  **Important**: For internal links, ALWAYS use relative paths to the Markdown file (e.g., `[label](./other-doc.md)` or `[label](../category/doc.md)`). AVOID path-based URLs (e.g., `/docs/category/doc`) as they break during build and i18n resolution.

### 2. Sidebar Maintenance
*   The sidebar uses manual mapping.
*   Always group related items into categories.
*   If a category is added, extract translations using:
    ```bash
    cd documentation && yarn write-translations --locale pt-br
    ```

### 3. Localization (i18n)
*   Translate UI strings in `documentation/i18n/pt-br/code.json`.
*   Translate sidebar labels in `documentation/i18n/pt-br/docusaurus-plugin-content-docs/current.json`.

## 🛠 Required Commands

| Task | Command |
| :--- | :--- |
| **Run EN Docs** | `yarn docs:dev` |
| **Run PT Docs** | `yarn docs:dev:pt` |
| **Build Docs** | `yarn docs:build` |
| **Extract i18n** | `cd documentation && yarn write-translations --locale pt-br` |

## 🧪 Validation Checklist
- [ ] Is the content English first, then Portuguese?
- [ ] Is there a clear separation between conceptual and technical content?
- [ ] Does the sidebar reflect the new structure?
- [ ] Are translation keys updated in `current.json` for new categories?
- [ ] Do images follow the project's modern tech aesthetic?
- [ ] Is the "live documentation" link AVOIDED inside internal docs (it belongs to README/Intro only)?
- [ ] Are all internal links using relative paths to `.md` files (no hardcoded URLs)?

## 📝 Example Frontmatter
```markdown
---
id: my-service
title: My Service Name
slug: /my-service
---
```
