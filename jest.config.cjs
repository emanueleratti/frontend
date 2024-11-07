module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx", ".jsx"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(your-module-to-transform)/)",
  ],
};
