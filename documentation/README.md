# MilLinks Documentation

This directory contains the source code for the official **MilLinks** documentation site, built with **Docusaurus**.

## 🚀 Overview

The documentation is designed to provide comprehensive technical guides, architectural overviews, and contribution workflows for the MilLinks project. It supports internationalization (i18n), with **English** and **Portuguese (BR)** as the primary locales.

## 🛠 Tech Stack

- **Docusaurus Classic Template**: Static site generation.
- **TypeScript**: Type-safe configuration and component logic.
- **Classic Theme**: Professional and content-focused UI.
- **i18n System**: Native Docusaurus support for localized content.

## 📂 Project Structure

- `docs/`: Markdown files for English content (default).
- `i18n/pt-br/`: Localized Markdown files and translation strings for Portuguese.
- `src/`: Custom React components and pages.
- `static/`: Static assets (logo, favicon, etc.).
- `sidebars.ts`: Sidebar layout configuration.
- `docusaurus.config.ts`: Main site configuration.

## 💻 Local Development

To run the documentation server locally, it is recommended to use the scripts defined in the project root:

```bash
# Development (English) - Run from root
yarn docs:dev

# Development (Portuguese) - Run from root
yarn docs:dev:pt

# Production Build - Run from root
yarn docs:build

# Serve Production Build - Run from root
yarn docs:serve
```

Alternatively, you can run them within this directory using standard Docusaurus commands (`yarn start`, `yarn build`, etc.).

## 🌐 Localization Workflow

When adding or updating documents, please ensure that both English and Portuguese versions are kept in sync.

1. Create/Update the English file in `docs/`.
2. Create/Update the corresponding file in `i18n/pt-br/docusaurus-plugin-content-docs/current/`.
3. Use the `yarn write-translations` command within this directory to update locale-specific strings if necessary.

---

<p align="center">
  Visit the live documentation at <a href="https://millinks.robsonnatanael.com.br/millinks-doc">millinks.robsonnatanael.com.br/millinks-doc</a>
</p>
