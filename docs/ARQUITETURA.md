# Arquitetura — Sushibar

```mermaid
flowchart LR
  B([Cliente]) --> V[GitHub Pages - HTML estático exportado no build]
  V -. build no GitHub Actions .-> S[(Supabase opcional)]
  V --> L[(data/menu.ts - cardápio local)]
  B -->|reserva| W[WhatsApp]
```

```mermaid
flowchart TB
  pages[pages/index, cardapio, bebidas, produtos, nossoespaco] --> lib[lib/menu.ts - loadMenu, byCategory, featured]
  lib --> sup[(Supabase)] & local[(data/menu.ts)]
  pages --> CategoryMenu --> ProductOptionSelected & ProductItem --> ProductImage
  pages --> Header & SpecialOffers & SeeMore
```

## ADRs

| # | Decisão | Motivo | Alternativa |
|---|---|---|---|
| ADR-01 | Manter Pages Router, subir para Next 16 | Menor mudança; o App Router não traria ganho aqui | Migrar para App Router |
| ADR-02 | Supabase opcional com fallback local | O site nunca fica fora do ar por falta de banco | Supabase obrigatório |
| ADR-03 | Remover dados raspados da Target | Não são do projeto e quebravam o build | Mover para fora de pages/ |
| ADR-04 | Sem nota de avaliação nos cards | Não havia avaliações reais | Integrar avaliações do Google |
