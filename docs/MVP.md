# MVP — sushibar

> Criado em 02/11/2026. Revisto em 16/11/2026 (`docs/PLANO-DE-ACAO.md`, seção "Ciclo de 16/11/2026") e de novo às 12h23, com os alertas do Dependabot ligados (critério 9). Testado no Windows com Node 24 e no CI com Node 22. Não houve teste com pessoas nem em aparelho real.

**Nível:** Estudo (N1). Os critérios 5 e 7 não se aplicam e saem da conta.

**Resumo:** 10 de 10 aplicáveis atendidos

**Finalizado:** sim. Os 10 critérios aplicáveis atendem com comando, data e resultado. O que segue com o responsável tem issue com `depende-do-responsavel`: ligar o Pages (#10), decidir se cardápio e WhatsApp seguem ilustrativos (#15), exigir o job `e2e` no ruleset (#24) e fechar a issue dos alertas do Dependabot, já ligados (#25).

## 1. Critérios: 10 de 10 aplicáveis atendidos

Evidência do CI: run [43799300472](https://github.com/douglasabnovato/sushibar/actions/runs/43799300472) do PR #23, jobs `raiz` (Vitest e build) e `e2e` (Playwright com axe), no commit `4a9b9e1`, em 16/11/2026: verdes, 15 testes do Vitest e 9 do Playwright passando, sem repetição. As correções da revisão independente vieram depois e passaram localmente (15 e 9 testes); o run do último commit do PR está no corpo do PR.

| # | Critério | Como verificar | Situação em 16/11/2026 | Evidência |
|---|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende | Seção 2: quem visita o site de um restaurante japonês quer achar um prato e o preço no celular |
| 2 | Hipótese a validar | Aposta escrita, com meta | Atende | Seção 2, com meta e "saberemos quando" ligado ao teste do critério 3 |
| 3 | Fluxo principal completo | Teste no navegador no CI | Atende | `npm run test:e2e`, 16/11/2026: 9 de 9 passam localmente e no job `e2e` do CI. O teste vai do menu ao cardápio, busca "salmão" (4 itens, com preço), busca sem resultado e troca de aba por seta e End (`e2e/fluxo.e2e.ts`) |
| 4 | Escopo enxuto | Seção "Fora do MVP" | Atende | Seção 3 |
| 5 | Medição de uso | — | Não se aplica (N1) | — |
| 6 | Falhas tratadas | Testes de falha, vazio e espera | Atende | `npm test`, 16/11/2026: 15 de 15 passam. Supabase ausente, com erro na consulta, fora do ar ou com tabela vazia usa o cardápio local (`tests/menu.test.ts` e `tests/menu-falha.test.ts`); busca sem resultado tem mensagem (`tests/busca-e-abas.test.ts`) e é conferida no navegador (`e2e/fluxo.e2e.ts`); rota inexistente devolve a página 404. O site é estático: o cardápio vem no HTML, sem espera de rede na tela |
| 7 | Desempenho aceitável | — | Não se aplica (N1) | Site fora do ar (#10) |
| 8 | Acessibilidade básica | axe e teclado no teste do navegador | Atende | `npm run test:e2e`, 16/11/2026: axe (WCAG 2.0, 2.1 e 2.2 A e AA) sem violações nas 5 páginas, em largura de desktop, com o cardápio local; teclado: o 1º Tab mostra "Pular para o conteúdo", Enter leva ao conteúdo, foco visível com contorno de 3 px, setas e End nas abas. O app não tem tema escuro próprio: força o claro, e um teste confere que, com o sistema em modo escuro, a tela segue clara e sem violações |
| 9 | Segurança e conformidade | `npm audit --omit=dev` e Dependabot | Atende | `gh api "repos/douglasabnovato/sushibar/dependabot/alerts?state=open&per_page=100"`, 16/11/2026 12h23: 0 alertas abertos; `npm ci` e `npm audit --omit=dev`, 16/11/2026 12h23 a 12h49: found 0 vulnerabilities. Sem segredo no código: as variáveis do Supabase são públicas e ficam em Variables. O site não coleta dados |
| 10 | Entrega confiável | CI nos PRs e principal protegida | Atende | `gh api repos/douglasabnovato/sushibar/rules/branches/main`, 16/11/2026: `deletion`, `non_fast_forward`, `pull_request` e `required_status_checks` (`raiz`). Exigir também o `e2e` fica com o responsável (#24) |
| 11 | Testes dos fluxos críticos | Testes no CI, sem `skipped` | Atende | Run 43799300472: job `raiz` com 15 testes do Vitest e job `e2e` com 9 testes do Playwright, nenhum pulado |
| 12 | Documentação honesta | README com comandos conferidos | Atende | Comandos do README conferidos com o `package.json` em 16/11/2026 (`dev`, `build`, `test`, `test:e2e`); sem link publicado, porque o site dá 404 |

**Revisão de 16/11/2026.** O resumo anterior dizia 10 de 10, mas 4 "Atende" não tinham a evidência da régua: 2 (sem "saberemos quando"), 3 (sem teste no navegador no CI), 8 (axe manual de 02/11) e 9 (sem comando do audit). Contagem real antes deste ciclo: 6 de 10.

## 2. Problema e hipótese

**Problema e público.** Quem visita o site de um restaurante japonês quer achar um prato e o preço no celular, também pelo teclado. Para o autor, é um estudo de Next.js com exportação estática.

**Hipótese.** Acreditamos que a busca e as abas com setas deixam achar o preço de um prato em até 2 ações (2 cliques, ou digitar parte do nome). Meta: o preço aparece sem passar por mais de uma tela depois do início. Saberemos quando o teste do navegador, no CI, achar o preço de "salmão" pela busca e trocar de categoria pelo teclado, sem violação do axe. Em N1 não há medição com pessoas.

## 3. Fora do MVP

Pedido e pagamento; medição de uso; os preços e o WhatsApp são ilustrativos (#15).

## 4. Ciclos

- **02/11:** retira a página padrão `/help` e a rota de exemplo `api/test`, corrige `clipPath`, ajusta a hierarquia de títulos e atualiza dependências.
- **03/11:** busca no cardápio, setas nas abas, contraste no modo escuro do sistema, remoção dos dados da Target e CI na `developer`.
- **10/11:** workflow único com publicação no Pages só na `main`; critério 10 com o ruleset `principal-protegida`.
- **16/11, 12h23:** o responsável ligou os alertas do Dependabot; o critério 9 passou de "Parcial" (API 403, #25) a "Atende", com 0 alertas abertos e 0 no audit de produção. Resumo: 9 → 10 de 10.
- **16/11:** teste Playwright do fluxo com axe nas 5 páginas e job `e2e` no CI; link "Pular para o conteúdo" e foco visível; dependências de produção em patch e minor; publicação travada pela variável `PAGES_VIA_ACTIONS` até o Pages ser ligado.
