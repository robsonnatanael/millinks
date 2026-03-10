---
title: Conteinerização (Docker)
---

# Conteinerização com Docker

Este guia aborda como construir e gerenciar a imagem independente do Docker para a aplicação **MilLinks**.

## Visão Geral do Dockerfile

O `Dockerfile` na raiz do projeto é uma construção de várias etapas (multi-stage) que:
1.  **Instalar dependências**: Ambiente configurado com Node.js.
2.  **Build**: Compila a aplicação Next.js para produção.
3.  **Runner**: Cria uma imagem de tempo de execução (runtime) mínima para segurança e velocidade.

## Construindo a Imagem

Para construir a imagem manualmente:

```bash
docker build -t millinks .
```

## Executando o Contêiner Sozinho

Se você deseja testar o contêiner individualmente, sem outros serviços:

```bash
docker run -p 3000:3000 millinks
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).
