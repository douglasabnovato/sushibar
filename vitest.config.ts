/* Vitest: resolve imagens estáticas do Next como objetos simples nos testes */
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [{ name: "static-images", enforce: "pre", load(id) { if (/\.(png|jpe?g)$/.test(id)) return `export default { src: ${JSON.stringify(id)}, width: 1, height: 1 };`; } }],
  test: { include: ["tests/**/*.test.ts"] },
});
/* Fim de vitest.config.ts */
