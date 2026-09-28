/* Lista de itens do cardápio (imagem, nome, descrição e preço) */
import type { MenuItem } from "../data/menu";
import { brl } from "../lib/site";
import ProductImage from "./ProductImage";

export default function ProductItem({ products }: { products: MenuItem[] }) {
  if (!products.length) return <p className="mx-3 my-6 text-tahiti-56">Nenhum item nesta categoria no momento.</p>;
  return (
    <ul className="mx-1">
      {products.map((p) => (
        <li key={p.id} className="bg-white border-2 border-gray-300 p-2.5 rounded-xl shadow-lg text-tahiti-100 flex my-2 gap-3">
          <div className="relative w-2/5 min-h-[96px] shrink-0"><ProductImage item={p} sizes="40vw" /></div>
          <div className="flex flex-col flex-1">
            <h3 className="text-lg text-tahiti-100 font-semibold mt-1">{p.title}</h3>
            <p className="text-gray-700 text-sm mt-1">{p.description}</p>
            <p className="text-[#9a3412] text-xl font-bold mt-auto self-end">{brl(p.price)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
/* Fim de ProductItem.tsx */
