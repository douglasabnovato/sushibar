/* Falhas do Supabase no build: erro na consulta ou rede fora do ar caem no cardápio local, sem derrubar o build */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { loadMenu } from "../lib/menu";

/* vi.mock sobe para o topo; a consulta falsa vem de vi.hoisted */
const { consulta } = vi.hoisted(() => ({ consulta: vi.fn() }));
vi.mock("@supabase/supabase-js", () => ({ createClient: () => ({ from: () => ({ select: consulta }) }) }));

const ENV = { NEXT_PUBLIC_SUPABASE_URL: "https://exemplo.supabase.co", NEXT_PUBLIC_SUPABASE_ANON_KEY: "chave-de-teste" };

describe("cardápio com o Supabase falhando", () => {
  beforeEach(() => { consulta.mockReset(); vi.spyOn(console, "warn").mockImplementation(() => {}); });

  it("erro na consulta usa o cardápio local e avisa no log", async () => {
    consulta.mockResolvedValue({ data: null, error: { message: "permission denied" } });
    const menu = await loadMenu(ENV);
    expect(menu.source).toBe("local");
    expect(console.warn).toHaveBeenCalledWith("Supabase indisponível; usando o cardápio local.");
  });

  it("rede fora do ar usa o cardápio local e avisa no log", async () => {
    consulta.mockRejectedValue(new TypeError("fetch failed"));
    const menu = await loadMenu(ENV);
    expect(menu.source).toBe("local");
    expect(console.warn).toHaveBeenCalledWith("Falha ao ler o Supabase; usando o cardápio local.");
  });

  it("tabela de categorias vazia usa o cardápio local", async () => {
    consulta.mockResolvedValue({ data: [], error: null });
    const menu = await loadMenu(ENV);
    expect(menu.source).toBe("local");
    expect(menu.items.length).toBeGreaterThan(0);
  });
});
/* Fim de menu-falha.test.ts */
