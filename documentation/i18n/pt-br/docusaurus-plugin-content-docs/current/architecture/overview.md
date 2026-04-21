---
title: Visão Geral da Arquitetura
---

# Visão Geral da Arquitetura

Este documento descreve os padrões arquiteturais e as decisões de design que regem o desenvolvimento do projeto **MilLinks**.

## Fundamentação Técnica

O MilLinks foi construído com foco em padrões modernos da web e eficiência do desenvolvedor:

- **Next.js 16+**: Utilizando o **App Router** para roteamento aprimorado, Componentes de Servidor para desempenho e um sistema robusto de middleware.
- **Segurança de Tipos**: Construído inteiramente com **TypeScript**, garantindo tipagem forte em todas as camadas, da UI às interações com a API.
- **Estilos Modulares**: Uso do **Material UI (MUI)** combinado com **Emotion** para estilização e layout baseados em temas consistentes.

## Screaming Architecture (Baseada em Funcionalidades)

O projeto segue os princípios da **Screaming Architecture**, onde a estrutura de pastas reflete os casos de uso e as funcionalidades da aplicação, e não a infraestrutura técnica.

- **Isolamento por Funcionalidade**: Cada lógica de domínio (ex: Auth, Links) é encapsulada em seu próprio módulo em `src/features`.
- **Fatias Verticais (Vertical Slices)**: As funcionalidades contêm seus próprios componentes de UI, hooks e lógica relevante, reduzindo as dependências entre domínios.

## Modelo de Camadas

Apesar de ser baseada em funcionalidades, uma separação clara de preocupações horizontais é mantida através de um modelo de camadas claramente definido:

1.  **Camada de UI**: Componentes de apresentação encontrados em `src/components` (globais) e `src/features/*/components` (específicos do domínio).
2.  **Lógica da Aplicação**: Gerenciada por hooks personalizados em `src/features/*/hooks` e provedores de TanStack Query.
3.  **Camada de Serviço**: Lógica de interação com a API desacoplada localizada em `src/services`, permitindo trocas fáceis de backend ou simulações (mocking).
4.  **Utilitários Core (Lib)**: Lógica fundamental de infraestrutura (ex: Gerenciamento de tokens, configuração do Cliente de API) encontrada em `src/lib`.

## Separação de Preocupações (SoC)

Cada componente da arquitetura é projetado com uma única responsabilidade:

- **Persistência de Estado**: Manipulada através de cookies seguros e React Context.
- **Validação de Dados**: Aplicada nas fronteiras (entrada e saída) utilizando o **Zod**.
- **Tema (Theming)**: Isolado em `src/theme` para garantir consistência global sem poluir a lógica do componente.
