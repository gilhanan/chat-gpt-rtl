import type { Config } from "jest";

const config: Config = {
  rootDir: "../",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,js}"],
  coverageReporters: ["clover", "json", "json-summary", "lcov", "text"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["./config/jest.setup.ts"],
  moduleNameMapper: {
    "\\.scss$": "<rootDir>/__mocks__/styleMock.ts",
  },
  testMatch: ["**/src/**/*.test.ts"],
};

export default config;
