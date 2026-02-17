# TokenService Class Documentation

[Leia em Português](../pt-br/TokenService.md)

The `TokenService` class is responsible for centralized management of JWT authentication tokens for *Machine-to-Machine* (M2M) communication with the backend API. It implements the Singleton pattern to ensure a single instance of the service throughout the application and uses caching strategies to optimize performance and reduce unnecessary calls to the authentication API.

## Location
`src/lib/auth-token-service.ts`

## Key Features

1.  **Token Management**: Stores and provides the current access token.
2.  **Automatic Renewal**: Checks token validity before returning it and performs automatic renewal if the token is expired or near expiration.
3.  **In-Memory Caching**: Keeps the token in memory to avoid repetitive login requests.
4.  **Singleton Pattern**: Ensures the same instance is reused, preserving the token cache even during *hot reloads* in a development environment.

## Class Structure

### Private Properties

-   `token: string | null`: Stores the current JWT token string. Initially `null`.
-   `expiresAt: number | null`: Stores the timestamp (in seconds, Unix format) of when the token will expire.

### Methods

#### `async getToken(): Promise<string>`

This is the main public method to obtain a valid token.

-   **Execution Flow**:
    1.  Checks if there is a cached token (`this.token`).
    2.  Checks if the token is still valid, comparing the current time with `this.expiresAt`.
    3.  Applies a safety margin of **60 seconds**: if less than one minute remains before the token expires, it is considered invalid to avoid failures during the request.
    4.  If the token is valid, returns it immediately.
    5.  Otherwise (non-existent or expired), calls `refreshAccessToken()` to obtain a new one.

#### `async refreshAccessToken(): Promise<string>`

Responsible for performing authentication with the external API.

-   **Execution Flow**:
    1.  Performs a `POST` request to the URL composed of `API_BASE_URL` + `API_AUTH_URL`.
    2.  Sends credentials (`identifier` and `password`) in the request body, extracted from `API_CLIENT_ID` and `API_CLIENT_SECRET`.
    3.  Checks if the response is successful; otherwise, throws an error with the response status (e.g., `AUTH_FAILED_401`).
    4.  Receives the response and extracts the JWT from the `jwt` field (as per `AuthResponse` interface).
    5.  Uses the `jwt-decode` library to read the token *payload* and obtain the expiration date (`exp`).
    6.  If the token does not have the `exp` field, sets a default expiration time of 1 hour (3600 seconds) and issues an alert in the log.
    7.  Updates the `token` and `expiresAt` properties.

### Error Handling

The `refreshAccessToken` method is wrapped in a `try-catch` block. In case of request failure or decoding error:
-   A critical error is logged via `logger.error`.
-   The exception is rethrown to be handled by the caller.

## Configuration and Environment Variables

The service depends on the following environment variables:

-   `API_BASE_URL`: Base URL of the API (e.g., `https://api.example.com`).
-   `API_AUTH_URL`: Specific authentication endpoint (e.g., `/auth/local`).
-   `API_CLIENT_ID`: Client identifier (mapped to `identifier` in the POST body).
-   `API_CLIENT_SECRET`: Client password/secret (mapped to `password` in the POST body).

## Integration with `apiFetch`

`TokenService` is mainly consumed by the `apiFetch` utility (`src/lib/api-client.ts`). This integration has a safety mechanism:

1.  **Automatic Retrieval**: Before each request, `apiFetch` calls `tokenService.getToken()` to include the `Authorization: Bearer <token>` header.
2.  **401 Recovery**: If the API returns a `401 Unauthorized` error, `apiFetch` assumes the token might have been invalidated on the server side (even if still within the local expiration period) and explicitly calls `tokenService.refreshAccessToken()` to force a renewal before retrying the request once.

## Singleton Pattern and Persistence

To handle Node.js module reloading behavior (especially in development environments like Next.js), the service instance is stored in the `global` object.

```typescript
const globalForAuth = global as unknown as { tokenService: TokenService };
export const tokenService = globalForAuth.tokenService || new TokenService();

if (process.env.NODE_ENV !== 'production') {
  globalForAuth.tokenService = tokenService;
}
```

This prevents a new authentication from being performed every time a file is saved during development, keeping the token "alive" in memory.

## Dependencies

-   `jwt-decode`: Used to decode the JWT token and read its expiration date without needing to validate the signature (since the source is trusted in this context).
-   `logger`: Internal module for logging (info, warn, error).
