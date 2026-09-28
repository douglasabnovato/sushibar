/* Cabeçalho com a arte do Sushibar e navegação principal (antes importava "next/Image", que quebra no Linux) */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import headerImg from "../components/assets/header-img.jpg";
import headerText from "../components/assets/header-text-img.jpg";
import { site } from "../lib/site";

const LINKS = [["/", "Início"], ["/cardapio", "Cardápio"], ["/bebidas", "Bebidas"], ["/nossoespaco", "Nosso espaço"]] as const;

export default function Header({ title, hero = false }: { title: string; hero?: boolean }) {
  return (
    <>
      <Head>
        <title>{title === site.name ? `${site.name} — culinária japonesa` : `${title} | ${site.name}`}</title>
        <meta name="description" content={site.description} />
      </Head>
      <header>
        <nav aria-label="Principal" className="bg-tahiti-100 text-white">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 px-3 py-2 text-sm">
            {LINKS.map(([href, label]) => <li key={href}><Link href={href} className="inline-block px-1 py-2 min-w-[44px] text-center underline-offset-4 hover:underline">{label}</Link></li>)}
          </ul>
        </nav>
        {hero && (
          <div className="relative p-2">
            <Image src={headerImg} alt="" priority sizes="100vw" className="w-full h-auto rounded-3xl" />
            <Image src={headerText} alt="Sushibar" sizes="100vw" className="w-full h-auto" />
          </div>
        )}
      </header>
    </>
  );
}
/* Fim de Header.tsx */
