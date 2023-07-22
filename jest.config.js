module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.scss$": "<rootDir>/__mocks__/styleMock.js",
  },
  testMatch: ["**/src/**/*.test.ts"],
};
