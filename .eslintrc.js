module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["plugin:vue/essential", "@vue/airbnb"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        indent: ["error", 4],
        quotes: ["error", "double"],
        "comma-dangle": ["error", "always-multiline"],
        "arrow-parens": ["error", "always"],
        "operator-linebreak": ["error", "after"],
        "max-len": ["error", { code: 190 }],
    },
    parserOptions: {
        parser: "babel-eslint",
    },
};
