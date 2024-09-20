import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Configure your E2E tests here
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    baseUrl: "https://notes-serverless-app.com",
    defaultCommandTimeout: 10000,
    watchForFileChanges: false,
    video: false,
    chromeWebSecurity: false,
    env: {
      viewportWidthBreakpoint: 768,
    },
  },
});
