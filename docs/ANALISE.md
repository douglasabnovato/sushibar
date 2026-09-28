# Análise — Sushibar

## 1. Especificação

Site mobile-first de restaurante japonês: mostrar destaques e cardápio por categoria e levar a pessoa a reservar.

| ID | Requisito | Antes | Depois |
|---|---|---|---|
| RF01 | Destaques na home | ❌ build quebrado | ✅ |
| RF02 | Cardápio por categoria | ❌ | ✅ abas acessíveis |
| RF03 | Bebidas | ❌ cópia do cardápio | ✅ abre na categoria Bebidas |
| RF04 | Reserva / evento | ❌ botão sem ação | ✅ WhatsApp com mensagem |
| RF05 | Funcionar sem back-end | ❌ | ✅ cardápio local |

## 2. Defeitos encontrados

| # | Severidade | Defeito | Referência |
|---|---|---|---|
| D1 | Crítica | `pages/helpers/translator.ts` (547 kB de produtos raspados do site da Target) dentro de `pages/`: o Next tenta publicá-lo como rota e o build falha; conteúdo de terceiros no repositório | Direitos autorais |
| D2 | Crítica | `import Image from "next/Image"` (maiúscula) quebra em Linux/Vercel | — |
| D3 | Alta | Supabase lido de `REACT_APP_*` (vazio no Next) → `createClient` lança erro no build | — |
| D4 | Alta | Next 12.3 com vulnerabilidades conhecidas; imagens liberadas para `target.scene7.com` | OWASP A03:2025 |
| D5 | Média | Nota "5.0" fixa em todos os produtos | CDC art. 37 |
| D6 | Média | Abas em `div` clicável; laranja #ED6F32 sobre cinza (≈3:1); "Carregar mais" e "Clique aqui" sem ação | WCAG 2.2 2.1.1, 1.4.3 |
| D7 | Baixa | Restos de outros projetos: Strapi em localhost, página help do create-next-app, `api/test`, react-router-dom | — |

## 3. Baseline automatizado

| Verificação | Antes | Depois |
|---|---|---|
| Build | ❌ | ✅ 5 páginas estáticas |
| `npm audit` | várias (Next 12) | 0 |
| Lighthouse mobile | — | 97 / 100 / 96 / 100 |
| axe-core | — | 0 violações |
| Testes | 0 | 4 |

## Rubrica v2 (grupo landing/vitrine)

Aprovação: média ponderada ≥ 7,0 **e** C1 e C4 (eliminatórios) ≥ 5. Regras: nota sem evidência vale no máximo 6; C1 limitado a 7 para parte não executada de ponta a ponta; C9 ≥ 8 só com URL publicada e CI verde.

| # | Critério | Referência | Peso | Antes | Depois | Evidência | Justificativa |
|---|---|---|---|---|---|---|---|
| C1 | Núcleo de valor | MVP (Ries); SWEBOK Requirements | 17% | 1 | 8 | next build + next start: 5 páginas estáticas navegáveis | Não compilava: pages/helpers/translator.ts (547 kB de dados raspados da Target) virava rota, import "next/Image" com maiúscula e Supabase lido de REACT_APP_* (vazio no Next) |
| C2 | Estados e condições excepcionais | Nielsen; OWASP A10:2025 | 8% | 1 | 7 | cardápio local quando o Supabase falta ou falha; categoria vazia com aviso | Sem dados o build quebrava; 'Carregar mais' e 'Clique aqui' não faziam nada |
| C3 | Acessibilidade | WCAG 2.2 AA (axe-core) | 13% | 3 | 9 | axe-core 0 em 5 páginas; Lighthouse Acessibilidade 100 | Abas eram divs clicáveis; contraste do laranja 3:1 |
| C4 | Segurança e privacidade | OWASP Top 10:2025 / ASVS 5.0 N1 | 7% | 3 | 8 | npm audit 0 (Next 12 → 16); remotePatterns só *.supabase.co | Next 12.3 com várias falhas conhecidas; domínio da Target liberado para imagens |
| C5 | Dados | 3FN / ACID / fonte única | 2% | 2 | 7 | data/menu.ts tipado; conversão das linhas do Supabase testada | Sem fallback nem validação |
| C6 | Testes | Pirâmide de testes; SWEBOK Testing | 4% | 0 | 6 | vitest 4 testes | Não havia testes |
| C7 | Qualidade de código | SOLID / camadas; SWEBOK Construction | 6% | 3 | 8 | componentes por dados; páginas repetidas unificadas em CategoryMenu | Removidos Strapi local, help do create-next-app, API de teste, componentes e CSS sem uso |
| C8 | Desempenho | Complexidade; Core Web Vitals | 15% | 4 | 9 | Lighthouse mobile: Desempenho 97, LCP 2,3 s, CLS 0 | Imagens sem sizes; layout legado |
| C9 | Operação | 12-Factor; DORA | 6% | 3 | 7 | CI em ci/; Vercel gratuito | Sem URL publicada |
| C10 | Documentação | README como contrato | 6% | 2 | 7 | README reescrito | README era o do create-next-app |
| C11 | Produto e evidência | Cagan (4 riscos); Torres | 12% | 3 | 7 | reserva pelo WhatsApp; itens e preços marcados como ilustrativos | Nota 5.0 fixa em todos os produtos (não vinha de avaliações) removida |
| C12 | Sustentabilidade técnica | OWASP A03:2025; SWEBOK Maintenance | 4% | 1 | 8 | Next 16, React 19 | react-router-dom instalado sem uso |

**Média ponderada:** antes **2,37** (REPROVADO) → depois **7,86** (APROVADO).

