# Documentação Técnica - MilLinks

[Read in English](../en/README.md) | [Voltar para o Início](../../README.md)

Este documento contém as instruções de instalação, configuração e execução para o projeto MilLinks.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (v24.13.0 ou superior)
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

## Configuração

Antes de rodar a aplicação, crie um arquivo `.env.local` no diretório raiz e configure as seguintes variáveis de ambiente:

```env
API_BASE_URL=https://api.example.com
API_AUTH_URL=/auth/local
```

---

## Execução com Docker

Antes de iniciar os serviços, certifique-se de que a rede externa necessária já foi criada. Caso contrário, execute o comando:

```bash
$ docker network create --driver overlay --attachable traefik_traefik_proxy
```

Você pode rodar a aplicação utilizando Docker de duas formas:

### 1. Utilizando Docker Compose

Para subir a aplicação:

```bash
# Navegue até o diretório docker
$ cd .docker

# Inicialize os serviços
$ docker-compose up -d --build
```

### 2. Utilizando Docker CLI

Para construir a imagem manualmente a partir da raiz do projeto:

```bash
# Build da imagem
$ docker build -f .docker/Dockerfile -t robsonnatanael/millinks-webapp:dev .

# Rodar o container
$ docker run -d -p 3000:3000 --name millinks_webapp --env-file .env.local --network traefik_traefik_proxy robsonnatanael/millinks-webapp:dev
```

> **Nota:** Certifique-se de que o arquivo `.env.local` na raiz do projeto esteja configurado corretamente antes de iniciar.

---

## Arquitetura e Funcionalidades

- **Autenticação**: Fluxo completo de login utilizando JWT, React Hook Form e Zod. ([Ver Documentação](./UserAuthentication.md))
- **Proteção de Rotas**: Redirecionamento baseado em middleware para rotas protegidas como `/dashboard`.
- **Gerenciamento de Estado**: TanStack Query (React Query) para busca e cache de dados de forma eficiente.
- **Cliente API**: Cliente baseado em Axios para comunicação consistente com serviços.
- **[TokenService](./TokenService.md)**: Documentação detalhada sobre o serviço de autenticação JWT para comunicação M2M.
