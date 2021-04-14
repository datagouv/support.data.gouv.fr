const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = {
    mode: "production",
    entry: {
        main: "./src/presentation/client/index.ts",
    },
    output: {
        path: path.resolve(__dirname, "public", "dist"),
        filename: "[name]-[contenthash].js",
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name]-[contenthash].css" }),
        new WebpackManifestPlugin({ publicPath: "" }),
    ],
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
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
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
