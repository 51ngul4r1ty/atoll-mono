const path = require("path");
const nodeExternals = require("webpack-node-externals");

const paths = require("../paths");
const { server: serverLoaders } = require("./loaders");
const resolvers = require("./resolvers");
const plugins = require("./plugins");

module.exports = {
    name: "server",
    target: "node",
    node: {
        __dirname: true,
        __filename: true
    },
    entry: {
        // server: [path.resolve(paths.srcServer, 'index.js')],
        server: [
            require.resolve("core-js/stable"),
            require.resolve("regenerator-runtime/runtime"),
            path.resolve(paths.srcServer, "index.ts")
        ]
    },
    externals: [
        nodeExternals({
            modulesDir: "../../node_modules/",
            // we still want imported css from external files to be bundled otherwise 3rd party packages
            // which require us to include their own css would not work properly
            whitelist: /\.css$/
        })
    ],
    output: {
        path: paths.serverBuild,
        filename: "server.js",
        publicPath: paths.publicPath
        // libraryTarget: 'commonjs2',
    },
    resolve: { ...resolvers },
    module: {
        rules: serverLoaders
    },
    plugins: [...plugins.shared, ...plugins.server],
    stats: {
        colors: true
    }
};
