/* Grade com todos os produtos agrupados por categoria */
import type { Menu } from "../lib/menu";
import { byCategory } from "../lib/menu";
import ProductItem from "./ProductItem";

export default function Product({ menu }: { menu: Menu }) {
  return (
    <>
      {menu.categories.map((c) => (
        <section key={c.id} aria-labelledby={`cat-${c.id}`} className="mb-4">
          <h2 id={`cat-${c.id}`} className="mx-3 text-xl font-bold text-tahiti-100">{c.title}</h2>
          <ProductItem products={byCategory(menu, c.id)} />
        </section>
      ))}
    </>
  );
}
/* Fim de Product.tsx */
