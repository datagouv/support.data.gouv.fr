const purgecss = require("@fullhuman/postcss-purgecss");
const tailwincss = require("tailwindcss");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    plugins: [
        "postcss-import",
        "postcss-url",
        tailwincss({
            purge: false,
        }),
        "autoprefixer",
        devMode
            ? ""
            : purgecss({
                  content: ["./views/**/*.njk"],
              }),
    ],
};
