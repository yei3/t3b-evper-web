module.exports = {
    moduleFileExtensions: ["js", "jsx", "json", "vue"],

    transform: {
        "^.+\\.vue$": "vue-jest",
        ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
        "^.+\\.jsx?$": "babel-jest",
    },

    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },

    snapshotSerializers: ["jest-serializer-vue"],
    testMatch: [
        "**/tests/unit/**/*.(spec|test).(js|jsx|ts|tsx)|**/__tests__/*.(spec|test).(js|jsx|ts|tsx)",
    ],
    testURL: "http://localhost/",
    preset: "@vue/cli-plugin-unit-jest",
};
