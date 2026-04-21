---
title: Architecture Overview
---

# Architecture Overview

This document outlines the architectural patterns and design decisions that govern the development of the **MilLinks** project.

## Technical Foundation

MilLinks is built with a focus on modern web standards and developer efficiency:

- **Next.js 16+**: Leveraging the **App Router** for improved routing, Server Components for performance, and a robust middleware system.
- **Type Safety**: Built entirely with **TypeScript**, ensuring strict typing across all layers, from UI to API interactions.
- **Modular Styles**: Use of **Material UI (MUI)** combined with **Emotion** for consistent, theme-driven styling and layout.

## Screaming Architecture (Feature-based)

The project follows the principles of **Screaming Architecture**, where the folder structure reflects the use cases and features of the application rather than the technical infrastructure.

- **Feature-based Isolation**: Each domain logic (e.g., Auth, Links) is encapsulated within its own module in `src/features`.
- **Vertical Slices**: Features contain their own relevant UI components, hooks, and logic, reducing cross-domain dependencies.

## Layering Model

Despite being feature-based, a clean separation of horizontal concerns is maintained through a clearly defined layering model:

1.  **UI Layer**: Presentation components found in `src/components` (global) and `src/features/*/components` (domain-specific).
2.  **Application Logic**: Managed via custom hooks in `src/features/*/hooks` and TanStack Query providers.
3.  **Service Layer**: Decoupled API interaction logic located in `src/services`, allowing for easy backend swaps or mocking.
4.  **Core Utilities (Lib)**: Fundamental infrastructure logic (e.g., Token management, API Client configuration) found in `src/lib`.

## Separation of Concerns (SoC)

Every component of the architecture is designed with a single responsibility:

- **State Persistence**: Handled via secure cookies and React Context.
- **Data Validation**: Enforced at the boundaries (entry and exit) using **Zod**.
- **Theming**: Isolated within `src/theme` to ensure global consistency without polluting component logic.
