---
name: nextjs-code-review
description: Realiza code review completo de aplicações Next.js (App Router) com Tailwind CSS, shadcn/ui, Axios, Zod e TanStack Query, cobrindo boas práticas de Server/Client Components, data fetching, estilização, validação, performance, segurança e qualidade geral de código. Use SEMPRE que o usuário pedir para revisar, analisar, dar feedback, apontar problemas ou aprovar código de um projeto Next.js/React — inclusive "revisar esse PR", "dar uma olhada nesses arquivos", "revisar as mudanças (git diff)", ou simplesmente "code review", mesmo sem a palavra "Next.js" aparecer explicitamente. Também se aplica a componentes React, rotas de API (route handlers), Server Actions, formulários, schemas Zod, componentes shadcn/ui e arquivos .tsx/.jsx/.ts/.js dentro de um projeto Next.js.
---

# Code Review — Next.js

Skill para revisar código de aplicações Next.js de forma consistente, produzindo um **relatório estruturado por severidade**.

Calibrada para a stack do projeto: **Next.js (App Router) + Tailwind CSS + shadcn/ui + Axios + Zod + TanStack Query** para data fetching no client.

## Quando acionar

- Pedidos de "code review", "revisão de código", "revisar esse PR/branch/diff"
- Pedidos para avaliar arquivos `.tsx`/`.ts`/`.jsx`/`.js` dentro de um projeto Next.js
- Pedidos para checar se um componente/rota/Server Action "está bom" ou "pronto pra mergear"

## Workflow

### 1. Determine o escopo

- Se o usuário apontou arquivos, um PR ou colou trechos de código → use isso como escopo.
- Se não, e houver um repositório git disponível, rode `git diff` (ou `git diff main...HEAD`) para pegar os arquivos alterados.
- Se não houver nada disso, peça os arquivos/trechos antes de prosseguir — não invente contexto.

### 2. Antes de avaliar, leia a(s) referência(s) relevante(s)

Não avalie de memória. Para cada arquivo em escopo, abra a(s) referência(s) que se aplicam **antes** de escrever qualquer achado:

| Contexto do arquivo                                                                                              | Ler                             |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| Componentes/rotas Next.js, Server vs Client Components, data fetching com Axios + TanStack Query, Server Actions | `references/nextjs-patterns.md` |
| Classes Tailwind, uso/customização de componentes shadcn/ui                                                      | `references/ui-styling.md`      |
| Schemas Zod, validação de formulário/API, parsing de env vars                                                    | `references/validation.md`      |
| Bundle size, imagens, cache, re-renders                                                                          | `references/performance.md`     |
| Env vars, auth, exposição de dados, injeção                                                                      | `references/security.md`        |
| TypeScript, testes, acessibilidade, padrões gerais                                                               | `references/quality.md`         |

A maioria dos arquivos vai exigir consultar mais de uma referência (ex: um formulário client-side normalmente passa por `nextjs-patterns.md` + `ui-styling.md` + `validation.md`).

### 3. Classifique cada achado por severidade

| Nível                   | Critério                                                                                                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔴 **Crítico**          | Quebra a aplicação, falha de segurança explorável, vazamento de dado sensível/secret                                                                     |
| 🟠 **Alto**             | Viola uma regra obrigatória do projeto (ver "Regras do projeto" abaixo), anti-pattern do Next.js que causa bugs sutis, problema de performance relevante |
| 🟡 **Médio**            | Manutenibilidade, falta de tratamento de erro, tipagem fraca, duplicação                                                                                 |
| 🔵 **Baixo / Sugestão** | Estilo, nomenclatura, nits, pequenas otimizações opcionais                                                                                               |

Nunca invente um problema só para preencher uma categoria — se uma severidade não tem achados, omita a seção.

### 4. Gere o relatório

Use exatamente este formato:

```markdown
## Code Review — [nome do arquivo/PR]

**Resumo:** [1-2 frases: estado geral, pronto pra mergear ou não]

### 🔴 Crítico

- **`arquivo.tsx:linha`** — [descrição do problema]
  - _Por quê:_ [impacto]
  - _Sugestão:_ [correção objetiva, com trecho de código quando ajudar]

### 🟠 Alto

- (mesmo formato)

### 🟡 Médio

- (mesmo formato)

### 🔵 Baixo / Sugestão

- (mesmo formato, pode ser mais sucinto)

### ✅ Pontos positivos

- [opcional, mas ajuda a calibrar — não seja só uma lista de problemas]

**Veredito:** ✅ Aprovado / ⚠️ Aprovado com ressalvas / ❌ Precisa de mudanças antes do merge
```

## Regras específicas deste projeto

Estas regras têm prioridade sobre convenções genéricas do Next.js — trate violações como no mínimo 🟠 Alto:

- **Data fetching no client sempre via TanStack Query**, usando **Axios** como cliente HTTP dentro da `queryFn`/`mutationFn` (`useQuery`/`useMutation`/`useInfiniteQuery` chamando uma função que usa `axios`/instância do Axios). Fetching manual em Client Component com `useEffect` + Axios direto (sem TanStack Query por trás), ou uso de SWR, é violação — a menos que o usuário peça explicitamente o contrário.
- Em Server Components, o data fetching também deve usar **Axios** (instância centralizada, ex: `lib/axios.ts` com `baseURL`, headers e interceptors), mantendo consistência com o client. Usar `fetch` nativo não é obrigatório — só sinalizar Axios em Server Component como problema se a chamada precisar do cache automático do Next.js e isso não estiver sendo tratado de outra forma (ver `nextjs-patterns.md`).
- **Toda validação de input** (Server Actions, route handlers, formulários) deve usar **Zod**. Validação manual (ifs soltos checando tipo/formato) onde já existe ou caberia um schema Zod é 🟡 Médio.
- Estilização deve usar **Tailwind CSS** via classes utilitárias; CSS custom (`.css`/`styled-components`/inline `style={{}}`) para algo que Tailwind já resolve é 🔵 Baixo/Sugestão, a menos que seja algo que Tailwind não suporta bem (animações complexas, etc.).
- Componentes de UI genéricos (botão, input, dialog, dropdown etc.) devem vir do **shadcn/ui** em vez de reimplementados do zero — reimplementação duplicada é 🟡 Médio.

## Referências

- `references/nextjs-patterns.md` — App Router, Server vs Client Components, data fetching com Axios + TanStack Query, Server Actions, route handlers, metadata, env vars.
- `references/ui-styling.md` — convenções de Tailwind CSS e shadcn/ui.
- `references/validation.md` — padrões de schema e validação com Zod (forms, Server Actions, route handlers, env vars).
- `references/performance.md` — bundle size, imagens/fontes, re-renders, cache/revalidate, streaming/Suspense.
- `references/security.md` — env vars, autenticação/autorização, injeção, exposição de erros.
- `references/quality.md` — TypeScript, tratamento de erro, testes, acessibilidade, consistência de código.
