---
id: overview
title: Overview
slug: /skills/overview
---

# 🛠 Project AI Skills

**MilLinks** uses a specialized "Skills" system to codify project knowledge, architectural patterns, and development workflows. These skills are designed to assist both human developers and AI agents in maintaining the high technical standards of the project.

## What are Skills?

In the context of this project, a **Skill** is a structured set of instructions, guidelines, and resources located in the `skill/` directory. Each skill focuses on a specific domain of the application, such as documentation management, API development, or UI styling.

## Why use Skills?

- **Consistency**: Ensures that all contributors (human or AI) follow the same architectural patterns (e.g., Screaming Architecture, SoC).
- **Efficiency**: Provides quick access to common commands, workflows, and checklists.
- **AI-Ready**: Designed to be easily parsed and followed by AI coding assistants, ensuring they act as expert collaborators.

## Available Skills

Currently, the following skills are available:

- **[Documentation Management](./documentation-management.md)**: Guidelines for maintaining and internationalizing the MilLinks documentation.

## How to use Skills

Each skill is located in its own subdirectory within the `skill/` folder. A skill consists of:

- `SKILL.md`: The main entry point with rules, workflows, and commands.
- `resources/`: (Optional) Templates, checklists, or static assets.
- `examples/`: (Optional) Hands-on examples of the skill in action.

Developers (and AI agents) should read the relevant `SKILL.md` before starting work on a specific feature or domain.
