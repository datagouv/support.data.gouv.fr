const purgecss = require("@fullhuman/postcss-purgecss");
const tailwincss = require("tailwindcss");

module.exports = {
    plugins: [
        "postcss-import",
        "postcss-url",
        tailwincss({
            purge: false,
        }),
        "autoprefixer",
        purgecss({
            content: ["./views/**/*.njk"],
            // see https://medium.com/@kyis/vue-tailwind-purgecss-the-right-way-c70d04461475#3f95
            defaultExtractor: (content) => {
                const contentWithoutStyleBlocks = content.replace(
                    /<style[^]+?<\/style>/gi,
                    ""
                );
                return (
                    contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:\.]+/g) || []
                );
            },
        }),
    ],
};
