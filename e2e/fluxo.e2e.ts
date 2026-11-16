/* Fluxo principal na tela: do início ao preço de um prato pela busca e pelas abas, com axe nas 5 páginas, teclado e sistema em modo escuro */
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGINAS = [
  ["", "Sushibar — culinária japonesa"],
  ["cardapio/", "Cardápio"],
  ["bebidas/", "Bebidas"],
  ["produtos/", "Todos os produtos"],
  ["nossoespaco/", "Lounge Sushibar"],
] as const;

/* axe sem violações nas regras WCAG A e AA */
async function semViolacoes(page: Page) {
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

test("rota que não existe mostra a página 404 do site", async ({ page }) => {
  const resposta = await page.goto("nao-existe/");
  expect(resposta?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
/* Fim de fluxo.e2e.ts */
