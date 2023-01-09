import Image from "next/image";
import React from "react";

import { PlusIcon } from "@heroicons/react/24/solid";

import styles from "./styles/ProductList.module.css";

interface PropTypes {
  products: {
    sku: string;
    title: string;
    main_image: string;
    availability: boolean;
  }[];
}

function Product({ products }: PropTypes) {
  return (
    <section className="flex flex-wrap justify-evenly">
      {products?.map((product: any) => {
        return (
          <div
            className={`flex flex-col items-start p-2 bg-white rounded-lg ${styles.spcard} my-1`}
            data-sku={product.sku}
            key={product.sku}
          >
            <div className="w-full h-32 relative">
              <Image
                src={product.main_image}
                alt={product.title}
                layout="fill"
              />
            </div>
            <h5 className="font-bold text-tahiti-100">{product.title}</h5>
            <p className="font-normal text-xs text-gray-400">
              {product.availability}
            </p>
            <div className="flex w-full justify-between items-center">
              <h1 className="font-bold text-xl text-tahiti-100">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h1>
              <button className="bg-primary w-10 h-10 rounded-lg flex justify-center items-center">
                <PlusIcon className="text-white w-6 h-6" />
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Product;
