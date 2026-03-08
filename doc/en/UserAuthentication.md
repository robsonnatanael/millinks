# User Authentication Flow

[Leia em Português](../pt-br/UserAuthentication.md) | [Back to README](./README.md)

This document describes the implementation of the user authentication system, including the login flow, form validation, and route protection.

## Overview

Unlike the `TokenService` (used for M2M communication), the user authentication flow is designed for human interaction via the web interface. It uses JWT stored in browser cookies for session management.

## Tech Stack

- **React Hook Form**: Form state management.
- **Zod**: Schema-based validation.
- **TanStack Query (React Query)**: Asynchronous state and mutation management.
- **js-cookie**: Client-side cookie manipulation.
- **Next.js Middleware (Proxy)**: Server-side route protection.

## Implementation Details

### 1. Form and Validation
The `LoginForm` component (`src/features/auth/components/login-form.tsx`) uses a validation schema defined in `src/features/auth/schemas/login-schema.ts`. This ensures that data is validated before even reaching the API.

### 2. Mutation and Service
The `useLoginMutation` hook handles the API call through the `auth-service.ts`. Upon a successful response, the JWT is stored in a cookie:

```typescript
Cookies.set(DEFAULT_VALUES.COOKIE_KEY, response.data.jwt);
```

### 3. Route Protection (Middleware)
We use a proxy pattern in `src/proxy.ts` to protect sensitive routes. Any request to `/dashboard/:path*` is intercepted:
- If no token is found in cookies, the user is redirected to `/login`.
- If the token is present, the request proceeds.

### 4. Providers
Everything is wrapped in the `QueryClientProvider` within the root layout to ensure that authentication states can be shared and cached across the application.

## Directory Structure
- `src/features/auth/components`: UI components (LoginForm).
- `src/features/auth/hooks`: Logic and API mutations.
- `src/features/auth/schemas`: Validation rules.
- `src/features/auth/services`: API request logic.
- `src/features/auth/types`: Type definitions.
