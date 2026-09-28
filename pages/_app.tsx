/* Aplicação: estilos globais e rodapé comum */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { site } from "../lib/site";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <footer className="bg-tahiti-100 text-white text-xs text-center py-3">
        © {new Date().getFullYear()} {site.name}.{site.isDemo ? " Site de demonstração: preços e itens ilustrativos." : ""}
      </footer>
    </>
  );
}
/* Fim de _app.tsx */
