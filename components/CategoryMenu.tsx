/* Cardápio com abas por categoria (usado em /cardapio e /bebidas) */
import { useState } from "react";
import type { Menu } from "../lib/menu";
import { byCategory } from "../lib/menu";
import ProductItem from "./ProductItem";
import ProductOptionSelected from "./ProductOptionSelected";

export default function CategoryMenu({ menu, initialCategoryId }: { menu: Menu; initialCategoryId?: number }) {
  const [current, setCurrent] = useState(initialCategoryId ?? menu.categories[0]?.id);
  return (
    <>
      <div role="tablist" aria-label="Categorias" className="flex flex-wrap mx-3">
        {menu.categories.map((c) => (
          <ProductOptionSelected key={c.id} contentValue={c.title} isSelected={current === c.id} controls="painel-categoria" onClick={() => setCurrent(c.id)} />
        ))}
      </div>
      <div id="painel-categoria" role="tabpanel" aria-live="polite">
        <ProductItem products={byCategory(menu, current)} />
      </div>
    </>
  );
}
/* Fim de CategoryMenu.tsx */
