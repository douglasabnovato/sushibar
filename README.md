> **Projeto de estudo (N1).** Estado conferido em 16/11/2026: 10 de 10 critérios aplicáveis atendidos, com teste no navegador e axe no CI; MVP finalizado. O site ainda não está no ar (#10). Detalhes em [docs/MVP.md](docs/MVP.md) e plano do ciclo em [docs/PLANO-DE-ACAO.md](docs/PLANO-DE-ACAO.md).

<h4 align="center">
	🍣 Sushibar 🚀
</h4>

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="versão 1 do projeto" title="#cardapio" src="./.github/tela-1.jpg" >
</p>

Site mobile-first de um restaurante japonês: destaques, cardápio por categoria com busca, bebidas e a página "Nosso espaço" com reserva pelo WhatsApp. Layout no [Figma](https://www.figma.com/file/UiLvyL3UxGZt15t0IDcP80/Sushibar?node-id=0%3A1&t=zffdeG1GjpNHWrwe-0).

## 🧠 O que aprendi

> Proposta de 01/11/2026, escrita a partir do código e das dependências. Ajuste com a sua experiência.

- Exportar um site estático com Next.js e Pages Router.
- Ler o cardápio no build, com Supabase opcional e reserva local.
- Tratar falha externa sem derrubar o build.
- Testar a montagem do cardápio com Vitest.

## Publicação

- Fora do ar: https://douglasabnovato.github.io/sushibar/ dá 404 em 16/11/2026, porque o GitHub Pages não está ligado ([#10](https://github.com/douglasabnovato/sushibar/issues/10)). Para ver o projeto, rode localmente (seção "Como executar").
- Hospedagem prevista: GitHub Pages (gratuito), publicado pelo GitHub Actions a cada push na `main`, depois que o responsável ligar o Pages e criar a variável `PAGES_VIA_ACTIONS=true`.
- Passo a passo: [docs/DEPLOY.md](docs/DEPLOY.md)

## Estado e próximos passos (ciclo de 16/11/2026)

Sem site publicado: o GitHub Pages não está ligado, e `douglasabnovato.github.io/sushibar/` dá 404 em 16/11/2026 ([#10](https://github.com/douglasabnovato/sushibar/issues/10)). Para ver o projeto, rode localmente.

**O que foi feito**
- Teste no navegador (Playwright) do fluxo principal, com axe nas 5 páginas e teste de teclado, no job `e2e` do CI; link "Pular para o conteúdo" e foco visível; testes de falha do Supabase; 13 arquivos sem uso removidos; dependências de produção em patch e minor; publicação travada por variável até o Pages ser ligado ([#23](https://github.com/douglasabnovato/sushibar/pull/23)).
- `main` protegida pelo ruleset `principal-protegida` e workflow único com publicação no Pages só na `main` ([#20](https://github.com/douglasabnovato/sushibar/pull/20)).
- Busca no cardápio, setas nas abas e contraste corrigido no modo escuro do sistema ([#16](https://github.com/douglasabnovato/sushibar/pull/16)).
- Código antigo sem uso removido, incluindo `helpers/translator.ts` ([#7](https://github.com/douglasabnovato/sushibar/pull/7), [#16](https://github.com/douglasabnovato/sushibar/pull/16)).
- MVP de estudo registrado ([#8](https://github.com/douglasabnovato/sushibar/pull/8)).

**O que queremos fazer**
- [#10](https://github.com/douglasabnovato/sushibar/issues/10) Publicar o site no GitHub Pages (responsável).
- [#24](https://github.com/douglasabnovato/sushibar/issues/24) Exigir o job `e2e` no ruleset da `main` (responsável).
- [#25](https://github.com/douglasabnovato/sushibar/issues/25) Ligar os alertas do Dependabot (responsável).
- [#15](https://github.com/douglasabnovato/sushibar/issues/15) Decidir se cardápio e WhatsApp continuam ilustrativos (responsável).
- [#26](https://github.com/douglasabnovato/sushibar/issues/26) Página 404 em português com o menu.
- [#28](https://github.com/douglasabnovato/sushibar/issues/28) Teclado na página inicial e no Nosso espaço.
- [#12](https://github.com/douglasabnovato/sushibar/issues/12) Etiquetas de dieta e alérgenos com filtro.
- [#13](https://github.com/douglasabnovato/sushibar/issues/13) Testes de componente do cardápio.
- [#27](https://github.com/douglasabnovato/sushibar/issues/27) Tailwind e TypeScript na versão maior.

**Onde está a documentação**
- Estado e critérios: [docs/MVP.md](docs/MVP.md).
- Plano do ciclo: [docs/PLANO-DE-ACAO.md](docs/PLANO-DE-ACAO.md), seção "Ciclo de 16/11/2026".
- Publicação: [docs/DEPLOY.md](docs/DEPLOY.md).
- Arquitetura e decisões: [docs/ARQUITETURA.md](docs/ARQUITETURA.md).

## Stack

Next.js 16 (Pages Router, exportação estática) · React 19 · Tailwind CSS 3 · Supabase (opcional)

## Como executar

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # 15 testes (Vitest)
npm run build   # gera out/ (site estático publicado em /sushibar)
npx playwright install chromium   # uma vez, antes do teste no navegador
npm run test:e2e                  # 9 testes no navegador (Playwright + axe), servindo out/ em http://localhost:4317/sushibar/
```

## De onde vem o cardápio

- Sem configuração: `data/menu.ts` (itens e preços ilustrativos — edite com os reais).
- Com Supabase: copie `.env.example` para `.env.local` e preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Tabelas: `categories (id, title)` e `products (id, title, description, price, main_image, category_id, featured)`. O cardápio é lido no build: depois de alterar o Supabase, rode o workflow de novo (Actions → CI → Run workflow). Se o Supabase falhar no build, o site usa o cardápio local.
- WhatsApp de reservas e aviso de demonstração: `lib/site.ts`.

## Qualidade (16/11/2026)

| Medida | Resultado |
|---|---|
| `npm test` | 15 de 15 testes passam |
| `npm run test:e2e` | 9 de 9 passam: fluxo do cardápio, axe (WCAG A e AA) sem violações nas 5 páginas, teclado e sistema em modo escuro (o app não tem tema escuro próprio: força o claro) |
| `npm audit --omit=dev` | 0 vulnerabilidades |
| Lighthouse | Não medido: o site não está no ar e, em N1, o critério não se aplica |

Detalhes em [docs/MVP.md](docs/MVP.md), [docs/ANALISE.md](docs/ANALISE.md) e [docs/ARQUITETURA.md](docs/ARQUITETURA.md).

## Publicação gratuita

GitHub Pages: o site é exportado como HTML estático (`output: 'export'` em `next.config.js`) e publicado pelo workflow `.github/workflows/ci.yml` (job `deploy`, só na `main` e só com a variável `PAGES_VIA_ACTIONS=true`), assim que o Pages for ligado (#10). Se usar Supabase, cadastre as duas variáveis em Settings → Secrets and variables → Actions → **Variables**. Se o nome do repositório mudar, ajuste `repoBasePath` em `next.config.js`. Passo a passo em [docs/DEPLOY.md](docs/DEPLOY.md).
