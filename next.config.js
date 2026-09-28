/* Configuração do Next: exportação estática para o GitHub Pages (pasta out/ publicada em /sushibar; no npm run dev o site fica na raiz) e imagens remotas só do Storage do Supabase (antes liberava o CDN da Target) */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const repoBasePath = "/sushibar";

/* Monta a configuração conforme a fase: dev sem basePath, build com basePath do repositório */
module.exports = (phase) => {
  const basePath = phase === PHASE_DEVELOPMENT_SERVER ? "" : repoBasePath;
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    output: "export",
    basePath,
    assetPrefix: basePath || undefined,
    trailingSlash: true,
    env: { NEXT_PUBLIC_BASE_PATH: basePath },
    images: { unoptimized: true, remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }] },
  };
  return nextConfig;
};
/* Fim de next.config.js */
