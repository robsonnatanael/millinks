---
title: Variáveis de Ambiente
---

# Configuração & Variáveis de Ambiente

O projeto **MilLinks** utiliza variáveis de ambiente para gerenciar as configurações em diferentes ambientes (desenvolvimento, homologação e produção).

## Arquivo de Configuração

Crie um arquivo `.env.local` na raiz do projeto para armazenar suas configurações locais.

```bash
# Modelo para .env.local
NEXT_PUBLIC_APP_NAME=Millinks
NEXT_PUBLIC_BASE_URL=http://localhost:3000
API_BASE_URL=https://api.exemplo.com
API_AUTH_URL=/auth/local
API_CLIENT_ID=seu_client_id
API_CLIENT_SECRET=seu_client_secret
```

## Categorias de Variáveis

### Variáveis de Frontend (Públicas do Next.js)

As variáveis prefixadas com `NEXT_PUBLIC_` são acessíveis pelo navegador.

- `NEXT_PUBLIC_APP_NAME`: O nome da aplicação exibido em títulos e no branding.
- `NEXT_PUBLIC_BASE_URL`: A URL base da sua aplicação para a geração de links.

### Variáveis de Servidor (Seguro)

Essas variáveis são acessíveis apenas no lado do servidor Node.js.

- `API_BASE_URL`: A URL raiz da API de backend.
- `API_AUTH_URL`: O endpoint específico para a autenticação M2M.
- `API_CLIENT_ID`: Identificador único para a autenticação do serviço interno.
- `API_CLIENT_SECRET`: A chave secreta para a autenticação do serviço interno (**Mantenha isso em segurança!**).

## Melhores Práticas

- **Nunca Comite Segredos**: Certifique-se de que os arquivos `.env.local`, `.env.production` e outros que contenham segredos estejam listados no seu `.gitignore`.
- **Separação por Ambiente**: Use `.env.development` para trabalho local e `.env.production` para configurações de deploy.
- **Validação**: A aplicação utiliza o **Zod** para validar se todas as variáveis obrigatórias estão presentes antes da aplicação iniciar.
