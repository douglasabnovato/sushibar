/* Teste de ponta a ponta no navegador: serve o build estático (out/) em /sushibar, como o GitHub Pages; na mesa e num celular de 320 px (#35) */
import { defineConfig, devices } from "@playwright/test";

const PORTA = Number(process.env.E2E_PORT || 4317);

export default defineConfig({
  testDir: "e2e",
  testMatch: /.*\.e2e\.ts$/,
  timeout: 60_000,
  retries: 0,
  reporter: [["list"]],
  use: { baseURL: `http://localhost:${PORTA}/sushibar/`, trace: "retain-on-failure", reducedMotion: "reduce" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"], colorScheme: "light" } },
    /* 320 x 640 px: o menor celular comum e a régua de reflow da WCAG 1.4.10; o Pixel 7 dá o toque e o isMobile */
    { name: "celular-320", use: { ...devices["Pixel 7"], viewport: { width: 320, height: 640 }, colorScheme: "light" } },
  ],
  webServer: {
    /* No local, refaz o build antes de servir: sem ele, uma mudança no CSS testaria o out/ antigo (R19 do #38). O CI já faz o build no passo anterior */
    command: process.env.CI ? "node e2e/servidor.mjs" : "npm run build && node e2e/servidor.mjs",
    url: `http://localhost:${PORTA}/sushibar/`,
    env: { PORT: String(PORTA) },
    reuseExistingServer: false,
    timeout: process.env.CI ? 30_000 : 180_000,
  },
});
/* Fim de playwright.config.ts */
