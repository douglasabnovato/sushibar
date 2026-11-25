/* Fluxo principal na tela: do início ao preço de um prato pela busca e pelas abas, com axe nas 5 páginas e na 404, teclado (cardápio, página inicial, Nosso espaço e celular) e sistema em modo escuro. Roda na mesa e a 320 px (playwright.config.ts), com a medida de corte nas 2 bordas antes de cada axe */
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGINAS = [
  ["", "Sushibar — culinária japonesa"],
  ["cardapio/", "Cardápio"],
  ["bebidas/", "Bebidas"],
  ["produtos/", "Todos os produtos"],
  ["nossoespaco/", "Lounge Sushibar"],
] as const;

/* Sem rolagem lateral e sem conteúdo cortado (#35). Três medidas:
   1. a largura do documento não passa da área visível;
   2. nenhum elemento visível passa da borda direita nem da esquerda;
   3. nenhuma caixa com overflow-x hidden ou clip esconde conteúdo mais largo que ela (o título
      cortado dentro do card, que fica com a caixa na tela; R19 do #38).
   Não tirar a 2ª nem a 3ª: é a única que pega o corte por overflow: hidden (que não muda o scrollWidth)
   e o corte à esquerda (que não gera rolagem), como provaram as mutações da R19 do huntweb-swapi#57.
   Ficam de fora o invisível de propósito: visibility: hidden, opacity: 0 e o 1 x 1 px do leitor de tela.
   O link "Pular para o conteúdo" fica acima da tela, e não ao lado, por isso não precisa de exceção */
async function semCorteLateral(page: Page) {
  const { largura, janela, fora, cortados } = await page.evaluate(() => {
    const janela = document.documentElement.clientWidth;
    const fora = Array.from(document.querySelectorAll("body *"))
      .filter((e) => {
        const c = e.getBoundingClientRect();
        if (c.width <= 1 || c.height <= 1) return false;
        if (c.right <= janela + 1 && c.left >= -1) return false;
        const s = getComputedStyle(e);
        return s.visibility !== "hidden" && s.opacity !== "0";
      })
      .slice(0, 5)
      .map((e) => {
        const c = e.getBoundingClientRect();
        return `${e.tagName}${e.id ? "#" + e.id : ""}${e.classList[0] ? "." + e.classList[0] : ""} (${Math.round(c.left)} a ${Math.round(c.right)} px)`;
      });
    const cortados = Array.from(document.querySelectorAll("body, body *"))
      .filter((e) => {
        const c = e.getBoundingClientRect();
        if (c.width <= 1 || c.height <= 1) return false;
        const s = getComputedStyle(e);
        if (s.overflowX !== "hidden" && s.overflowX !== "clip") return false;
        return e.scrollWidth > e.clientWidth + 1 && s.visibility !== "hidden" && s.opacity !== "0";
      })
      .slice(0, 5)
      .map((e) => `${e.tagName}${e.id ? "#" + e.id : ""}${e.classList[0] ? "." + e.classList[0] : ""} (${e.scrollWidth} px em ${e.clientWidth} px)`);
    return { largura: document.documentElement.scrollWidth, janela, fora, cortados };
  });
  expect(largura, "rolagem lateral").toBeLessThanOrEqual(janela);
  expect(fora, "elementos além das bordas").toEqual([]);
  expect(cortados, "conteúdo escondido dentro de uma caixa").toEqual([]);
}

/* axe sem violações nas regras WCAG A e AA; antes, a medida de corte lateral */
async function semViolacoes(page: Page) {
  await semCorteLateral(page);
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
}

/* Contorno do elemento focado, para conferir o foco visível */
const contorno = (page: Page) => page.locator(":focus").evaluate((el) => { const c = getComputedStyle(el); return { estilo: c.outlineStyle, largura: parseFloat(c.outlineWidth) }; });

for (const [caminho, titulo] of PAGINAS) {
  test(`axe sem violações em /${caminho}`, async ({ page }) => {
    await page.goto(caminho);
    await expect(page.getByRole("heading", { level: 1, name: titulo })).toBeAttached();
    await semViolacoes(page);
  });
}

test("acha o preço de um prato pelo menu, pela busca e pelas abas", async ({ page }) => {
  await page.goto("");
  await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Cardápio" }).click();
  await expect(page).toHaveURL(/\/sushibar\/cardapio\/$/);
  await expect(page.getByRole("heading", { level: 1, name: "Cardápio" })).toBeVisible();

  const busca = page.getByLabel("Buscar no cardápio");
  await busca.fill("salmão");
  const resultado = page.getByRole("region", { name: "Resultado da busca" });
  await expect(resultado.getByRole("listitem")).toHaveCount(4);
  await expect(resultado.getByRole("listitem").filter({ hasText: "Niguiri de salmão" })).toContainText("R$");
  await semViolacoes(page);

  await busca.fill("pizza");
  await expect(resultado).toContainText("Nenhum");
  await expect(page.getByRole("tablist")).toHaveCount(0);

  await busca.fill("");
  const abas = page.getByRole("tab");
  await expect(abas.first()).toHaveAttribute("aria-selected", "true");
  await abas.first().focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Sushis" })).toBeFocused();
  await expect(page.getByRole("tab", { name: "Sushis" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Combo Sushibar");
  await page.keyboard.press("End");
  await expect(page.getByRole("tab", { name: "Bebidas" })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Chá verde gelado");
  /* O cardápio com as abas, depois de ir até a última */
  await semCorteLateral(page);
});

test("o primeiro Tab mostra o link de pular, que leva ao conteúdo; o foco fica visível", async ({ page }) => {
  await page.goto("cardapio/");
  await page.keyboard.press("Tab");
  const pular = page.getByRole("link", { name: "Pular para o conteúdo" });
  await expect(pular).toBeFocused();
  await expect(pular).toBeInViewport();
  expect(await contorno(page)).toEqual({ estilo: "solid", largura: 3 });

  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByLabel("Buscar no cardápio")).toBeFocused();

  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("link", { name: "Nosso espaço" })).toBeFocused();
  expect(await contorno(page)).toEqual({ estilo: "solid", largura: 3 });
});

/* O app não tem tema escuro próprio: força o claro (color-scheme: light). Com o sistema em modo escuro, a tela segue clara e legível (defeito de 03/11/2026) */
test("com o sistema em modo escuro, o cardápio segue claro e sem violações", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("cardapio/");
  const cores = await page.locator("body").evaluate((el) => { const c = getComputedStyle(el); return [c.color, c.backgroundColor]; });
  expect(cores).toEqual(["rgb(17, 24, 39)", "rgb(229, 231, 235)"]);
  await semViolacoes(page);
});

test("rota que não existe mostra a página 404 em português, com o menu e o link para o cardápio", async ({ page }) => {
  const resposta = await page.goto("nao-existe/");
  expect(resposta?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "Página não encontrada" })).toBeVisible();
  await expect(page).toHaveTitle("Página não encontrada | Sushibar");
  await expect(page.getByRole("navigation", { name: "Principal" })).toBeVisible();
  await semViolacoes(page);
  await page.getByRole("main").getByRole("link", { name: "Ver o cardápio" }).click();
  await expect(page).toHaveURL(/\/sushibar\/cardapio\/$/);
  await expect(page.getByRole("heading", { level: 1, name: "Cardápio" })).toBeVisible();
});

/* Cor do contorno do foco: o azul #1d4ed8 do app, e não o contorno padrão do navegador */
const corDoContorno = (page: Page) => page.locator(":focus").evaluate((el) => getComputedStyle(el).outlineColor);
const AZUL_FOCO = "rgb(29, 78, 216)";

test("na página inicial, o Tab passa pelos 3 atalhos de Veja mais com foco visível", async ({ page }) => {
  await page.goto("");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Pular para o conteúdo" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();

  const vejaMais = page.getByRole("region", { name: "Veja mais" });
  for (const nome of ["Cardápio", "Bebidas", "Nosso espaço"]) {
    await page.keyboard.press("Tab");
    await expect(vejaMais.getByRole("link", { name: nome })).toBeFocused();
    expect(await contorno(page)).toEqual({ estilo: "solid", largura: 3 });
    expect(await corDoContorno(page)).toBe(AZUL_FOCO);
  }
});

test("em Nosso espaço, o link de reserva recebe foco pelo Tab e abre o WhatsApp com a mensagem", async ({ page }) => {
  await page.goto("nossoespaco/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page.keyboard.press("Tab");

  const reservar = page.getByRole("link", { name: /Reservar pelo WhatsApp/ });
  await expect(reservar).toBeFocused();
  expect(await contorno(page)).toEqual({ estilo: "solid", largura: 3 });
  const href = new URL((await reservar.getAttribute("href")) ?? "");
  expect(href.hostname).toBe("wa.me");
  expect(href.searchParams.get("text")).toBe("Olá! Gostaria de fazer uma reserva no Sushibar.");
  await expect(reservar).toHaveAttribute("target", "_blank");
});

/* Na mesa, encolhe para 375 px; no projeto celular-320, roda a 320 px (R19 do #38: antes rodava a 375 nos dois) */
test("no celular (375 px na mesa, 320 no celular-320), o menu principal é alcançado pelo Tab, com foco visível", async ({ page }) => {
  if ((page.viewportSize()?.width ?? 0) > 375) await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Pular para o conteúdo" })).toBeFocused();

  const menu = page.getByRole("navigation", { name: "Principal" });
  for (const nome of ["Início", "Cardápio", "Bebidas", "Nosso espaço"]) {
    await page.keyboard.press("Tab");
    const link = menu.getByRole("link", { name: nome });
    await expect(link).toBeFocused();
    await expect(link).toBeInViewport();
    expect(await contorno(page)).toEqual({ estilo: "solid", largura: 3 });
  }
  await semCorteLateral(page);
});
/* Fim de fluxo.e2e.ts */
