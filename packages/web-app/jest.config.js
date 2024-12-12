const paths = require("./config/paths");

module.exports = {
    roots: ["<rootDir>/src"],
    testMatch: ["<rootDir>/src/**/*.(spec|test).{js,jsx,mjs,ts,tsx}"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform"
    },
    // verbose: true,
    // collectCoverageFrom: ["src/**/*.{js,jsx,mjs,ts,tsx}"],
    coverageReporters: ["lcov", "text-summary"],
    coverageThreshold: {
        global: {
            statements: 15.21,
            branches: 10.28,
            functions: 17.52,
            lines: 15.06
        }
    },
    moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx", "node", "mjs"],
    globals: {
        "ts-jest": {
            diagnostics: true,
            tsconfig: "tsconfig.json"
        }
    },
    setupFilesAfterEnv: ["<rootDir>config/jest/setup.ts"],
    testEnvironment: "node",
    // testURL: "http://localhost",
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx|mjs)$"] //,
    // moduleDirectories: paths.resolveModules
};
