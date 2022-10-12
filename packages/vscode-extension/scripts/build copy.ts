import * as webpack from 'webpack';

const webpackConfig = require("../webpack.config.js");


console.log(`Webpack v${webpack.version}`);

const callback = (err: any, stats: any) => {
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
    console.log();
    console.log('Webpack Build Stats');
    console.log();
    console.log(stats.toString({ colors: true }));
    console.log();
};

webpack(webpackConfig, callback);
