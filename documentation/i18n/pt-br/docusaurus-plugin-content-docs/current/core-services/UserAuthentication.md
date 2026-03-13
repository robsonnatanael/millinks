---
title: Autenticação de Usuário
---

# Fluxo de Autenticação de Usuário

Este documento descreve a implementação do sistema de autenticação de usuários, incluindo o fluxo de login, validação de formulários e proteção de rotas.

## Visão Geral

A autenticação é baseada em tokens JWT (JSON Web Token). O sistema utiliza o Next.js App Router e gerencia o estado de autenticação de forma segura, utilizando cookies para persistência do token.

## Componentes Principais

### 1. Formulário de Login (`LoginForm.tsx`)

O `LoginForm` é o ponto de entrada para a autenticação do usuário.

- **Validação**: Utiliza a biblioteca `zod` para validação robusta dos campos (e-mail e senha) no lado do cliente.
- **Gerenciamento de Estado**: Utiliza `react-hook-form` para gerenciar o estado e as mensagens de erro do formulário.
- **Feedback Visual**: Exibe estados de carregamento (_loading_) e mensagens de erro amigáveis caso o login falhe.

### 2. Lógica de Autenticação (`useAuth.ts`)

O hook customizado `useAuth` centraliza a lógica de autenticação.

- **Login**: Envia as credenciais para a rota de autenticação da nossa API.
- **Persistência**: Ao realizar o login com sucesso, o JWT recebido é armazenado em um cookie seguro (`auth_token`).
- **Logout**: Remove o cookie de autenticação e redireciona o usuário para a página de login.

### 3. Proteção de Rotas (`proxy.ts`)

A segurança é reforçada no nível do servidor através do Next.js Proxy.

- **Interceptação**: Cada requisição para as páginas internas (ex: `/dashboard`, `/links`) é interceptada.
- **Verificação**: O proxy verifica a presença e validade do cookie `auth_token`.
- **Redirecionamento**: Caso o usuário não esteja autenticado, ele é redirecionado automaticamente para a página de `/login`.

## Fluxo de Login (Passo a Passo)

1.  O usuário preenche o formulário em `/login` com seu identificador (e-mail) e senha.
2.  O `LoginForm` valida os dados localmente; se válidos, chama a função de login.
3.  Uma requisição `POST` é enviada para `/api/auth/login`.
4.  O servidor valida as credenciais. Se corretas, retorna um JWT.
5.  O cliente recebe o JWT, armazena-o no cookie e redireciona o usuário para a área restrita (`/`).
6.  Em cada requisição subsequente, o proxy garante que o cookie de autenticação ainda é válido.

## Segurança e Melhores Práticas

- **Cookies HTTP Only**: Os tokens de autenticação são armazenados com a flag `HttpOnly` sempre que possível para evitar ataques XSS.
- **Transporte Seguro**: Todo o fluxo de autenticação deve ocorrer obrigatoriamente sobre HTTPS em produção.
- **Validação Dupla**: Os dados são validados tanto no cliente (para melhor experiência do usuário) quanto no servidor (para garantir a integridade dos dados).
- **Senhas**: As senhas nunca são armazenadas em texto puro no banco de dados e são criptografadas utilizando algoritmos modernos de hashing (como bcrypt) no backend.
