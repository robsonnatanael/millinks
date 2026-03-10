---
name: Documentation Management
description: Guidelines for building and maintaining professional, multilingual MilLinks documentation following Separation of Concerns (SoC) and Screaming Architecture.
---

# 📚 Documentation Management Skill

This skill provides a comprehensive framework for AI agents to maintain, extend, and internationalize the **MilLinks** documentation.

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

## 📂 Directory Structure

```text
documentation/
├── docs/                # English (Original Source)
├── i18n/pt-br/         # Portuguese (Translation)
│   └── docusaurus-plugin-content-docs/
│       └── current/      # Translated MD files
├── src/
│   ├── components/      # React components (e.g., HomepageFeatures)
│   └── css/             # Global styles (custom.css)
├── static/img/          # Optimized assets (logo.png, feature-images.png)
├── docusaurus.config.ts  # Main configuration
└── sidebars.ts          # Navigation structure
```

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
