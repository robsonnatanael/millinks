# Padrões Next.js (App Router)

## Server vs Client Components

- `'use client'` só deve existir onde há interatividade real (state, effects, event handlers, browser APIs, libs client-only). Marcar um componente inteiro como client só porque um filho precisa é 🟡 Médio — sugerir isolar a parte interativa e manter o resto como Server Component.
- Client Components não devem importar módulos que rodam código server-only (acesso a DB, `fs`, secrets). Isso é 🔴 Crítico se acabar vazando no bundle do client.
- Não passar Server Actions ou dados sensíveis como props para Client Components sem necessidade.

## Data fetching

### Server Components — regra do projeto

- Data fetching deve usar **Axios** (a mesma instância centralizada usada no client, ex: `lib/axios.ts` com `baseURL`, headers e interceptors) — não é necessário nem esperado usar `fetch` nativo aqui. Isso é o padrão correto e **não** deve ser sinalizado.
- Como o Axios não se integra automaticamente ao cache do Next.js (`cache`/`next: { revalidate }`, que só funciona com `fetch`), avaliar caso a caso:
  - Se o dado é claramente estático/pouco mutável e a chamada é feita repetidamente sem nenhuma estratégia de cache (nem `fetch` com revalidate, nem `React.cache()`/`unstable_cache` envolvendo a chamada Axios), sinalizar como 🟡 Médio e sugerir envolver a chamada com `unstable_cache` ou `React.cache()` para evitar requests duplicados na mesma renderização/deduplicar entre requests.
  - Se o dado é dinâmico por natureza (por usuário, muda a cada request), não sinalizar — não faz sentido cachear mesmo.
- Paralelizar requests independentes (`Promise.all` com as chamadas Axios) em vez de sequenciais quando não há dependência entre eles — sequencial desnecessário é 🟡 Médio.

### Client Components — regra do projeto

- **Todo data fetching client-side deve passar por TanStack Query**, usando **Axios** (idealmente uma instância central, ex: `lib/axios.ts` com `baseURL`, headers e interceptors configurados) como cliente HTTP dentro da `queryFn`/`mutationFn`:
  ```ts
  const { data } = useQuery({
    queryKey: ['orders', userId],
    queryFn: () => api.get(`/orders?userId=${userId}`).then(res => res.data),
  });
  ```
  Isso é o padrão correto e **não** deve ser sinalizado.
- Sinalizar como 🟠 Alto:
  - `useEffect` + Axios (ou `fetch`) buscando dados diretamente, sem passar por `useQuery`/`useMutation`.
  - Uso de `SWR` (a menos que pedido explicitamente).
  - Estado manual de `loading`/`error`/`data` reimplementando o que o TanStack Query já resolve.
  - Múltiplas instâncias de Axios criadas ad-hoc em vez de reaproveitar uma instância central (quando o projeto já tiver uma) — 🟡 Médio.
- Verificar boas práticas de TanStack Query quando já usado: `queryKey` bem definida e serializável, `staleTime`/`gcTime` coerentes, `enabled` para queries condicionais, invalidação de cache após mutations (`invalidateQueries` ou `setQueryData`).
- Tratamento de erro do Axios: verificar se erros de resposta (`error.response.status`, `error.response.data`) são tratados de forma específica quando relevante (ex: 401 → redirecionar/login, 422 → erros de validação vindos do backend), em vez de um catch genérico.

## Server Actions

- Devem ter `'use server'` no topo do arquivo ou da função.
- Validar input recebido (ver `security.md`) — nunca confiar em dado vindo do client.
- Não retornar objetos de erro internos (stack trace, mensagens de DB) para o client.
- Revalidar cache/rota após mutação (`revalidatePath`/`revalidateTag`) quando aplicável — esquecer isso é uma causa comum de dados desatualizados na UI (🟡 Médio).

## Route Handlers (`app/api/**/route.ts`)

- Usar `NextResponse` corretamente, com status codes apropriados.
- Validar método HTTP e input do request.
- Não expor variáveis de ambiente sensíveis nas respostas.

## Metadata, imagens, fontes e links

- Usar a Metadata API (`generateMetadata`/export `metadata`) em vez de manipular `<head>` manualmente.
- Usar `next/image` em vez de `<img>` para imagens (ver `performance.md`).
- Usar `next/link` em vez de `<a>` para navegação interna.
- Usar `next/font` em vez de importar fontes via `<link>`/CSS externo.

## Layouts, loading e error boundaries

- Verificar se rotas com fetching lento têm `loading.tsx` (Suspense automático) — sua ausência não é erro, mas é uma boa sugestão (🔵 Baixo).
- Verificar se há `error.tsx` para rotas que podem falhar de forma esperada.

## Variáveis de ambiente

- Apenas variáveis que **precisam** estar no bundle do client devem ter prefixo `NEXT_PUBLIC_`.
- Qualquer secret (API key privada, connection string, token) com prefixo `NEXT_PUBLIC_` é 🔴 Crítico — vaza para o browser.
