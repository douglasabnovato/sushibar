/* Imagem do prato; sem foto, mostra a inicial em um bloco colorido (antes quebrava com imagem ausente) */
import Image from "next/image";
import type { MenuItem } from "../data/menu";

export default function ProductImage({ item, sizes }: { item: MenuItem; sizes: string }) {
  if (!item.image) {
    return (
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center rounded-xl bg-tahiti-48 text-3xl font-bold text-tahiti-56">
        {item.title.charAt(0)}
      </div>
    );
  }
  return <Image src={item.image} alt="" fill sizes={sizes} className="rounded-xl object-cover" />;
}
/* Fim de ProductImage.tsx */
