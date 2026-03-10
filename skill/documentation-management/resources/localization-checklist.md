# i18n Localization Checklist

Before finalizing a translation, ensure the following is checked:

### 1. Frontmatter Parity
- [ ] `id` is exactly the same as the English version.
- [ ] `slug` is exactly the same as the English version (even if it's in PT, slugs are often technical links).
- [ ] `title` is translated appropriately to Portuguese.

### 2. Sidebars & Categories
- [ ] Is the category label translated in `i18n/pt-br/docusaurus-plugin-content-docs/current.json`?
- [ ] Is the hierarchy in `sidebars.ts` correctly mapped?

### 3. Links
- [ ] Check if internal links like `[Link](./target.md)` point correctly to the local Markdown file.
- [ ] DO NOT use absolute paths like `/docs/intro`.
- [ ] Check for hardcoded English URLs and ensure they are removed or translated.

### 4. Code & Technical Terms
- [ ] Do not translate constant names, variable names, or technical commands (e.g., `yarn install`).
- [ ] Do not translate "Next.js", "TypeScript", etc.
- [ ] Translate comments within code blocks if they explain logic.

### 5. Extraction
- [ ] Run `yarn write-translations --locale pt-br` inside the `documentation/` directory.
- [ ] Verify if any new strings appeared in `code.json`.
