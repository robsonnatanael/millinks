---
id: documentation-management
title: Documentation Management
slug: /skills/documentation-management
---

# 📚 Documentation Management Skill

The **Documentation Management** skill provides a comprehensive framework to maintain, extend, and internationalize the **MilLinks** documentation. It ensures that the documentation site reflects the project's high technical quality and architectural principles.

## 🏛 Architecture & Design Principles

The documentation MUST follow these fundamental rules:

1.  **Separation of Concerns (SoC)**: 
    *   **Strategic Guides**: Focused on "Why" and "What" (concepts, patterns).
    *   **Technical Guides**: Focused on "How" (commands, configurations).
2.  **Screaming Architecture**: Folder structures must reflect features (e.g., `core-services/`, `architecture/`).
3.  **Language Parity**: Every document in English (`docs/`) MUST have a corresponding version in Portuguese (`i18n/pt-br/...`).
4.  **Premium Aesthetics**:
    *   **Colors**: Blue (`#0077b6`) and Cyan (`#00b4d8`).
    *   **Images**: Use modern, high-tech AI-generated illustrations (PNG) for features.

## 📂 Directory Structure

The documentation source is located in the `documentation/` folder:

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
5.  **Important**: For internal links, ALWAYS use relative paths to the Markdown file (e.g., `[label](./other-doc.md)`). AVOID path-based URLs (e.g., `/docs/category/doc`).

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
- [ ] Are all internal links using relative paths to `.md` files (no hardcoded URLs)?
