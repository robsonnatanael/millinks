---
id: observability
title: Observability
slug: /architecture/observability
---

# Observability

MilLinks incorporates a robust observability stack to ensure the performance, reliability, and health of the application can be monitored continuously. The observability strategy is built around modern, open-source standards.

## Technologies Used

- **OpenTelemetry**: Used for generating and collecting traces and metrics from the Next.js server and API routes.
- **Grafana Faro**: Used for frontend observability, capturing real user monitoring (RUM) data, errors, and web vitals directly from the browser.

## Backend Monitoring (OpenTelemetry)

We use OpenTelemetry to instrument the Next.js backend. This allows us to track incoming requests, database queries, and external API calls.

- The configuration is located in `instrumentation.ts`.
- It exports telemetry data (traces and metrics) to our configured observability backend.

## Frontend Monitoring (Grafana Faro)

For the client side, we utilize the Grafana Faro Web SDK.

- The initialization happens through the `<FaroInit />` component.
- This component is integrated into the main `layout.tsx` to ensure it loads on every page.
- Faro captures unhandled exceptions, console errors, and performance metrics, sending them back for analysis.

## Health Checks

A dedicated health check endpoint is available to verify the application's status:

- **Endpoint**: `/health`
- This endpoint is used by our deployment orchestrators (like Docker Swarm or Kubernetes) to determine if the application is running and ready to serve traffic.
