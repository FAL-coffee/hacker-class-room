module.exports = {
  testEnvironment: "jsdom",
  presets: ["@babel/preset-env", "@babel/preset-react"],
  roots: ["../"],
  setupFilesAfterEnv: ["<rootDir>/.jest/setupTests.js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    // "^.+\\.(ts|tsx)$": "babel-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/.jest/tsconfig.jest.json",
    },
  },
  moduleDirectories: ["node_modules", "<rootDir>"],
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/src/__tests__/utils"],
};
