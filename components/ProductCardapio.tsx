/* Atalho "Cardápio": o cartão inteiro é o link (antes só o texto pequeno era clicável) */
import Link from "next/link";
import IconCardapio from "./Icons/IconCardapio";

export default function ProductCardapio() {
  return (
    <Link href="/cardapio" className="mx-1 my-3 py-4 px-5 bg-white border-2 border-gray-300 rounded-xl shadow-lg text-tahiti-100 block">
      <span aria-hidden="true">
        <IconCardapio />
      </span>
      <span className="mt-3 text-sm block">Cardápio</span>
    </Link>
  );
}
/* Fim de ProductCardapio.tsx */
