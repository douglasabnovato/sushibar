/* Atalhos para cardápio, bebidas e nosso espaço */
import ProductCardapio from "../components/ProductCardapio";
import ProductBebidas from "../components/ProductBebidas";
import ProductNossoEspaco from "../components/ProductNossoEspaco";

export default function SeeMore() {
  return (
    <section className="bg-gray-200 pt-3" aria-labelledby="veja-mais">
      <h2 id="veja-mais" className="text-center text-[#9a3412] font-semibold">Veja mais</h2>
      <div className="flex flex-wrap justify-center px-6">
        <ProductCardapio />
        <ProductBebidas />
        <ProductNossoEspaco />
      </div>
    </section>
  );
}
/* Fim de SeeMore.tsx */
