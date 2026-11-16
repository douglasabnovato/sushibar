# Deploy · Sushibar

Plano de ação para publicar o site do restaurante em hospedagem gratuita.

## 1. Desafio

Publicar, sem custo e com deploy automático, um site em Next.js 16 (Pages Router) cujo cardápio vem de `data/menu.ts` ou, opcionalmente, do Supabase, sem servidor próprio e sem expor segredos.

## 2. Conteúdo

### Decisão de hospedagem

| Opção | Resultado |
|---|---|
| **GitHub Pages com exportação estática do Next (escolhida)** | Depois da limpeza do PENDENCIAS (sai `pages/api/test.ts`) não sobra API route, SSR nem middleware. As 5 páginas são geradas no build com `getStaticProps` e o GitHub Actions publica `out/` |
| Vercel Hobby | Manteria a revalidação automática do cardápio a cada 1 h (ISR). Só compensa se o Supabase for usado e o cardápio mudar com frequência |
| Netlify / Render Static Site | Também servem `out/`, sem vantagem sobre o Pages |

### O que foi ajustado para produção

| Mudança | Arquivo | Por quê |
|---|---|---|
| `output: 'export'`, `basePath`/`assetPrefix` = `/sushibar`, `trailingSlash: true`, `images.unoptimized: true` | `next.config.js` | O Pages só serve arquivos; o site fica em `/sushibar/`; cada rota vira `rota/index.html`; o otimizador de imagens do Next precisa de servidor |
| `basePath` só no build (no `npm run dev` o site continua em `http://localhost:3000/`) e exposto como `NEXT_PUBLIC_BASE_PATH` | `next.config.js` | Não mudar o fluxo de desenvolvimento |
| Favicon com o prefixo do `basePath` | `pages/_document.tsx` | O `<link rel="icon">` escrito à mão não recebe o prefixo sozinho |
| `revalidate: 3600` removido do `getStaticProps` | `pages/index.tsx`, `cardapio.tsx`, `bebidas.tsx`, `produtos.tsx` | O build falha com "ISR cannot be used with output: export" (testado). O cardápio passa a ser lido a cada build |
| Script `start` removido | `package.json` | `next start` não funciona com exportação estática |
| Job `deploy` no CI, `workflow_dispatch` e variáveis do Supabase no build | `.github/workflows/ci.yml` (movido de `ci/` em 10/11/2026) | Publicação só na `main`; **Run workflow** refaz o site quando o cardápio do Supabase mudar |
| Job `deploy` só com a variável `PAGES_VIA_ACTIONS=true` e depois dos jobs `raiz` e `e2e` | `.github/workflows/ci.yml` (16/11/2026) | Sem o Pages ligado, o deploy falharia e deixaria a `main` vermelha; a variável liga a publicação junto com o Pages |
| Seção "Em produção", stack e publicação atualizadas | `README.md`, `docs/ARQUITETURA.md` | Documentação coerente com a hospedagem |

Verificação feita antes da entrega (registro antigo, sem data; a verificação atual está na Etapa 1) (já sem os arquivos que o PENDENCIAS manda apagar): `npm ci` limpo, 4 testes passando, `next build` gerando `out/` com as 5 páginas, `npm audit --omit=dev` com 0 vulnerabilidades, e navegação real no Chromium servindo `out/` em `/sushibar/`: as 5 páginas respondem 200, o menu navega entre Início, Cardápio, Bebidas e Nosso espaço, as abas de categoria trocam os itens, nenhuma imagem quebrada, console sem erros.

### Limitações do plano gratuito

- O GitHub Pages é gratuito para repositório **público**; limites de 1 GB de site e cerca de 100 GB de tráfego por mês.
- Com Supabase, alterações no cardápio só aparecem depois de um novo build (push na `main` ou **Actions → CI → Run workflow**). Na Vercel isso seria automático a cada 1 h.
- No plano gratuito do Supabase, o projeto pausa após 7 dias sem uso; se isso acontecer, o build usa o cardápio local e segue funcionando.
- Se o repositório tiver outro nome, ajuste `repoBasePath` em `next.config.js`.

### Pontos de atenção (segurança e conteúdo)

- `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` são públicas por natureza (vão para o navegador); por isso ficam em **Variables**, não em Secrets. A proteção real é o RLS: nas tabelas `categories` e `products`, ative o RLS e crie só a política de **leitura** (`select`) para `anon`. Nunca use a chave `service_role` no front.
- Itens e preços de `data/menu.ts` são ilustrativos e o WhatsApp de `lib/site.ts` é de exemplo; com `isDemo: true` o rodapé avisa que é demonstração. Troque para `false` só com dados reais (decisão sua).
- O site não coleta dados: a reserva é por link do WhatsApp.

## 3. Solução (passo a passo)

> Revisto em 16/11/2026. O workflow já está em `.github/workflows/ci.yml` e a `main` só recebe mudanças por PR. Faltam as etapas 2 a 4, do responsável (#10).

### Etapa 1 · Validar localmente (Git Bash)

1. `git clone -c core.longpaths=true https://github.com/douglasabnovato/sushibar` e `cd sushibar`
2. `npm ci` (Next 16 exige Node 20.9+; o CI usa o Node 22)
3. `npm test` (esperado: 15 testes passando)
4. `npm run build` (esperado: pasta `out/` com `index.html`, `cardapio/`, `bebidas/`, `produtos/`, `nossoespaco/` e `404.html`)
5. `npx playwright install chromium` e `npm run test:e2e` (esperado: 9 testes passando; o teste serve `out/` em `http://localhost:4317/sushibar/`, como o Pages)

### Etapa 2 · Mesclar a sprint na `main` (responsável)

1. Revisar e mesclar o PR `developer/sprint-2026-11-12` → `main` (#21), com os jobs `raiz` e `e2e` verdes.
2. Com o Pages ainda desligado, o job `deploy` aparece como *skipped*: a `main` fica verde.

### Etapa 3 · Ligar o GitHub Pages (responsável)

1. No repositório, **Settings → Pages → Build and deployment → Source**: escolher **GitHub Actions**. Não precisa salvar mais nada nessa tela.
2. **Settings → Secrets and variables → Actions → aba Variables → New repository variable**:
   - Name: `PAGES_VIA_ACTIONS`
   - Value: `true`
   - **Add variable**.
3. Só se for usar o Supabase, na mesma aba **Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL` = URL do projeto (Project Settings → API)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = chave `anon` pública
   Sem elas, o site usa `data/menu.ts`.
4. **Actions → CI → Run workflow**, branch `main`, **Run workflow**. Os jobs `raiz`, `e2e` e `deploy` devem ficar verdes.

### Etapa 4 · Conferir no ar

1. `curl -s -o /dev/null -w "%{http_code}" https://douglasabnovato.github.io/sushibar/` devolve `200`.
2. Abrir `https://douglasabnovato.github.io/sushibar/`: arte do cabeçalho, destaques e atalhos. O primeiro Tab mostra "Pular para o conteúdo".
3. Menu: **Cardápio**, **Bebidas** e **Nosso espaço** abrem; nas abas do cardápio, trocar de categoria muda os itens; buscar "salmão" mostra 4 itens.
4. F5 em `/sushibar/cardapio/`: a página continua. `/sushibar/xyz` mostra a página 404.
5. **Reservar pelo WhatsApp** abre `wa.me` com a mensagem de reserva.
6. F12 → Console e Network: nenhum erro nem arquivo 404 (o favicon carrega).
7. Com Supabase: o log do job `raiz`, no passo de build, não mostra "usando o cardápio local".
8. Atenção: o job `e2e` testa o build com o cardápio local. Com o Supabase ligado, o cardápio publicado não passa pelo axe; conferir à mão os itens 3 e 6.

### Etapa 5 · Fechar

1. No GitHub, **About → Website**: colar `https://douglasabnovato.github.io/sushibar/`.
2. Comentar na #10 o código HTTP e a data, e trocar o aviso "Fora do ar" do README pelo link.
