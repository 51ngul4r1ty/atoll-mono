const paths = require("./config/paths");

module.exports = {
    verbose: true,
    collectCoverageFrom: ["src/**/*.{js,jsx,mjs,ts,tsx}"],
    coverageReporters: ["lcov", "text-summary"],
    coverageThreshold: {
        global: {
            statements: 15.21,
            branches: 10.28,
            functions: 17.52,
            lines: 15.06
        }
    },
    setupFiles: ["regenerator-runtime/runtime", "<rootDir>/config/polyfills.js"],
    setupFilesAfterEnv: ["<rootDir>config/jest/setup.js"],
    testMatch: ["<rootDir>/src/*.test.{js,jsx,mjs,ts,tsx}", "<rootDir>/src/**/*.test.{js,jsx,mjs,ts,tsx}"],
    testEnvironment: "node",
    testURL: "http://localhost",
    transform: {
        "^.+\\.(js|jsx|mjs|ts|tsx)$": "babel-jest",
        "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|mjs|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
    },
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx|mjs)$"],
    moduleDirectories: paths.resolveModules,
    moduleFileExtensions: ["js", "json", "jsx", "node", "mjs", "ts", "tsx"]
};
