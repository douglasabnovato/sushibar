
import React from "react";
import IconStar from "./Icons/IconStar"
import Image from 'next/image'

interface PropTypes {
    products: {
        sku: string;
        title: string;
        main_image: string;
        availability: boolean;
    }[];
}

export default function ProductBox({ products }: PropTypes) {
    return (
        <section className="grid grid-cols-2 justify-evenly">
            {products?.map((product: any) => {
                return (
                    <div
                        className="flex mx-1 my-1 bg-white border-2 border-gray-300 p-2.5 rounded-xl tracking-wide shadow-lg text-tahiti-100"
                        data-sku={product.sku}
                        key={product.sku}>
                            <div className="relative flex-initial w-2/5 bg-tahiti-48 rounded-xl">
                                <Image
                                    src={product.main_image}
                                    alt={product.title}
                                    className="rounded-3xl"
                                    layout="fill"
                                />
                            </div>
                            <div className="flex-initial w-3/5 flex-col justify-between">
                                <h4 className="text-xs text-tahiti-54 font-sans font-normal mb-2">{product.title.slice(0, 20)}</h4>
                                <div className="flex justify-between">
                                    <div className="flex tahiti-100 leading-tight">
                                        <IconStar /><p className="ml-1.5 text-xs">5.0</p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-xs">{product.price.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                );
            })}
        </section >
    );
}
