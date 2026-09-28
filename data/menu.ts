/* Cardápio local (usado quando o Supabase não está configurado ou falha); preços ilustrativos */
import type { StaticImageData } from "next/image";
import sunomono from "../components/assets/sunomono-img.png";
import combo from "../components/assets/sushibar-img.jpg";

export type Category = { id: number; title: string };
export type MenuItem = {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  price: number;
  image?: StaticImageData | string;
  featured?: boolean;
};

export const categories: Category[] = [
  { id: 1, title: "Entradas" },
  { id: 2, title: "Sushis" },
  { id: 3, title: "Temakis" },
  { id: 4, title: "Bebidas" },
];

export const items: MenuItem[] = [
  { id: 101, categoryId: 1, title: "Sunomono", description: "Salada agridoce de pepino japonês com gergelim.", price: 18.9, image: sunomono, featured: true },
  { id: 102, categoryId: 1, title: "Guioza (6 un.)", description: "Pastéis japoneses grelhados recheados com carne e legumes.", price: 29.9 },
  { id: 103, categoryId: 1, title: "Missoshiru", description: "Sopa de missô com tofu, cebolinha e alga wakame.", price: 14.9 },
  { id: 201, categoryId: 2, title: "Combo Sushibar (20 peças)", description: "Seleção do sushiman com niguiris, uramakis e hossomakis.", price: 89.9, image: combo, featured: true },
  { id: 202, categoryId: 2, title: "Niguiri de salmão (2 un.)", description: "Arroz temperado coberto com fatia de salmão fresco.", price: 16.9, featured: true },
  { id: 203, categoryId: 2, title: "Uramaki Filadélfia (8 un.)", description: "Salmão, cream cheese e cebolinha, com gergelim por fora.", price: 32.9 },
  { id: 301, categoryId: 3, title: "Temaki de salmão completo", description: "Cone de alga com arroz, salmão, cream cheese e cebolinha.", price: 34.9, featured: true },
  { id: 302, categoryId: 3, title: "Temaki skin", description: "Pele de salmão crocante com molho tarê e cebolinha.", price: 26.9 },
  { id: 401, categoryId: 4, title: "Chá verde gelado", description: "Chá verde japonês, sem açúcar.", price: 9.9 },
  { id: 402, categoryId: 4, title: "Refrigerante lata", description: "350 ml.", price: 7.5 },
  { id: 403, categoryId: 4, title: "Saquê quente (dose)", description: "Servido na tokkuri. Venda proibida para menores de 18 anos.", price: 19.9 },
];
/* Fim de menu.ts */
