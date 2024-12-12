const fs = require("fs");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

let serverBuild;
try {
    serverBuild = resolveApp("build/server");
} catch {
    serverBuild = undefined;
}

const nodeModules = resolveApp("../../node_modules");

const paths = {
    appHtml: resolveApp("config/webpack.config.js/template.html"),
    clientBuild: resolveApp("build/client"),
    serverBuild,
    dotenv: resolveApp(".env"),
    src: resolveApp("src"),
    srcClient: resolveApp("src/client"),
    srcServer: resolveApp("src/server"),
    types: resolveApp(`${nodeModules}/@types`),
    i18n: resolveApp("src/shared/i18n"),
    publicPath: "/static/"
};

if (process.env.SUPPRESS_CONSOLE_LOGGING !== "true") {
    console.log();
    console.log('**CONFIG FROM `config/paths.js`**');
    console.log();
    console.log('appHtml    ', paths.appHtml);
    console.log('clientBuild', paths.clientBuild);
    console.log('serverBuild', paths.serverBuild);
    console.log('dotenv     ', paths.dotenv);
    console.log('src        ', paths.src);
    console.log('srcClient  ', paths.srcClient);
    console.log('srcServer  ', paths.srcServer);
    console.log('types      ', paths.types);
    console.log('i18n       ', paths.i18n);
    console.log('publicPath ', paths.publicPath);
    console.log();
}

paths.resolveModules = [paths.srcClient, paths.srcServer, paths.src, nodeModules];

module.exports = paths;
