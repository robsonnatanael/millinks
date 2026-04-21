---
title: Guia de Implantação (Deployment)
---

# Guia de Implantação (Deployment)

O projeto **MilLinks** é projetado para ser facilmente implantável utilizando padrões modernos de conteinerização.

## Estratégia de Implantação

A forma recomendada para implantação é o uso do **Docker**. Isso garante que o ambiente da aplicação seja idêntico em desenvolvimento e produção, minimizando problemas do tipo "funciona na minha máquina".

## Conteinerização vs. Orquestração

Separamos as preocupações entre _construir_ a aplicação e _executá-la_ em um ambiente multi-serviço.

1.  **[Conteinerização (Docker)](./docker.md)**: Imagens de serviços individuais e o processo de build.
2.  **[Orquestração (Docker Compose)](./docker-compose.md)**: Executando toda a stack (web, banco de dados, proxy) em conjunto.

## Melhores Práticas para Produção

- **Isolamento de Ambiente**: Sempre use um arquivo `.env.production` dedicado.
- **Proxy Reverso**: É altamente recomendado o uso do **Nginx** ou **Traefik** como proxy reverso para lidar com SSL (HTTPS) e balanceamento de carga.
- **Gerenciamento de Portas**: A aplicação opera por padrão na porta **3000** dentro do contêiner.
