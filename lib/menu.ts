/* Fonte do cardápio: Supabase quando configurado (NEXT_PUBLIC_SUPABASE_URL/ANON_KEY); senão, ou em caso de erro, o cardápio local */
import { createClient } from "@supabase/supabase-js";
import { categories as localCategories, items as localItems, type Category, type MenuItem } from "../data/menu";

export type Menu = { categories: Category[]; items: MenuItem[]; source: "supabase" | "local" };

type Row = { id: number; title: string; description?: string | null; price: number; main_image?: string | null; category_id: number; featured?: boolean | null };

/* Converte as linhas do Supabase no formato do app, descartando itens inválidos */
export function fromRows(cats: { id: number; title: string }[], rows: Row[]): Menu {
  const items = rows
    .filter((r) => r && Number.isFinite(Number(r.price)) && r.title)
    .map((r) => ({ id: r.id, categoryId: r.category_id, title: r.title, description: r.description ?? "", price: Number(r.price), image: r.main_image || undefined, featured: Boolean(r.featured) }));
  return { categories: cats.map((c) => ({ id: c.id, title: c.title })), items, source: "supabase" };
}

/* Carrega o cardápio para as páginas (build estático) */
export async function loadMenu(env: Record<string, string | undefined> = process.env): Promise<Menu> {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) {
    try {
      const supabase = createClient(url, key);
      const [cats, rows] = await Promise.all([supabase.from("categories").select("id,title"), supabase.from("products").select("*")]);
      if (!cats.error && !rows.error && cats.data?.length) return fromRows(cats.data, rows.data as Row[]);
      console.warn("Supabase indisponível; usando o cardápio local.");
    } catch {
      console.warn("Falha ao ler o Supabase; usando o cardápio local.");
    }
  }
  return { categories: localCategories, items: localItems, source: "local" };
}

/* Itens de uma categoria */
export const byCategory = (menu: Menu, categoryId: number) => menu.items.filter((i) => i.categoryId === categoryId);

/* Destaques para a página inicial (até 4) */
export const featured = (menu: Menu) => {
  const list = menu.items.filter((i) => i.featured);
  return (list.length ? list : menu.items).slice(0, 4);
};
/* Fim de menu.ts */
