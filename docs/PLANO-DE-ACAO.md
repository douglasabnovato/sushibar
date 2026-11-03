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
