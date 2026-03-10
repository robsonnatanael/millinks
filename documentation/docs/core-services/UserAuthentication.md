---
title: User Authentication
---

# User Authentication Flow

This document describes the implementation of the user authentication system, including the login flow, form validation, and route protection.

## Overview

Authentication is based on JWT (JSON Web Token). The system uses the Next.js App Router and manages the authentication state securely, utilizing cookies for token persistence.

## Key Components

### 1. Login Form (`LoginForm.tsx`)

`LoginForm` is the entry point for user authentication.

-   **Validation**: Uses the `zod` library for robust validation of fields (email and password) on the client side.
-   **State Management**: Uses `react-hook-form` to manage form state and error messages.
-   **Visual Feedback**: Displays loading states and user-friendly error messages if login fails.

### 2. Authentication Logic (`useAuth.ts`)

The `useAuth` custom hook centralizes the authentication logic.

-   **Login**: Sends credentials to our API's authentication route.
-   **Persistence**: Upon successful login, the received JWT is stored in a secure cookie (`auth_token`).
-   **Logout**: Removes the authentication cookie and redirects the user to the login page.

### 3. Route Protection (`proxy.ts`)

Security is enforced at the server level via Next.js Proxy.

-   **Interception**: Every request to internal pages (e.g., `/dashboard`, `/links`) is intercepted.
-   **Verification**: The proxy checks for the presence and validity of the `auth_token` cookie.
-   **Redirection**: If the user is not authenticated, they are automatically redirected to the `/login` page.

## Login Flow (Step by Step)

1.  The user fills out the form at `/login` with their identifier (email) and password.
2.  `LoginForm` validates data locally; if valid, it calls the login function.
3.  A `POST` request is sent to `/api/auth/login`.
4.  The server validates the credentials. If correct, it returns a JWT.
5.  The client receives the JWT, stores it in the cookie, and redirects the user to the restricted area (`/`).
6.  On each subsequent request, the proxy ensures the authentication cookie is still valid.

## Security and Best Practices

-   **HttpOnly Cookies**: Authentication tokens are stored with the `HttpOnly` flag whenever possible to prevent XSS attacks.
-   **Secure Transport**: All authentication flows must occur over HTTPS in production.
-   **Double Validation**: Data is validated both on the client (for better user experience) and on the server (to ensure data integrity).
-   **Passwords**: Passwords are never stored in plain text in the database and are hashed using modern algorithms (like bcrypt) on the backend.
