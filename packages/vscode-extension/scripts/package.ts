import { callback, execWebpack, webpackConfig } from "./common";

const newConfig = webpackConfig.map((config: any) => ({
    ...config,
    mode: 'production',
    devtool: 'hidden-source-map',
}));
execWebpack(newConfig, callback);
