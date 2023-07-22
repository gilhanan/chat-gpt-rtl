module.exports = {
  preset: "jest-puppeteer",
  testEnvironment: "jest-environment-puppeteer",
  setupFiles: ["jest-puppeteer"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/e2e/**/*.test.ts"],
};
