/* Página inicial: cabeçalho, destaques e atalhos */
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Header from "../layouts/Header";
import SpecialOffers from "../layouts/SpecialOffers";
import SeeMore from "../layouts/SeeMore";
import { featured, loadMenu, type Menu } from "../lib/menu";

export default function Home({ menu }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Header title="Sushibar" hero />
      <main className="min-h-screen bg-gray-200 pt-3 pb-6">
        <h1 className="sr-only">Sushibar — culinária japonesa</h1>
        <SpecialOffers products={featured(menu)} />
        <SeeMore />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<{ menu: Menu }> = async () => ({ props: { menu: await loadMenu() } });
/* Fim de index.tsx */
