/*! © CREATE-REACT-APP */
"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "test";
process.env.NODE_ENV = "test";
process.env.PUBLIC_URL = "";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

// Ensure environment variables are read.
require("../config/env");

// TODO: Remove jest-cli/build/cli once this bug is fixed:
// https://github.com/facebook/jest/issues/7704#issuecomment-457699687
require("jest-cli/build/cli");

const jest = require("jest");
const argv = process.argv.slice(2);

// Watch unless on CI /* or in coverage mode */
// NOTE: Commented out coverage mode check because we want tests to re-run automatically and update coverage data
//       for coverage gutters extension
if (!process.env.CI /* && argv.indexOf("--coverage") < 0 */) {
  argv.push("--watchAll");
}

jest.run(argv);