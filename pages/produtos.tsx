/* Todos os produtos agrupados por categoria */
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Header from "../layouts/Header";
import Product from "../components/Product";
import { loadMenu, type Menu } from "../lib/menu";

export default function Produtos({ menu }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Header title="Produtos" />
      <main className="min-h-screen bg-gray-200 pt-3 pb-6">
        <h1 className="mx-3 mb-2 text-2xl font-bold">Todos os produtos</h1>
        <Product menu={menu} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<{ menu: Menu }> = async () => ({ props: { menu: await loadMenu() } });
/* Fim de produtos.tsx */
