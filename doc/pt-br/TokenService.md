# Documentação da Classe TokenService

[Read in English](../en/TokenService.md)

A classe `TokenService` é responsável pelo gerenciamento centralizado de tokens de autenticação JWT para comunicação *Machine-to-Machine* (M2M) com a API backend. Ela implementa o padrão Singleton para garantir uma única instância do serviço em toda a aplicação e utiliza estratégias de cache para otimizar o desempenho e reduzir chamadas desnecessárias à API de autenticação.

## Localização
`src/lib/auth-token-service.ts`

## Funcionalidades Principais

1.  **Gerenciamento de Token**: Armazena e fornece o token de acesso atual.
2.  **Renovação Automática**: Verifica a validade do token antes de retorná-lo e realiza a renovação automática se o token estiver expirado ou próximo da expiração.
3.  **Cache em Memória**: Mantém o token em memória para evitar requisições repetitivas de login.
4.  **Padrão Singleton**: Garante que a mesma instância seja reutilizada, preservando o cache do token mesmo durante *hot reloads* em ambiente de desenvolvimento.

## Estrutura da Classe

### Propriedades Privadas

-   `token: string | null`: Armazena a string do token JWT atual. Inicialmente `null`.
-   `expiresAt: number | null`: Armazena o timestamp (em segundos, formato Unix) de quando o token irá expirar.

### Métodos

#### `async getToken(): Promise<string>`

Este é o método público principal para obter um token válido.

-   **Fluxo de Execução**:
    1.  Verifica se existe um token em cache (`this.token`).
    2.  Verifica se o token ainda é válido, comparando a hora atual com `this.expiresAt`.
    3.  Aplica uma margem de segurança de **60 segundos**: se faltar menos de um minuto para o token expirar, ele é considerado inválido para evitar falhas durante a requisição.
    4.  Se o token for válido, retorna-o imediatamente.
    5.  Caso contrário (inexistente ou expirado), chama `refreshAccessToken()` para obter um novo.

#### `async refreshAccessToken(): Promise<string>`

Responsável por realizar a autenticação na API externa.

-   **Fluxo de Execução**:
    1.  Realiza uma requisição `POST` para a URL composta por `API_BASE_URL` + `API_AUTH_URL`.
    2.  Envia as credenciais (`identifier` e `password`) no corpo da requisição, extraídas de `API_CLIENT_ID` e `API_CLIENT_SECRET`.
    3.  Verifica se a resposta é bem-sucedida; caso contrário, lança um erro com o status da resposta (ex: `AUTH_FAILED_401`).
    4.  Recebe a resposta e extrai o JWT do campo `jwt` (conforme interface `AuthResponse`).
    5.  Utiliza a biblioteca `jwt-decode` para ler o *payload* do token e obter a data de expiração (`exp`).
    6.  Se o token não tiver o campo `exp`, define um tempo de expiração padrão de 1 hora (3600 segundos) e emite um alerta no log.
    7.  Atualiza as propriedades `token` e `expiresAt`.

### Tratamento de Erros

O método `refreshAccessToken` está envolvido em um bloco `try-catch`. Em caso de falha na requisição ou decodificação:
-   Um erro crítico é registrado via `logger.error`.
-   A exceção é relançada para ser tratada pelo chamador.

## Configuração e Variáveis de Ambiente

O serviço depende das seguintes variáveis de ambiente:

-   `API_BASE_URL`: URL base da API (ex: `https://api.exemplo.com`).
-   `API_AUTH_URL`: Endpoint específico de autenticação (ex: `/auth/local`).
-   `API_CLIENT_ID`: Identificador do cliente (mapeado para `identifier` no corpo do POST).
-   `API_CLIENT_SECRET`: Senha/Segredo do cliente (mapeado para `password` no corpo do POST).

## Integração com `apiFetch`

O `TokenService` é consumido principalmente pelo utilitário `apiFetch` (`src/lib/api-client.ts`). Esta integração possui um mecanismo de segurança:

1.  **Obtenção Automática**: Antes de cada requisição, o `apiFetch` chama `tokenService.getToken()` para incluir o cabeçalho `Authorization: Bearer <token>`.
2.  **Recuperação de 401**: Se a API retornar um erro `401 Unauthorized`, o `apiFetch` assume que o token pode ter sido invalidado no lado do servidor (mesmo que ainda esteja dentro do prazo de expiração local) e chama explicitamente `tokenService.refreshAccessToken()` para forçar uma renovação antes de tentar a requisição novamente uma única vez.

## Padrão Singleton e Persistência

Para lidar com o comportamento de recarregamento de módulos do Node.js (especialmente em ambientes de desenvolvimento como Next.js), a instância do serviço é armazenada no objeto `global`.

```typescript
const globalForAuth = global as unknown as { tokenService: TokenService };
export const tokenService = globalForAuth.tokenService || new TokenService();

if (process.env.NODE_ENV !== 'production') {
  globalForAuth.tokenService = tokenService;
}
```

Isso impede que uma nova autenticação seja realizada toda vez que um arquivo é salvo durante o desenvolvimento, mantendo o token "vivo" na memória.

## Dependências

-   `jwt-decode`: Utilizada para decodificar o token JWT e ler sua data de expiração sem precisar validar a assinatura (já que a fonte é confiável neste contexto).
-   `logger`: Módulo interno para registro de logs (info, warn, error).
