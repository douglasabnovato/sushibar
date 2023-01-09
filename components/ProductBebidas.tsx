import React from "react";
import IconBebida from "./Icons/IconBebida";
import Link from 'next/link';

export default function ProductBebidas() {
    return (
        <div className="mx-1 my-3 py-4 px-5 bg-white border-2 border-gray-300 rounded-xl tracking-wide shadow-lg text-tahiti-100 ">
            <div className="block">
                <div>
                    <IconBebida />
                </div>
                <div className="mt-3 text-xs" >
                    <Link href="/bebidas">Bebidas</Link>
                </div>
            </div>
        </div> 
    )
}