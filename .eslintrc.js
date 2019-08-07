/*
    Este proyecto se basa usando las reglas de

    "Airbnb JavaScript Style Guide"

    Las reglas se encuentran aprovadas y soportadas por gran parte de la comunidad

    FAVOR DE NO MODIFICAR SIN CONSULTAR PREVIAMENTE
*/

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
        "max-len": ["error", { code: 100 }],
    },
    parserOptions: {
        parser: "babel-eslint",
    },
};
