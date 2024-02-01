import typescript from "rollup-plugin-typescript2";
import json from "rollup-plugin-json";

import pkg from "./package.json";

export default {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: "inline"
        },
        {
            file: pkg.module,
            format: "es",
            sourcemap: "inline"
        }
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [
        typescript({
            typescript: require("typescript"),
            tsconfig: "tsconfig.json"
        }),
        json({
            compact: true
        })
    ]
};
