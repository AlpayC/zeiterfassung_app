// jest.config.js
export default {
  setupFiles: ["<rootDir>/setupTests.js"],
  transform: {},
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};
