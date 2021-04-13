const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/presentation/client/index.ts",
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
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                use: ["file-loader"],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: ["url-loader?limit=100000"],
            },
        ],
    },
};
