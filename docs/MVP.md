# MVP — sushibar

> Criado em 02/11/2026. Revisto em 03/11/2026 com a régua N1 (`docs/PLANO-DE-ACAO.md`, seção "Ciclo de 03/11/2026"). Testado no Windows, com Node 24, e no build servido localmente. Não houve teste com pessoas nem em aparelho real.

**Nível:** Estudo (N1). Os critérios 5 e 7 não se aplicam e saem da conta.

**Resumo:** 10 de 10 aplicáveis atendidos

**Finalizado:** sim. Todos os critérios aplicáveis atendem. O 10 passou a "Atende" em 10/11/2026, com a `main` protegida pelo ruleset `principal-protegida` (#11). Ligar o Pages segue com o responsável (#10); o workflow de publicação já está pronto.

## 1. Critérios: 10 de 10 aplicáveis atendidos

| # | Critério | Como verificar | Situação em 03/11/2026 | Evidência |
|---|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende | Um restaurante mostra cardápio, bebidas e espaço |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende | Seção 2; sem validação com pessoas |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Atende | Build servido localmente: destaques, cardápio, abas e busca ("salmão" mostra 4 itens) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende | Seção 3 |
| 5 | Medição de uso | A métrica principal é coletada | Não se aplica (N1) | — |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende | Cardápio local quando o Supabase falta ou falha (`lib/menu.ts`); categoria vazia e busca sem resultado têm mensagem (`tests/busca-e-abas.test.ts`) |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Não se aplica (N1) | Site fora do ar (#10) |
| 8 | Acessibilidade básica | axe e teclado | Atende | axe sem violações em 02/11; abas com setas no padrão APG; busca com rótulo e resultado anunciado; contraste corrigido no modo escuro do sistema (03/11) |
| 9 | Segurança e conformidade | Riscos decididos | Atende | Sem segredo no código; saíram os dados raspados da Target (`helpers/translator.ts`) em 03/11 |
| 10 | Entrega confiável | CI verde antes de entrar na principal | Atende (10/11/2026) | `gh api repos/douglasabnovato/sushibar/rulesets`, em 10/11/2026: ruleset `principal-protegida` ativo (exige PR, bloqueia force push e exclusão); workflow `CI` roda nos PRs para `main` e `developer/**` (#11) |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende | 12 testes: cardápio, busca e abas |
| 12 | Documentação honesta | O README ensina a rodar | Atende | Comandos conferidos com o `package.json`; sem link quebrado; próximos passos (03/11) |

## 2. Hipótese (proposta)

Praticar Next.js com exportação estática: achar o preço de um prato em até 2 cliques, ou digitando parte do nome na busca.

## 3. Fora do MVP

Pedido e pagamento; os preços são ilustrativos (#15).

## 4. Ciclos

- **02/11:** retira a página padrão `/help` e a rota de exemplo `api/test`, corrige `clipPath`, ajusta a hierarquia de títulos e atualiza dependências.
- **03/11:** busca no cardápio, setas nas abas, contraste no modo escuro, remoção dos dados da Target e CI na `developer`.
