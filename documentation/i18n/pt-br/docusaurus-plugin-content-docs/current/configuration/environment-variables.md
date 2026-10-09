---
title: Variáveis de Ambiente
---

# Configuração & Variáveis de Ambiente

O projeto **MilLinks** utiliza variáveis de ambiente para gerenciar as configurações em diferentes ambientes (desenvolvimento, homologação e produção).

## Arquivo de Configuração

Crie um arquivo `.env.local` na raiz do projeto para armazenar suas configurações locais. Você pode usar o `.env.example` como ponto de partida:

```bash
# Modelo para .env.local
NEXT_PUBLIC_API_AUTH_URL="/auth/local"
NEXT_PUBLIC_API_BASE_URL="https://sua-url-da-api.com/api"
NEXT_PUBLIC_BASE_PATH=""
NEXT_PUBLIC_FARO_ENVIRONMENT_NAME="development"
NEXT_PUBLIC_FARO_APP_NAME="millinks"
NEXT_PUBLIC_FARO_COLLECTOR_URL="http://localhost:12345/collect"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

API_CLIENT_ID="seu_client_id"
API_CLIENT_SECRET="seu_client_secret"
```

## Categorias de Variáveis

### Variáveis de Frontend (Públicas do Next.js)

As variáveis prefixadas com `NEXT_PUBLIC_` são acessíveis pelo navegador. Elas são incorporadas ao bundle JavaScript em **tempo de build**.

- `NEXT_PUBLIC_API_BASE_URL`: A URL raiz da API de backend, exposta ao cliente.
- `NEXT_PUBLIC_API_AUTH_URL`: O endpoint específico de autenticação, exposto ao cliente.
- `NEXT_PUBLIC_BASE_PATH`: O caminho base (base path) do roteador da aplicação Next.js.
- `NEXT_PUBLIC_FARO_ENVIRONMENT_NAME`: Nome do ambiente de observabilidade.
- `NEXT_PUBLIC_FARO_APP_NAME`: Nome da aplicação na observabilidade.
- `NEXT_PUBLIC_FARO_COLLECTOR_URL`: URL do endpoint do coletor Faro.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: ID de medição do Google Analytics.

### Variáveis de Servidor (Seguro)

Essas variáveis são acessíveis apenas no lado do servidor Node.js e **nunca** são expostas ao navegador.

- `API_CLIENT_ID`: Identificador único para a autenticação do serviço interno.
- `API_CLIENT_SECRET`: A chave secreta para a autenticação do serviço interno (**Mantenha isso em segurança!**).

## Como as Variáveis São Usadas

### No Docker

Ao construir com Docker, as variáveis `NEXT_PUBLIC_*` precisam ser passadas como **build arguments** (`ARG`), pois o Next.js as incorpora ao bundle do cliente durante o `next build`. Variáveis apenas de runtime (como `API_CLIENT_ID`) são injetadas em tempo de execução através do script `entrypoint.sh` ou arquivos `.env`.

Para mais detalhes, veja a documentação do [Docker Compose](../deployment/docker-compose.md).

## Melhores Práticas

- **Nunca Comite Segredos**: Certifique-se de que os arquivos `.env.local`, `.env.production` e outros que contenham segredos estejam listados no seu `.gitignore`.
- **Separação por Ambiente**: Use `.env.local` para trabalho local e `.env.production` para configurações de deploy.
- **Use `--env-file`**: Ao executar o `docker compose`, sempre passe `--env-file .env.local` para que o Compose possa interpolar as referências de variáveis (ex: `${API_CLIENT_ID}`) no `docker-compose.yml`.
