import { tokenService } from './auth-token-service';
import { logger } from './logger';

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  retry = true
): Promise<T> {
  const token = await tokenService.getToken();

  const response = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (response.status === 401 && retry) {
    logger.warn(`401 em ${endpoint}. Tentando nova autenticação.`);
    await tokenService.refreshAccessToken();
    return apiFetch<T>(endpoint, options, false);
  }

  if (response.status === 500) {
    const errorText = await response.text().catch(() => 'Sem detalhes');
    logger.error(`Erro 500 Crítico em ${endpoint}. Resposta: ${errorText}`);
    throw new Error(`API_INTERNAL_SERVER_ERROR`);
  }

  if (!response.ok) {
    logger.error(`Erro na API em ${endpoint}`, { status: response.status });
    throw new Error(`API_RESPONSE_ERROR_${response.status}`);
  }

  return response.json() as Promise<T>;
}
