import React from "react";
import IconNossoEspaco from "./Icons/IconNossoEspaco";
import Link from 'next/link';

export default function ProductMenu() {
    return (
        <div className="mx-1 my-3 py-4 bg-white border-2 border-gray-300 p-2.5 rounded-xl tracking-wide shadow-lg text-tahiti-100">
            <div className="block">
                <div className="pb-2 px-5">
                    <IconNossoEspaco />
                </div>
                <div className="mt-3 text-xs" >
                    <Link href="/nossoespaco">Nosso Espaço</Link>
                </div>
            </div>
        </div>
    )
}