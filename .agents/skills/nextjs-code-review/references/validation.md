# Validação (Zod)

Regra do projeto: **toda validação de input deve usar Zod** — em formulários, Server Actions, route handlers e parsing de variáveis de ambiente. Validação manual com ifs soltos onde caberia um schema é 🟡 Médio.

## Schemas

- Preferir schemas **compartilhados** entre client e server quando o formato do dado é o mesmo (ex: `schemas/order.ts` exportando `orderSchema`, usado tanto no `zodResolver` do formulário quanto na Server Action que recebe o submit). Schemas duplicados e divergentes entre client/server é 🟡 Médio (🟠 se a divergência permitir bypassar uma regra de negócio).
- Tipos derivados do schema com `z.infer<typeof schema>` em vez de interfaces/types manuais duplicando o schema.
- Mensagens de erro customizadas (`{ message: '...' }`) para campos onde a mensagem padrão do Zod não é clara para o usuário final.

## Formulários (client)

- Formulários devem validar com Zod via `zodResolver` (react-hook-form) ou equivalente, não apenas validação manual em `onSubmit`.
- Verificar se a validação do client é só uma otimização de UX — a mesma regra **precisa** existir no server (Server Action/route handler) também. Confiar só na validação do client é uma falha de segurança (ver `security.md`).

## Server Actions e Route Handlers

- Todo input recebido (`formData`, `request.json()`, params/query string) deve ser parseado com `schema.parse(...)` ou `schema.safeParse(...)` antes de ser usado.
- Preferir `safeParse` quando o erro precisa ser tratado de forma controlada (retornar erro 400/objeto de erro) em vez de deixar o `parse` lançar exceção sem tratamento.
- Erros do Zod (`error.flatten()`/`error.format()`) devem ser retornados de forma estruturada (ex: por campo) para o client conseguir exibir no formulário, em vez de uma mensagem genérica.
- Não validar apenas o "formato" e esquecer regras de negócio que também deveriam estar no schema (`.refine()`/`.superRefine()`) — ex: `endDate` precisa ser depois de `startDate`.

## Variáveis de ambiente

- Sugerir (não bloquear, 🔵 Baixo) um schema Zod para validar `process.env` na inicialização (padrão comum: `env.ts` com `z.object({...}).parse(process.env)`), especialmente se o projeto ainda acessa `process.env.X` diretamente e sem validação em vários lugares.
