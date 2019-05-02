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
        "comma-dangle": 0,
        "arrow-parens": 0,
        "operator-linebreak": 0,
        "max-len": 0,
    },
    parserOptions: {
        parser: "babel-eslint",
    },
};
