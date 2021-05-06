const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const ExtraWatchWebpackPlugin = require("extra-watch-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";
const PATHS = {
    config: path.join(__dirname, "config"),
    views: path.join(__dirname, "views"),
};

module.exports = {
    mode: devMode ? "development" : "production",
    entry: {
        main: "./src/presentation/client/index.ts",
    },
    output: {
        path: path.resolve(__dirname, "public", "dist"),
        filename: devMode ? "[name].js" : "[name]-[contenthash].js",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? "[name].css" : "[name]-[contenthash].css",
        }),
        new WebpackManifestPlugin({ publicPath: "" }),
        new ExtraWatchWebpackPlugin({
            files: [],
            dirs: [PATHS.config, PATHS.views],
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.views}/**/*`, { nodir: true }),
            defaultExtractor: (content) => {
                const contentWithoutStyleBlocks = content.replace(
                    /<style[^]+?<\/style>/gi,
                    ""
                );
                return (
                    contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:\.]+/g) || []
                );
            },
            safelist: [/modal.*/],
        }),
    ],
    devtool: devMode ? "eval-source-map" : "source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                include: path.join(__dirname, "src", "presentation", "client"),
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                include: [
                    path.resolve(__dirname, "src", "presentation", "client"),
                ],
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
        ],
    },
    resolve: {
        extensions: [".js", ".ts"],
        symlinks: false,
    },
};
