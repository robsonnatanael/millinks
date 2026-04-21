---
id: overview
title: Visão Geral
slug: /skills/overview
---

# 🛠 Habilidades (Skills) do AI do Projeto

O **MilLinks** utiliza um sistema especializado de "Skills" para codificar o conhecimento do projeto, padrões arquiteturais e fluxos de trabalho de desenvolvimento. Essas habilidades são projetadas para auxiliar tanto desenvolvedores quanto agentes de IA a manter os altos padrões técnicos do projeto.

## O que são Skills?

No contexto deste projeto, uma **Skill** é um conjunto estruturado de instruções, diretrizes e recursos localizados no diretório `skill/`. Cada uma foca em um domínio específico da aplicação, como gerenciamento de documentação, desenvolvimento de API ou estilização de UI.

## Por que usar Skills?

- **Consistência**: Garante que todos os colaboradores (humanos ou IA) sigam os mesmos padrões arquiteturais (ex: Screaming Architecture, SoC).
- **Eficiência**: Fornece acesso rápido a comandos comuns, fluxos de trabalho e check-lists.
- **Preparado para IA**: Projetado para ser facilmente processado e seguido por assistentes de codificação de IA, garantindo que atuem como colaboradores especialistas.

## Skills Disponíveis

Atualmente, as seguintes habilidades estão disponíveis:

- **[Gerenciamento de Documentação](./documentation-management.md)**: Diretrizes para manter e internacionalizar a documentação do MilLinks.

## Como usar Skills

Cada habilidade está localizada em seu próprio subdiretório dentro da pasta `skill/`. Uma Skill consiste em:

- `SKILL.md`: O ponto de entrada principal com regras, fluxos de trabalho e comandos.
- `resources/`: (Opcional) Modelos, check-lists ou ativos estáticos.
- `examples/`: (Opcional) Exemplos práticos da habilidade em ação.

Desenvolvedores (e agentes de IA) devem ler o `SKILL.md` relevante antes de iniciar o trabalho em uma funcionalidade ou domínio específico.
