import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';

import Image1 from "./assets/image-nosso-espaco-1.png"
import Image2 from "./assets/image-nosso-espaco-2.png"
import Image3 from "./assets/image-nosso-espaco-3.png"

const NossoEspaco = () => {

  return (
    <>
      <Head>
        <title>Sushibar - NossoEspaco</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon-shushibar.ico" />
      </Head>
      <main className="min-h-screen justify-center items-center">
        <div className="bg-tahiti-46 pb-5">
          <div className="text-tahiti-100 font-bold font-sans px-5 pt-4">Lounge SushiBar</div>
          <div className="text-[10px] text-tahiti-100 px-5 pt-2 pb-6">Com uma atmosfera refinada, o Sushibar oferece não só o melhor da gastronomia do sudeste asiático, mas também um espaço de convivio familiar com o maior conforto possível</div>
          <div className="relative">
            <div className="px-4 z-10">
              <Image
                src={Image1}
                className="rounded-lg"
              />
            </div>
            <div className="absolute flex z-20 w-full h-full top-0 left-0 items-end">
              <div className="ml-6 pb-3 flex w-1/3">
                <div className="bg-white w-2.5 h-2.5 m-1 rounded-full"></div>
                <div className="bg-tahiti-42 w-2.5 h-2.5 m-1 rounded-full"></div>
                <div className="bg-tahiti-42 w-2.5 h-2.5 m-1 rounded-full"></div>
                <div className="bg-tahiti-42 w-2.5 h-2.5 m-1 rounded-full"></div>
              </div>
              <div className="w-2/3 mr-1 mb-3">
                <div className="font-bold">Você irá se impressionar!</div>
                <div className="text-xs">Estaremos dispostos a te atender com todo o carinho e dedicação!</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex bg-tahiti-44 p-6">
          <div className="text-tahiti-100 w-1/2" >
            <div className="font-bold text-sm mb-1">+ Sobre nós</div>
            <div className="text-[8px] mb-2">
              Estamos servindo nosso clientes há mais de 10 anos. Proporcionando momentos especiais e marcantes.
            </div>
            <div className="font-bold text-sm mb-1">
              Que tal comemorar
              seu aniversário ou Hostear um evento em grande estilo?
            </div>
            <div className="text-[8px] mb-2">
              O SushiBar é o local perfeito para convidar seus amigos e familiares para comemorar seu aniversário ou sua formatura, por exemplo.
            </div>
            <div className="font-bold text-sm mb-2">
              Deseja marcar uma reserva ou evento?
            </div>
            <div className="px-8 py-2 mb-2 bg-tahiti-54 hover:bg-tahiti-60 text-white w-36 h-9 rounded-md content-center">Clique aqui</div>
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div>
              <Image
                src={Image2}
              /></div>
            <div>
              <Image
                src={Image3}
              /></div>
          </div>
        </div>
        <div className="fixed z-20 p-2 mx-2 mb-1 text-xs bg-tahiti-54 w-14 h-14 rounded-full bottom-0 right-0" >
          <a className=""><Link href="/">Home</Link></a>
        </div>
      </main>
    </>
  );
};

export default NossoEspaco;