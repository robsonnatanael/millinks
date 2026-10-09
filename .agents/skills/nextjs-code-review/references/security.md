# Segurança

## Variáveis de ambiente e secrets

- Secret/API key/connection string com prefixo `NEXT_PUBLIC_` → vaza para o bundle do client. **🔴 Crítico.**
- Secrets hardcoded no código (mesmo em Server Component/Action). **🔴 Crítico.**
- Logs (`console.log`) imprimindo tokens, senhas ou dados pessoais.

## Validação de input

- Server Actions e Route Handlers que usam dados do `request`/`formData` sem validar (ex: com `zod`, `valibot`) antes de usar em queries, lógica de negócio ou respostas. **🟠 Alto** (🔴 se o dado não validado for usado direto em uma query SQL/NoSQL).
- Confiar em validação feita apenas no client (formulário) sem revalidar no server — client-side validation nunca é suficiente sozinha.

## Autenticação e autorização

- Route Handlers/Server Actions que fazem operações sensíveis (deletar, editar, acessar dados de outro usuário) sem checar sessão/autorização do usuário atual.
- Checagem de autorização feita só na UI (esconder botão) sem checagem correspondente no server.
- IDs de recursos vindos do client usados diretamente sem verificar se pertencem ao usuário autenticado (ex: `DELETE /api/orders/:id` sem checar se o pedido é do usuário logado) — **IDOR, 🔴 Crítico.**

## Injeção e sanitização

- Queries montadas por concatenação de string com input do usuário em vez de query parametrizada/ORM.
- `dangerouslySetInnerHTML` com conteúdo que não passou por sanitização (ex: `DOMPurify`).
- Conteúdo gerado por usuário renderizado sem escaping em contextos que permitem execução (ex: URLs `javascript:`).

## Exposição de erros e dados

- Route Handlers/Server Actions retornando o erro bruto (`error.message`, stack trace) para o client — pode vazar detalhes de infraestrutura. Retornar mensagem genérica e logar o erro real no server.
- Endpoints retornando mais campos do que o necessário (ex: retornar o objeto `user` inteiro, incluindo hash de senha, em vez de um DTO específico).

## Rate limiting e abuso

- Route Handlers públicos sensíveis (login, criação de conta, envio de e-mail/OTP) sem alguma forma de rate limiting — sinalizar como sugestão relevante (🟡 Médio, ou 🟠 se for um endpoint claramente sensível a abuso).
