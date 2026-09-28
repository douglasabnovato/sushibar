/* Atalho "Bebidas": o cartão inteiro é o link (antes só o texto pequeno era clicável) */
import Link from "next/link";
import IconBebida from "./Icons/IconBebida";

export default function ProductBebidas() {
  return (
    <Link href="/bebidas" className="mx-1 my-3 py-4 px-5 bg-white border-2 border-gray-300 rounded-xl shadow-lg text-tahiti-100 block">
      <span aria-hidden="true">
        <IconBebida />
      </span>
      <span className="mt-3 text-sm block">Bebidas</span>
    </Link>
  );
}
/* Fim de ProductBebidas.tsx */
