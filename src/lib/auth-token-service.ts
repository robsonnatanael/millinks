import { AuthResponse } from '@/@types/api';
import { logger } from './logger';
import { jwtDecode, JwtPayload } from 'jwt-decode';

class TokenService {
  private token: string | null = null;
  private expiresAt: number | null = null;

  async getToken(): Promise<string> {
    const now = Math.floor(Date.now() / 1000);

    if (this.token && this.expiresAt && now < this.expiresAt - 60) {
      return this.token;
    }

    logger.info('Token expirado ou inexistente. Renovando...');
    return await this.refreshAccessToken();
  }

  async refreshAccessToken(): Promise<string> {
    try {
      const API_AUTH_URL = `${process.env.API_BASE_URL}${process.env.API_AUTH_URL}`;
      const response = await fetch(API_AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: process.env.API_CLIENT_ID,
          password: process.env.API_CLIENT_SECRET,
        }),
      });

      if (!response.ok) throw new Error(`AUTH_FAILED_${response.status}`);

      const data: AuthResponse = await response.json();
      this.token = data.jwt;

      const decoded = jwtDecode<JwtPayload>(this.token);
      if (decoded.exp) {
        this.expiresAt = decoded.exp;
        logger.info(
          `Token renovado. Expira em: ${new Date(this.expiresAt * 1000)}`
        );
      } else {
        this.expiresAt = Math.floor(Date.now() / 1000) + 3600; // Fallback 1h
        logger.warn(
          'Token sem expiração definida (exp). Usando fallback de 1h.'
        );
      }

      return this.token;
    } catch (err) {
      logger.error('Erro crítico na autenticação', err);
      throw err;
    }
  }
}

const globalForAuth = global as unknown as { tokenService: TokenService };

export const tokenService = globalForAuth.tokenService || new TokenService();

if (process.env.NODE_ENV !== 'production') {
  globalForAuth.tokenService = tokenService;
}
