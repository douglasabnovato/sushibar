/* Bebidas: abre o cardápio já na categoria de bebidas */
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Header from "../layouts/Header";
import CategoryMenu from "../components/CategoryMenu";
import { loadMenu, type Menu } from "../lib/menu";

export default function Bebidas({ menu, drinksId }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Header title="Bebidas" />
      <main className="min-h-screen bg-gray-200 pt-3 pb-6">
        <h1 className="mx-3 mb-2 text-2xl font-bold">Bebidas</h1>
        <CategoryMenu menu={menu} initialCategoryId={drinksId} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<{ menu: Menu; drinksId: number }> = async () => {
  const menu = await loadMenu();
  const drinks = menu.categories.find((c) => /bebida/i.test(c.title)) ?? menu.categories[0];
  return { props: { menu, drinksId: drinks?.id ?? 0 } };
};
/* Fim de bebidas.tsx */
