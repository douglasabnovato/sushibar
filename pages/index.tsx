import type { GetStaticProps, NextPage } from "next";
import { InferGetStaticPropsType } from "next";
import Header from "../layouts/Header";

import { getProducts } from "../services/Supabase/Products";

import SpecialOffers from "../layouts/SpecialOffers";
import SeeMore from "../layouts/SeeMore";

const Home: NextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {

  return (
    <>
      <Header title="Sushibar"/>
      <main className="min-h-screen bg-gray-200 pt-3 justify-center items-center">
          <SpecialOffers products={props.products.slice(0, 4)} />
          <SeeMore />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();
  return {
    props: { products },
  };
};


export default Home;

