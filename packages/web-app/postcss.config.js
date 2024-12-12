const paths = require("./config/paths");

const postCssImportPath = `${__dirname}/node_modules`;
const postCssAssetsBasePath = "./assets";

console.log();
console.log('**CONFIG FROM `postcss.config.js`**');
console.log();
console.log('plugins postcss-import path', postCssImportPath);
console.log('plugins postcss-assets basePath', postCssAssetsBasePath);
console.log();

module.exports = {
    plugins: [
        require("postcss-import")({
            path: [postCssImportPath],
        }),
        require("postcss-nested")(),
        require("postcss-flexbugs-fixes")(),
        require("autoprefixer")(),
        require("postcss-custom-properties")(),
        require("postcss-assets")({
            basePath: postCssAssetsBasePath,
        }),
        // This is broken.
        // require("postcss-normalize")(),
    ],
    sourceMap: true,
};
