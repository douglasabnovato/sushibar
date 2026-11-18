/* Página 404 em português, com o menu e links de volta (antes era a página padrão do Next, em inglês e sem navegação) */
import Link from "next/link";
import Header from "../layouts/Header";

export default function NaoEncontrada() {
  return (
    <>
      <Header title="Página não encontrada" />
      <main id="conteudo" tabIndex={-1} className="min-h-screen bg-gray-200 px-5 pt-6 pb-6">
        <h1 className="text-2xl font-bold">Página não encontrada</h1>
        <p className="mt-2">O endereço não existe ou mudou. Erro 404.</p>
        <ul className="mt-4 space-y-2">
          <li><Link href="/cardapio" className="inline-block py-2 text-[#9a3412] font-semibold underline underline-offset-4">Ver o cardápio</Link></li>
          <li><Link href="/" className="inline-block py-2 text-[#9a3412] font-semibold underline underline-offset-4">Voltar ao início</Link></li>
        </ul>
      </main>
    </>
  );
}
/* Fim de 404.tsx */
