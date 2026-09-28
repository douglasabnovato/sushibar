/* Grade de destaques da página inicial (sem a nota 5.0 fixa, que não vinha de avaliações reais) */
import type { MenuItem } from "../data/menu";
import { brl } from "../lib/site";
import ProductImage from "./ProductImage";

export default function ProductBox({ products }: { products: MenuItem[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2 px-1">
      {products.map((p) => (
        <li key={p.id} className="flex gap-2 bg-white border-2 border-gray-300 p-2.5 rounded-xl shadow-lg text-tahiti-100">
          <div className="relative w-2/5 min-h-[72px] shrink-0"><ProductImage item={p} sizes="20vw" /></div>
          <div className="flex-1 flex flex-col justify-between">
            <h3 className="text-sm font-normal mb-2">{p.title}</h3>
            <p className="text-sm font-semibold text-[#9a3412]">{brl(p.price)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
/* Fim de ProductBox.tsx */
