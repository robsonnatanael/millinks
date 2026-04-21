---
title: Localização (i18n)
---

# Guia de Localização (i18n)

A documentação do MilLinks oferece suporte a vários idiomas para atingir um público mais amplo. Atualmente, oferecemos suporte ao **Inglês (padrão)** e ao **Português (Brasil)**.

## Como Funciona o i18n

Utilizamos o sistema nativo de internacionalização (i18n) do Docusaurus. O conteúdo é dividido entre a pasta `docs/` principal e a pasta `i18n/`.

### Estrutura de Diretórios

- **Inglês (Fonte)**: `documentation/docs/*.md`
- **Português (Tradução)**: `documentation/i18n/pt-br/docusaurus-plugin-content-docs/current/*.md`

## Fluxo de Tradução

Ao adicionar uma nova página ou atualizar uma página existente, certifique-se de que as alterações sejam refletidas em ambos os idiomas.

1.  **Rascunho em Inglês**: Crie ou modifique o arquivo no diretório `docs/`.
2.  **Traduzir para o Português**: Crie uma estrutura de arquivo idêntica no caminho `i18n/pt-br/...` e traduza o conteúdo.
3.  **Sincronizar Frontmatter**: Garanta que os campos como `id`, `title` e `slug` sejam consistentes (embora o `title` deva ser traduzido).

## Localizando Strings do Tema

Algumas partes da interface (navbar, footer, rótulos de botões) são armazenadas em arquivos JSON.

1.  Navegue até o diretório `documentation/`.
2.  Execute o comando de extração:
    ```bash
    yarn write-translations --locale pt-br
    ```
3.  Edite os arquivos JSON gerados em `i18n/pt-br/`:
    - `code.json`: Strings gerais da interface.
    - `docusaurus-theme-classic/navbar.json`: Itens de navegação.
    - `docusaurus-theme-classic/footer.json`: Títulos e links do rodapé.

## Pré-visualizando suas Alterações

Para verificar suas traduções localmente:

```bash
# Pré-visualizar em Inglês
yarn docs:dev

# Pré-visualizar em Português
yarn docs:dev:pt
```
