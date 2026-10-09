# Performance

## Bundle size

- Bibliotecas pesadas (editores de texto rico, gráficos, date pickers grandes, etc.) importadas diretamente em Client Components sem `dynamic()` — sugerir `next/dynamic` com `ssr: false` quando o componente não precisa renderizar no servidor.
- Barrel imports que trazem a lib inteira (`import { Button } from 'big-lib'` quando a lib não faz tree-shaking direito) — verificar se há import específico do submódulo.
- Dependências client-only importadas em arquivos que também são usados por Server Components.

## Imagens e fontes

- `<img>` em vez de `next/image` → perde otimização automática (🟡 Médio, ou 🟠 se a imagem for grande/acima da dobra).
- `next/image` sem `sizes` em imagens responsivas, ou sem `priority` na imagem principal (LCP) da página.
- Fontes carregadas via `<link>`/CSS em vez de `next/font` (perde self-hosting e otimização de layout shift).

## Re-renders e memoização

- Client Components grandes que re-renderizam inteiros por causa de um pedaço pequeno de state — sugerir extrair o pedaço interativo.
- Funções/objetos/arrays recriados inline em cada render sendo passados como prop para componentes memoizados (`React.memo`) — anula o memo.
- Contextos (`Context.Provider`) com valor recriado a cada render sem `useMemo`, causando re-render de todos os consumidores.
- Uso de `useMemo`/`useCallback` desnecessário em componentes simples (over-engineering) é 🔵 Baixo, não bloqueante.

## Cache e revalidação

- `fetch` sem estratégia de cache explícita quando o dado é claramente estático ou semi-estático — sugerir `next: { revalidate: N }` ou `cache: 'force-cache'`.
- Dados que mudam a cada request marcados incorretamente como cacheáveis (`cache: 'force-cache'` em dado dinâmico por usuário) — risco de servir dado errado para outro usuário (pode ser 🔴 Crítico se vazar dado entre usuários).
- Uso de `unstable_cache` sem tags apropriadas quando há necessidade de invalidação granular.

## Streaming e Suspense

- Páginas com uma única query lenta bloqueando toda a renderização quando partes da página poderiam ser servidas mais rápido com `<Suspense>` + streaming.
- `loading.tsx` ausente em rotas com fetch lento no Server Component (sugestão, não bloqueante).
