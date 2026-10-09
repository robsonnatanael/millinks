# Qualidade geral

## TypeScript

- Uso de `any` onde um tipo específico seria simples de definir — 🟡 Médio (🔵 se for um caso genuinamente difícil de tipar).
- Props de componente sem interface/type definida, ou com tipos implícitos.
- Uso de `as` para forçar tipo sem necessidade real (mascarando um erro de tipagem real).
- Retorno de função assíncrona sem tipo explícito quando a inferência fica pouco clara.

## Tratamento de erro

- `try/catch` vazio, ou catch que só faz `console.log` e segue o fluxo como se nada tivesse acontecido.
- Chamadas assíncronas (fetch, query ao banco, Server Action) sem nenhum tratamento de erro visível para o usuário.
- Falta de `error.tsx` em rotas que podem falhar de forma esperada (ex: recurso não encontrado).

## Testes

- Lógica de negócio não trivial (cálculos, regras de validação, transformação de dados) sem nenhum teste associado — sinalizar como sugestão (🟡 Médio se o projeto já tem cultura de testes e o PR quebra o padrão).
- Não exigir 100% de cobertura nem testes para componentes puramente visuais, a menos que o usuário peça isso explicitamente.

## Acessibilidade

- Imagens sem `alt` (ou com `alt` genérico tipo "imagem").
- Elementos clicáveis usando `<div onClick>` em vez de `<button>`/`<a>` semânticos, sem `role`/`tabIndex`/suporte a teclado.
- Formulários sem `<label>` associado aos inputs.
- Contraste ou tamanho de fonte não é algo para inferir do código — não sinalizar sem certeza visual.

## Consistência e manutenibilidade

- Duplicação de lógica que já existe em outro lugar do código (quando isso for identificável pelo contexto fornecido).
- Nomenclatura inconsistente com o resto do arquivo/projeto (ex: misturar `camelCase` e `snake_case` sem motivo).
- Componentes muito grandes fazendo múltiplas responsabilidades (fetching + lógica de negócio + apresentação) — sugerir separação, sem exigir refatoração completa.
- Magic numbers/strings repetidos que poderiam ser constantes nomeadas.
