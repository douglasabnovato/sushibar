/* Testes da fonte do cardápio: local por padrão, conversão das linhas do Supabase, filtros e preço */
import { describe, it, expect } from "vitest";
import { byCategory, featured, fromRows, loadMenu } from "../lib/menu";
import { brl, whatsappLink } from "../lib/site";

describe("cardápio", () => {
  it("sem variáveis do Supabase usa o cardápio local", async () => {
    const menu = await loadMenu({});
    expect(menu.source).toBe("local");
    expect(menu.categories.map((c) => c.title)).toContain("Bebidas");
  });

  it("converte linhas do Supabase e descarta itens sem preço", () => {
    const menu = fromRows([{ id: 9, title: "Entradas" }], [
      { id: 1, title: "Gyoza", price: 20, category_id: 9, main_image: "https://x.supabase.co/a.jpg" },
      { id: 2, title: "Sem preço", price: Number.NaN, category_id: 9 },
    ]);
    expect(menu.items).toHaveLength(1);
    expect(menu.items[0]).toMatchObject({ categoryId: 9, description: "", image: "https://x.supabase.co/a.jpg" });
  });

  it("filtra por categoria e limita destaques a 4", async () => {
    const menu = await loadMenu({});
    expect(byCategory(menu, 4).every((i) => i.categoryId === 4)).toBe(true);
    expect(featured(menu).length).toBeLessThanOrEqual(4);
  });

  it("formata preço e monta o link de reserva", () => {
    expect(brl(18.9).replace(/\s/g, " ")).toBe("R$ 18,90");
    expect(new URL(whatsappLink("Reserva p/ 4 & bolo")).searchParams.get("text")).toBe("Reserva p/ 4 & bolo");
  });
});
/* Fim de menu.test.ts */
