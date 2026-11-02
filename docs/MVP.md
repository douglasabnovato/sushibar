# MVP — sushibar

> Criado em 02/11/2026. Meta: N1 (estudo). Testado no Windows, com Node 24, na cópia de `main`. Não houve teste com pessoas nem em aparelho real.

## 1. Critérios: 10 de 12 atendidos

| # | Critério | Como verificar | Situação |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende: Um restaurante mostra cardápio, bebidas e espaço. |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: Proposta na seção 2; ainda sem validação com pessoas. |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Atende: No navegador: destaques, cardápio e aba Sushis. |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: Seção 3. |
| 5 | Medição de uso | A métrica principal é coletada | Não atende: Projeto de estudo sem coleta de uso. |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: Cardápio local serve de reserva quando o Supabase não está configurado ou falha (`lib/menu.ts`); a falha real do Supabase não foi simulada. |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Não medido: Sem publicação verificada neste ciclo. |
| 8 | Acessibilidade básica | axe e teclado | Atende: axe sem violações em 4 telas, depois do ajuste de títulos; sem rolagem em 375 px. |
| 9 | Segurança e conformidade | Riscos decididos | Atende: `npm audit fix` zerou 2 alertas de produção. `@supabase/supabase-js` continua em uso em `lib/menu.ts`. |
| 10 | Entrega confiável | CI verde antes de entrar na principal | Atende: CI verde no PR deste ciclo; a principal segue sem proteção. |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: Testes automatizados rodam no CI. |
| 12 | Documentação honesta | O README ensina a rodar | Atende: Comandos conferidos com o `package.json`; aviso de estudo no README. |

## 2. Hipótese (proposta)

Praticar Next.js com exportação estática: achar o preço de um prato em até 2 cliques.

## 3. Fora do MVP

Pedido e pagamento; os preços são ilustrativos.

## 4. Neste ciclo

Retira a página padrão `/help` e a rota de exemplo `api/test`, corrige `clipPath`, ajusta a hierarquia de títulos e atualiza dependências.
