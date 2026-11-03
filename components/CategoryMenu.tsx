/* Cardápio com busca e abas por categoria (usado em /cardapio e /bebidas) */
import { useState, type KeyboardEvent } from "react";
import type { Menu } from "../lib/menu";
import { byCategory, searchItems, searchSummary } from "../lib/menu";
import { nextTabIndex } from "../lib/tabs";
import ProductItem from "./ProductItem";
import ProductOptionSelected from "./ProductOptionSelected";

const tabId = (categoryId: number) => `aba-categoria-${categoryId}`;

export default function CategoryMenu({ menu, initialCategoryId }: { menu: Menu; initialCategoryId?: number }) {
  const [current, setCurrent] = useState(initialCategoryId ?? menu.categories[0]?.id);
  const [query, setQuery] = useState("");
  const results = searchItems(menu, query);
  const searching = query.trim().length >= 2;

  /* Setas, Home e End trocam a aba e levam o foco junto */
  function onTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = menu.categories.findIndex((c) => c.id === current);
    const next = nextTabIndex(index, event.key, menu.categories.length);
    if (next === null) return;
    event.preventDefault();
    const id = menu.categories[next].id;
    setCurrent(id);
    document.getElementById(tabId(id))?.focus();
  }

  return (
    <>
      <div className="mx-3 mb-3">
        <label htmlFor="busca-cardapio" className="block text-sm font-semibold mb-1">Buscar no cardápio</label>
        <input id="busca-cardapio" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ex.: salmão"
          autoComplete="off" className="w-full rounded-lg border-2 border-gray-400 px-3 py-2 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9a3412]" />
        <p className="sr-only" aria-live="polite">{searching ? searchSummary(results.length, query) : ""}</p>
      </div>
      {searching ? (
        <section aria-label="Resultado da busca">
          <h2 className="mx-3 text-lg font-semibold">{searchSummary(results.length, query)}</h2>
          {results.length > 0 && <ProductItem products={results} />}
        </section>
      ) : (
        <>
          <div role="tablist" aria-label="Categorias" className="flex flex-wrap mx-3" onKeyDown={onTabKeyDown}>
            {menu.categories.map((c) => (
              <ProductOptionSelected key={c.id} id={tabId(c.id)} contentValue={c.title} isSelected={current === c.id} controls="painel-categoria" onClick={() => setCurrent(c.id)} />
            ))}
          </div>
          <div id="painel-categoria" role="tabpanel" aria-labelledby={current !== undefined ? tabId(current) : undefined} tabIndex={0} aria-live="polite">
            <h2 className="sr-only">Itens da categoria</h2>
            <ProductItem products={current !== undefined ? byCategory(menu, current) : []} />
          </div>
        </>
      )}
    </>
  );
}
/* Fim de CategoryMenu.tsx */
