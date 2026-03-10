---
title: Orquestração (Docker Compose)
---

# Orquestração com Docker Compose

O Docker Compose permite que você execute toda a stack do **MilLinks** com um único comando, orquestrando vários contêineres e suas respectivas configurações de rede.

## A Configuração do Docker Compose

O arquivo `docker-compose.yml` define como a aplicação e suas dependências (como um banco de dados ou um proxy reverso) interagem entre si.

## Comandos

### Iniciando a Stack

Para iniciar todo o ambiente em segundo plano (background):

```bash
docker-compose up -d
```

### Parando a Stack

Para parar e remover os contêineres:

```bash
docker-compose down
```

### Visualizando Logs

Para monitorar a saída de todos os serviços:

```bash
docker-compose logs -f
```

## Local vs. Produção

É recomendado utilizar diferentes arquivos do compose (ex: `docker-compose.yml` e `docker-compose.prod.yml`) para gerenciar as diferenças entre as máquinas dos desenvolvedores e o ambiente de implantação real.
