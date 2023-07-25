module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["./jest.setup.js"],
  moduleNameMapper: {
    "\\.scss$": "<rootDir>/__mocks__/styleMock.js",
  },
  testMatch: ["**/src/**/*.test.ts"],
};
