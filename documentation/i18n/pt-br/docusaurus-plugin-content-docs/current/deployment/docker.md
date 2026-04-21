---
title: Conteinerização (Docker)
---

# Conteinerização com Docker

Este guia aborda como construir e gerenciar a imagem independente do Docker para a aplicação **MilLinks**.

## Visão Geral do Dockerfile

O `Dockerfile` na raiz do projeto é uma construção **multi-stage** com três estágios:

1.  **Builder**: Instala as dependências com `yarn --frozen-lockfile`, copia o código-fonte e executa `next build` para compilar a aplicação para produção. Variáveis de ambiente públicas (`NEXT_PUBLIC_*`) são injetadas como `ARG`/`ENV` neste estágio para serem incorporadas ao bundle do cliente.
2.  **App Bundle**: Um estágio intermediário que seleciona apenas os artefatos essenciais do build (`.next/`, `node_modules/`, `public/`, `package.json`, etc.) para criar um bundle limpo.
3.  **Runner**: A imagem de runtime final e mínima. Copia o bundle, configura o fuso horário, ajusta as permissões e inicia a aplicação com `yarn start`.

## Construindo a Imagem

Para construir a imagem manualmente, é necessário passar os argumentos de build necessários:

```bash
docker build \
  --build-arg API_CLIENT_ID=seu_id \
  --build-arg API_CLIENT_SECRET=seu_secret \
  --build-arg NEXT_PUBLIC_API_BASE_URL=https://sua-api.com \
  --build-arg NEXT_PUBLIC_API_AUTH_URL=/auth/local \
  -t millinks .
```

## Executando o Contêiner Sozinho

Se você deseja testar o contêiner individualmente, sem outros serviços:

```bash
docker run -p 3000:3000 millinks
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## .dockerignore

O arquivo `.dockerignore` garante que diretórios desnecessários como `documentation/`, `skill/`, `.git/`, `node_modules/` e `.next/` sejam excluídos do contexto de build do Docker, mantendo a imagem enxuta e o build rápido.
