/* Cardápio com abas por categoria */
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Header from "../layouts/Header";
import CategoryMenu from "../components/CategoryMenu";
import { loadMenu, type Menu } from "../lib/menu";

export default function Cardapio({ menu }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Header title="Cardápio" />
      <main className="min-h-screen bg-gray-200 pt-3 pb-6">
        <h1 className="mx-3 mb-2 text-2xl font-bold">Cardápio</h1>
        <CategoryMenu menu={menu} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<{ menu: Menu }> = async () => ({ props: { menu: await loadMenu() } });
/* Fim de cardapio.tsx */
