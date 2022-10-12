import * as webpack from 'webpack';

export const webpackConfig = require("../webpack.config.js");

export const consoleLogHeader = () => {
    console.log(`Webpack v${webpack.version}`);
}

export const consoleLogStats = (stats: any) => {
    console.log();
    console.log('Webpack Build Stats');
    console.log();
    console.log(stats.toString({ colors: true }));
    console.log();
}

export type Callback = (err: any, stats: any) => void;

export const callback: Callback = (err: any, stats: any) => {
    if (err) {
        console.error(err);
        if (err.details) {
            console.error(err.details);
        }
    }
    const info = stats.toJson();
    if (stats?.hasErrors()) {
        console.error(info.errors);
    }
    if (stats?.hasWarnings()) {
        console.log('WARNINGS');
        console.warn(info.warnings);
    }
    consoleLogStats(stats);
};

export const execWebpack = (webpackConfig: any, callback: Callback) => {
    consoleLogHeader();
    webpack(webpackConfig, callback);
}
