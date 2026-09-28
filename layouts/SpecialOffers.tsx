/* Seção de destaques da página inicial */
import ProductBox from "../components/ProductBox";
import type { MenuItem } from "../data/menu";

export default function SpecialOffers({ products }: { products: MenuItem[] }) {
  return (
    <section className="bg-gray-200" aria-labelledby="destaques">
      <h2 id="destaques" className="text-center text-[#9a3412] font-semibold mb-2">Destaques da casa</h2>
      <ProductBox products={products} />
    </section>
  );
}
/* Fim de SpecialOffers.tsx */
