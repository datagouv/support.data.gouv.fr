const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
    plugins: [
        "postcss-import",
        "postcss-url",
        "tailwindcss",
        "autoprefixer",
        purgecss({
            content: ["./views/**/*.njk"],
        }),
    ],
};
