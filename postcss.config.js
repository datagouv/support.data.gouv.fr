const tailwincss = require("tailwindcss");

module.exports = {
    plugins: [
        "postcss-import",
        "postcss-url",
        tailwincss({
            purge: false,
        }),
        "autoprefixer",
    ],
};
