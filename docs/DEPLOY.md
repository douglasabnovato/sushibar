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
| Job `deploy` no CI, `workflow_dispatch` e variáveis do Supabase no build | `ci/github-actions-ci.yml` → mover para `.github/workflows/ci.yml` | Publicação só na `main`; **Run workflow** refaz o site quando o cardápio do Supabase mudar |
| Seção "Em produção", stack e publicação atualizadas | `README.md`, `docs/ARQUITETURA.md` | Documentação coerente com a hospedagem |

Verificação feita antes da entrega (já sem os arquivos que o PENDENCIAS manda apagar): `npm ci` limpo, 4 testes passando, `next build` gerando `out/` com as 5 páginas, `npm audit --omit=dev` com 0 vulnerabilidades, e navegação real no Chromium servindo `out/` em `/sushibar/`: as 5 páginas respondem 200, o menu navega entre Início, Cardápio, Bebidas e Nosso espaço, as abas de categoria trocam os itens, nenhuma imagem quebrada, console sem erros.

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

### Etapa 1 · Validar localmente (Git Bash)

1. `cd /c/ambiente-projeto/ser-mvp/sushibar`
2. Apagar os arquivos substituídos (o `git rm` já tira do disco):
   `git rm pages/helpers/translator.ts pages/api/test.ts pages/help.tsx styles/Help.module.css layouts/ListItem.tsx layouts/ListProducts.tsx components/ProductHamburguerMenu.tsx components/Icons/IconStar.tsx`
   `git rm -r services/Strapi services/Supabase components/Images components/styles`
   Opcional (o `next lint` saiu no Next 16): `git rm .eslintrc.json`
3. `npm install` (Next 16 exige Node 20.9+; use o Node 22)
4. `npm test` (esperado: 4 testes passando)
5. `npm run build` (esperado: pasta `out/` com `index.html`, `cardapio/`, `bebidas/`, `produtos/`, `nossoespaco/` e `404.html`)
6. Opcional com Supabase: criar `.env.local` a partir do `.env.example` e rodar `npm run dev`.

### Etapa 2 · Subir para o GitHub (branch `main`)

1. Ativar o CI (a pasta `.github` é protegida para a ferramenta que preparou o projeto, então o arquivo veio em `ci/`; as imagens que já estão em `.github/` continuam lá):
   `mkdir -p .github/workflows && mv ci/github-actions-ci.yml .github/workflows/ci.yml && rmdir ci`
2. `git status` (não podem aparecer `out/`, `.next/`, `node_modules/` nem `.env.local`)
3. `git add -A`
4. `git commit -m "feat(deploy): exportação estática do Next e publicação no GitHub Pages por Actions"`
5. `git push origin main`

### Etapa 3 · Ativar o GitHub Pages

1. No repositório, **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Só se for usar o Supabase: **Settings → Secrets and variables → Actions → aba Variables → New repository variable**:
   - `NEXT_PUBLIC_SUPABASE_URL` = URL do projeto (Project Settings → API)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = chave `anon` pública
   Sem elas, o site usa `data/menu.ts`.
3. Aba **Actions**: o workflow **CI** roda `web` (testes e build) e `deploy`. Se o `deploy` falhou porque o Pages ainda não estava ativo, clique em **Re-run all jobs** (ou **Run workflow** na `main`).

### Etapa 4 · Conferir no ar

1. Abrir `https://douglasabnovato.github.io/sushibar/`: arte do cabeçalho, destaques e atalhos.
2. Menu: **Cardápio**, **Bebidas** e **Nosso espaço** abrem; nas abas do cardápio, trocar de categoria muda os itens.
3. F5 em `/sushibar/cardapio/`: a página continua. `/sushibar/xyz` mostra a página 404.
4. **Reservar pelo WhatsApp** abre `wa.me` com a mensagem de reserva.
5. F12 → Console e Network: nenhum erro nem arquivo 404 (o favicon carrega).
6. Com Supabase: o log do job `web`, no passo de build, não mostra "usando o cardápio local".

### Etapa 5 · Fechar

1. No GitHub, **About → Website**: colar `https://douglasabnovato.github.io/sushibar/`.
