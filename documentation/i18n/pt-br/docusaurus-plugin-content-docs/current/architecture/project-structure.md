---
title: Estrutura do Projeto
---

# Estrutura do Projeto

O projeto segue uma estrutura modular e escalável, utilizando o Next.js App Router.

```shell
millinks/
│
├── public/             # Arquivos estáticos (imagens, ícones, etc.)
├── src/
│ ├── app/              # Next.js App Router (Rotas e Páginas)
│ ├── components/       # Componentes React globais/compartilhados
│ ├── features/         # Módulos baseados em funcionalidades/domínio
│ ├── lib/              # Utilitários core e inicialização de serviços
│ ├── providers/        # Provedores de contexto (React Query, Theme, etc.)
│ ├── services/         # Camadas de API e serviços externos
│ ├── shared/           # Tipos, constantes e hooks compartilhados
│ ├── theme/            # Tema de estilização (Material UI)
│ └── proxy.ts          # Lógica de Middleware/Proxy
│
├── documentation/      # Documentação Docusaurus
├── Dockerfile          # Build Docker multi-stage
├── docker-compose.yml  # Orquestração de serviços
├── package.json
└── next.config.ts
```

## Descrição das Pastas

**app**

Contém as rotas, layouts e páginas seguindo a convenção do Next.js App Router.

**features**

Organiza o código por domínio ou funcionalidade (ex: auth, links). Cada funcionalidade pode ter seus próprios componentes, hooks e serviços.

**lib**

Lógica central do sistema, como gerenciamento de tokens de autenticação e configuração do cliente de API.

**providers**

Envolve a aplicação com os contextos necessários, como TanStack Query e o Tema do Material UI.

**services**

Responsável pela comunicação com APIs externas.
