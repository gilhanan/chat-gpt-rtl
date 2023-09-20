import { defineConfig, devices } from "@playwright/test";

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./e2e",
  forbidOnly: isCI,
  reporter: "html",
  use: {
    trace: "on",
  },
  projects: [
    // {
    //   name: "chromium",
    //   use: { ...devices["Desktop Chrome"] },
    // },
    {
      name: "Microsoft Edge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
});
