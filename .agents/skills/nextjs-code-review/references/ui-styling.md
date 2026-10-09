# UI e Estilização (Tailwind CSS + shadcn/ui)

## Tailwind CSS

- Estilização deve ser feita com classes utilitárias do Tailwind. CSS custom (arquivo `.css` separado, `styled-components`, `style={{}}` inline) para algo que Tailwind já resolve é 🔵 Baixo/Sugestão — exceção: animações complexas, keyframes, ou casos que o Tailwind não cobre bem.
- Uso do helper `cn()` (`clsx` + `tailwind-merge`, geralmente em `lib/utils.ts`) ao combinar classes condicionais ou ao permitir que um componente receba `className` de fora. Concatenar strings de classe manualmente (`` `base-class ${condition ? 'a' : 'b'}` ``) sem `cn()` é 🔵 Baixo, mas pode virar 🟡 Médio se causar classes conflitantes não resolvidas (ex: duas classes de padding diferentes aplicadas ao mesmo tempo sem merge).
- Classes utilitárias repetidas em vários componentes que poderiam ser extraídas para uma variante reutilizável (via `cva` — ver shadcn/ui abaixo) ou um componente compartilhado.
- Valores arbitrários (`w-[123px]`, `text-[#1a1a1a]`) usados no lugar de tokens do design system/tema já configurados no `tailwind.config` — sinalizar quando um token equivalente já existe.
- Classes condicionais complexas diretamente no JSX deixando o componente difícil de ler — sugerir extrair para uma função/variável ou usar `cva`.

## shadcn/ui

- Componentes de UI genéricos (botão, input, dialog, dropdown, select, toast, etc.) devem vir do shadcn/ui em vez de reimplementados do zero. Reimplementação duplicando algo que já existe em `components/ui/*` é 🟡 Médio.
- Como os componentes shadcn/ui são copiados para o repositório (`components/ui/*`), diferenciar dois casos:
  - **Customização direta no arquivo em `components/ui/*`**: aceitável, já que o componente "pertence" ao projeto — mas verificar se a mudança não quebra a API esperada pelo resto do código (props, variantes).
  - **Customização via `className`/composição** ao usar o componente em outro lugar: preferível quando a mudança é específica de um caso de uso, para não afetar todos os usos do componente.
- Variantes customizadas devem usar o padrão `cva` (`class-variance-authority`) já usado pelos componentes shadcn, em vez de props booleanas soltas tipo `isPrimary`, `isLarge` controlando classes manualmente.
- Verificar se props de acessibilidade que os componentes Radix/shadcn já expõem (ex: `aria-label` em ícones sem texto, `disabled`, foco) estão sendo usadas — não remover atributos de acessibilidade que vêm por padrão do componente.
- Composição de componentes (ex: `<Dialog><DialogTrigger/><DialogContent/></Dialog>`) deve seguir o padrão de sub-componentes do shadcn/Radix, não misturar com controle manual de estado (`useState` para abrir/fechar) quando o componente já suporta `open`/`onOpenChange` de forma controlada ou não-controlada — misturar as duas formas é uma causa comum de bugs sutis (🟡 Médio).
