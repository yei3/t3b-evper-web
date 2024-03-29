module.exports = {
    root: true,

    env: {
        node: true,
    },

    extends: ["plugin:vue/essential", "@vue/airbnb", "prettier"],

    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "comma-dangle": ["error", "always-multiline"],
        "arrow-parens": ["error", "always"],
        "operator-linebreak": ["error", "after"],
    },

    parserOptions: {
        parser: "babel-eslint",
    },

    plugins: ["prettier"],

    overrides: [
        {
            files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
            env: {
                jest: true,
            },
        },
    ],
};
