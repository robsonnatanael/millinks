import { jwtDecode } from 'jwt-decode';

/**
 * Verifies if a JWT token is present and not expired.
 * @param token The JWT token string to verify.
 * @returns true if the token is valid and not expired, false otherwise.
 */
export const isTokenValid = (token?: string): boolean => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    return !!decoded.exp && decoded.exp > currentTime;
  } catch {
    return false;
  }
};
