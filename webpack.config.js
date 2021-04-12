const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/infrastructure/client/index.ts",
    output: {
        path: path.resolve(__dirname, "public", "js"),
        filename: "bundle.js",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
};
