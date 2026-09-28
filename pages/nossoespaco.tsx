/* Nosso espaço: ambiente, eventos e reserva pelo WhatsApp (antes o botão "Clique aqui" não fazia nada) */
import Image from "next/image";
import Header from "../layouts/Header";
import Image1 from "./assets/image-nosso-espaco-1.png";
import Image2 from "./assets/image-nosso-espaco-2.png";
import Image3 from "./assets/image-nosso-espaco-3.png";
import { whatsappLink } from "../lib/site";

export default function NossoEspaco() {
  return (
    <>
      <Header title="Nosso espaço" />
      <main className="min-h-screen">
        <section className="bg-tahiti-46 pb-5" aria-labelledby="lounge">
          <h1 id="lounge" className="text-tahiti-100 font-bold px-5 pt-4 text-2xl">Lounge Sushibar</h1>
          <p className="text-sm text-tahiti-100 px-5 pt-2 pb-6">
            Com uma atmosfera refinada, o Sushibar oferece não só o melhor da gastronomia japonesa, mas também um espaço de convívio familiar com o maior conforto possível.
          </p>
          <figure className="relative px-4">
            <Image src={Image1} alt="Salão do Sushibar" sizes="100vw" className="rounded-lg w-full h-auto" priority />
            <figcaption className="absolute bottom-3 right-6 left-6 bg-black/60 text-white rounded-md p-2">
              <strong className="block">Você irá se impressionar!</strong>
              <span className="text-sm">Estaremos dispostos a te atender com todo o carinho e dedicação!</span>
            </figcaption>
          </figure>
        </section>
        <section className="flex flex-col sm:flex-row gap-4 bg-tahiti-44 p-6" aria-labelledby="eventos">
          <div className="text-tahiti-100 sm:w-1/2 space-y-2">
            <h2 className="font-bold">Sobre nós</h2>
            <p className="text-sm">Estamos servindo nossos clientes há mais de 10 anos, proporcionando momentos especiais e marcantes.</p>
            <h2 id="eventos" className="font-bold">Que tal comemorar seu aniversário ou realizar um evento em grande estilo?</h2>
            <p className="text-sm">O Sushibar é o local perfeito para reunir amigos e familiares em aniversários e formaturas.</p>
            <p className="font-bold">Deseja marcar uma reserva ou evento?</p>
            <a href={whatsappLink("Olá! Gostaria de fazer uma reserva no Sushibar.")} target="_blank" rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-[#9a3412] hover:bg-[#7c2d12] text-white rounded-md">
              Reservar pelo WhatsApp<span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
          <div className="sm:w-1/2 grid grid-cols-2 sm:grid-cols-1 gap-2">
            <Image src={Image2} alt="Mesa preparada para evento" sizes="50vw" className="rounded-lg w-full h-auto" />
            <Image src={Image3} alt="Detalhe da decoração" sizes="50vw" className="rounded-lg w-full h-auto" />
          </div>
        </section>
      </main>
    </>
  );
}
/* Fim de nossoespaco.tsx */
