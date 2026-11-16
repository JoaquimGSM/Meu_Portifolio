import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['json', { outputFile: 'docs/qa/test-results.json' }]],
  timeout: 30000,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    channel: 'msedge',
    headless: true,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `${process.platform === 'win32' ? 'npm.cmd' : 'npm'} run preview -- --port 4173 --strictPort`,
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 20000,
  },
});
