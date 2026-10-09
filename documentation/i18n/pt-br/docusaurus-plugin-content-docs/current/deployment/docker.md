---
title: Conteinerização (Docker)
---

# Conteinerização com Docker

Este guia aborda como construir e gerenciar as imagens independentes do Docker para a aplicação e a documentação do **MilLinks**.

## Visão Geral do Dockerfile

O `Dockerfile` na raiz do projeto é uma construção **multi-stage** contendo estágios tanto para a aplicação quanto para a documentação:

### Estágios da Aplicação

1.  **app-builder**: Instala as dependências com `yarn --frozen-lockfile` e constrói a aplicação. Ele carrega as variáveis `NEXT_PUBLIC_*` como `ARG` durante o build.
2.  **app**: A imagem final e mínima de runtime baseada no Alpine. Ela usa o output `standalone` do Next.js, ajusta as permissões corretas e utiliza o script `entrypoint.sh` para injetar variáveis de ambiente de forma segura em tempo de execução.

### Estágios da Documentação

1.  **docs-builder**: Instala as dependências e constrói o site estático do Docusaurus.
2.  **docs**: Uma imagem baseada em Nginx que serve os arquivos estáticos gerados.

## Construindo a Imagem da Aplicação Web

Para construir a imagem manualmente, você deve passar as variáveis `NEXT_PUBLIC_*` necessárias como argumentos de build (`build-arg`):

**Build de Produção:**

```bash
docker build --target app -t my-org/millinks-webapp:latest \
  --build-arg NEXT_PUBLIC_API_BASE_URL=https://api.millinks.com \
  --build-arg NEXT_PUBLIC_API_AUTH_URL=/auth/local \
  .
```

## Executando o Contêiner da Aplicação Web

Passe o arquivo `.env` correspondente em tempo de execução:

**Staging:**

```bash
docker run -dp 3000:3000 --name millinks-stg-webapp --env-file .env.stg my-org/millinks-webapp:staging
```

**Production:**

```bash
docker run -dp 3000:3000 --name millinks-webapp --env-file .env.prod my-org/millinks-webapp:latest
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Construindo e Executando a Imagem da Documentação

Para construir e rodar o servidor de documentação independentemente:

```bash
# Build
docker build --target docs -t my-org/millinks-docs .

# Run
docker run -dp 8080:8080 --name millinks-docs my-org/millinks-docs
```

A documentação estará disponível em [http://localhost:8080](http://localhost:8080).

## .dockerignore

O arquivo `.dockerignore` garante que diretórios desnecessários como `documentation/node_modules`, `.agents/`, `.git/`, `node_modules/` e `.next/` sejam excluídos do contexto de build do Docker, mantendo a imagem enxuta e o build rápido.
