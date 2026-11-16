/* Servidor estático do teste de ponta a ponta: serve out/ em /sushibar/, como o GitHub Pages (index.html por pasta e 404.html) */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";

const RAIZ = resolve("out");
const BASE = "/sushibar";
const PORTA = Number(process.env.PORT || 4317);
const TIPOS = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".txt": "text/plain; charset=utf-8", ".woff2": "font/woff2" };

/* Acha o arquivo pedido; pasta vira index.html (ou pede a barra final, como o Pages); nada fora de out/ */
async function arquivo(caminho) {
  try {
    const alvo = normalize(join(RAIZ, decodeURIComponent(caminho)));
    if (alvo !== RAIZ && !alvo.startsWith(RAIZ + sep)) return null;
    const info = await stat(alvo);
    if (info.isDirectory()) return caminho.endsWith("/") ? join(alvo, "index.html") : { barra: true };
    return alvo;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  if (pathname === "/" || pathname === BASE) { res.writeHead(301, { location: `${BASE}/` }); return res.end(); }
  const caminho = pathname.startsWith(`${BASE}/`) ? await arquivo(pathname.slice(BASE.length)) : null;
  if (caminho?.barra) { res.writeHead(301, { location: `${pathname}/` }); return res.end(); }
  try {
    if (!caminho) throw new Error("fora");
    const corpo = await readFile(caminho);
    res.writeHead(200, { "content-type": TIPOS[extname(caminho)] || "application/octet-stream" });
    res.end(corpo);
  } catch {
    res.writeHead(404, { "content-type": TIPOS[".html"] });
    res.end(await readFile(join(RAIZ, "404.html")));
  }
}).listen(PORTA, () => console.log(`out/ em http://localhost:${PORTA}${BASE}/`));
/* Fim de servidor.mjs */
