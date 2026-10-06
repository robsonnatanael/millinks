---
id: observability
title: Observabilidade
slug: /architecture/observability
---

# Observabilidade

MilLinks incorpora uma pilha robusta de observabilidade para garantir que o desempenho, confiabilidade e a integridade da aplicação possam ser monitorados continuamente. A estratégia de observabilidade é construída com base em padrões modernos de código aberto.

## Tecnologias Utilizadas

- **OpenTelemetry**: Utilizado para gerar e coletar rastreamentos (traces) e métricas do servidor Next.js e das rotas de API.
- **Grafana Faro**: Utilizado para observabilidade no frontend, capturando dados de monitoramento real de usuário (RUM), erros e web vitals diretamente do navegador.

## Monitoramento do Backend (OpenTelemetry)

Usamos OpenTelemetry para instrumentar o backend Next.js. Isso nos permite rastrear requisições de entrada, consultas ao banco de dados e chamadas a APIs externas.

- A configuração está localizada em `instrumentation.ts`.
- Exporta dados de telemetria (traces e métricas) para o nosso backend de observabilidade configurado.

## Monitoramento do Frontend (Grafana Faro)

Para o lado do cliente, utilizamos o Grafana Faro Web SDK.

- A inicialização acontece através do componente `<FaroInit />`.
- Este componente está integrado no arquivo principal `layout.tsx` para garantir que seja carregado em todas as páginas.
- O Faro captura exceções não tratadas, erros no console e métricas de desempenho, enviando-os de volta para análise.

## Verificação de Integridade (Health Checks)

Um endpoint dedicado de health check está disponível para verificar o status da aplicação:

- **Endpoint**: `/health`
- Este endpoint é utilizado por nossos orquestradores de implantação (como Docker Swarm ou Kubernetes) para determinar se a aplicação está rodando e pronta para receber tráfego.
