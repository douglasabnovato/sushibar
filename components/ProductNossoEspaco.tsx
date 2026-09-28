/* Atalho "Nosso espaço": o cartão inteiro é o link (antes só o texto pequeno era clicável) */
import Link from "next/link";
import IconNossoEspaco from "./Icons/IconNossoEspaco";

export default function ProductNossoEspaco() {
  return (
    <Link href="/nossoespaco" className="mx-1 my-3 py-4 px-5 bg-white border-2 border-gray-300 rounded-xl shadow-lg text-tahiti-100 block">
      <span aria-hidden="true">
        <IconNossoEspaco />
      </span>
      <span className="mt-3 text-sm block">Nosso espaço</span>
    </Link>
  );
}
/* Fim de ProductNossoEspaco.tsx */
