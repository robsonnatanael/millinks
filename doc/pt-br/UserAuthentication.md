# Fluxo de Autenticação de Usuário

[Read in English](../en/UserAuthentication.md) | [Voltar para o README](./README.md)

Este documento descreve a implementação do sistema de autenticação de usuários, incluindo o fluxo de login, validação de formulários e proteção de rotas.

## Visão Geral

Ao contrário do `TokenService` (utilizado para comunicação M2M), o fluxo de autenticação de usuário é projetado para interação humana via interface web. Ele utiliza JWT armazenado em cookies do navegador para gerenciamento de sessão.

## Stack Tecnológica

- **React Hook Form**: Gerenciamento de estado do formulário.
- **Zod**: Validação baseada em schemas.
- **TanStack Query (React Query)**: Gerenciamento de estado assíncrono e mutações.
- **js-cookie**: Manipulação de cookies no lado do cliente.
- **Next.js Middleware (Proxy)**: Proteção de rotas no lado do servidor.

## Detalhes de Implementação

### 1. Formulário e Validação
O componente `LoginForm` (`src/features/auth/components/login-form.tsx`) utiliza um schema de validação definido em `src/features/auth/schemas/login-schema.ts`. Isso garante que os dados sejam validados antes mesmo de chegarem à API.

### 2. Mutação e Serviço
O hook `useLoginMutation` lida com a chamada à API através do `auth-service.ts`. Após uma resposta bem-sucedida, o JWT é armazenado em um cookie:

```typescript
Cookies.set(DEFAULT_VALUES.COOKIE_KEY, response.data.jwt);
```

### 3. Proteção de Rotas (Middleware)
Utilizamos um padrão de proxy em `src/proxy.ts` para proteger rotas sensíveis. Qualquer requisição para `/dashboard/:path*` é interceptada:
- Se nenhum token for encontrado nos cookies, o usuário é redirecionado para `/login`.
- Se o token estiver presente, a requisição prossegue.

### 4. Providers
Toda a aplicação é envolvida pelo `QueryClientProvider` no layout raiz para garantir que os estados de autenticação possam ser compartilhados e cacheados em toda a aplicação.

## Estrutura de Diretórios
- `src/features/auth/components`: Componentes de UI (LoginForm).
- `src/features/auth/hooks`: Lógica e mutações de API.
- `src/features/auth/schemas`: Regras de validação.
- `src/features/auth/services`: Lógica de requisição à API.
- `src/features/auth/types`: Definições de tipos.
