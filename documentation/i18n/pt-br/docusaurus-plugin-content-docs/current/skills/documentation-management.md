---
id: documentation-management
title: Gerenciamento de Documentação
slug: /skills/documentation-management
---

# 📚 Habilidade de Gerenciamento de Documentação

A habilidade de **Gerenciamento de Documentação** fornece uma estrutura abrangente para manter, estender e internacionalizar a documentação do **MilLinks**. Ela garante que o site de documentação reflita a alta qualidade técnica e os princípios arquiteturais do projeto.

## 🏛 Arquitetura e Princípios de Design

A documentação DEVE seguir estas regras fundamentais:

1.  **Separação de Preocupações (SoC)**:
    - **Guias Estratégicos**: Focados em "Por quê" e "O quê" (conceitos, padrões).
    - **Guias Técnicos**: Focados em "Como" (comandos, configurações).
2.  **Screaming Architecture**: As estruturas de pastas devem refletir funcionalidades (ex: `core-services/`, `architecture/`).
3.  **Paridade de Idioma**: Cada documento em Inglês (`docs/`) DEVE ter uma versão correspondente em Português (`i18n/pt-br/...`).
4.  **Estética Premium**:
    - **Cores**: Azul (`#0077b6`) e Ciano (`#00b4d8`).
    - **Imagens**: Use ilustrações geradas por IA modernas e tecnológicas (PNG) para as funcionalidades.

## 📂 Estrutura de Diretórios

A fonte da documentação está localizada na pasta `documentation/`:

```text
documentation/
├── docs/                # Inglês (Fonte Original)
├── i18n/pt-br/         # Português (Tradução)
│   └── docusaurus-plugin-content-docs/
│       └── current/      # Arquivos MD traduzidos
├── src/
│   ├── components/      # Componentes React (ex: HomepageFeatures)
│   └── css/             # Estilos globais (custom.css)
├── static/img/          # Ativos otimizados (logo.png, feature-images.png)
├── docusaurus.config.ts  # Configuração principal
└── sidebars.ts          # Estrutura de navegação
```

## 🔄 Fluxos de Trabalho do Ciclo de Vida

### 1. Adicionando Novo Conteúdo

1.  Adicione o arquivo Markdown em Inglês em `documentation/docs/<domínio>/<nome-do-arquivo>.md`.
2.  Adicione a tradução em Português em `documentation/i18n/pt-br/docusaurus-plugin-content-docs/current/<domínio>/<nome-do-arquivo>.md`.
3.  Garanta que AMBOS os arquivos tenham **id**, **title** e **slug** consistentes no frontmatter.
4.  Atualize `documentation/sidebars.ts` para incluir o novo caminho.
5.  **Importante**: Para links internos, SEMPRE use caminhos relativos ao arquivo Markdown (ex: `[rótulo](./outro-doc.md)`). EVITE URLs baseadas em caminho (ex: `/docs/categoria/doc`).

### 2. Manutenção da Barra Lateral

- A barra lateral usa mapeamento manual.
- Sempre agrupe itens relacionados em categorias.
- Se uma categoria for adicionada, extraia as traduções usando:
  ```bash
  cd documentation && yarn write-translations --locale pt-br
  ```

### 3. Localização (i18n)

- Traduza as strings da UI em `documentation/i18n/pt-br/code.json`.
- Traduza os rótulos da barra lateral em `documentation/i18n/pt-br/docusaurus-plugin-content-docs/current.json`.

## 🛠 Comandos Necessários

| Tarefa                    | Comando                                                      |
| :------------------------ | :----------------------------------------------------------- |
| **Executar Docs EN**      | `yarn docs:dev`                                              |
| **Executar Docs PT**      | `yarn docs:dev:pt`                                           |
| **Compilar (Build) Docs** | `yarn docs:build`                                            |
| **Extrair i18n**          | `cd documentation && yarn write-translations --locale pt-br` |

## 🧪 Check-list de Validação

- [ ] O conteúdo está primeiro em Inglês, depois em Português?
- [ ] Existe uma separação clara entre conteúdo conceitual e técnico?
- [ ] A barra lateral reflete a nova estrutura?
- [ ] As chaves de tradução foram atualizadas em `current.json` para novas categorias?
- [ ] As imagens seguem a estética tecnológica moderna do projeto?
- [ ] Todos os links internos estão usando caminhos relativos a arquivos `.md` (sem URLs fixas)?
