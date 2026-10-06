---
title: AI Agents Configuration
---

# AGENTS.md

The `AGENTS.md` file is a configuration file located at the root of the project that defines rules and guidelines for AI coding assistants working in this repository.

## Purpose

The primary goal of this file is to ensure that AI agents behave appropriately and have the right context and knowledge when they assist with the project's codebase.

## Defined Rules

### Next.js Rules

One of the active rules dictates that before any work related to Next.js, the AI agent must read the official, up-to-date documentation stored locally in the `node_modules/next/dist/docs/` directory.

Since AI models are trained on historical data, this ensures that the agent follows the absolute latest guidelines from the framework during implementation, thus avoiding deprecated approaches or "hallucinations" about Next.js features.
