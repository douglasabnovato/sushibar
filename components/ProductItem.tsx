
import React from "react";
import Image from 'next/image'

interface PropTypes {
    products: {
        sku: string;
        title: string;
        main_image: string;
        availability: boolean;
    }[];
}

export default function ProductItem({ products }: PropTypes) {
    return (
        <section className="min-h-screen bg-gray-200  justify-center items-center">
            {products?.map((product: any) => {
                return (
                    <div 
                     key={product.id}
                     className="mx-1 bg-white border-2 border-gray-300 p-2.5 rounded-xl tracking-wide shadow-lg text-tahiti-100 flex my-2">
                        <div className="relative flex-initial w-2/5 bg-tahiti-48 rounded-xl">
                            <Image
                                src={product.main_image}
                                alt={product.title}
                                className="rounded-3xl"
                                layout="fill"
                            />
                        </div>
                        <div className="flex flex-col ml-2">
                            <h4 className="text-xl text-tahiti-54 font-sans font-normal mt-1">{product.title.slice(0, 20)}</h4>
                            <p className="text-gray-800 mt-1">
                                {product.description.slice(0, 40)}
                            </p>
                            <div className="flex mt-1 justify-between">
                                <p className="ml-3 text-tahiti-54"></p>
                                <p className="ml-3 text-tahiti-54 text-2xl">{product.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    )
}