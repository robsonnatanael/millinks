---
trigger: manual
---

Generate a commit message in English for the currently staged files.
Strictly follow the Conventional Commits specification.

Requirements:

- Use the format: `<type>(<scope>): <subject>`
- Allowed types: feat, fix, docs, style, refactor, perf, test, chore, build, ci
- Keep the subject concise, imperative, and lowercase (no trailing period)
- Limit each line to a maximum of 100 characters
- Add a body only if necessary, explaining the "why" (not the "what")
- Separate subject and body with a blank line
- Use bullet points in the body when listing multiple changes
- Do not include emojis

Ensure the message is clear, meaningful, and follows best practices.
