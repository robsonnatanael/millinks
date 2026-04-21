---
title: Orquestração (Docker Compose)
---

# Orquestração com Docker Compose

O Docker Compose permite que você execute toda a stack do **MilLinks** com um único comando, orquestrando vários contêineres e suas respectivas configurações de rede.

## A Configuração do Docker Compose

O arquivo `docker-compose.yml` define como o serviço da aplicação é construído, configurado e conectado em rede.

### Conceitos Importantes

- **`env_file`**: O arquivo `.env.local` é carregado para injetar variáveis de ambiente em tempo de execução no contêiner.
- **`args`**: Argumentos de build são passados ao `Dockerfile` para que variáveis públicas (como `NEXT_PUBLIC_*`) estejam disponíveis durante o passo `next build`.
- **Flag `--env-file`**: Ao executar o `docker compose`, é necessário passar `--env-file .env.local` para que o Compose consiga interpolar as variáveis usadas na seção `args`.
- **Volumes Anônimos**: `/home/node/node_modules` e `/home/node/.next` são declarados como volumes anônimos para evitar que o bind mount do host sobrescreva as dependências compiladas e o build do contêiner.

## Comandos

### Iniciando a Stack

Para construir e iniciar todo o ambiente em segundo plano:

```bash
docker compose --env-file .env.local up -d --build
```

- **Web App**: Disponível em `http://localhost:3000`
- **Documentation**: Disponível em `http://localhost:3001`

### Parando a Stack

Para parar e remover os contêineres:

```bash
docker compose down
```

### Visualizando Logs

Para monitorar a saída de todos os serviços:

```bash
docker compose logs -f
```

## Local vs. Produção

É recomendado utilizar diferentes arquivos do compose (ex: `docker-compose.yml` e `docker-compose.prod.yml`) para gerenciar as diferenças entre as máquinas dos desenvolvedores e o ambiente de implantação real.
