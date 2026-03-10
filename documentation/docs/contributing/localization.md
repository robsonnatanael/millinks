---
title: Localization (i18n)
---

# Localization Guide (i18n)

MilLinks documentation supports multiple languages to reach a broader audience. Currently, we support **English (default)** and **Portuguese (Brazil)**.

## How i18n Works

We use the native Docusaurus i18n system. Content is split between the main `docs/` folder and the `i18n/` folder.

### Directory Structure

- **English (Source)**: `documentation/docs/*.md`
- **Portuguese (Translation)**: `documentation/i18n/pt-br/docusaurus-plugin-content-docs/current/*.md`

## Translation Workflow

When adding a new page or updating an existing one, please ensure the changes are reflected in both languages.

1.  **Draft in English**: Create or modify the file in the `docs/` directory.
2.  **Translate to Portuguese**: Create an identical file structure in the `i18n/pt-br/...` path and translate the content.
3.  **Sync Frontmatter**: Ensure that fields like `id`, `title`, and `slug` are consistent (though `title` should be translated).

## Localizing Theme Strings

Some parts of the UI (navbar, footer, button labels) are stored in JSON files.

1.  Navigate to the `documentation/` directory.
2.  Run the extraction command:
    ```bash
    yarn write-translations --locale pt-br
    ```
3.  Edit the generated JSON files in `i18n/pt-br/`:
    - `code.json`: General UI strings.
    - `docusaurus-theme-classic/navbar.json`: Navigation items.
    - `docusaurus-theme-classic/footer.json`: Footer titles and links.

## Previewing Your Changes

To verify your translations locally:

```bash
# Preview English
yarn docs:dev

# Preview Portuguese
yarn docs:dev:pt
```
