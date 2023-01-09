import React from "react";
import IconCardapio from "./Icons/IconCardapio";
import Link from 'next/link';

export default function ProductCardapio() {
    return (
        <div className="mx-1 my-3 py-4 px-5 bg-white border-2 border-gray-300 rounded-xl tracking-wide shadow-lg text-tahiti-100 ">
            <div className="block">
                <div>
                    <IconCardapio />
                </div>
                <div className="mt-3 text-xs" >
                    <a><Link href="/cardapio">Cardápio</Link></a>
                </div>
            </div>
        </div>
    )
}