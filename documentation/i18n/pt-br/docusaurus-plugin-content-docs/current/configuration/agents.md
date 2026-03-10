---
title: Configuração de Agentes de IA
---

# AGENTS.md

O arquivo `AGENTS.md` é uma configuração localizada na raiz do projeto que define regras e diretrizes para assistentes de codificação com IA (Inteligência Artificial) que interagem com o repositório.

## Objetivo

O principal objetivo deste texto é garantir que os agentes de IA operem de maneira adequada e usem o contexto mais atualizado e correto ao propor alterações na base de código do projeto.

## Regras Definidas

### Regras do Next.js

Uma das regras ativas exige que, antes de realizar qualquer tarefa relacionada ao Next.js, o agente de IA leia a documentação oficial e atualizada armazenada localmente no diretório `node_modules/next/dist/docs/`.

Como os modelos de IA são treinados com base em dados históricos, essa técnica garante que o agente siga as diretrizes mais recentes do framework durante o desenvolvimento, evitando sugerir recursos obsoletos ou sofrer "alucinações" em relação ao Next.js.
