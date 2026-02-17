# Documentação Técnica - MilLinks

[Read in English](../en/README.md) | [Voltar para o Início](../../README.md)

Este documento contém as instruções de instalação, configuração e execução para o projeto MilLinks.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (Opcional, para execução em containers)

---

## Instalação

Para rodar este projeto em sua máquina local, siga os passos abaixo:

```bash
# Clone o repositório
$ git clone https://github.com/robsonnatanael/millinks

# Entre no repositório
$ cd millinks

# Instale as dependências
$ yarn install

# Rode a aplicação no modo de desenvolvimento
$ yarn dev

# Abra http://localhost:3000 no seu navegador
```

---

## Execução com Docker

Você pode rodar a aplicação usando Docker de duas formas:

### 1. Usando Docker Compose

```bash
# Navegue até a pasta do docker
$ cd .docker

# Suba o container
$ docker-compose up -d --build
```

### 2. Usando Docker CLI

Para construir a imagem manualmente a partir da raiz do projeto:

```bash
# Build da imagem
$ docker build -f .docker/Dockerfile -t millinks-app .

# Rodar o container
$ docker run -d -p 3000:3000 --name millinks-container --env-file .env.local millinks-app
```

> **Nota:** Certifique-se de que o arquivo `.env.local` na raiz do projeto esteja configurado corretamente antes de iniciar.

---

## Arquitetura e Serviços

- **[TokenService](./TokenService.md)**: Documentação detalhada sobre o serviço de autenticação JWT para comunicação M2M.
