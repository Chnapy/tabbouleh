module.exports = {

  modulePathIgnorePatterns: [
    "node_modules"
  ],
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  testEnvironment: "node",
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/test/",
    "/.git/",
    "/dist/",
    "/coverage/"
  ],
  coverageThreshold: {
    global: {
      "branches": 90,
      "functions": 95,
      "lines": 95,
      "statements": 95
    }
  },
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
    "!src/exception/*Error.{js,ts}"
  ]
};
