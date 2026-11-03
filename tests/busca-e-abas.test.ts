/* Testes da busca no cardápio e do teclado das abas */
import { describe, it, expect } from "vitest";
import { loadMenu, normalize, searchItems, searchSummary, type Menu } from "../lib/menu";
import { nextTabIndex } from "../lib/tabs";

const titles = (menu: Menu, q: string) => searchItems(menu, q).map((i) => i.title);

describe("busca no cardápio", () => {
  it("acha pelo nome sem ligar para acento e caixa", async () => {
    const menu = await loadMenu({});
    expect(titles(menu, "SUNOMONO")).toEqual(["Sunomono"]);
    expect(titles(menu, "saque")).toEqual(["Saquê quente (dose)"]);
  });

  it("acha pela descrição e em todas as categorias", async () => {
    const menu = await loadMenu({});
    const found = searchItems(menu, "salmão");
    expect(found.length).toBeGreaterThanOrEqual(3);
    expect(new Set(found.map((i) => i.categoryId)).size).toBeGreaterThan(1);
  });

  it("com várias palavras, exige todas", async () => {
    const menu = await loadMenu({});
    expect(titles(menu, "temaki crocante")).toEqual(["Temaki skin"]);
  });

  it("menos de 2 letras ou só espaços não busca", async () => {
    const menu = await loadMenu({});
    expect(searchItems(menu, "s")).toEqual([]);
    expect(searchItems(menu, "   ")).toEqual([]);
  });

  it("resultado vazio tem mensagem clara", async () => {
    const menu = await loadMenu({});
    expect(searchItems(menu, "pizza")).toEqual([]);
    expect(searchSummary(0, " pizza ")).toBe('Nenhum item encontrado para "pizza".');
    expect(searchSummary(1, "x")).toBe("1 item encontrado.");
    expect(searchSummary(3, "x")).toBe("3 itens encontrados.");
  });

  it("normaliza acentos", () => {
    expect(normalize("  Guiozá ")).toBe("guioza");
  });
});

describe("teclado das abas", () => {
  it("setas andam e dão a volta", () => {
    expect(nextTabIndex(0, "ArrowRight", 4)).toBe(1);
    expect(nextTabIndex(3, "ArrowRight", 4)).toBe(0);
    expect(nextTabIndex(0, "ArrowLeft", 4)).toBe(3);
  });

  it("Home e End vão às pontas; outras teclas não fazem nada", () => {
    expect(nextTabIndex(2, "Home", 4)).toBe(0);
    expect(nextTabIndex(0, "End", 4)).toBe(3);
    expect(nextTabIndex(1, "Enter", 4)).toBeNull();
    expect(nextTabIndex(0, "ArrowRight", 0)).toBeNull();
  });
});
/* Fim de busca-e-abas.test.ts */
