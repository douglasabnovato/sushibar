/* Documento base: idioma pt-BR e ícone */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon-shushibar.ico`} />
        <meta name="theme-color" content="#000000" />
      </Head>
      <body className="bg-gray-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
/* Fim de _document.tsx */
