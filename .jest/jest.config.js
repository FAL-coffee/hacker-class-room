module.exports = {
  // testEnvironment: "jsdom",
  // preset: ["@babel/preset-env", "@babel/preset-react"],
  roots: ["../"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  // transformIgnorePatterns: [
  //   'node_modules/?!core-js',
  // ],
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.jest.json",
    },
  },
  moduleNameMapper: {
    "@/(.+)": "<rootDir>/../src/$1",
  },
  // moduleDirectories: ["node_modules", "../"],
  testPathIgnorePatterns: ["/node_modules/"],
};
