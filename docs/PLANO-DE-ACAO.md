# Plano de ação — Sushibar

Timebox: 45 min.

| MoSCoW | Item | Ganho | Esforço | Status |
|---|---|---|---|---|
| Must | Build funcionando (D1–D3) | Alto | Médio | ✅ |
| Must | Atualizar Next (D4) | Alto | Baixo | ✅ |
| Should | Remover nota fixa (D5) | Médio | Baixo | ✅ |
| Should | Abas acessíveis, contraste, reserva (D6) | Alto | Baixo | ✅ |
| Should | Preencher cardápio e WhatsApp reais | Alto | Baixo | ⏳ ação sua |
| Could | Pedido online (carrinho) | Alto | Alto | Próximo ciclo |

## Ciclo de 03/11/2026

> Branch `feature/2026-11-03` → `developer/sprint-2026-11-05` → `main`. Nível: Estudo (N1), 10 critérios aplicáveis (5 e 7 não se aplicam).

### Produto

**Problema e público.** Quem visita o site de um restaurante japonês quer achar um prato e o preço dele rápido, no celular. Para o autor, é um estudo de Next.js com exportação estática.

**Hipótese e meta.** Achar o preço de um prato em até 2 cliques. Com a busca, basta digitar parte do nome. Em N1 não há medição; a meta fica como proposta.

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| Abas no padrão APG | Só a aba ativa entra na ordem do Tab; setas trocam de aba e dão a volta; Home e End vão às pontas; o painel recebe foco quando não tem controle dentro. Antes, cada aba era uma parada do Tab e as setas não faziam nada | [W3C APG: padrão Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), [W3C APG: tabpanel](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/) |
| Busca e filtros em cardápio digital | Cardápios digitais deixam procurar e filtrar pratos. Fizemos a busca por nome e descrição, sem ligar para acento. Etiquetas de dieta e alérgenos viraram issue (#12) | [me&u: etiquetas de dieta e alérgenos](https://www.meandu.com/us/blog/why-you-should-use-dietary-and-allergen-tags-in-your-digital-menu), [Kitchen Cut: alérgenos no cardápio online](https://support.kitchencut.com/online-menus-allergens-suitable-for) |
| Next.js exportado no GitHub Pages | O caminho comum é `output: "export"`, `basePath` do repositório, artefato `out/` e `actions/deploy-pages`, com a origem do Pages em "GitHub Actions". O projeto já tem tudo isso, menos o Pages ligado (#10) | [Discussão da comunidade GitHub](https://github.com/orgs/community/discussions/191018), [nextjs/deploy-github-pages](https://github.com/nextjs/deploy-github-pages) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | Tirar os dados raspados da Target que sobraram (`helpers/translator.ts`, 547 KB, sem uso) | Alto | Baixo | Este ciclo |
| 2 | Texto legível com o modo escuro do sistema | Alto | Baixo | Este ciclo |
| 3 | Régua N1 e critério 10 conforme a proteção da `main` | Alto | Baixo | Este ciclo |
| 4 | CI também na `developer` | Alto | Baixo | Este ciclo |
| 5 | Busca no cardápio | Médio | Baixo | Este ciclo |
| 6 | Setas nas abas (padrão APG) | Médio | Baixo | Este ciclo |
| 7 | Ligar o Pages | Alto | Baixo | Responsável (#10) |
| 8 | Proteger a `main` | Alto | Baixo | Responsável (#11) |
| 9 | Etiquetas de dieta e alérgenos | Médio | Médio | Issue (#12) |
| 10 | Testes de interface | Médio | Médio | Issue (#13) |
| 11 | Axe no CI | Médio | Médio | Issue (#14) |
| 12 | Cardápio e WhatsApp: ilustrativos ou reais | Médio | Baixo | Responsável (#15) |

**Fora do escopo.** Pedido e pagamento, carrinho, medição de uso.

### Engenharia

**Arquitetura.** Next.js 16 com Pages Router e exportação estática (`out/`, `basePath` `/sushibar`). O cardápio é lido no build por `lib/menu.ts`: Supabase quando configurado, senão `data/menu.ts`. A busca (`searchItems`) e o teclado das abas (`lib/tabs.ts`) são funções puras; `components/CategoryMenu.tsx` liga as duas à tela.

**Riscos.**
- A busca roda no navegador sobre o cardápio exportado. Com centenas de itens, seria bom medir; com 11, não pesa.
- Os testes cobrem as funções, não a tela (#13). A tela foi conferida à mão no build servido localmente.
- Sem Pages ligado, não há site para conferir (#10).

**Qualidade.**
- Testes: 12 (eram 4), com busca sem acento, várias palavras, menos de 2 letras, resultado vazio e teclas das abas.
- CI: agora também em push e PR para `developer/**`.
- Acessibilidade: campo de busca com rótulo, resultado anunciado por `aria-live`, abas com setas, painel com `aria-labelledby`; texto escuro sobre fundo claro também no modo escuro do sistema.
- Desempenho: não se aplica (N1).
- Segurança e conformidade: saem 547 KB de dados de produtos da Target, que não eram do projeto.

**Definição de pronto.** `npm ci`, `npm test` e `npm run build` passam; CI verde nos dois PRs; `docs/MVP.md` e README atualizados.

### Plano de ação

**Este ciclo executa.**
1. Remove `helpers/translator.ts`.
2. Corrige o contraste no modo escuro do sistema.
3. Busca no cardápio e setas nas abas, com testes.
4. CI na `developer`.
5. Régua N1 no `MVP.md`; README com próximos passos e sem link quebrado.

**Vira issue.** #10, #11 e #15 (responsável); #12, #13 e #14 (agente).

## Ciclo de 16/11/2026

> Branch `feature/2026-11-16` → `developer/sprint-2026-11-12` (o PR #21 para a `main` segue aberto) → `main`. Nível: Estudo (N1), 10 critérios aplicáveis.

### Produto

**Problema e público.** Quem visita o site de um restaurante japonês quer achar um prato e o preço no celular, também pelo teclado e com o sistema em modo escuro. Para o autor, é um estudo de Next.js com exportação estática.

**Hipótese e meta.** Acreditamos que a busca e as abas com setas deixam achar o preço de um prato em até 2 ações (2 cliques, ou digitar parte do nome). Saberemos quando um teste no navegador, no CI, achar o preço de "salmão" pela busca e trocar de categoria pelo teclado, sem violação do axe nos temas claro e escuro.

**O que a análise achou.** O `docs/MVP.md` dizia 10 de 10, mas três "Atende" não tinham a evidência que a régua pede: o critério 3 não tinha teste no navegador no CI, o 8 se apoiava num axe manual de 02/11 e o 2 não tinha o "saberemos quando". Além disso, o job `deploy` falharia na `main` até o Pages ser ligado (#10).

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| axe dentro do teste do Playwright | `@axe-core/playwright` roda na página aberta pelo teste e devolve as violações; filtrar pelas tags WCAG A e AA | [Playwright: testes de acessibilidade](https://playwright.dev/docs/accessibility-testing) |
| Tema escuro emulado | `colorScheme: "dark"` no projeto do Playwright emula `prefers-color-scheme`; o mesmo teste roda nos dois temas | [Playwright: emulação](https://playwright.dev/docs/emulation) |
| Servidor do teste | `webServer` do Playwright sobe o servidor antes dos testes; aqui ele serve o `out/` em `/sushibar`, como o Pages | [Playwright: servidor web](https://playwright.dev/docs/test-webserver) |
| Link "Pular para o conteúdo" | Um link no topo, visível ao receber foco, leva direto ao conteúdo principal e evita passar pelo menu em cada página | [W3C: técnica G1 da WCAG](https://www.w3.org/WAI/WCAG22/Techniques/general/G1) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | Patch e minor das dependências de produção | Alto | Baixo | Este ciclo |
| 2 | Job `deploy` travado por variável até o Pages ser ligado | Alto | Baixo | Este ciclo |
| 3 | Teste Playwright do fluxo principal com axe nos dois temas, nas 5 páginas, e job `e2e` no CI | Alto | Médio | Este ciclo (#14) |
| 4 | Link "Pular para o conteúdo", com teste de teclado | Médio | Baixo | Este ciclo |
| 5 | `MVP.md` com evidência de comando, data e resultado em cada "Atende" | Alto | Baixo | Este ciclo |
| 6 | Ligar o Pages e criar a variável | Alto | Baixo | Responsável (#10) |
| 7 | Exigir o job `e2e` no ruleset | Médio | Baixo | Responsável (issue nova) |
| 8 | Etiquetas de dieta e alérgenos | Médio | Médio | Issue (#12) |
| 9 | Testes de componente com jsdom | Médio | Médio | Issue (#13) |

**Fora do escopo.** Pedido e pagamento, medição de uso, migrar para o App Router.

### Engenharia

**Arquitetura.** Sem mudança: Next.js 16 com Pages Router e exportação estática (`out/`, `basePath` `/sushibar`). O teste de ponta a ponta serve o `out/` dentro de uma pasta `sushibar/`, para as URLs baterem com as do Pages.

**Riscos.**
- O `playwright install` no `ubuntu-latest` pode demorar; o job `e2e` instala só o Chromium.
- Sem a variável `PAGES_VIA_ACTIONS`, o site não é publicado mesmo com o Pages ligado; o `DEPLOY.md` e a #10 dizem isso.

**Qualidade.**
- Testes: os 12 do Vitest seguem; entram os testes do Playwright (fluxo, axe nas 5 páginas em claro e escuro, teclado).
- Acessibilidade: axe sem violações WCAG A e AA, foco visível e link de pular.
- Desempenho: não se aplica (N1).
- Segurança: `npm audit --omit=dev` com 0 vulnerabilidades; sem segredo no código.

**Definição de pronto.** `npm test`, `npm run build` e `npm run test:e2e` passam localmente; CI verde (jobs `raiz` e `e2e`) no PR para a sprint; `docs/MVP.md`, README e `DEPLOY.md` atualizados.

### Plano de ação

**Este ciclo executa.** Itens 1 a 5 do backlog.

**Vira issue.** #10 e #15 seguem com o responsável; issue nova para exigir o `e2e` no ruleset; #12 e #13 seguem; issues novas para o teste de teclado do menu, para o Lighthouse quando o site subir e para o tamanho das imagens.
