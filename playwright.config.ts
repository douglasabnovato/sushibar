/* Teste de ponta a ponta no navegador: serve o build estático (out/) em /sushibar, como o GitHub Pages */
import { defineConfig, devices } from "@playwright/test";

const PORTA = 4317;

export default defineConfig({
  testDir: "e2e",
  testMatch: /.*\.e2e\.ts$/,
  timeout: 60_000,
  retries: 0,
  reporter: [["list"]],
  use: { baseURL: `http://localhost:${PORTA}/sushibar/`, trace: "retain-on-failure", reducedMotion: "reduce" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], colorScheme: "light" } }],
  webServer: {
    command: "node e2e/servidor.mjs",
    url: `http://localhost:${PORTA}/sushibar/`,
    env: { PORT: String(PORTA) },
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
/* Fim de playwright.config.ts */
